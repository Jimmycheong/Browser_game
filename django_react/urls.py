"""django_react URL Configuration

"""
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include('app.urls'), name='app'),    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
