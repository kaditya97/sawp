from django.urls import path 
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('clipvector', views.ClipVectorViewSet, 'clipvector')
router.register('clipraster', views.ClipRasterViewSet, 'clipraster')

urlpatterns = [
    path('mergevectors/', views.merge_vectors, name='mergevectors'),
    path('buffervector/', views.buffer_vector, name='buffervector'),
    path('vectortoraster/', views.vector_to_raster, name='vectortoraster'),
    path('vectortoshapefile/', views.vector_to_shapefile, name='vectortoshapefile'),
    path('shapefiletogeojson/', views.shapefile_to_geojson, name='shapefiletogeojson'),
]

urlpatterns += router.urls