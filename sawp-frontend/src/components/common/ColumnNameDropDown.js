import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { getColumns, getNumericColumns } from "../../../actions/dataIndex";

class ColumnNameDropDown extends Component {
  componentDidMount() {
    const { table_name } = this.props;
    this.props.getColumns(table_name);
    this.props.getNumericColumns(table_name);
  }

  componentDidUpdate(prevProps) {
    if (this.props.table_name !== prevProps.table_name) {
      const { table_name } = this.props;
      this.props.getColumns(table_name);
      this.props.getNumericColumns(table_name);
    }
  }

  render() {
    const {
      column_names,
      numeric_column_names,
      style_type,
      name,
      value,
      onChange,
    } = this.props;
    const options = column_names.map((cn) => {
      const opt = numeric_column_names.includes(cn);
      if (opt) {
        return { label: cn, value: cn, classified: false };
      } else {
        return { label: cn, value: cn, classified: true };
      }
    });

    return (
      <>
        {style_type === "categorized" ? (
          <Select
            className="select-attribute"
            options={options}
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <Select
            className="select-attribute"
            options={options}
            name={name}
            value={value}
            onChange={onChange}
            isOptionDisabled={(option) => option.classified}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  column_names: state.dataIndex.column_names,
  numeric_column_names: state.dataIndex.numeric_column_names,
});

export default connect(mapStateToProps, { getColumns, getNumericColumns })(
  ColumnNameDropDown
);
