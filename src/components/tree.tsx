import * as React from 'react'
import { StatelessComponent } from 'react'
import { hierarchy, cluster, HierarchyNode } from 'd3-hierarchy'
import { TNode } from '../types/index'

const Tree: StatelessComponent<{ root: HierarchyNode<TNode>, width: number, height: number}> = (props) => {
    // 计算出根节点数据
    const root = hierarchy(props.root)
    const { width, height } = props
    root.count()

    // 计算出节点位置
    const clusterNodes = cluster<HierarchyNode<TNode>>().size([width, height])(root)

    // 生成节点列表
    const listNodes = clusterNodes.descendants()

    console.log(listNodes)

    return (
        <g>
            {
                listNodes.map((node) => {
                    return (
                        <text key={node.data.id} x={node.x} y={node.y} textAnchor={'middle'} dominantBaseline={'middle'}>
                            {node.data.id}{node.data.depth}
                        </text>
                    )
                })
            }
        </g>
    )
}

export default Tree