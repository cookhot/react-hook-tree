import * as React from 'react'
import { StatelessComponent, SVGProps } from 'react'
import { HierarchyPointLink, HierarchyNode  }from 'd3-hierarchy'
import { ScaleLinear, ScaleBand } from 'd3-scale'
import { path } from 'd3-path'
import { TNode } from '../types/index'
import { HierarchyPointAndRectNode } from '../types'

interface IProps<SVGPathElement, Datum> extends SVGProps<SVGPathElement> {
    link: HierarchyPointLink<HierarchyNode<Datum>>;
    xScale: ScaleLinear<number, number>;
    yScale: ScaleBand<number>;
}

const VLink: StatelessComponent<IProps<SVGPathElement, TNode>> = (props) => {
    const { link, xScale, yScale, ...otherProps } = props

    const target = link.target as HierarchyPointAndRectNode<HierarchyNode<TNode>>
    const source = link.source as HierarchyPointAndRectNode<HierarchyNode<TNode>>

    let _path = path()

    const sourceArr = [xScale(source.x), yScale(source.data.depth) + source.rect.height / 2]

    const targetArr = [xScale(target.x), yScale(target.data.depth) - target.rect.height / 2]

    _path.moveTo(sourceArr[0], sourceArr[1])

    _path.bezierCurveTo(sourceArr[0], (targetArr[1] + sourceArr[1]) / 2, targetArr[0], (targetArr[1] + sourceArr[1]) / 2, targetArr[0], targetArr[1])

    return (
        <path d={_path.toString()} {...otherProps}></path>
    )
}

export default VLink