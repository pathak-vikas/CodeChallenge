# Generated by Django 4.0.1 on 2022-01-27 17:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0002_alter_restaurant_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='location',
        ),
    ]
