import * as React from 'react'
import { HierarchyNode, cluster } from 'd3-hierarchy'
import { scaleBand, scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { StatelessComponent } from 'react'
import VirtualSvgElement from './virtual'
import Chart from '../components/chart'
import Box from '../components/box'

interface IProps<T> {
    root: HierarchyNode<T>;
    // 节点渲染函数
    renderNode: (data: T) => React.ReactElement
    width: number;
    height: number;
}

// any 表示任意数据, 考虑如何展示结果
const clusterTree: StatelessComponent<IProps<any>> = (props) => {
    const { root, width, height, renderNode } = props

    const [ inited, setInit ] = React.useState(false)

    const yRange = range(0, root.height + 1)

    React.useEffect(() => {
        setInit(true)
    }, [])

    if (!inited) {
        return (
            <VirtualSvgElement root={root} width={width} height={height} renderNode={renderNode}>
            </VirtualSvgElement>
        )
    }

    // 虚拟节点加载并且获取节点数据

    const tree = cluster().separation((a, b) => {
        return 1
    })(root)

    const listNodes = tree.descendants()
    // 对节点进行绘制
    const links = tree.links()

    // console.log(links)

    console.log(listNodes)

    return (
        <Chart width={width} height={height} render={(_width, _height) => {
            const yScale = scaleBand<number>().range([0, _height]).domain(yRange).paddingOuter(.1).paddingInner(.1)
            const xScale = scaleLinear().range([0, _width])
            return (
                <g className={"x-cluster x-tree"}>
                    {/* <g className={"x-lines"}>
                        {
                            links.map(({ source, target }) => {
                                const x1 = xScale(source.x)
                                const x2 = xScale(target.x)
                                const y1 = yScale(source.depth)
                                const y2 = yScale(target.depth)

                                return (
                                    <line x1={x1} x2={x2} y1={y1} y2={y2} key={`${x1}-${x2}`} stroke={'#000'}></line>
                                )
                            })
                        }
                    </g> */}
                    <g className={"x-node-list"}>
                        {
                            // 动态计算处理节点的位置
                            listNodes.map((node) => {
                                const x = xScale(node.x)
                                const y = yScale(node.depth)
                                

                                console.log(node.data.rect)
                                
                                return (
                                    <Box x={x} y={y} childNode={renderNode(node.data)} key={`${x}${y}`}>

                                    </Box>
                                )
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