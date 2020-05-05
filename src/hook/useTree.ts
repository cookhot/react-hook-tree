import { scaleBand, scaleLinear, ScaleLinear, ScaleBand }from 'd3-scale'
import { HierarchyNode, HierarchyPointNode, cluster, hierarchy } from 'd3-hierarchy'
import { useMemo } from 'react'

import { range } from 'd3-array'

import config, { Rect } from '../config'
import { HierarchyPointAndRectNode } from '../types'

export interface State<T> {
    xScale: ScaleLinear<number, number>;
    yScale: ScaleBand<number>;
    clusterNode: HierarchyPointAndRectNode<HierarchyNode<T>>
}

const useTree = <T>(root: HierarchyNode<T>, width: number, height: number): State<T> => {
    const clusterNode = useMemo(() => {
        let _clusterNode = cluster<HierarchyNode<T>>()(hierarchy(root).count()) as HierarchyPointAndRectNode<HierarchyNode<T>>
        
        _clusterNode.each(node => {
            node.rect = {
                ...config.rect
            }
        })

        return _clusterNode
    }, [root])

    const xScale = useMemo(() => {
        return scaleLinear().domain([0, 1]).range([0, width])
    }, [clusterNode])

    const yScale = useMemo(() => {
        const domain = range(0, clusterNode.height + 1, 1)
        return scaleBand<number>().domain(domain).range([0, height]).paddingOuter(.5)
    }, [clusterNode, height])

    return {
        xScale,
        yScale,
        clusterNode
    }
}

export default useTree