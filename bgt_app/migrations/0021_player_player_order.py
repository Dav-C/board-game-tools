# Generated by Django 3.1.7 on 2021-04-30 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0020_auto_20210428_2259'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='player_order',
            field=models.SmallIntegerField(null=True),
        ),
    ]