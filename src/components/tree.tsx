import * as React from 'react'
import { StatelessComponent } from 'react'
import { hierarchy, cluster, HierarchyNode } from 'd3-hierarchy'
import { TNode } from '../types/index'

const Tree: StatelessComponent<{ root: HierarchyNode<TNode>, width: number, height: number}> = (props) => {
    // 计算出根节点数据
    // 需要对数据进行转化
    const root = hierarchy(props.root)
    const { width, height } = props
    root.count()

    // 计算出节点位置
    const clusterNodes = cluster<HierarchyNode<TNode>>().size([width, height])(root)

    const listNodes = clusterNodes.descendants()

    return (
        <g>
            {
                listNodes.map((node) => {
                    return (
                        <text key={node.data.id} x={node.x} y={node.y}>
                            {node.data.id}
                        </text>
                    )
                })
            }
        </g>
    )
}

export default Tree