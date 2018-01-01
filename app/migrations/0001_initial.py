# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-08 14:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TVShow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, max_length=100)),
                ('category', models.CharField(blank=True, max_length=100)),
                ('seasons', models.IntegerField()),
                ('episodes', models.IntegerField()),
                ('release_date', models.DateTimeField(blank=True)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
