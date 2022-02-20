from django.http import HttpResponse, FileResponse, Http404
from zipfile import ZipFile
from geo.Geoserver import Geoserver
import rasterio
import os
from pathlib import Path
import tempfile
import shutil
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework.response import Response
from osgeo import gdal, ogr
import geopandas as gpd
from .models import *
from .serializer import *

BASE_DIR = Path(__file__).resolve().parent.parent
base = str(BASE_DIR).replace('\\', '/')
geo = Geoserver('http://localhost:8080/geoserver', username='admin', password='geoserver')

def shapefile(file, file_name):
    dirpath = tempfile.mkdtemp()
    shp_file = f'{dirpath}/{file_name}.shp'
    file.to_file(driver='ESRI Shapefile', filename=shp_file)
    def get_all_file_paths(directory):
        file_paths = []
        for root, directories, files in os.walk(directory):
            for filename in files:
                filepath = os.path.join(root, filename)
                file_paths.append(filepath)
        return file_paths
    file_paths = get_all_file_paths(dirpath)
    zip_path = f'{base}/media/dataprep/{file_name}.zip'
    with ZipFile(zip_path,'w') as zip:
        for file in file_paths:
            zip.write(file)
        shutil.rmtree(dirpath)
    return zip_path

class ClipVectorViewSet(viewsets.ModelViewSet):
    queryset = ClipVector.objects.all()
    serializer_class = ClipVectorSerializer
    parsers = (MultiPartParser, FormParser)

    def get_queryset(self):
        return ClipVector.objects.all()
    
    def create(self, request):
        input_vector = request.FILES.get('input_vector')
        input_polygon = request.FILES.get('input_polygon')
        file_name = request.data.get('file_name').split('.')[0]
        input_vector = gpd.read_file(input_vector)
        input_polygon = gpd.read_file(input_polygon)
        output_vector = gpd.clip(input_vector, input_polygon)
        file_path = shapefile(output_vector, file_name+'_clipped')
        ClipVector.objects.create(name=file_name, file_name=file_name+'_clipped.zip', file='dataprep/clipvector/'+file_name+'_clipped.zip')
        geo.create_shp_datastore(store_name=file_name+'_clipped', path=file_path, workspace='sawp')
        vector = ClipVector.objects.all()
        serializers = ClipVectorSerializer(vector, many=True)
        return Response(serializers.data)
    
    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = ClipVector.objects.get(pk=pk)
        name = instance.name
        geo.delete_layer(name, workspace='sawp')
        instance.delete()
        return Response(status=204)

# Clip Vector
@api_view(['GET','POST'])
def clip_vector(request):
    """
    Clips a vector using a polygon
    """
    # # Get the input data
    input_vector = request.FILES.get('input_vector')
    input_polygon = request.FILES.get('input_polygon')
    # # Load the input data
    input_vector = gpd.read_file(input_vector)
    input_polygon = gpd.read_file(input_polygon)
    # Clip the data using GeoPandas clip
    output_vector = gpd.clip(input_vector, input_polygon)
    # Save the output data
    dirpath = tempfile.mkdtemp()
    path = f'{dirpath}/{input_vector.name}_clipped.shp'
    output_vector.to_file(path)
    # Return the output
    return download(path)

# Clip Raster
@api_view(['GET','POST'])
def clip_raster(request):
    """
    Clips a raster using a polygon
    """
    # # Get the input data
    # input_raster = request.GET.get('input_raster')
    # input_polygon = request.GET.get('input_polygon')
    # # Load the input data
    # input_raster = gpd.read_file(input_raster)
    # input_polygon = gpd.read_file(input_polygon)
    # # Clip the raster
    # output_raster = input_raster.clip(input_polygon)
    # # Save the output data
    # output_raster.to_file(input_raster.name + '_clipped.tif')
    # # Return the output
    # return HttpResponse(output_raster.name + '_clipped.tif')
    return HttpResponse('Clip Raster')

# Merge Vector
@api_view(['GET','POST'])
def merge_vectors(request):
    """
    Merges multiple vectors into a single vector
    """
    # Get the input data
    input_vectors = request.FILES.get('file')
    # Load the input data
    input_vectors = gpd.read_file(input_vectors)
    # Merge the vectors
    # output_vector = gpd.GeoDataFrame(pd.concat([input_vectors]))
    # # Save the output data
    # output_vector.to_file(input_vectors.name + '_merged.shp')
    # # Return the output
    # return HttpResponse(output_vector.name + '_merged.shp')
    return HttpResponse('Merge Vector')

# Buffer Vector
@api_view(['GET','POST'])
def buffer_vector(request):
    """
    Buffers a vector using a distance
    """
    input_vector = request.FILES.get('file')
    input_vector = gpd.read_file(input_vector)
    distance = request.POST.get('buffer')
    buffer_distance = float(distance)*(0.001/111)
    gs = input_vector.geometry.buffer(buffer_distance)
    gdf = gpd.GeoDataFrame(geometry=gs)
    gdf = gdf.set_crs('epsg:4326')
    dirpath = tempfile.mkdtemp()
    # shutil.rmtree(dirpath)
    shp_file = f'{dirpath}/fuel.shp'
    gdf.to_file(driver='ESRI Shapefile', filename=shp_file)
    def get_all_file_paths(directory):
        file_paths = []
        for root, directories, files in os.walk(directory):
            for filename in files:
                filepath = os.path.join(root, filename)
                file_paths.append(filepath)
        return file_paths
    file_paths = get_all_file_paths(dirpath)
    zip_path = f'{dirpath}/fuel.zip'
    with ZipFile(zip_path,'w') as zip:
        for file in file_paths:
            zip.write(file)
    if os.path.exists(zip_path):
        print('Working')
        return FileResponse(open(zip_path, 'rb'), as_attachment=True)
    else:
        raise Http404

