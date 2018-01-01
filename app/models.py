from django.db import models

# Create your models here.

PLAYER_STATUS_CHOICES = (
    ('standby', 'Waiting in Lobby'),
    ('ready', "Ready in Lobby"),
    ('in_game', 'Currently in Game'),
)

GAME_SESSION_STATUS_CHOICES = (
    ('standby', 'Awaiting players'),
    ('in_game', 'Game in progress'),
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

    def __str__(self):
        return "%s" % (self.name)

    class Meta:
        ordering = ['created']