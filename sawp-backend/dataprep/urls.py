from django.urls import path 
from . import views

urlpatterns = [
    path('clipvector/', views.clip_vector, name='clipvector'),
    path('clipraster/', views.clip_raster, name='clipraster'),
    path('mergevectors/', views.merge_vectors, name='mergevectors'),
    path('buffervector/', views.buffer_vector, name='buffervector'),
    path('vectortoraster/', views.vector_to_raster, name='vectortoraster'),
    path('vectortoshapefile/', views.vector_to_shapefile, name='vectortoshapefile'),
]