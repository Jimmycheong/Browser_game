from django.conf.urls import url
from .views.general_views import index
from .views.game_session_api_views import GameSessionAPI
from .views.player_api_views import PlayerAPI
from .views.player_info_api_view import PlayerInfoAPI

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^api/games$', GameSessionAPI.as_view(), name="game_session_api"),
    url(r'^api/games/new$', GameSessionAPI.as_view(), name="game_session_new_api"),
    url(r'^api/playerInfo$', PlayerInfoAPI.as_view(), name="player_info_api"),
    url(r'^api/games/(?P<game_title>[a-z0-9\-]+)$', PlayerAPI.as_view(), name="player_api"),
]
