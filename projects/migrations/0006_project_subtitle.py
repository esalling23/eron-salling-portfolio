# Generated by Django 4.2.12 on 2024-05-17 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_alter_category_options_project_is_hidden'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='subtitle',
            field=models.CharField(default='', max_length=400),
            preserve_default=False,
        ),
    ]