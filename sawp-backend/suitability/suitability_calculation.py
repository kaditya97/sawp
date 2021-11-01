from shapely.geometry import mapping
from fiona.io import ZipMemoryFile
import geopandas as gpd
import rioxarray as rxr
from pathlib import Path
from osgeo import gdal
from .models import *

BASE_DIR = Path(__file__).resolve().parent.parent
base = str(BASE_DIR).replace('\\', '/')

def Suitability_calculation(weights=[],clipbound=None):
    weight = []
    for key, value in weights.items():
        weight.append(key)
    vector = Vector.objects.all()
    raster = Raster.objects.all()
    boundary = Boundary.objects.all()
    rasters = []
    boundaries = []
    vectors = []
    rasterized = []
    for r in raster:
        if r.name in weight:
            rasters.append(base + '/media/' + str(r.file))
    for v in vector:
        if v.name in weight:
            vectors.append(base + '/media/' + str(v.file))
    for b in boundary:
        if b.name == clipbound:
            boundaries.append(base + '/media/' + str(b.file))
    boundary_data = open(boundaries[0], 'rb').read()
    with ZipMemoryFile(boundary_data) as zip:
        with zip.open() as src:
            bound = gpd.GeoDataFrame.from_features(src)
    for i in range(len(rasters)):
        rasterized.append(rxr.open_rasterio(rasters[i], masked=True).squeeze())
    m = 0
    for v in vectors:
        vect = open(v, 'rb').read()
        with ZipMemoryFile(vect) as zip:
            with zip.open() as src:
                gdf = gpd.GeoDataFrame.from_features(src)
                gdf = gpd.clip(gdf, bound)
                gs = gdf.geometry.buffer(0.0009)
                gdf = gpd.GeoDataFrame(geometry=gs)
                gdf = gdf.set_crs('epsg:4326')
                shp_file = f'/vsimem/{weight[m]}.shp'
                gdf.to_file(driver='ESRI Shapefile', filename=shp_file)

                pixel_size = 0.0001
                xmin, ymin, xmax, ymax = bound.total_bounds

                tif_file = f'/vsimem/{weight[m]}.tif'

                ds = gdal.Rasterize(tif_file, shp_file, xRes=pixel_size, yRes=pixel_size, 
                                    burnValues=255, outputBounds=[xmin, ymin, xmax, ymax], 
                                    outputType=gdal.GDT_Float32)
                ds = None
                rasterized.append(rxr.open_rasterio(tif_file, masked=True).squeeze())
                m += 1
    overlay = 0
    for i in range(len(rasterized)):
        craster = rasterized[i].rio.clip(bound.geometry.apply(mapping), bound.crs)
        overlay = overlay + craster * weights[weight[i]]
    # overlay = 0 +(0.4 * rasterized[0]) + (0.5 * rasterized[1]) + (0.1 * rasterized[2])
    # overlay = (0.16 * raster1) + (0.28 * raster2) + (0.32 * rasterized_vectors[0]) + (0.24 * rasterized_vectors[1])
    # overlay = overlay.rio.clip(bound.geometry.apply(mapping), bound.crs)
    # overlay = overlay.transpose('variable', 'y', 'x')
    return overlay