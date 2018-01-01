from django.db import models

# Create your models here.

class TVShow(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    seasons = models.IntegerField()
    episodes = models.IntegerField()
    release_date = models.DateTimeField(blank=True, null=True)
    logo = models.ImageField(blank=True, null=True)

    class Meta:
        ordering = ('created',)