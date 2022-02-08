from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers
from .views import SldStyleViewSet, sldGenerator

router = routers.DefaultRouter()
router.register('sldstyle', SldStyleViewSet, 'sldStyleViewSet')

urlpatterns = [
    path('sld_generator/', csrf_exempt(sldGenerator), name='sldGenerator'),
]

urlpatterns += router.urls