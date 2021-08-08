from django.urls import path 
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('project', views.ProjectViewSet, 'project')

urlpatterns = router.urls
