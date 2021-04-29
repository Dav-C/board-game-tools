# Generated by Django 3.1.7 on 2021-04-29 05:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0019_auto_20210422_1828'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='score',
            field=models.FloatField(null=True, validators=[django.core.validators.MinValueValidator(limit_value=-1000), django.core.validators.MaxValueValidator(limit_value=1000)]),
        ),
    ]