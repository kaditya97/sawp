import React, { Component } from "react";
import ColorPicker from "../common/ColorPicker";
import Select from "react-select";
import {
  CLASSIFICATION_METHODS,
  COLOR_PALETTE,
  STYLE_TYPE,
} from "../../../defaultJSON/dataJson";
import FormLabel from "../../common/FormLabel";
import { Button, Form } from "react-bootstrap";
import Slider from "../common/Slider";
import { patchStyle, getSld } from "../../../actions/style";
import {
  addStyleWindow,
  styleWindowControl,
} from "../../../actions/visualization";
import ColumnNameDropDown from "../common/ColumnNameDropDown";
import { connect } from "react-redux";
import CloseWindowBtn from "../common/CloseWindowBtn";

class Style extends Component {
  state = {
    name: "",
    style_type: "",
    geom_type: "",
    fill_color: "#d47e22",
    stroke_color: "#1063e8",
    stroke_width: "",
    color_palette: null,
    attribute_name: "",
    opacity: 100,
    number_of_classes: 5,
    trueReverseOrderStyle: "",
    classification_method: "",
    falseReverseOrderStyle: "text-primary",
    styleContainerToggle: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.style.id !== this.props.style.id) {
      const {
        name,
        style_type,
        geom_type,
        fill_color,
        stroke_color,
        stroke_width,
        opacity,
        color_palette,
        number_of_class,
        classification_method,
        attribute_name,
      } = this.props.style;

      this.setState({
        name,
        style_type,
        geom_type,
        fill_color,
        stroke_color,
        stroke_width,
        opacity,
        color_palette,
        number_of_class,
        classification_method,
        attribute_name,
      });
    }
  }

  onChange = (e) => {
    const { id } = this.props.style;
    this.setState({ [e.target.name]: e.target.value });
    this.props.patchStyle({ [e.target.name]: e.target.value }, id);
    this.props.getSld(id);
  };

  onStyleTypeChange = (stype) => {
    const { id } = this.props.style;
    this.setState({ style_type: stype.value });
    this.props.patchStyle({ style_type: stype.value }, id);
    this.props.getSld(id);
  };

  onFillColorChange = (color) => {
    const { id } = this.props.style;
    this.setState({ fill_color: color.hex });
    this.props.patchStyle({ fill_color: color.hex }, id);
    this.props.getSld(id);
  };

  onSaveStyle = () => {
    console.log(this.state);
  };

  onStrokeColorChange = (color) => {
    const { id } = this.props.style;
    this.setState({ stroke_color: color.hex });
    this.props.patchStyle({ stroke_color: color.hex }, id);
    this.props.getSld(id);
  };

  onOutlineWidthChange = (width) => {
    const { id } = this.props.style;
    const stroke_width = parseInt(width[0]);
    this.setState({ stroke_width: stroke_width });
    this.props.patchStyle({ stroke_width: stroke_width }, id);
    this.props.getSld(id);
  };

  onColorPaletteChange = (val) => {
    const { id } = this.props.style;
    this.setState({ color_palette: val });
    const color_palette = val.value.toString();
    this.props.patchStyle({ color_palette: color_palette }, id);
    this.props.getSld(id);
  };

  onTrueReverseOrder = () => {
    const { id } = this.props.style;

    let { color_palette, trueReverseOrderStyle } = this.state;
    const cpv = color_palette?.value;
    const reversePalette = {
      label: color_palette?.label,
      value: cpv?.reverse(),
    };
    console.log(reversePalette, "reversePalette");
    cpv &&
      trueReverseOrderStyle === "" &&
      this.setState({
        color_palette: reversePalette,
        trueReverseOrderStyle: "text-primary",
        falseReverseOrderStyle: "",
      });
    color_palette = reversePalette.value.toString();
    this.props.patchStyle({ color_palette: color_palette }, id);
    this.props.getSld(id);
  };

  onFalseReverseOrder = () => {
    const { id } = this.props.style;

    let { color_palette, falseReverseOrderStyle } = this.state;
    const cpv = color_palette?.value;
    const reversePalette = {
      label: color_palette?.label,
      value: cpv?.reverse(),
    };
    cpv &&
      falseReverseOrderStyle === "" &&
      this.setState({
        color_palette: reversePalette,
        falseReverseOrderStyle: "text-primary",
        trueReverseOrderStyle: "",
      });

    color_palette = reversePalette.value.toString();
    this.props.patchStyle({ color_palette: color_palette }, id);
    this.props.getSld(id);
  };

  onAttributeChange = (val) => {
    const { id } = this.props.style;
    this.setState({ attribute_name: val });
    this.props.patchStyle({ attribute_name: val.value }, id);
    this.props.getSld(id);
  };

  onClassificationMethodChange = (val) => {
    const { id } = this.props.style;
    const classification_method = val.value;
    this.setState({ classification_method: val });
    this.props.patchStyle({ classification_method: classification_method }, id);
    this.props.getSld(id);
  };

  onOpacityChange = (val) => {
    const { id } = this.props.style;
    const opacity = parseInt(val[0]) / 100;
    this.setState({ opacity: opacity });
    this.props.patchStyle({ opacity: opacity }, id);
    this.props.getSld(id);
  };

  onNumberOfClassChange = (val) => {
    const { id } = this.props.style;
    const number_of_class = parseInt(val[0]);
    this.setState({ number_of_class: number_of_class });
    this.props.patchStyle({ number_of_class: number_of_class }, id);
    this.props.getSld(id);
  };

  onFilterData = (val) => {
    console.log(val);
  };

  onCloseWindowBtnClick = () => {
    this.props.styleWindowControl(false);
    this.props.addStyleWindow({ visWindow: false });
  };

  onstyleContainerTogglerClick = (e) => {
    this.setState({
      styleContainerToggle: !this.state.styleContainerToggle,
    });
  };

  render() {
    const {
      style_type,
      geom_type,
      fill_color,
      stroke_color,
      stroke_width,
      opacity,
      color_palette,
      number_of_class,
      trueReverseOrderStyle,
      falseReverseOrderStyle,
      attribute_name,
      classification_method,
      styleContainerToggle,
    } = this.state;

    const { layer_name } = this.props;
    return (
      <div
        className={`leaflet-control ${
          styleContainerToggle ? "styleContainer" : "styleContainer-hide"
        }`}
      >
        <div className="styleContainer-sidebar-overflow">
          <div
            className="leaflet-control styleContainer-sidebar-btn"
            onClick={this.onstyleContainerTogglerClick}
          >
            <i className="fas fa-caret-left"></i>
          </div>
          <CloseWindowBtn onClick={this.onCloseWindowBtnClick} />

          <FormLabel className="mb-1 " name="Select Style type:" />

          {geom_type == "raster" ? (
            <>
              <Form.Control
                as="select"
                custom
                disabled
                onChange={this.onChange}
                name="style_type"
                value="raster"
                className="select-style-type mb-2"
              >
                <option value="raster">Raster</option>
              </Form.Control>

              <FormLabel className="mt-3 mb-1" name="Select color palette:" />
              <Select
                className="select-color-palette"
                options={COLOR_PALETTE}
                value={color_palette}
                onChange={this.onColorPaletteChange}
              />
              <div className="row mb-1 mt-3 reverse-order">
                <div className="col-6">Reverse order:</div>
                <a
                  className={`col-3 ${trueReverseOrderStyle}`}
                  onClick={this.onTrueReverseOrder}
                >
                  True
                </a>
                <a
                  className={`col-3 ${falseReverseOrderStyle}`}
                  onClick={this.onFalseReverseOrder}
                >
                  False
                </a>
              </div>

              <FormLabel className="mb-1 mt-3" name="Number of Class:" />
              <Slider
                range={{ min: 2, max: 30 }}
                start={number_of_class}
                step={1}
                name="number_of_class"
                format=" classes"
                onChange={this.onNumberOfClassChange}
              />
              <hr className="hr" />

              <FormLabel className="mb-1 mt-3" name="Opacity:" />
              <Slider
                range={{ min: 0, max: 100 }}
                start={opacity * 100}
                step={1}
                format="%"
                onChange={this.onOpacityChange}
              />
              <hr className="hr" />

              <FormLabel className="mb-1 mt-3" name="Filter data:" />
              <Slider
                range={{ min: 0, max: 100 }}
                start={[0, 10]}
                step={1}
                format=""
                onChange={this.onFilterData}
              />
              <hr className="hr" />
            </>
          ) : (
            <>
              <Form.Control
                as="select"
                custom
                onChange={this.onChange}
                placeholder="Select style"
                name="style_type"
                value={style_type}
                className="select-style-type mb-2"
              >
                {STYLE_TYPE.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Control>

              {style_type == "categorized" ? (
                <>
                  <FormLabel
                    className="mt-3 mb-1"
                    name="Select color palette:"
                  />
                  <Select
                    className="select-color-palette"
                    options={COLOR_PALETTE}
                    value={color_palette}
                    onChange={this.onColorPaletteChange}
                  />
                  <div className="row mb-1 mt-3 reverse-order">
                    <div className="col-6">Reverse order:</div>
                    <a
                      className={`col-3 ${trueReverseOrderStyle}`}
                      onClick={this.onTrueReverseOrder}
                    >
                      True
                    </a>
                    <a
                      className={`col-3 ${falseReverseOrderStyle}`}
                      onClick={this.onFalseReverseOrder}
                    >
                      False
                    </a>
                  </div>
                  <FormLabel className="mb-1 mt-3" name="Attribute:" />
                  <ColumnNameDropDown
                    name="attribute_name"
                    className="select-attribute"
                    value={attribute_name}
                    table_name={layer_name}
                    style_type={style_type}
                    onChange={this.onAttributeChange}
                  />

                  <FormLabel className="mb-1 mt-3" name="Outline color:" />
                  <ColorPicker
                    color={stroke_color}
                    onChange={this.onStrokeColorChange}
                  />

                  <FormLabel className="mb-1 mt-3" name="Outline width:" />
                  <Slider
                    range={{ min: 0, max: 20 }}
                    start={stroke_width || 1}
                    step={1}
                    format="px"
                    onChange={this.onOutlineWidthChange}
                  />
                  <hr className="hr" />

                  <FormLabel className="mb-1 mt-3" name="Opacity:" />
                  <Slider
                    range={{ min: 0, max: 100 }}
                    start="60"
                    step={1}
                    format="%"
                    onChange={this.onOpacityChange}
                  />
                  <hr className="hr" />

                  <FormLabel className="mb-1 mt-3" name="Filter data:" />
                  <Slider
                    range={{ min: 0, max: 100 }}
                    start={[0, 10]}
                    step={1}
                    format=""
                    onChange={this.onFilterData}
                  />
                  <hr className="hr" />
                </>
              ) : style_type === "classified" ? (
                <>
                  <FormLabel
                    className="mt-3 mb-1"
                    name="Select color palette:"
                  />
                  <Select
                    className="select-color-palette"
                    options={COLOR_PALETTE}
                    value={color_palette}
                    onChange={this.onColorPaletteChange}
                  />

                  <FormLabel className="mb-1 mt-3" name="Attribute:" />
                  <ColumnNameDropDown
                    name="attribute_name"
                    className="select-attribute"
                    value={attribute_name}
                    table_name={layer_name}
                    style_type={style_type}
                    onChange={this.onAttributeChange}
                  />

                  <FormLabel className="mb-1 mt-3" name="Method:" />
                  <Select
                    className="classification_method"
                    options={CLASSIFICATION_METHODS}
                    name="classification_method"
                    value={classification_method}
                    onChange={this.onClassificationMethodChange}
                  />

                  <FormLabel className="mb-1 mt-3" name="Outline color:" />
                  <ColorPicker
                    color={stroke_color}
                    onChange={this.onStrokeColorChange}
                  />

                  <FormLabel className="mb-1 mt-3" name="Number of Class:" />
                  <Slider
                    range={{ min: 2, max: 30 }}
                    start={number_of_class || 5}
                    step={1}
                    format=" classes"
                    onChange={this.onNumberOfClassChange}
                  />
                  <hr className="hr" />

                  <FormLabel className="mb-1 mt-3" name="Outline width:" />
                  <Slider
                    range={{ min: 0, max: 20 }}
                    start={stroke_width || 1}
                    step={1}
                    format="px"
                    onChange={this.onOutlineWidthChange}
                  />
                  <hr className="hr" />

                  <FormLabel className="mb-1 mt-3" name="Opacity:" />
                  <Slider
                    range={{ min: 0, max: 100 }}
                    start="60"
                    step={1}
                    format="%"
                    onChange={this.onOpacityChange}
                  />
                  <hr className="hr" />

                  <FormLabel className="mb-1 mt-3" name="Filter data:" />
                  <Slider
                    range={{ min: 0, max: 100 }}
                    start={[0, 10]}
                    step={1}
                    format=""
                    onChange={this.onFilterData}
                  />
                  <hr className="hr" />
                </>
              ) : (
                <>
                  <FormLabel className="mb-1 mt-3 " name="Select fill color:" />
                  <ColorPicker
                    color={fill_color}
                    onChange={this.onFillColorChange}
                  />

                  <FormLabel
                    className="mb-1 mt-3 "
                    name="Select outline color:"
                  />
                  <ColorPicker
                    color={stroke_color}
                    onChange={this.onStrokeColorChange}
                  />

                  <FormLabel
                    className="mb-1 mt-3"
                    name="Select outline width:"
                  />
                  <Slider
                    range={{ min: 0, "25%": 5, "50%": 10, "75%": 15, max: 20 }}
                    start="1"
                    step={1}
                    format="px"
                    onChange={this.onOutlineWidthChange}
                  />
                  <hr className="hr" />

                  <FormLabel className="mb-1 mt-3" name="Opacity:" />
                  <Slider
                    range={{ min: 0, max: 100 }}
                    start="60"
                    step={1}
                    format="%"
                    onChange={this.onOpacityChange}
                  />
                  <hr className="hr" />
                </>
              )}
            </>
          )}

          {/* save and cancel button  */}
          <Button
            className="float-right"
            variant="primary"
            onClick={this.onSaveStyle}
          >
            {" "}
            Save style{" "}
          </Button>
          <Button
            className="float-right"
            variant="danger"
            onCancel={this.onCancel}
          >
            {" "}
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  layer_name: state.visualization.style?.layer_name,
  style: state.styles.style,
  visWindow: state.visualization.style?.visWindow,
});

export default connect(mapStateToProps, {
  addStyleWindow,
  patchStyle,
  getSld,
  styleWindowControl,
})(Style);
