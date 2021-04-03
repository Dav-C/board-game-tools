# Generated by Django 3.1.7 on 2021-03-31 22:13

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('bgt_app', '0007_auto_20210324_1601'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResourceGroup',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=40)),
                ('tool_session', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='resource_group', to='bgt_app.toolsession')),
            ],
            options={
                'verbose_name': 'Resource Group',
                'verbose_name_plural': 'Resources Groups',
            },
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('quantity', models.SmallIntegerField(default=0)),
                ('production_modifier', models.SmallIntegerField(default=0)),
                ('resource_group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='resources', to='bgt_app.resourcegroup')),
            ],
            options={
                'verbose_name': 'Resource',
                'verbose_name_plural': 'Resources',
            },
        ),
    ]