# Vector to Raster
@api_view(['GET','POST'])
def vector_to_raster(request):
    """
    Converts a vector to a raster
    """
    # # Get the input data
    # input_vector = request.GET.get('input_vector')
    # input_raster = request.GET.get('input_raster')
    # # Load the input data
    # input_vector = gpd.read_file(input_vector)
    # input_raster = gpd.read_file(input_raster)
    # # Convert the vector to raster
    # output_raster = input_vector.to_crs(input_raster.crs)
    # # Save the output data
    # output_raster.to_file(input_vector.name + '_raster.tif')
    # # Return the output
    # return HttpResponse(output_raster.name + '_raster.tif')
    fd, path = tempfile.mkstemp(suffix='.sld')
    return HttpResponse('Vector to Raster')

# Raster to Vector
@api_view(['GET','POST'])
def raster_to_vector(request):
    """
    Converts a raster to a vector
    """
    geo = rasterio.features.dataset_features(rasterio.open(request.FILES.get('file')))
    print(geo)
    # sourceRaster = gdal.Open('myraster.tif')
    # band = sourceRaster.GetRasterBand(1)
    # bandArray = band.ReadAsArray()
    # outShapefile = "polygonized"
    # driver = ogr.GetDriverByName("ESRI Shapefile")
    # if os.path.exists(outShapefile+".shp"):
    #     driver.DeleteDataSource(outShapefile+".shp")
    # outDatasource = driver.CreateDataSource(outShapefile+ ".shp")
    # outLayer = outDatasource.CreateLayer("polygonized", srs=None)
    # newField = ogr.FieldDefn('MYFLD', ogr.OFTInteger)
    # outLayer.CreateField(newField)
    # gdal.Polygonize(band, None, outLayer, 0, [], callback=None )
    # outDatasource.Destroy()
    # sourceRaster = None
    return HttpResponse('Raster to Vector')

# Vector to Shapefile
@api_view(['GET','POST'])
def vector_to_shapefile(request):
    '''
    Converts a vector file to a shapefile.
    '''
    # Open the vector file
    # vector = ogr.Open(vector_path)
    # # Get the layer
    # layer = vector.GetLayer()
    # # Create the shapefile
    # driver = ogr.GetDriverByName('ESRI Shapefile')
    # shapefile = driver.CreateDataSource(shapefile_path)
    # # Create the layer
    # layer_defn = layer.GetLayerDefn()
    # shapefile_layer = shapefile.CreateLayer(layer_defn.GetName(), layer_defn.GetSpatialRef(), layer_defn.GetGeomType())
    # # Add the fields
    # for i in range(layer_defn.GetFieldCount()):
    #     field_defn = layer_defn.GetFieldDefn(i)
    #     shapefile_layer.CreateField(field_defn)
    # # Add the features
    # for i in range(layer.GetFeatureCount()):
    #     feature = layer.GetFeature(i)
    #     shapefile_feature = ogr.Feature(shapefile_layer.GetLayerDefn())
    #     for j in range(feature.GetFieldCount()):
    #         shapefile_feature.SetField(feature.GetFieldDefnRef(j).GetNameRef(), feature.GetField(j))
    #     shapefile_feature.SetGeometry(feature.GetGeometryRef())
    #     shapefile_layer.CreateFeature(shapefile_feature)
    # # Close the shapefile
    # shapefile.Destroy()
    # # Close the vector file
    # vector.Destroy()
    return HttpResponse('Vector to Shapefile')

# Shapefile to Geojson
@api_view(['GET','POST'])
def shapefile_to_geojson(request):
    '''
    Converts a shapefile to a geojson file.
    '''
    file_name = request.data.get('file_name').split('.')[0]
    input_vector = request.FILES.get('file')
    input_vector = gpd.read_file(input_vector)
    dirpath = tempfile.mkdtemp()
    path = f'{dirpath}/{file_name}.geojson'
    file_path = f"{base}/media/data/{file_name}.geojson"
    ShapefileToGeojson.objects.create(name=file_name, file=file_path)
    return HttpResponse('Shapefile to Geojson')

# 
@api_view(['GET','POST'])
def polygon_to_point(request):
    '''
    Converts a polygon to point file.
    '''
    # polys = gpd.read_file("polygons.shp")
    # # copy GeoDataFrame
    # points = polys.copy()
    # # change geometry 
    # points['geometry'] = points['geometry'].centroid
    file_name = request.data.get('file_name').split('.')[0]
    input_vector = request.FILES.get('file')
    input_vector = gpd.read_file(input_vector)
    dirpath = tempfile.mkdtemp()
    path = f'{dirpath}/{file_name}.geojson'
    file_path = f"{base}/media/data/{file_name}.geojson"
    input_vector.to_file(file_path, driver='GeoJSON')
    return download(path)

def download(file_path):
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), as_attachment=True)
    else:
        raise Http404

# import lidario as lio

# translator = lio.Translator("geotiff", "csv")
# translator.translate("/path/to/file.tif", out_file='output.csv', no_data=0, band=1)