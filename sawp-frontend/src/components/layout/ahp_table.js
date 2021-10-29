import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, usePagination } from 'react-table'
import { calcAhp } from '../../actions/ahp'
import { addSuitability } from "../../actions/suitability"


const Styles = styled.div`
  padding: 1rem;

  .disabled {
    pointer-events: none;
    background-color: #e6e6e6!important;
    input{
      background-color: #e6e6e6;
    }
  }

  table {
    border-spacing: 0;
    border: 1px solid black;

    :first-child {
    th{
      :first-child{
        color: white;
      }
    }
    tr {
        td {
          text-align: center;
          :first-child {
            input {
              color: #000;
              font-weight: bold;
              pointer-events: none; // disable pointer events on inputs to prevent blue highlight on hover
            }
          }
        }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        max-width: 100%;
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps([
                  {
                    style: { maxWidth: '50px' },
                  }
                ])}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  if (j === 0) {
                    return <td {...cell.getCellProps({ style: { maxWidth: 150 } })}>{cell.render('Cell')}</td>
                  } else if (j < i + 2) {
                    return <td {...cell.getCellProps({ style: { maxWidth: 150 } })} className="disabled">{cell.render('Cell')}</td>
                  } else {
                    return <td {...cell.getCellProps({ style: { maxWidth: 150 } })}>{cell.render('Cell')}</td>
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}


function Ahp(props) {
  const row_cols = props.array
  row_cols.sort()
  const dataset = () => { return row_cols.map((row) => { return { Header: row, accessor: row } }) }
  const ahp = useSelector(state => state.ahp.ahp)
  const dispatch = useDispatch()
  const initial = [{ Header: '', accessor: 'datas' }]
  const finalArray = initial.concat(dataset())
  const columns = React.useMemo(
    () => finalArray,
    [finalArray]
  )

  const pre = () => {
    const arr = []
    row_cols.forEach((row, i) => {
      const obj = {}
      obj["datas"] = row
      for (let j = 0; j < row_cols.length; j++) {
        if (row === row_cols[j]) {
          obj[row_cols[j]] = 1
        } else if (i < j) {
          obj[row_cols[j]] = 1
        } else {
          obj[row_cols[j]] = ""
        }
      }
      arr.push(obj)
    })
    return arr
  }

  const [data, setData] = React.useState(pre())
  const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

  const resetData = () => setData(originalData)

  const calculateAHP = () => dispatch(calcAhp(data))

  const submitSuitability = () => dispatch(addSuitability(props.sname, props.description, ahp?.weights, props.boundary))

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <div className="row mt-2 d-flex justify-content-center">
        <button className="btn btn-warning ml-3" onClick={resetData}>Reset Data</button>
        <button className="btn btn-primary ml-2" onClick={calculateAHP}>Calculate AHP</button>
      </div>
      <h5>{ahp ? JSON.stringify(ahp) : null}</h5>
      {ahp ? <div className="row mx-5 d-flex justify-content-center mt-2">
        <div className="row mx-5 d-flex justify-content-center mt-2 mb-5">
          <button className="btn btn-success" onClick={() => submitSuitability()}>Calculate Suitability</button>
        </div>
      </div> : null}
    </Styles>
  )
}

export default Ahp;
