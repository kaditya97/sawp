import tempfile
import os
import time
from geoserver.catalog import Catalog
import colorsys
from django.http import JsonResponse
import seaborn as sns
from osgeo import gdal
from pysld.style import StyleSld
from matplotlib.colors import rgb2hex
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Style, SldStyle
from .serializer import StyleSerializer, SldStyleSerializer
from geo.Geoserver import Geoserver
from pg.pg import Pg
from suitability.models import Suitability
import seaborn as sns
from ast import literal_eval
from .support import stringPrepend

from sawp.settings import (
    GEOSERVER_USER, GEOSERVER_URL, GEOSERVER_PASSWORD,
    DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, CONN_STR
)


# cat = Catalog("http://localhost:8080/geoserver/rest/", "admin", "geoserver")
cat = Catalog("{0}/rest/".format(GEOSERVER_URL),
              GEOSERVER_USER, GEOSERVER_PASSWORD)
geo = Geoserver(GEOSERVER_URL, GEOSERVER_USER, GEOSERVER_PASSWORD)
pg = Pg(dbname=DB_NAME, user=DB_USER,
        password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)


class StyleViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer


class SldStyleViewSet(viewsets.ModelViewSet):
    queryset = SldStyle.objects.all()
    serializer_class = SldStyleSerializer

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'staff'):
            organization = self.request.user.staff.organization.name
            workspace = organization.replace(' ', '_').lower()
            serializer.save(workspace=workspace)


def getColumnValues(request):
    table = request.GET.get('table')
    column = request.GET.get('column')
    schema = request.GET.get('schema')

    col_values = pg.get_all_values(column, table, schema, distinct=True)

    return JsonResponse({"column_values": col_values})


def sldGenerator(request):
    style_id = request.GET.get('style_id')

    # First need to run patch function after that only we query the layer
    time.sleep(0.3)
    queryset = SldStyle.objects.get(id=style_id)

    name = queryset.name
    style_type = queryset.style_type
    workspace = queryset.workspace
    attribute_name = queryset.attribute_name
    number_of_class = queryset.number_of_class
    geom_type = queryset.geom_type
    classification_method = queryset.classification_method
    fill_color = queryset.fill_color
    stroke_color = queryset.stroke_color
    stroke_width = queryset.stroke_width
    opacity = queryset.opacity

    _color_palette = queryset.color_palette
    _color_palette = _color_palette.split(',')

    if len(_color_palette) == 1:
        color_palette = _color_palette[0]

    else:
        color_palette = stringPrepend(_color_palette, '#')

    print(number_of_class, 'number-of-class')

    _style = StyleSld(
        style_name=name,
        dbname=DB_NAME, host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD,
        schema=workspace, pg_table_name=name,
        fill_color=fill_color, stroke_color=stroke_color,
        opacity=opacity, stroke_width=stroke_width,
        classification_method=classification_method,
        number_of_class=number_of_class, attribute_name=attribute_name, color_palette=color_palette)

    if geom_type == 'raster':

        '''
        The min_value and max_value need to be calculated
        '''
        layer = Suitability.objects.get(layer_name=name)
        file = layer.file.path
        gtif = gdal.Open(file)
        srcband = gtif.GetRasterBand(1)
        srcband.ComputeStatistics(0)
        N = srcband.GetMaximum() - srcband.GetMinimum() + 1
        min_value = int(srcband.GetMinimum())
        max_value = int(srcband.GetMaximum())
        style = _style.generate_raster_style(max_value, min_value)

    else:
        if style_type == 'categorized':
            style = _style.generate_categorized_style()

        elif style_type == 'classified':
            style = _style.generate_classified_style()

        else:
            style = _style.generate_simple_style()

    fd, path = tempfile.mkstemp(suffix='.sld')

    with open(path, 'w') as f:
        f.write(style)

    try:
        geo.upload_style(path=path, name=name, workspace=workspace)

    except:
        geo.upload_style(path-path, name=name,
                         workspace=workspace, overwrite=True)

    geo.publish_style(layer_name=name, style_name=name, workspace=workspace)

    return HttpResponse(style)

    # style = """
    # <StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" version="1.0.0" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld">
    # <UserLayer>
    #     <sld:LayerFeatureConstraints>
    #     <sld:FeatureTypeConstraint/>
    #     </sld:LayerFeatureConstraints>
    #     <sld:UserStyle>
    #     <sld:Name>agri_final_proj</sld:Name>
    #     <sld:FeatureTypeStyle>
    #         <sld:Rule>
    #         <sld:RasterSymbolizer>
    #             <sld:ChannelSelection>
    #             <sld:GrayChannel>
    #                 <sld:SourceChannelName>1</sld:SourceChannelName>
    #             </sld:GrayChannel>
    #             </sld:ChannelSelection>
    #             <sld:ColorMap type="ramp">
    #                 {}
    #             </sld:ColorMap>
    #         </sld:RasterSymbolizer>
    #         </sld:Rule>
    #     </sld:FeatureTypeStyle>
    #     </sld:UserStyle>
    # </UserLayer>
    # </StyledLayerDescriptor>
    # """.format(fill_color)
    # return HttpResponse(style)


def style(request):

    # getting the inputs from form
    style_type = request.GET.get('style_type')
    file = request.GET.get('file')
    layer_name = request.GET.get('layer_name')
    workspace_name = request.GET.get('workspace')
    palette_input = request.GET.get('palette')

    # Gdal get raster band
    gtif = gdal.Open(file)
    srcband = gtif.GetRasterBand(1)
    srcband.ComputeStatistics(0)
    N = srcband.GetMaximum() - srcband.GetMinimum() + 1
    min = int(srcband.GetMinimum())

    palette = sns.color_palette('RdYlGn', int(N))
    if palette_input:
        palette = sns.color_palette(palette_input, int(N))

    palette_hex = [rgb2hex(i) for i in palette]

    # Style file append portion
    sld_ColorMapEntry = ''
    for i, color in enumerate(palette_hex):
        sld_ColorMapEntry += '<sld:ColorMapEntry color="{}" label="{}" quantity="{}"/>'.format(
            color, min+i, min+i)

    layer = cat.get_layer(layer_name)

    style = """
    <StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" version="1.0.0" xmlns:ogc="http://www.opengis.net/ogc" xmlns:sld="http://www.opengis.net/sld">
    <UserLayer>
        <sld:LayerFeatureConstraints>
        <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
        <sld:Name>agri_final_proj</sld:Name>
        <sld:FeatureTypeStyle>
            <sld:Rule>
            <sld:RasterSymbolizer>
                <sld:ChannelSelection>
                <sld:GrayChannel>
                    <sld:SourceChannelName>1</sld:SourceChannelName>
                </sld:GrayChannel>
                </sld:ChannelSelection>
                <sld:ColorMap type="ramp">
                    {}
                </sld:ColorMap>
            </sld:RasterSymbolizer>
            </sld:Rule>
        </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </UserLayer>
    </StyledLayerDescriptor>
    """.format(sld_ColorMapEntry)

    cat.create_style(
        layer_name, style, workspace=workspace_name, overwrite=True)
    default_style = cat.get_style(layer_name, workspace=workspace_name)

    if layer:
        layer._set_default_style(default_style)
        cat.save(layer)

    return HttpResponse('success')
