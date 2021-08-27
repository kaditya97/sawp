import React, { Component } from "react";

class Options extends Component {
  render() {
    const {
      layer,
      onOpacityBtnClick,
      onSetStyleBtnClick,
      onZoomToLayerBtnClick,
      onFilterDataBtnClick,
    } = this.props;
    return (
      <span className="border border-white p-2 options">
        <button
          type="button"
          className="btn btn-dark btn-block"
          onClick={onZoomToLayerBtnClick}
        >
          Zoom to
        </button>
        <button
          type="button"
          className="btn btn-dark btn-block"
          onClick={onOpacityBtnClick}
        >
          Opacity control
        </button>
        <button
          type="button"
          className="btn btn-dark btn-block"
          onClick={onSetStyleBtnClick}
        >
          Set style
        </button>
        {layer?.geom_type !== "raster" && (
          <button
            type="button"
            className="btn btn-dark btn-block"
            onClick={onFilterDataBtnClick}
          >
            Filter data
          </button>
        )}
      </span>
    );
  }
}

export default Options;
