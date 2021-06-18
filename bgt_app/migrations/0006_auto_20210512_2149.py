# Generated by Django 3.1.7 on 2021-05-13 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bgt_app", "0005_auto_20210507_1059"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="drawbagitem",
            options={
                "ordering": ["-drawn_datetime"],
                "verbose_name": "Draw Bag Item",
                "verbose_name_plural": "Draw Bag Items",
            },
        ),
        migrations.AlterField(
            model_name="drawbagitem",
            name="drawn_datetime",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
