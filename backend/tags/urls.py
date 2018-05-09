"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from rest_framework import routers

from . import views

app_name = 'tags'

router = routers.SimpleRouter()
router.register(r'training-tags', views.TrainingTagsViewSet, base_name='training-tags')
router.register(r'inference-tags', views.InferenceTagsViewSet, base_name='inference-tags')
router.register(r'tag-modifier', views.TagModifiersViewSet, base_name='tag-modifier')
router.register(r'inference-to-tag', views.InferenceToTagMapViewSet, base_name='inference-to-tag')
#router.register(r'inference-handler', views.InferenceToTagMapUpdater, base_name='inference-handler')

urlpatterns = [
    path('', views.IndexView.as_view(), name='home'),
    path('updater/', views.InferenceToTagMapUpdater.as_view(), name='updater'),
]

urlpatterns += router.urls