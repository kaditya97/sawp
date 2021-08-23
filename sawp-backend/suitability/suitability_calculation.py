from shapely.geometry import mapping
import geopandas as gpd
import rioxarray as rxr
import zipfile
from .models import *

def Suitability_calculation():
    raster = Raster.objects.all()
    boundary = Boundary.objects.all()
    rasters = []
    boundaries = []
    for r in raster:
        rasters.append('D:/project/sawp/sawp-backend/media/' + str(r.file))
    for b in boundary:
        boundaries.append('D:/project/sawp/sawp-backend/media/' + str(b.file))
    archive = zipfile.ZipFile(boundaries[0], 'r')
    print(archive.namelist())
    school = rxr.open_rasterio(rasters[0], masked=True).squeeze()
    fuel = rxr.open_rasterio(rasters[1], masked=True).squeeze()
    overlay = (0.4 * fuel) + (0.6 * school)
    return overlay