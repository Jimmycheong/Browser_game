from django.contrib import admin
from .models import TVShow

class TVShowAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'seasons', 'episodes', 'release_date']

admin.site.register(TVShow, TVShowAdmin)
