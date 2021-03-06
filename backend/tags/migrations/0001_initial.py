# Generated by Django 2.0.5 on 2018-05-07 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InferenceTags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inference_tag', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='InferenceToTagMap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inferenceTag_id', models.ForeignKey(on_delete=None, to='tags.InferenceTags')),
            ],
        ),
        migrations.CreateModel(
            name='TagModifiers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_modifier', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TrainingTags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='inferencetotagmap',
            name='mod_tag_id',
            field=models.ForeignKey(on_delete=None, to='tags.TagModifiers'),
        ),
        migrations.AddField(
            model_name='inferencetotagmap',
            name='tag_id',
            field=models.ForeignKey(on_delete=None, to='tags.TrainingTags'),
        ),
    ]
