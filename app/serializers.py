from rest_framework import serializers
from .models import GameSession, Player

class GameSessionSerializer(serializers.ModelSerializer):

    class Meta: 
        model = GameSession
        fields = ('title',)

class PlayerSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Player
        fields = ('name', "status")

    