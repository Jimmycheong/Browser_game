from django.conf.urls import url
from .views.general_views import index
from .views.game_session_api_views import GameSessionAPI
from .views.player_api_views import PlayerAPI

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^api/games$', GameSessionAPI.as_view(), name="game_session_api"),
    url(r'^api/games/(?P<game_title>[a-z0-9\-]+)$', PlayerAPI.as_view(), name="game_session_api"),
]
