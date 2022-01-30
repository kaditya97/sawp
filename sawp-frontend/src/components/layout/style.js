import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorPicker from "../common/ColorPicker";
import Select from "react-select";
import {
  CLASSIFICATION_METHODS,
  COLOR_PALETTE,
  STYLE_TYPE,
} from "../common/dataJson";
import FormLabel from "../common/FormLabel";
import { Button, Form } from "react-bootstrap";
import Slider from "../common/Slider";
import { patchStyle, getSld } from "../../actions/style";
// import {
//   addStyleWindow,
//   styleWindowControl,
// } from "../../../actions/visualization";
// import ColumnNameDropDown from "../common/ColumnNameDropDown";
import CloseWindowBtn from "../common/CloseWindowBtn";

function Style(props) {
  console.log("working")
  const { opacity, layer } = props;
  const [style_type, setStyleType] = useState("");
  const [geom_type, setGeomType] = useState("");
  const [color_palette, setColorPalette] = useState("");
  const [stroke_color, setStrokeColor] = useState("");
  const [stroke_width, setStrokeWidth] = useState("");
  const [trueReverseOrderStyle, setTrueReverseOrderStyle] = useState(false);
  const [falseReverseOrderStyle, setFalseReverseOrderStyle] = useState(false);
  const [number_of_class, setNumberOfClass] = useState("");
  const [class_name, setClassName] = useState("");
  // const [attribute_name, setAttributeName] = useState("");
  const [fill_color, setFillColor] = useState("");
  const [classification_method, setClassificationMethod] = useState("");
  const [layer_name, setLayerName] = useState(layer?.name);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSld(layer.id));
    dispatch(patchStyle({},layer.id));
  }, [dispatch, layer.id]);

  // const { name,
    // style_type,
    // geom_type,
    // fill_color,
    // stroke_color,
    // stroke_width,
    // opacity,
    // color_palette,
    // number_of_class,
    // classification_method,
    // attribute_name, } = useSelector((state) => state.style.style);
    const style = useSelector((state) => state.style?.style);
    console.log(style);

  const onChange = (e) => {
    const id = layer?.id;
    setStyleType(e.target.value);
    dispatch(patchStyle({ "style_type": e.target.value }, id));
    dispatch(getSld(id));
  };

  const onStyleTypeChange = (stype) => {
    const id = layer?.id;
    setStyleType(stype.value);
    dispatch(patchStyle({ style_type: stype.value }, id));
    dispatch(getSld(id));
  };

  const onFillColorChange = (color) => {
    const id = layer?.id;
    setFillColor(color.hex);
    patchStyle({ fill_color: color.hex }, id);
    getSld(id);
  };

  const onSaveStyle = () => {
    console.log(this.state);
  };

  const onStrokeColorChange = (color) => {
    const id = layer?.id;
    setStrokeColor(color.hex);
    patchStyle({ stroke_color: color.hex }, id);
    getSld(id);
  };

  const onOutlineWidthChange = (width) => {
    const id = layer?.id;
    const stroke_width = parseInt(width[0]);
    setStrokeWidth(stroke_width);
    patchStyle({ stroke_width: stroke_width }, id);
    getSld(id);
  };

  const onColorPaletteChange = (val) => {
    const id = layer?.id;
    setColorPalette(val);
    const color_palette = val.value.toString();
    patchStyle({ color_palette: color_palette }, id);
    getSld(id);
  };

  const onTrueReverseOrder = () => {
    const id = layer?.id;

    let { color_palette, trueReverseOrderStyle } = this.state;
    const cpv = color_palette?.value;
    const reversePalette = {
      label: color_palette?.label,
      value: cpv?.reverse(),
    };
    console.log(reversePalette);
    cpv &&
      trueReverseOrderStyle === "" &&
      this.setState({
        color_palette: reversePalette,
        trueReverseOrderStyle: "text-primary",
        falseReverseOrderStyle: "",
      });
    color_palette = reversePalette.value.toString();
    props.patchStyle({ color_palette: color_palette }, id);
    props.getSld(id);
  };

  const onFalseReverseOrder = () => {
    const id = layer?.id;

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
    dispatch(patchStyle({ color_palette: color_palette }, id));
    dispatch(getSld(id));
  };

  const onAttributeChange = (val) => {
    const id = layer?.id;
    this.setState({ attribute_name: val });
    patchStyle({ attribute_name: val.value }, id);
    getSld(id);
  };

  const onClassificationMethodChange = (val) => {
    const id = layer?.id;
    const classification_method = val.value;
    setClassificationMethod(val);
    dispatch(patchStyle({ classification_method: classification_method }, id));
    dispatch(getSld(id));
  };

  const onOpacityChange = (val) => {
    const id = layer?.id;
    props.setOpacity(parseInt(val[0]) / 100);
    dispatch(patchStyle({ opacity: parseInt(val[0]) / 100 }, id));
    dispatch(getSld(id));
  };

  const onNumberOfClassChange = (val) => {
    const id = layer?.id;
    const number_of_class = parseInt(val[0]);
    setNumberOfClass(number_of_class);
    dispatch(patchStyle({ number_of_class: number_of_class }, id));
    dispatch(getSld(id));
  };

  const onFilterData = (val) => {
    console.log(val);
  };

  const onCancel = () => {
    props.setStyleContainerToogle(false);
  };

  const onCloseWindowBtnClick = () => {
    props.setStyleWindow(false);
    // props.addStyleWindow({ visWindow: false });
  };

  const onstyleContainerTogglerClick = () => {
    props.setStyleWindow(!props.styleWindow);
  };
  const handleChange = (e) => {
    props.setStyle(e.target.value)
  }

  return (
    <div
      className={`leaflet-control ${props.styleWindow ? "styleContainer" : "styleContainer-hide"
        }`}
    >
      <div className="styleContainer-sidebar-overflow">
        <div
          className="leaflet-control styleContainer-sidebar-btn"
          onClick={onstyleContainerTogglerClick}
        >
          <i className="fas fa-caret-left"></i>
        </div>
        <CloseWindowBtn onClick={onCloseWindowBtnClick} />
        <FormLabel className="mb-1 " name="Select Style type:" />

        {geom_type === "raster" ? (
          <>
            <Form.Control
              as="select"
              custom
              disabled
              onChange={onChange}
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
              onChange={onColorPaletteChange}
            />
            <div className="row mb-1 mt-3 reverse-order">
              <div className="col-6">Reverse order:</div>
              <a
                className={`col-3 ${trueReverseOrderStyle}`}
                onClick={onTrueReverseOrder}
                href="/"
              >
                True
              </a>
              <a
                className={`col-3 ${falseReverseOrderStyle}`}
                onClick={onFalseReverseOrder}
                href="/"
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
              onChange={onNumberOfClassChange}
            />
            <hr className="hr" />

            <FormLabel className="mb-1 mt-3" name="Opacity:" />
            <Slider
              range={{ min: 0, max: 100 }}
              start={opacity * 100}
              format="%"
              onUpdate={onOpacityChange}
            />
            <hr className="hr" />

            <FormLabel className="mb-1 mt-3" name="Filter data:" />
            <Slider
              range={{ min: 0, max: 100 }}
              start={[0, 10]}
              step={1}
              format=""
              onChange={onFilterData}
            />
            <hr className="hr" />
          </>
        ) : (
          <>
            <Form.Control
              as="select"
              custom
              onChange={onChange}
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

            {style_type === "categorized" ? (
              <>
                <FormLabel
                  className="mt-3 mb-1"
                  name="Select color palette:"
                />
                <Select
                  className="select-color-palette"
                  options={COLOR_PALETTE}
                  value={color_palette}
                  onChange={onColorPaletteChange}
                />
                <div className="row mb-1 mt-3 reverse-order">
                  <div className="col-6">Reverse order:</div>
                  <a
                    className={`col-3 ${trueReverseOrderStyle}`}
                    onClick={onTrueReverseOrder}
                    href="/"
                  >
                    True
                  </a>
                  <a
                    className={`col-3 ${falseReverseOrderStyle}`}
                    onClick={onFalseReverseOrder}
                    href="/"
                  >
                    False
                  </a>
                </div>
                <FormLabel className="mb-1 mt-3" name="Attribute:" />
                {/* <ColumnNameDropDown
                    name="attribute_name"
                    className="select-attribute"
                    value={attribute_name}
                    table_name={layer_name}
                    style_type={style_type}
                    onChange={onAttributeChange}
                  /> */}

                <FormLabel className="mb-1 mt-3" name="Outline color:" />
                <ColorPicker
                  color={stroke_color}
                  onChange={onStrokeColorChange}
                />

                <FormLabel className="mb-1 mt-3" name="Outline width:" />
                <Slider
                  range={{ min: 0, max: 20 }}
                  start={stroke_width || 1}
                  step={1}
                  format="px"
                  onChange={onOutlineWidthChange}
                />
                <hr className="hr" />

                <FormLabel className="mb-1 mt-3" name="Opacity:" />
                <Slider
                  range={{ min: 0, max: 100 }}
                  start="100"
                  format="%"
                  onUpdate={onOpacityChange}
                />
                <hr className="hr" />

                <FormLabel className="mb-1 mt-3" name="Filter data:" />
                <Slider
                  range={{ min: 0, max: 100 }}
                  start={[0, 10]}
                  step={1}
                  format=""
                  onChange={onFilterData}
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
                  onChange={onColorPaletteChange}
                />

                <FormLabel className="mb-1 mt-3" name="Attribute:" />
                {/* <ColumnNameDropDown
                    name="attribute_name"
                    className="select-attribute"
                    value={attribute_name}
                    table_name={layer_name}
                    style_type={style_type}
                    onChange={onAttributeChange}
                  /> */}

                <FormLabel className="mb-1 mt-3" name="Method:" />
                <Select
                  className="classification_method"
                  options={CLASSIFICATION_METHODS}
                  name="classification_method"
                  value={classification_method}
                  onChange={onClassificationMethodChange}
                />

                <FormLabel className="mb-1 mt-3" name="Outline color:" />
                <ColorPicker
                  color={stroke_color}
                  onChange={onStrokeColorChange}
                />

                <FormLabel className="mb-1 mt-3" name="Number of Class:" />
                <Slider
                  range={{ min: 2, max: 30 }}
                  start={number_of_class || 5}
                  step={1}
                  format=" classes"
                  onChange={onNumberOfClassChange}
                />
                <hr className="hr" />

                <FormLabel className="mb-1 mt-3" name="Outline width:" />
                <Slider
                  range={{ min: 0, max: 20 }}
                  start={stroke_width || 1}
                  step={1}
                  format="px"
                  onChange={onOutlineWidthChange}
                />
                <hr className="hr" />

                <FormLabel className="mb-1 mt-3" name="Opacity:" />
                <Slider
                  range={{ min: 0, max: 100 }}
                  start="100"
                  format="%"
                  onUpdate={onOpacityChange}
                />
                <hr className="hr" />

                <FormLabel className="mb-1 mt-3" name="Filter data:" />
                <Slider
                  range={{ min: 0, max: 100 }}
                  start={[0, 10]}
                  step={1}
                  format=""
                  onChange={onFilterData}
                />
                <hr className="hr" />
              </>
            ) : (
              <>
                <FormLabel className="mb-1 mt-3 " name="Select fill color:" />
                <ColorPicker
                  color={fill_color}
                  onChange={onFillColorChange}
                />

                <FormLabel
                  className="mb-1 mt-3 "
                  name="Select outline color:"
                />
                <ColorPicker
                  color={stroke_color}
                  onChange={onStrokeColorChange}
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
                  onChange={onOutlineWidthChange}
                />
                <hr className="hr" />

                <FormLabel className="mb-1 mt-3" name="Opacity:" />
                <Slider
                  range={{ min: 0, max: 100 }}
                  start="100"
                  format="%"
                  onUpdate={onOpacityChange}
                />
                <hr className="hr" />
              </>
            )}
          </>
        )}
        <Button
          className="float-right"
          variant="primary"
          onClick={onSaveStyle}
        >
          {" "}
          Save style{" "}
        </Button>
        <Button
          className="float-right"
          variant="danger"
          onCancel={onCancel}
        >
          {" "}
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default Style;
