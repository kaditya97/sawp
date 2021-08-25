from shapely.geometry import mapping
from fiona.io import ZipMemoryFile
from geocube.api.core import make_geocube
import geopandas as gpd
import rioxarray as rxr
from .models import *

def Suitability_calculation():
    vector = Vector.objects.all()
    raster = Raster.objects.all()
    boundary = Boundary.objects.all()
    rasters = []
    boundaries = []
    vectors = []
    rasterized_vectors = []
    for r in raster:
        rasters.append('D:/project/sawp/sawp-backend/media/' + str(r.file))
    for v in vector:
        vectors.append('D:/project/sawp/sawp-backend/media/' + str(v.file))
    for b in boundary:
        boundaries.append('D:/project/sawp/sawp-backend/media/' + str(b.file))
    for v in vectors:
        vect = open(v, 'rb').read()
        with ZipMemoryFile(vect) as zip:
            with zip.open() as src:
                gdf = gpd.GeoDataFrame.from_features(src)
                gs = gdf.geometry.buffer(0.0009)
                gdf = gpd.GeoDataFrame(geometry=gs)
                gdf["raw"]=1
                out_grid = make_geocube(vector_data=gdf,measurements=["raw"],resolution=(-0.0001, 0.0001),).to_array()
                rasterized_vectors.append(out_grid)
    raster1 = rxr.open_rasterio(rasters[0], masked=True).squeeze()
    raster2 = rxr.open_rasterio(rasters[1], masked=True).squeeze()
    boundary_data = open(boundaries[0], 'rb').read()
    with ZipMemoryFile(boundary_data) as zip:
        with zip.open() as src:
            gdf = gpd.GeoDataFrame.from_features(src)
    overlay = (0.4 * raster1) + (0.6 * raster2)
    # overlay = (0.16 * raster1) + (0.28 * raster2) + (0.32 * rasterized_vectors[0]) + (0.24 * rasterized_vectors[1])
    overlay = overlay.rio.clip(gdf.geometry.apply(mapping), gdf.crs)
    return overlay