import * as React from 'react'
import { StatelessComponent, useMemo, useCallback } from 'react'
import { hierarchy, cluster, HierarchyNode } from 'd3-hierarchy'
import { scaleBand, scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { TNode } from '../types/index'

const Tree: StatelessComponent<{ root: HierarchyNode<TNode>, width: number, height: number}> = (props) => {
    // 计算出根节点数据, 生成树的类型
    const clusterNode = useMemo(() => {
        return cluster<HierarchyNode<TNode>>()(hierarchy(props.root).count())
    }, [props.root])

    const yScale = useMemo(() => {
        const domain = range(0, clusterNode.height + 1, 1)
        return scaleBand<number>().domain(domain).range([0, props.height])
    }, [clusterNode, props.height])

    const xScale = useMemo(() => {
        return scaleLinear().domain([0, 1]).range([0, props.width])
    }, [clusterNode])

    const listNodes = clusterNode.descendants()

    const links = clusterNode.links()

    return (
        <g className={'v-tree'}>
            {   
                // 生成节点
                listNodes.map((node) => {
                    return (
                        <text key={node.data.id} x={xScale(node.x)} y={yScale(node.data.depth)} textAnchor={'middle'} dominantBaseline={'middle'}>
                            {node.data.id}: {node.data.depth}/{node.data.height}
                        </text>
                    )
                })
            }

            {
                // 生成 links 线条
                links.map((link) => {
                    return (
                        <line key={`${link.target.data.id}_${link.source.data.id}`} stroke={'#000'}
                            x1={xScale(link.source.x)} y1={yScale(link.source.data.depth)} 
                            x2={xScale(link.target.x)} y2={yScale(link.target.data.depth)}
                        />
                    )
                })
            }
        </g>
    )
}

export default Tree