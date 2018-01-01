from rest_framework.views import APIView
from ..models import GameSession
from ..serializers import GameSessionSerializer
from rest_framework.response import Response

class GameSessionAPI(APIView):

    def get(self, request):
        all_games = GameSession.objects.all()
        serializer = GameSessionSerializer(all_games, many=True)
        return Response(serializer.data)
