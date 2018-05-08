from django.contrib import admin

from . import models
# Register your models here.
admin.site.register(models.TrainingTags)
admin.site.register(models.InferenceTags)
admin.site.register(models.TagModifiers)
admin.site.register(models.InferenceToTagMap)