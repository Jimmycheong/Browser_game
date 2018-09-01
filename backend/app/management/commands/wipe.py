from django.core.management.base import BaseCommand
from app.models import TVShow

class Command(BaseCommand):
    def handle(self, *args, **options):
        TVShow.objects.all().delete()

