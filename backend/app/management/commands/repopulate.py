from django.core.management.base import BaseCommand
from app.models import TVShow
from datetime import datetime
from django.utils import timezone

class Command(BaseCommand):
    def handle(self, *args, **options):
        TVShow.objects.all().delete()

        show_1 = TVShow(
            title="Mr. Robot",
            category="drama",
            seasons=2,
            episodes=24,
            logo="mr_robot.jpg"
        )

        show_2 = TVShow(
            title="Stranger Things",
            category="Fantasy",
            seasons=1,
            episodes=8,
            logo="stranger_things.jpeg"
        )

        show_3 = TVShow(
            title="WestWorld",
            category="Fantasy",
            seasons=1,
            episodes=10,
            logo="westworld.jpg"
        )

        show_4 = TVShow(
            title="Rick and Morty",
            category="Fantasy",
            seasons=3,
            episodes=31,
            logo="rick-and-morty.png"
        )

        show_5 = TVShow(
            title="Black Mirror",
            category="Techno-triller",
            seasons=3,
            episodes=13,
            logo="black_mirror.jpg"
        )


        show_1.save()
        show_2.save()
        show_3.save()
        show_4.save()
        show_5.save()
