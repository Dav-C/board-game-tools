# Generated by Django 3.1.7 on 2021-04-23 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0018_auto_20210421_2242'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='scoring_groups',
        ),
        migrations.AddField(
            model_name='scoringgroup',
            name='players',
            field=models.ManyToManyField(blank=True, default=None, related_name='scoring_groups', to='bgt_app.Player'),
        ),
    ]
