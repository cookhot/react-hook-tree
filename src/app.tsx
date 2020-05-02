import * as React from 'react'
import { useContext } from 'react'
import TreeContext from './context/TreeContext'
import Chart from './components/chart'
import Tree from './components/tree'

export default () => {
    const root = useContext(TreeContext)
    return (
        <Chart width={600} height={400} fill={'#000'} render={(_width, _height) => {
                return (<Tree root={root} width={_width} height={_height}></Tree>)
            }}
        >
        </Chart>
    )
}