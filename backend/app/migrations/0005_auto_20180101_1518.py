# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2018-01-01 15:18
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20180101_1515'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='title',
            new_name='name',
        ),
    ]