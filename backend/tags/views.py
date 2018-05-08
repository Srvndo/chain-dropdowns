from django.shortcuts import render
from django.views.generic import TemplateView

from rest_framework import viewsets

from . import models
from . import serializers


# Create your views here.
class IndexView(TemplateView):
    template_name = 'base.html'

class TrainingTagsViewSet(viewsets.ModelViewSet):
    queryset = models.TrainingTags.objects.all()
    serializer_class = serializers.TrainingTagSerializer

class InferenceTagsViewSet(viewsets.ModelViewSet):
    queryset = models.InferenceTags.objects.all()
    serializer_class = serializers.InferenceTagSerializer

class TagModifiersViewSet(viewsets.ModelViewSet):
    queryset = models.TagModifiers.objects.all()
    serializer_class = serializers.TagModifierSerializer

class InferenceToTagMapViewSet(viewsets.ModelViewSet):
    queryset = models.InferenceToTagMap.objects.all()
    serializer_class = serializers.InferenceToTagMapSerializer