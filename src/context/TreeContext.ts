import * as React from 'react'

// 定义好节点
interface Node {
    name: string
}

// 定义好树的接口
interface Tree {
    root?: Node
}


export default React.createContext(null)