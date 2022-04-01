import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ColorPicker from "../common/ColorPicker";
import Select from "react-select";
import {
  CLASSIFICATION_METHODS,
  COLOR_PALETTE,
} from "../common/dataJson";
import FormLabel from "../common/FormLabel";
import { Button } from "react-bootstrap";
import Slider from "../common/Slider";
import { patchStyle, getSld, getStyle } from "../../actions/style";
import CloseWindowBtn from "../common/CloseWindowBtn";

function Style(props) {
  const { opacity, layer } = props;
  const [style_id, setStyleId] = useState(layer.id);
  const [layer_opacity, setLayerOpacity] = useState("");
  const [color_palette, setColorPalette] = useState("");
  const [number_of_class, setNumberOfClass] = useState("");
  const [classification_method, setClassificationMethod] = useState("");

  const dispatch = useDispatch();
  const style = useSelector((state) => state.style?.style);

  useEffect(() => {
    console.log("change")
    console.log(style)
    dispatch(getSld(layer.id));
    dispatch(getStyle(layer.id));
    setStyleId(style?.id)
    setColorPalette(style?.color_palette)
    setClassificationMethod(style?.classification_method)
    setNumberOfClass(style?.number_of_class)
    setLayerOpacity(style?.opacity)
  }, [dispatch, layer.id, style.id, style.opacity, style.color_palette, style.classification_method, style.number_of_class]);

  const onColorPaletteChange = val => {
    setColorPalette(val.value.toString());
    const color_palette = val.value.toString();
    dispatch(patchStyle({ color_palette: color_palette }, style_id));
    dispatch(getSld(layer.id));
    props.setMytime(new Date().getTime());
  };

  const onReverseOrder = () => {
    const id = layer?.id;
    const cpv = color_palette.split(",");
    const reversePalette = {value: cpv?.reverse()};
    setColorPalette(reversePalette.value.toString());
    dispatch(patchStyle({ color_palette: reversePalette.value.toString() }, style_id));
    dispatch(getSld(layer.id));
    props.setMytime(new Date().getTime());
  };

  // const onClassificationMethodChange = (val) => {
  //   const classification_method = val.value;
  //   setClassificationMethod(val);
  //   dispatch(patchStyle({ classification_method: classification_method }, style_id));
  //   dispatch(getSld(layer.id));
  // };

  const onOpacityChange = (val) => {
    props.setOpacity(parseInt(val[0]) / 100);
    dispatch(patchStyle({ opacity: parseInt(val[0]) / 100 }, style_id));
    dispatch(getSld(layer.id));
    // props.setMytime(new Date().getTime());
  };

  const onNumberOfClassChange = (val) => {
    const number_of_class = parseInt(val[0]);
    setNumberOfClass(number_of_class);
    dispatch(patchStyle({ number_of_class: number_of_class }, style_id));
    dispatch(getSld(layer.id));
    props.setMytime(new Date().getTime());
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
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="customSwitch" onClick={e => onReverseOrder()} />
            <label className="custom-control-label" htmlFor={"customSwitch"}></label>
          </div>
        </div>

        {/* <FormLabel className="mb-1 mt-3" name="Method:" />
        <Select
          className="classification_method"
          options={CLASSIFICATION_METHODS}
          name="classification_method"
          value={classification_method}
          onChange={onClassificationMethodChange}
        /> */}

        <FormLabel className="mb-1 mt-3" name="Number of Class:" />
        <Slider
          range={{ min: 2, max: 10 }}
          start={5}
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
