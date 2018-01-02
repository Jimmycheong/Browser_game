'''
Consumers 

'''

import json
from channels import Group
from channels.auth import (
    channel_session_user, 
    channel_session_user_from_http
)

def ws_connect(message):
    message.reply_channel.send({"accept": True})
    Group('streams').add(message.reply_channel)

def ws_disconnect(message):
    Group('streams').discard(message.reply_channel)

# Websocket update clients
def ws_update_existing_stream(data_type, data):

    print("SENDING DATA TYPE: ", data_type)

    Group('streams').send({
        'text': json.dumps({
            data_type : data
        })
    })
