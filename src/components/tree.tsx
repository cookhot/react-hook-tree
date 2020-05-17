import * as React from 'react'
import { StatelessComponent } from 'react'
import { useTree } from '../hook'
import { HierarchyNode } from 'd3-hierarchy'
import { TNode } from '../types/index'
import VNode  from './node'
import VLink from './link'


interface IProps<T> {
    root: HierarchyNode<T>;
    width: number;
    height: number;
}

const Tree: StatelessComponent<IProps<TNode>> = (props) => {
    // 根据节点来计算
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

            {
                links.map((link) => {
                    const { target, source } = link
                    return (
                        <VLink link={link} xScale={xScale} yScale={yScale} stroke={'red'} fill={'transparent'}
                            key={`${target.data.id}_${source.data.id}`}>
                        </VLink>
                    )
                })
            }
        </g>
    )
}

export default Tree