from channels import route 
from .consumers import (
    ws_connect, 
    ws_disconnect,
    ws_player_connect,
    ws_player_disconnect
)

websocket_routing = [
    route('websocket.connect', ws_connect),
    route('websocket.disconnect', ws_disconnect),
]

player_ws_routing = [
    route('websocket.connect', ws_player_connect),
    route('websocket.disconnect', ws_player_disconnect),
]