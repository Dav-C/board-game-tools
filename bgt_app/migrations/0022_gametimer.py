# Generated by Django 3.1.7 on 2021-04-30 05:09

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0021_player_player_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameTimer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('saved_duration', models.DurationField(null=True)),
                ('tool_session', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='game_timers', to='bgt_app.toolsession')),
            ],
            options={
                'verbose_name': 'Game Timer',
                'verbose_name_plural': 'Game Timers',
            },
        ),
    ]