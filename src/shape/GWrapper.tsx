import * as React from 'react'
import { HierarchyNode } from 'd3-hierarchy'
import Chart from '../components/chart'


function GWrapper<T>(props: { svgRectElements: React.ReactElement[] }) : React.ReactElement {  
    console.log(props.svgRectElements)
    return (
        <svg width={100} height={100}>
        </svg>
        
    )
}

export default GWrapper