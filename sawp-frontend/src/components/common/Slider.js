import React, { Component } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class Slider extends Component {
  render() {
    const { onUpdate, range, start, format } = this.props;
    return (
      <Nouislider
        animate={false}
        range={range}
        start={start}
        connect={true}
        onUpdate={onUpdate}
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
