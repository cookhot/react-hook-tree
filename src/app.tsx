import * as React from 'react'
import { useContext } from 'react'
import TreeContext from './context/TreeContext'
import Chart from './components/chart'



export default () => {
    const tree = useContext(TreeContext)
    return (
        <Chart width={600} height={400} render={(_width, _height) => {
                return null
            }}
        >
        </Chart>
    )
}