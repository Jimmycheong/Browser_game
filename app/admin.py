from django.contrib import admin
from .models import GameSession, Player

class GameSessionAdmin(admin.ModelAdmin):
    list_display = ['title', "get_status_display"]

class PlayerAdmin(admin.ModelAdmin):
    list_display = ['name', 'game_session', "get_status_display"]

admin.site.register(GameSession, GameSessionAdmin)
admin.site.register(Player, PlayerAdmin)
