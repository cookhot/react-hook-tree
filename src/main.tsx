import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { stratify } from 'd3-hierarchy'
import { HierarchyNode } from 'd3-hierarchy'
import Cluster from './shape/cluster'
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

ReactDOM.render(
    <Cluster root={root} width={800} height={400} renderNode={(data: TNode) => {
        /**
         * 定义自身的渲染节点
         */
        return (
            <text dominantBaseline={'text-before-edge'} textAnchor={'center'} >
                <tspan>
                    {data.id}
                </tspan>
            </text>
        )
    }} />, 
    document.getElementById('root'))