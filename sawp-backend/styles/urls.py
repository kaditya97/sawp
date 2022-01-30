from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from .views import StyleViewSet, style, SldStyleViewSet, sldGenerator, getColumnValues

router = routers.DefaultRouter()
router.register('styles', StyleViewSet, 'styleViewSet')
router.register('sldstyle', SldStyleViewSet, 'sldStyleViewSet')

urlpatterns = [
    path('', csrf_exempt(style), name='styles'),
    path('sld_generator/', csrf_exempt(sldGenerator), name='sldGenerator'),
    path('column_values/', getColumnValues, name='getColumnValues'),
]

urlpatterns += router.urls