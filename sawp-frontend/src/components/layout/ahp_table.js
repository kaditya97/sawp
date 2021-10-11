import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, usePagination } from 'react-table'
import { calcAhp } from '../../actions/ahp'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
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
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

const row_cols = ["School", "Petrol Station", "Hospital", "Bus park", "Parking"]

function Ahp() {
  const ahp = useSelector(state => state.ahp.ahp)
  const dispatch = useDispatch()
  const columns = React.useMemo(
    () => [
          {
            Header: 'Datas',
            accessor: 'datas',
          },
          {
            Header: 'School',
            accessor: 'school',
          },
          {
            Header: 'Petrol Station',
            accessor: 'petrolStation',
          },
          {
            Header: 'Hospital',
            accessor: 'hospital',
          },
          {
            Header: 'Bus Park',
            accessor: 'busPark',
          },
          {
            Header: 'Parking',
            accessor: 'parking',
          },
    ],
    []
  )

  const preData = [
    {
        "datas": "school",
        "school": 1,
        "petrolStation": 1,
        "hospital": 5,
        "busPark": 2,
        "parking": 6
    },
    {
        "datas": "petrolStation",
        "school": 5,
        "petrolStation": 1,
        "hospital": 5,
        "busPark": 7,
        "parking": 5
    },
    {
        "datas": "hospital",
        "school": 4,
        "petrolStation": 1,
        "hospital": 1,
        "busPark": 7,
        "parking": 5
    },
    {
        "datas": "busPark",
        "school": 3,
        "petrolStation": 5,
        "hospital": 1,
        "busPark": 1,
        "parking": 9
    },
    {
        "datas": "parking",
        "school": 9,
        "petrolStation": 1,
        "hospital": 9,
        "busPark": 3,
        "parking": 1
    }
]

  const [data, setData] = React.useState(preData)
  const [finalData, setFinalData] = React.useState(null)
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

  const showData = () => setFinalData(data)

  const calculateAHP = () => dispatch(calcAhp(data))

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <button onClick={resetData}>Reset Data</button>
      <button onClick={showData}>Show Data</button>
      <button onClick={calculateAHP}>Calculate AHP</button>
      <h5>{JSON.stringify(finalData)}</h5>
      <h5>{JSON.stringify(ahp)}</h5>
    </Styles>
  )
}

export default Ahp;
