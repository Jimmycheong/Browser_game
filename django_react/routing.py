from channels import include 

websocket_routing = [

    include('app.routing.websocket_routing', path=r'^/games/'),    
    include('app.routing.player_ws_routing', path=r'^/player/'),
    # Custom handler for message sending (see Room.send_message).
    # Can't go in the include above as it does not have a path attribute to match on 
    # include('app.routing.custom_routing')
]
