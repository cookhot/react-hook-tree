import * as React from 'react'
import { IRenderNode, IRenderLine } from '../types'
import { HierarchyNode, HierarchyPointNode,  cluster } from 'd3-hierarchy'
// import renderHierarchNodeWithRect from '../renderHierarchNodeWithRect'
import { Margin } from '../types'
import Chart from '../components/chart'
import Box from '../components/box'

// 提供
interface IProps<Datum> {
    root: HierarchyNode<Datum>;
    // 节点渲染函数
    renderNode: IRenderNode<Datum>;
    renderLine?: IRenderLine<Datum>;
    margin?: Margin; 
    width: number;
    height: number;
}

function clusterTree<Datum>(props: IProps<Datum>) {
    const { root, width, height, renderNode, renderLine, ...otherProps } = props

    return (
        <Chart width={width} height={height}  {...otherProps} render={(_width, _height) => {
            const tree = cluster<Datum>().size([_width, _height]).separation((a: HierarchyPointNode<Datum>, b: HierarchyPointNode<Datum>) => {
                return 1
            })(root)

            const listNodes = tree.descendants()

            const links = tree.links()

            return (
                <g className={"x-cluster x-tree"}>
                    <g className={"x-node-list"}>
                        {
                            // 动态计算处理节点的位置
                            listNodes.map((node) => {
                                return renderNode(node)
                            })
                        }
                    </g>
                    <g className={"x-node-line"}>
                        {
                            // 动态计算处理节点的位置
                            links.map(({source, target}) => {
                                console.log(source, target)
                                return renderLine(source, target)
                            })
                        }       
                    </g>
                </g>
            )
        }}>
        </Chart>
    )
}

export default clusterTree