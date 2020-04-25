import * as React from 'react'
import * as ReactDom from 'react-dom'
import { hierarchy, stratify, cluster } from 'd3-hierarchy'

import TreeContext from './context/TreeContext'

import App from './app'

interface Item {
    id: string,
    parentId: string
}

var table: Item[] = [
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

const root = stratify<Item>().id(v => v.id).parentId( v => v.parentId )(table)

ReactDom.render(<TreeContext.Provider value={root}>
    <App/>
</TreeContext.Provider>, document.getElementById('root'))