import React from "react";
import * as palette from "../../static/js/palette";

// To produce the array of value and label
const selectFunction = (inputArray) => {
  return inputArray.map((element) => {
    return { value: element.toLowerCase(), label: element };
  });
};

//Loss type
const loss_type = ["Population", "Value", "Number of objects"];
export const LOSS_TYPE = selectFunction(loss_type);

//Loss computation type
const loss_computation_type = ["With certainty", "Without certainty"];
export const LOSS_COMPUTATION_TYPE = selectFunction(loss_computation_type);

//Risk computation type
const risk_computation_type = ["Single hazard", "Multi hazard"];
export const RISK_COMPUTATION_TYPE = selectFunction(risk_computation_type);

//risk group
const risk_group = [
  "Group 1",
  "Group 2",
  "Group 3",
  "Group 4",
  "Group 5",
  "Group 6",
  "Group 7",
];
export const RISK_GROUP = selectFunction(risk_group);

// Risk Interaction
const interaction = [
  "No interaction",
  "Independent",
  "Compounding",
  "Coupled",
  "Cascading",
  "Conditional",
];

export const INTERACTION = selectFunction(interaction);

export const STYLE_TYPE = ["simple", "categorized", "classified"];

//style name
const style_name = ["OrRd", "PuBu", "BuPu"];
export const STYLE_NAME = selectFunction(style_name);

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

const vul_valid_region = [
  "Americas (North America, South America, Central America, Caribbean)",
  "Asia Pacific (Central & South Asia, Northeastern Asia, Southeastern Asia, Australia and Oceania)",
  "Europe (Northern Europe, Southern Europe, Eastern Europe, Western Europe)",
  "Middle East/Africa (Middle East, Northern Africa, Southern Africa)",
];

export const VUL_VALID_REGION = selectFunction(vul_valid_region);
