from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from .views import StyleViewSet, style, SldStyleViewSet, sldGenerator, getColumnValues

router = routers.DefaultRouter()
router.register('style', StyleViewSet, 'styleViewSet')
router.register('sldstyle', SldStyleViewSet, 'sldStyleViewSet')

urlpatterns = [
    path('', csrf_exempt(style), name='style'),
    path('sld_generator/', csrf_exempt(sldGenerator), name='style'),
    path('column_values/', getColumnValues, name='getColumnValues'),
]

urlpatterns += router.urls