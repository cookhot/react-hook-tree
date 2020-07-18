import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { stratify } from 'd3-hierarchy'
import { HierarchyNode, HierarchyPointNode } from 'd3-hierarchy'
import Cluster from './shape/cluster'
import Box from './components/box'
import './assets/css/index.css'

interface TNode {
    id: string;
    parentId: string;
}

const table: TNode[] = [
    { "id": "Eve", "parentId": "" },
    { "id": "Cain", "parentId": "Eve" },
    { "id": "Cain1", "parentId": "Cain"},
    { "id": "Seth", "parentId": "Eve" },
    { "id": "Enos", "parentId": "Seth" },
    { "id": "Noam", "parentId": "Seth" },
    { "id": "Enos1", "parentId": "Seth" },
    { "id": "Noam2", "parentId": "Seth" },
    { "id": "Abel", "parentId": "Eve" },
    { "id": "Awan", "parentId": "Eve" },
    { "id": "Enoch", "parentId": "Awan" },
    { "id": "Azura", "parentId": "Eve" }
];

const root : HierarchyNode<TNode>  = stratify<TNode>().id(v => v.id).parentId(v => v.parentId)(table)

const margin = {
    top: 30,
    bottom: 60,
    left: 30,
    right: 30
}

ReactDOM.render(
    <Cluster root={root} width={800} height={400} margin={margin}
        renderNode={(node: HierarchyPointNode<TNode>) => {
        return (
            <Box x={node.x} y={node.y} margin={{ top: 10, bottom: 10, left: 10, right: 10 }} fill={'transparent'} stroke={'#FF0000'}  key={node.data.id}>
                <text dominantBaseline={'text-before-edge'} textAnchor={'center'} >
                    <tspan>
                        {node.data.id}
                    </tspan>
                </text> 
            </Box>
        )
    }} 
    renderLine={(source, target) => {
        return (
            <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={'#000'} key={`${source.data.id}_${target.data.id}`}/>
        )
    }}
    ></Cluster>,
    document.getElementById('root'))