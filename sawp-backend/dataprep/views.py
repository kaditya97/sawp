from django.http.response import HttpResponse
from rest_framework.decorators import api_view
from osgeo import gdal, ogr
import geopandas as gpd

# Clip Vector
@api_view(['GET','POST'])
def clip_vector(request):
    """
    Clips a vector using a polygon
    """
    # # Get the input data
    # input_vector = request.GET.get('input_vector')
    # input_polygon = request.GET.get('input_polygon')
    # # Load the input data
    # input_vector = gpd.read_file(input_vector)
    # input_polygon = gpd.read_file(input_polygon)
    # # Clip the vector
    # output_vector = input_vector.clip(input_polygon)
    # # Save the output data
    # output_vector.to_file(input_vector.name + '_clipped.shp')
    # # Return the output
    # return HttpResponse(output_vector.name + '_clipped.shp')
    return HttpResponse('Clip Vector')

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
    # # Get the input data
    # input_vectors = request.GET.get('input_vectors')
    # # Load the input data
    # input_vectors = gpd.read_file(input_vectors)
    # # Merge the vectors
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
    # Get the input data
    input_vector = request.FILES.get('file')
    input_vector = gpd.read_file(input_vector)
    distance = request.POST.get('buffer')
    # Buffer the vector
    output_vector = input_vector.buffer(float(distance))
    # Save the output data
    output_vector.to_file(input_vector.name + '_buffered.shp')
    # # Return the output
    return HttpResponse(output_vector.name + '_buffered.shp')

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
    return HttpResponse('Vector to Raster')

# Raster to Vector
@api_view(['GET','POST'])
def raster_to_vector(request):
    """
    Converts a raster to a vector
    """
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
