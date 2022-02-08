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
  const { opacity, layer } = props;
  const [color_palette, setColorPalette] = useState("");
  const [trueReverseOrderStyle, setTrueReverseOrderStyle] = useState(false);
  const [falseReverseOrderStyle, setFalseReverseOrderStyle] = useState(false);
  const [number_of_class, setNumberOfClass] = useState("");
  const [classification_method, setClassificationMethod] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSld(layer.id));
  }, [dispatch, layer.id]);

  const style = useSelector((state) => state.style?.style);
  console.log('style: ' + style);

  const onColorPaletteChange = (val) => {
    const id = layer?.id;
    setColorPalette(val);
    const color_palette = val.value.toString();
    dispatch(patchStyle({ color_palette: color_palette }, id));
    dispatch(getSld(id));
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
    dispatch(patchStyle({ color_palette: color_palette }, id));
    dispatch(getSld(id));
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

  const onCancel = () => {
    props.setStyleWindow(false);
  };

  const onCloseWindowBtnClick = () => {
    props.setStyleWindow(false);
  };

  const onstyleContainerTogglerClick = () => {
    props.setStyleWindow(!props.styleWindow);
  };

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

        <FormLabel className="mb-1 mt-3" name="Method:" />
        <Select
          className="classification_method"
          options={CLASSIFICATION_METHODS}
          name="classification_method"
          value={classification_method}
          onChange={onClassificationMethodChange}
        />

        <FormLabel className="mb-1 mt-3" name="Number of Class:" />
        <Slider
          range={{ min: 2, max: 30 }}
          start={number_of_class || 5}
          step={1}
          format=" classes"
          onUpdate={onNumberOfClassChange}
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
