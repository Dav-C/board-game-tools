# Generated by Django 3.1.7 on 2021-04-21 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0015_auto_20210420_2151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='score',
            field=models.SmallIntegerField(max_length=6, null=True),
        ),
    ]