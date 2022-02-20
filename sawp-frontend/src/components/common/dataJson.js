import React from "react";
import * as palette from "../../static/js/palette";

// To produce the array of value and label
const selectFunction = (inputArray) => {
  return inputArray.map((element) => {
    return { value: element.toLowerCase(), label: element };
  });
};

//style
const palette_name = [
  "tol",
  "tol-dv",
  "tol-sq",
  "tol-rainbow",
  "cb-Blues",
  "cb-BuGn",
  "cb-GnBu",
  "cb-Greens",
  "cb-Greys",
  "cb-OrRd",
  "cb-YlOrBr",
  "cb-RdYlGn",
  "cb-Spectral",
  "cb-Set1",
  "cb-Set2",
  "cb-Set3",
  "rainbow",
  "sol-base",
  "sol-accent",
];
export const PALETTE = palette_name.map((p) => {
  return { name: p, color: palette(p, 8) };
});

export const COLOR_PALETTE = PALETTE.map((p) => {
  return {
    label: (
      <div
        style={{
          width: "100%",
          display: "inline-block",
          verticalAlign: "middle",
          padding: "0px 2px",
          background: `linear-gradient(to right, ${p.color.map((c) => {
            return " #" + c;
          })})`,
        }}
      >
        <span>
          <span
            style={{
              color: "rgb(0, 0, 0)",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              padding: "0px 4px",
            }}
          >
            {p.name}
          </span>
        </span>
      </div>
    ),
    value: p.color,
  };
});

//Classification method
const classsification_methods = [
  "Natural break",
  "Quantile",
  "Equal interval",
  "Standard deviation",
  "Geometrical Interval",
];

const classificationFunction = (inputArray) => {
  return inputArray.map((element) => {
    return { value: element.replace(" ", "_").toLowerCase(), label: element };
  });
};

export const CLASSIFICATION_METHODS = classificationFunction(
  classsification_methods
);
