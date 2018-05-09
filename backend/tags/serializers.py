from rest_framework import serializers

from . import models

class TrainingTagSerializer(serializers.ModelSerializer):
    checked = serializers.BooleanField()
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

class InferenceToTagMapSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    checked = serializers.BooleanField()
    tag = serializers.CharField(max_length=50)
    inference = serializers.IntegerField()
    modifier = serializers.IntegerField()

    