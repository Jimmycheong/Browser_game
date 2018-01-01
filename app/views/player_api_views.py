from rest_framework.views import APIView
from ..models import GameSession, Player
from ..serializers import PlayerSerializer
from rest_framework.response import Response

class PlayerAPI(APIView):

    def get(self, request, game_title):

        print("Reached!: ", game_title)

        try:
            session = GameSession.objects.get(title=game_title)
        except:
            session = None  
            return Response("Cannot find game")
            
        game_players = Player.objects.filter(game_session=session.id)
        serializer = PlayerSerializer(game_players, many=True)
        return Response(serializer.data)
