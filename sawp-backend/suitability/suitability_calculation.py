from shapely.geometry import mapping
from fiona.io import ZipMemoryFile
import geopandas as gpd
import rioxarray as rxr
from pathlib import Path
from osgeo import gdal
from .models import *

BASE_DIR = Path(__file__).resolve().parent.parent
base = str(BASE_DIR).replace('\\', '/')

def Suitability_calculation(weights=None,clipbound=None,buffer_distance=100):
    myweights = {}
    wrasters = {}
    wvectors = {}
    for key, value in weights.items():
        w = {}
        w['wname'] = key
        w['wvalue'] = value
        myweights[key] = w
    vector = Vector.objects.all()
    raster = Raster.objects.all()
    boundary = Boundary.objects.all()
    for b in boundary:
        if b.name == clipbound:
            bfile = base + '/media/' + str(b.file)
            with ZipMemoryFile(open(bfile, 'rb').read()) as zip:
                with zip.open() as src:
                    bound = gpd.GeoDataFrame.from_features(src)

    for r in raster:
        wrasters[r.name] = base + '/media/' + str(r.file)
    for v in vector:
        wvectors[v.name] = base + '/media/' + str(v.file)

    for k, v in wrasters.items():
        if k in weights.keys():
            myweights[k]['file'] = rxr.open_rasterio(v, masked=True).squeeze()
    for k, v in wvectors.items():
        if k in weights.keys():
            with ZipMemoryFile(open(v, 'rb').read()) as zip:
                with zip.open() as src:
                    gdf = gpd.GeoDataFrame.from_features(src)
                    gdf = gpd.clip(gdf, bound)
                    calc_buffer_distance = (0.001/111.12)*float(buffer_distance)
                    gs = gdf.geometry.buffer(calc_buffer_distance)
                    gdf = gpd.GeoDataFrame(geometry=gs)
                    gdf = gdf.set_crs('epsg:4326')
                    shp_file = f'/vsimem/{k}.shp'
                    gdf.to_file(driver='ESRI Shapefile', filename=shp_file)

                    pixel_size = 0.0001
                    xmin, ymin, xmax, ymax = bound.total_bounds

                    tif_file = f'/vsimem/{k}.tif'

                    ds = gdal.Rasterize(tif_file, shp_file, xRes=pixel_size, yRes=pixel_size, 
                                        burnValues=255, outputBounds=[xmin, ymin, xmax, ymax], 
                                        outputType=gdal.GDT_Float32)
                    ds = None
                    myweights[k]['file'] = rxr.open_rasterio(tif_file, masked=True).squeeze()
    size = (1000000,1000000)
    for k, v in myweights.items():
        v['file'] = v['file'].rio.clip(bound.geometry.apply(mapping), bound.crs)
        if myweights[k]['file'].rio.shape < size:
            size = myweights[k]['file'].rio.shape  
            matcher = myweights[k]['file'] 
    overlay = 0
    for k, v in myweights.items():
        craster = v['file'].rio.reproject_match(matcher)
        overlay = overlay + craster * v['wvalue']
    overlay = overlay.rio.clip(bound.geometry.apply(mapping), bound.crs)
    return overlay