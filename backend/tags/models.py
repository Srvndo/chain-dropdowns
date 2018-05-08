from django.conf import settings
from django.db import models

# Create your models here.
class TrainingTags(models.Model):
    tag = models.CharField(max_length=50, unique=True, null=False, blank=False)

    class Meta:
        verbose_name = 'Training Tag'
        verbose_name_plural = 'Training Tags'

    def __str__(self):
        return self.tag

class InferenceTags(models.Model):
    inference_tag = models.CharField(max_length=50, unique=True, null=False, blank=False)

    class Meta:
        verbose_name = 'Inference Tag'
        verbose_name_plural = 'Inference Tags'

    def __str__(self):
        return self.inference_tag
    
class TagModifiers(models.Model):
    tag_modifier = models.CharField(max_length=50, unique=True, null=False, blank=False)

    class Meta:
        verbose_name = 'Tag Modifier'
        verbose_name_plural = 'Tag Modifiers'

    def __str__(self):
        return self.tag_modifier

class InferenceToTagMap(models.Model):
    tag_id = models.ForeignKey(TrainingTags, on_delete=None)
    mod_tag_id = models.ForeignKey(TagModifiers, on_delete=None)
    inferenceTag_id = models.ForeignKey(InferenceTags, on_delete=None)

    class Meta:
        verbose_name = 'Inference To Tag Map'
        verbose_name_plural = 'Inferences To Tags Map'

    def __str__(self):
        return '{0} - {1} - {2}'.format(
            self.tag_id,
            self.mod_tag_id,
            self.inferenceTag_id
        )
    
