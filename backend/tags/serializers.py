from rest_framework import serializers

from . import models

class TrainingTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TrainingTags
        fields = '__all__'
    

class InferenceTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InferenceTags
        fields = '__all__'

class TagModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TagModifiers
        fields = '__all__'

class InferenceToTagMapSerializer(serializers.ModelSerializer):
    checked = serializers.BooleanField()
    class Meta:
        model = models.InferenceToTagMap
        fields = '__all__'
        depth = 1