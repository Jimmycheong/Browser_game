from rest_framework import serializers
from .models import TVShow

class TVShowSerializer(serializers.ModelSerializer):

    class Meta: 
        model = TVShow
        fields = ('title', 'category', 'seasons', 'episodes', 'release_date', 'logo')

    