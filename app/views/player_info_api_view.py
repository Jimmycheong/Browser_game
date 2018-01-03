from rest_framework.views import APIView
from ..models import Player
from ..serializers import PlayerSerializer
from rest_framework.response import Response
from ..methods import (
    get_or_none, 
    send_updated_player_info_via_websockets
)

from ..consumers import ws_update_existing_players

class PlayerInfoAPI(APIView):

    def put(self, request):

        '''
        TODO:

        1. Grab player objects
        2. map through them and edit their names for the provided id
        3. save to database 
        4. notify all users of changes on websockets

        ''' 

        list_of_player_objects = Player.objects.filter(player_session_id=request.GET.get('player_session_id'))

        if len(list_of_player_objects) == 0:
            return Response("Could not find session objects with this ID.")
             
        for obj in list_of_player_objects:
            obj.name = request.data['new_name']
            obj.save()

        send_updated_player_info_via_websockets(obj.game_session.id)

        return Response("Name changed to {}".format(request.data['new_name']))

