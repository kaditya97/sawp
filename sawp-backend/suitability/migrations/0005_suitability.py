# Generated by Django 3.2.5 on 2021-08-19 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('suitability', '0004_auto_20210817_1519'),
    ]

    operations = [
        migrations.CreateModel(
            name='Suitability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suitability', models.FloatField()),
                ('suitability_type', models.CharField(max_length=50)),
                ('suitability_comment', models.CharField(max_length=500)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
