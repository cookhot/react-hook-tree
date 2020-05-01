import * as React from 'react'
import * as ReactDom from 'react-dom'
import { hierarchy, stratify, cluster, HierarchyNode } from 'd3-hierarchy'
import TreeContext from './context/TreeContext'
import { TNode } from './types/index'

import App from './app'

var table: TNode[] = [
    { "id": "Eve", "parentId": "" },
    { "id": "Cain", "parentId": "Eve" },
    { "id": "Seth", "parentId": "Eve" },
    { "id": "Enos", "parentId": "Seth" },
    { "id": "Noam", "parentId": "Seth" },
    { "id": "Abel", "parentId": "Eve" },
    { "id": "Awan", "parentId": "Eve" },
    { "id": "Enoch", "parentId": "Awan" },
    { "id": "Azura", "parentId": "Eve" }
];

const root = stratify<TNode>().id(v => v.id).parentId( v => v.parentId )(table)

ReactDom.render(<TreeContext.Provider value={root}>
    <App/>
</TreeContext.Provider>, document.getElementById('root'))