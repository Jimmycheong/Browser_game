# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-02 17:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_gamesession_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='player_session_id',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
