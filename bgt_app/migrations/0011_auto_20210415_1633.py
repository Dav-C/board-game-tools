# Generated by Django 3.1.7 on 2021-04-15 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0010_scoringcategoryitemsperpoint_scoringcategorypointsperitem_scoringcategorysimple_scoringgroup'),
    ]

    operations = [
        migrations.RenameField(
            model_name='diestandard',
            old_name='die_group',
            new_name='group',
        ),
        migrations.RenameField(
            model_name='resource',
            old_name='resource_group',
            new_name='group',
        ),
        migrations.RenameField(
            model_name='scoringcategoryitemsperpoint',
            old_name='scoring_group',
            new_name='group',
        ),
        migrations.RenameField(
            model_name='scoringcategorypointsperitem',
            old_name='scoring_group',
            new_name='group',
        ),
        migrations.RenameField(
            model_name='scoringcategorysimple',
            old_name='scoring_group',
            new_name='group',
        ),
        migrations.AlterField(
            model_name='scoringcategoryitemsperpoint',
            name='round_up_down',
            field=models.CharField(choices=[('up', 'round up'), ('down', 'round down')], max_length=5),
        ),
    ]