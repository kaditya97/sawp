from django.urls import path 
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('project', views.ProjectViewSet, 'project')
router.register('raster', views.RasterViewSet, 'raster')
router.register('vector', views.VectorViewSet, 'vector')
router.register('boundary', views.BoundaryViewSet, 'boundary')
router.register('suitability', views.SuitabilityViewSet, 'suitability')

urlpatterns = router.urls
urlpatterns += [path('ahp/', views.calculate_ahp, name='ahp')]