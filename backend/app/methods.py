import uuid
from .serializers import PlayerSerializer
from .models import Player
from .consumers import ws_update_existing_players

def generate_session_id():
    '''
    Generates universally unique id for cookie

    Returns: 
        (str): A UUID string

    '''
    return str(uuid.uuid1())

def get_or_none(model, *args, **kwargs):
    '''
    Wrapper function to ensure get queries do not fail
    '''
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None


def send_updated_player_info_via_websockets(session_id):
    print("Sending updated player information..")            
    game_players = Player.objects.filter(game_session=session_id)
    serializered_players = PlayerSerializer(game_players, many=True)

    data_to_send = {
        "game_session_id": session_id,
        "players": serializered_players.data
    }

    ws_update_existing_players(data_to_send)
