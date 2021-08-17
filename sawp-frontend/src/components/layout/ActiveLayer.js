import React, { useState } from "react";
import { connect } from "react-redux";
import maplayer from "../../../static/img/maplayer.png";
import Options from "../common/Options";
import {
  addActiveLayer,
  addStyleWindow,
  patchActiveLayer,
  patchActiveLayer2,
  styleWindowControl,
  filterWindowControl,
  addBbox,
  updateLayer,
} from "../../../actions/visualization";

import { addStyle, getStyle } from "../../../actions/style";

const ActiveLayer = ({
  layer,
  activeLayer,
  activeLayers2,
  addActiveLayer,
  activeLayers,
  patchActiveLayer,
  patchActiveLayer2,
  styles,
  addStyle,
  getStyle,
  styleWindowControl,
  addBbox,
  filterWindowControl,
  updateLayer,
}) => {
  const [hoverContent, setHoverContent] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [option, setOption] = useState(false);
  const [opacityBtn, setOpacityBtn] = useState(false);

  const onMouseOver = (id) => {
    setHoverContent(true);
    setActiveHover(id);
  };

  const onMouseLeave = (id) => {
    setHoverContent(false);
    setActiveHover(null);
  };

  const onActiveLayerClick = (layer) => {
    addActiveLayer(layer);
  };

  const onLayerEyeButtonClick = (layer) => {
    let l = activeLayers.filter((l) => l.id === layer.id)[0];

    if (l) {
      if (l?.hide) {
        patchActiveLayer({ hide: false }, l.id);
      } else {
        patchActiveLayer({ hide: true }, l.id);
      }
    } else {
      l = activeLayers2.filter((l) => l.id === layer.id)[0];
      console.log("else case", l);
      if (l?.hide) {
        console.log("else vitra if");
        patchActiveLayer2({ hide: false }, l.id);
      } else {
        console.log("else vitra else");
        patchActiveLayer2({ hide: true }, l.id);
      }
    }
  };

  const onSetStyleBtnClick = (layer) => {
    addActiveLayer(layer);
    styleWindowControl(true);
    addStyleWindow({ visWindow: true, ...layer });
    const { layer_name, workspace, geom_type } = layer;

    let _style = styles.filter((s) => s.name === layer.layer_name)[0];

    if (!_style) {
      const style = {
        name: layer_name,
        workspace: workspace,
        geom_type: geom_type,
      };

      addStyle(style);
    }
    _style = styles.filter((s) => s.name === layer.layer_name)[0];
    getStyle(_style?.id);
  };

  const onFilterDataBtnClick = (layer) => {
    addActiveLayer(layer);
    filterWindowControl(true);
  };

  const onOptionTogglerClick = (id) => {
    setOption((prevState) => !prevState);
    setActiveOption(id);
  };

  const onOpacityBtnClick = () => {
    setOpacityBtn((prevState) => !prevState);
  };

  const onZoomToLayerBtnClick = (layer) => {
    const { layer_name, workspace } = layer;

    addBbox({ layer_name, workspace });
  };

  const onOpacityChange = (e, layer) => {
    const newLayer = { ...layer, opacity: e.target.value };
    updateLayer(newLayer);
  };

  console.log({ layer });

  return (
    <>
      <div
        className={`layers ${
          layer.layer_name === activeLayer?.layer_name && "activeLayer"
        }`}
        onMouseOver={() => onMouseOver(layer.id)}
        onMouseLeave={() => onMouseLeave(layer.id)}
        onClick={() => onActiveLayerClick(layer)}
      >
        <span>
          <img src={maplayer} className="img-fluid" />
        </span>{" "}
        {"  "}
        <span>{layer.name}</span>
        {hoverContent && layer.id === activeHover && (
          <span className="float-right position-relative mr-4">
            <i
              className={`fas ${
                layer.hide ? "fa-eye-slash" : "fa-eye"
              } optionToggler pl-3`}
              title="Show/Hide layer"
              data-toggle="tooltip"
              onClick={() => onLayerEyeButtonClick(layer)}
            ></i>

            <i
              className="fas fa-edit optionToggler pl-3"
              title="Edit style"
              data-toggle="tooltip"
              onClick={() => onSetStyleBtnClick(layer)}
            ></i>

            {layer?.geom_type !== "raster" && (
              <i
                className="fas fa-filter optionToggler pl-3"
                title="Filter data"
                data-toggle="tooltip"
                onClick={() => onFilterDataBtnClick(layer)}
              ></i>
            )}

            <i
              className="fas fa-ellipsis-h optionToggler pl-3"
              title="More options"
              data-toggle="tooltip"
              onClick={() => onOptionTogglerClick(layer.id)}
            >
              {option && layer.id === activeOption && (
                <Options
                  layer={layer}
                  onOpacityBtnClick={() => onOpacityBtnClick()}
                  onSetStyleBtnClick={() => onSetStyleBtnClick(layer)}
                  onFilterDataBtnClick={() => onFilterDataBtnClick(layer)}
                  onZoomToLayerBtnClick={() => onZoomToLayerBtnClick(layer)}
                />
              )}
            </i>
          </span>
        )}
      </div>

      {opacityBtn && layer.id === activeOption && (
        <div className="opacity-control">
          {" "}
          <input
            type="range"
            name={layer.layer_name}
            value={layer?.opacity}
            onChange={(e) => onOpacityChange(e, layer)}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  activeLayers: state.visualization.activeLayers,
  activeLayers2: state.visualization.activeLayers2,
  activeLayer: state.visualization.activeLayer,
  style: state.visualization.style,
  styles: state.styles.styles,
  nMaps: state.maps.numberOfMaps,
});

export default connect(mapStateToProps, {
  addActiveLayer,
  patchActiveLayer,
  patchActiveLayer2,
  filterWindowControl,
  addStyleWindow,
  addStyle,
  getStyle,
  styleWindowControl,
  addBbox,
  updateLayer,
})(ActiveLayer);
