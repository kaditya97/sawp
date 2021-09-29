# read raster file and save to postgis
def load_into_PostGIS(connection, image_name):
    with open(image_name, 'rb') as f:
        with connection: # To autocommit/rollback
            with connection.cursor() as cursor:
                cursor.execute("INSERT INTO table_name(rast) VALUES (ST_FromGDALRaster(%s))", (f.read(),))


# open .shp file using ogr from .zip
import os
import os.path
import tempfile
import zipfile

from osgeo import ogr

zip = zipfile.ZipFile('Zoning.zip')
tempdir = tempfile.mkdtemp()

# Copy the zipped files to a temporary directory, preserving names.
for name in zip.namelist():
  data = zip.read(name)
  outfile = os.path.join(tempdir, name)
  f = open(outfile, 'wb')
  f.write(data)
  f.close()

data = ogr.Open(os.path.join(tempdir, 'Zoning.shp'))
# More work here...

# Clean up after ourselves.
for file in os.listdir(tempdir):
  os.unlink(os.path.join(tempdir, file))
os.rmdir(tempdir)

# import shapefile to postgis using ogr
import os.path  
import psycopg2
import osgeo.ogr  
connection = psycopg2.connect("dbname=config('DB_NAME'), user=config('DB_USER'), password=config('DB_PASSWORD'), host=config('DB_HOST'), port=config('DB_PORT')")  
cursor = connection.cursor()  
cursor.execute("DELETE FROM countries")  
srcFile = os.path.join("DISTAL-data", "TM_WORLD_BORDERS-0.3","TM_WORLD_BORDERS-0.3.shp")  
shapefile = osgeo.ogr.Open(srcFile)    
layer = shapefile.GetLayer(0)    
for i in range(layer.GetFeatureCount()):  
    feature = layer.GetFeature(i)  
    name = feature.GetField("NAME").decode("Latin-1")  
    wkt = feature.GetGeometryRef().ExportToWkt()  
    cursor.execute("INSERT INTO countries (name,outline) " +"VALUES (%s, ST_GeometryFromText(%s, " +"4326))", (name.encode("utf8"), wkt))  

connection.commit()  