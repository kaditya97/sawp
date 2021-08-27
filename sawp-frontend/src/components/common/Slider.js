import React, { Component } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class Slider extends Component {
  render() {
    const { onChange, range, start, step, format } = this.props;
    return (
      <Nouislider
        range={range}
        start={start}
        step={step}
        connect={true}
        onChange={onChange}
        tooltips={true}
        pips={{
          mode: "range",
          density: 3,
        }}
        format={{
          from: Number,
          to: function (value) {
            return parseInt(value) + format;
          },
        }}
      />
    );
  }
}

export default Slider;
