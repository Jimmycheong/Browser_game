from rest_framework.views import APIView
from ..models import GameSession
from ..serializers import GameSessionSerializer
from rest_framework.response import Response
from rest_framework import status

class GameSessionAPI(APIView):

    def get(self, request):
        all_games = GameSession.objects.all()
        serializer = GameSessionSerializer(all_games, many=True)
        return Response(serializer.data)
    

    def post(self, request):

        if len(GameSession.objects.filter(title=request.data['gameName'])) != 0:
            return Response("Game Name already exists. Please choose another one.", status=status.HTTP_400_BAD_REQUEST)

        obj = GameSession(
            status="standby",
            title=request.data['gameName'].lower()
        )
        obj.save()

        return Response("Created new game called {}".format(obj.title), status=status.HTTP_201_CREATED)