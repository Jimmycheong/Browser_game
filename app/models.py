from django.db import models

# Create your models here.

class GameSession(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "%s" % (self.title)

    class Meta:
        ordering = ['-created']

class Player(models.Model):
    game_session = models.ForeignKey(GameSession, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "%s" % (self.name)

    class Meta:
        ordering = ['created']