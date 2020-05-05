import * as React from 'react'
import { StatelessComponent, useMemo, useCallback } from 'react'
import { useTree } from '../hook'
import { hierarchy, cluster, HierarchyNode } from 'd3-hierarchy'
import { scaleBand, scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { TNode } from '../types/index'
import VNode  from './node'

const Tree: StatelessComponent<{ root: HierarchyNode<TNode>, width: number, height: number}> = (props) => {
    const { clusterNode, xScale, yScale } = useTree<TNode>(props.root, props.width, props.height)

    const listNodes = clusterNode.descendants()

    const links = clusterNode.links()

    return (
        <g className={'v-tree'}>
            {   
                // 生成节点
                listNodes.map((node) => {
                    return (
                        <VNode key={node.data.id} x={xScale(node.x)} y={yScale(node.data.depth)} rect={node.rect}
                            render = {() => {
                                return (
                                <text fill={'#000'} textAnchor={'middle'} dominantBaseline={'middle'}> 
                                    <tspan>
                                            {node.data.id}
                                    </tspan>
                                </text>)
                            }
                        }>
                        </VNode>
                    )
                })
            }
        </g>
    )
}

export default Tree