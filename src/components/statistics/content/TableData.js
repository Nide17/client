import React from 'react'
import { Table } from 'reactstrap'
import ExcelButton from './ExcelButton'

const TableData = ({ data, filename }) => {

    return (
        <div>
            <ExcelButton data={data} filename={filename} />

            <Table bordered hover responsive size="sm" striped>

                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        {
                            // extract titles from the first object in the array
                            Object.keys(data[0]).map((title, index) => (
                                <th key={index} className="text-uppercase">
                                    {title}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    {index + 1}
                                </th>
                                {
                                    Object.keys(item).map((key, index) => (
                                        <td key={index}>

                                            {typeof item[key] === 'object' ?

                                                // IF IT IS NOT NULL AND IT IS AN ARRAY
                                                Array.isArray(item[key]) ?
                                                    item[key].map((interest, index) => (
                                                        interest.favorite + (index === item[key].length - 1 ? '' : '; ')
                                                    )) :
                                                    // IF IT IS NOT NULL AND IT IS A PURE OBJECT
                                                    item[key] !== null ? item[key].title :

                                                        null :

                                                // IF IS NOT AN OBJECT - STRING, NUMBER, BOOLEAN
                                                item[key]

                                            }
                                        </td>
                                    ))}
                            </tr>
                        ))

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TableData
