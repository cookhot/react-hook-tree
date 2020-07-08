import * as React from 'react'
import { HierarchyPointNode } from 'd3';

export default function Tree<Datum> (tree: HierarchyPointNode<Datum>) : React.ReactElement {
    const listNodes = tree.descendants()
    // 对节点进行绘制
    const links = tree.links()

    return (<div></div>)

        // <Chart width={width} height={height} render={(_width, _height) => {
        //     const yScale = scaleBand<number>().range([0, _height]).domain(yRange).paddingOuter(.1).paddingInner(.1)
        //     const xScale = scaleLinear().range([0, _width])
        //     return (
        //         <g className={"x-cluster x-tree"}>
        //             <g className={"x-node-list"}>
        //                 {
        //                     // 动态计算处理节点的位置
        //                     listNodes.map((node) => {
        //                         const x = xScale(node.x)
        //                         const y = yScale(node.depth)

        //                         console.log(node.data.rect)

        //                         return (
        //                             <Box x={x} y={y} childNode={renderNode(node.data)} key={`${x}${y}`}>
        //                             </Box>
        //                         )
        //                     })
        //                 }
        //             </g>
        //         </g>
        //     )
        // }}>
        // </Chart>
}