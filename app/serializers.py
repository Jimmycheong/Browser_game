from rest_framework import serializers
from django.apps import apps 

model_game_session =apps.get_model(app_label="app", model_name="GameSession")
model_player =apps.get_model(app_label="app", model_name="Player")

class GameSessionSerializer(serializers.ModelSerializer):

    class Meta: 
        model = model_game_session
        fields = ('id','title', "status",)

class PlayerSerializer(serializers.ModelSerializer):

    class Meta: 
        model = model_player
        fields = ('game_session', 'name', "status",)

    