from django.urls import path 
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('clipvector', views.ClipVectorViewSet, 'clipvector')
router.register('clipraster', views.ClipRasterViewSet, 'clipraster')
router.register('mergevectors', views.MergeVectorsViewSet, 'mergevectors')
router.register('buffervector', views.BufferVectorViewSet, 'buffervector')
router.register('vectortoraster', views.VectorToRasterViewSet, 'vectortoraster')
router.register('rastertovector', views.RasterToVectorViewSet, 'rastertovector')
router.register('vectortoshapefile', views.VectorToShapefileViewSet, 'vectortoshapefile')
router.register('shapefiletogeojson', views.ShapefileToGeojsonViewSet, 'shapefiletogeojson')
router.register('polygontopoints', views.PolygonToPointsViewSet, 'polygontopoints')

urlpatterns = [
]

urlpatterns += router.urls