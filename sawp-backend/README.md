## Web platform for suitability analysis
#### python version used 3.8.5


```
pip install virtualenv
```
```
virtualenv venv
```
### for windows
```
venv\Scripts\activate
```
```
pip install -r requirements.txt
```
```
pip install pipwin
```
```
pipwin refresh
```
```
pipwin install -r pipwin_requirements.txt
```
### navigate to 
venv/Lib/site-packages/django/contrib/gis/gdal/libgdal.py

### and add gdal303 or version as shown at 
venv/Lib/site-packages/osgeo/gdal303.dll

```python
elif os.name == 'nt':
    # Windows NT shared libraries
    lib_names = [
        'gdal303', 'gdal302', 'gdal301', 'gdal300',
        'gdal204', 'gdal203', 'gdal202', 'gdal201', 'gdal20',
    ]
```