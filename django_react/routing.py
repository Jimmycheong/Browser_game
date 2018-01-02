from channels import include 

channel_routing = [

    include('dashboard.routing.websocket_routing', path=r'^/streams/'),
    # Custom handler for message sending (see Room.send_message).
    # Can't go in the include above as it does not have a path attribute to match on 
    include('dashboard.routing.custom_routing')
]
