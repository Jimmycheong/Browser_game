from rest_framework.views import APIView
from ..models import TVShow
from ..serializers import TVShowSerializer
from rest_framework.response import Response

class TVShowAPI(APIView):

    def get(self, request):
        all_shows = TVShow.objects.all()
        serializer = TVShowSerializer(all_shows, many=True)

        return Response(serializer.data)
