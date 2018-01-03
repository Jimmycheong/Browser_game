import json
from rest_framework.views import APIView
from ..models import GameSession, Player
from ..serializers import PlayerSerializer
from rest_framework.response import Response
from ..methods import (
    get_or_none, 
    send_updated_player_info_via_websockets
)

from ..consumers import ws_update_existing_players

class PlayerAPI(APIView):

    def get(self, request, game_title):
        print("Request params:{}={}".format("player_session_id", request.GET.get("player_session_id")))
        joined = False

        try:
            session = GameSession.objects.get(title=game_title)
        except:
            session = None  
            return Response("Cannot find game")
            
        game_players = Player.objects.filter(game_session=session.id)
        serializer = PlayerSerializer(game_players, many=True)

        joined_player = get_or_none(
            Player, 
            player_session_id=request.GET.get("player_session_id"),
            game_session=session
        )

        if joined_player in game_players:
            joined = True

        data = {
            "joined": joined,
            "players": serializer.data,
            "game_session_id": session.id
        }

        if joined_player != None:
            data['playerStatus'] = joined_player.status

        return Response(json.dumps(data))

    def post(self, request, game_title):

        session = GameSession.objects.get(title=game_title)
        
        if request.data['action'] == 'join':            
            Player(
                game_session=session, 
                name=request.data["player_name"], 
                player_session_id=request.data["player_session_id"]
            ).save()
            response = Response("Joined game: {}".format(game_title))
        
        else:
            Player.objects.get(
                player_session_id=request.data['player_session_id'],
                game_session=session
            ).delete()
            response = Response("Left game: {}".format(game_title))

        # Sent info via websockets
        send_updated_player_info_via_websockets(session.id)
        return response

    def put(self, request, game_title):
        session = GameSession.objects.get(title=game_title)
        obj = Player.objects.get(
            player_session_id=request.GET.get('player_session_id')
        )
        if request.data['isReady'] is False: 
            obj.status = "ready"
            obj.save()
            response = Response("Player {} is ready!".format(obj.name))

        else:
            obj.status = "standby"
            obj.save()
            response = Response("Player {} is not ready.".format(obj.name))

        # Sent info via websockets
        send_updated_player_info_via_websockets(session.id)
        return response


