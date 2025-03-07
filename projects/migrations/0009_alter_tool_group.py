# Generated by Django 4.2.15 on 2024-10-04 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_tool_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tool',
            name='group',
            field=models.CharField(choices=[('FE', 'Frontend'), ('BE', 'Backend'), ('FS', 'Fullstack'), ('DC', 'DevOps and Cloud Computing'), ('DB', 'Databases')], default='FS', max_length=2),
        ),
    ]
