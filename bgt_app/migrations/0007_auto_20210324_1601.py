# Generated by Django 3.1.7 on 2021-03-24 23:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0006_diestandard_rolled_value'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='diestandard',
            options={'verbose_name': 'Standard Die', 'verbose_name_plural': 'Standard Dice'},
        ),
        migrations.AlterField(
            model_name='diestandard',
            name='die_group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='standard_dice', to='bgt_app.diegroup'),
        ),
    ]
