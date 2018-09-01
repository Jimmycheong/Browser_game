'''
Model.py 
'''

from django.db import models
from django.db.models.signals import post_save
from .consumers import ws_update_existing_games

GAME_SESSION_STATUS_CHOICES = (
    ('standby', 'Awaiting players'),
    ('in_game', 'Game in progress'),
)

PLAYER_STATUS_CHOICES = (
    ('standby', 'Waiting in Lobby'),
    ('ready', "Ready in Lobby"),
    ('in_game', 'Currently in Game'),
)

class GameSession(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, choices=GAME_SESSION_STATUS_CHOICES, default="standby")

    def __str__(self):
        return "%s" % (self.title)

    class Meta:
        ordering = ['-created']

class Player(models.Model):

    game_session = models.ForeignKey(GameSession, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, choices=PLAYER_STATUS_CHOICES, default="standby")
    player_session_id = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "%s" % (self.name)

    class Meta:
        ordering = ['-created']


'''
Signals
'''

def broadcastGames(sender, instance, **kwargs):
    from .serializers import GameSessionSerializer
    all_games = sender.objects.all()
    serialized_games = GameSessionSerializer(all_games, many=True)
    ws_update_existing_games(serialized_games.data)
    print("Data sent over via websocket..")

post_save.connect(broadcastGames, sender=GameSession)
