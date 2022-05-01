import React from 'react'
import styled from 'styled-components'


const Styles = styled.div`
table {
    font-family: arial, sans-serif;
    color: #000000;
    width: 100%;
  }
  table:first-child th:first-child {
    color: black;
    }
  
  th {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
`

function Weightage(props) {
    const row_cols = JSON.parse(props.array)
    const weights = row_cols.weights
    const weights_keys = Object.keys(weights)
    const consistency_ratio = row_cols.consistency_ratio

    return (
        <div>
            {consistency_ratio > 0.1 ? <h5 style={{color: "red"}}>Consistency Ratio: {consistency_ratio}</h5> : <h5 style={{color: "green"}}>Consistency Ratio: {consistency_ratio}</h5>}
            <Styles>
                <table>
                    <tr>
                        <th>Layers</th>
                        <th>Weights</th>
                    </tr>
                    {weights_keys.map((row, i) => {
                        return (
                            <tr>
                                <td>{row}</td>
                                <td>{weights[row]}</td>
                            </tr>
                        )
                    })}
                </table>
            </Styles>
        </div>
    )
}

export default Weightage;
