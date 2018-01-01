from django.conf.urls import url
from .views.general_views import index
from .views.tvshow_api_views import TVShowAPI

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^api/tv_show$', TVShowAPI.as_view(), name="api_tv_show"), 
]
