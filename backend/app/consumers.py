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
    Group('games').add(message.reply_channel)

def ws_disconnect(message):
    Group('games').discard(message.reply_channel)

# Websocket update clients
def ws_update_existing_games(data):
    Group('games').send({
        'text': json.dumps(data)
    })

def ws_player_connect(message):
    message.reply_channel.send({"accept": True})
    Group('player').add(message.reply_channel)

def ws_player_disconnect(message):
    Group('player').discard(message.reply_channel)

# Websocket update clients
def ws_update_existing_players(data):
    Group('player').send({
        'text': json.dumps(data)
    })

# # Websocket update clients
# def ws_update_existing_stream(data_type, data):

#     print("SENDING DATA TYPE: ", data_type)

#     Group('games').send({
#         'text': json.dumps({
#             data_type : data
#         })
#     })

