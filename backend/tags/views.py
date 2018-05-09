from django.shortcuts import render
from django.views.generic import TemplateView
from django.utils.six import BytesIO

from rest_framework import viewsets, views, authentication
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from . import models
from . import serializers


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
    queryset = models.TrainingTags.objects.all()
    serializer_class = serializers.TrainingTagSerializer

    def get_queryset(self):
        inference = self.request.query_params.get('inference')
        modifier = self.request.query_params.get('modifier')

        training_tags = models.TrainingTags.objects.all()
       
        for tag in training_tags:
            if models.InferenceToTagMap.objects.filter(
                    tag_id=tag.pk, 
                    mod_tag_id=modifier, 
                    inferenceTag_id=inference
                ).count() > 0:
                setattr(tag, 'checked', True)
            else:
                setattr(tag, 'checked', False)

        return training_tags


class InferenceToTagMapUpdater(views.APIView):
    authentication_classes = (authentication.TokenAuthentication,)

    def post(self, request, format=None):
        data = request.data
    
        for item in data:
            tag_id = item['id']
            inference_id = item['inference']
            modifier_id = item['modifier']
            checked = item['checked']
            
            if checked:
                training_tags = models.TrainingTags.objects.get(pk=tag_id)
                mod_tag = models.TagModifiers.objects.get(pk=modifier_id)
                inferencetag = models.InferenceTags.objects.get(pk=inference_id)

                inference_tag_map = models.InferenceToTagMap.objects.create(
                    tag_id=training_tags, 
                    mod_tag_id=mod_tag, 
                    inferenceTag_id=inferencetag
                )
                inference_tag_map.save()
            else:
                deleted_obj = models.InferenceToTagMap.objects.get(
                    tag_id=tag_id, 
                    mod_tag_id=modifier_id, 
                    inferenceTag_id=inference_id
                ).delete()
        
        return Response({'Result': True})




