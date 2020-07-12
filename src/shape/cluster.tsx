import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HierarchyRectNode } from '../types'
import { HierarchyNode, cluster } from 'd3-hierarchy'
import { scaleBand, scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import Chart from '../components/chart'
import Box from '../components/box'

interface IRenderNode<T> {
    (data: T) : React.ReactElement
}

interface IProps<T> {
    root: HierarchyNode<T>;
    // 节点渲染函数
    renderNode: IRenderNode<T>;
    // renderLine: IRenderLine<>;
    // renderLine: 生成一个 
    width: number;
    height: number;
}


function renderNodeRect<T>(root: HierarchyNode<T>, render: IRenderNode<T>): Promise<HierarchyRectNode<T>> {
    const virtualAttrs = {
        visibility: 'hidden',
        position: 'fixed',
        'z-index': -9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'scroll'
    }
    return new Promise((resolve, reject) => {
        const svgWrapper: Element = document.createElement('div')

        let virtualStyle = ''
        Object.keys(virtualAttrs).forEach((key: string) => {
            virtualStyle += `${key}: ${virtualAttrs[key]};`
        })

        svgWrapper.setAttribute('style', virtualStyle)
        document.body.appendChild(svgWrapper)

        const listNodes = root.descendants()

        ReactDOM.render(
            <Chart width={100} height={100} render={(_width, _height) => {
                return (
                    <g>
                        {
                            listNodes.map((node) => {
                                return React.cloneElement(render(node.data), {
                                    key: node.id, ref: (current) => {
                                        if (current) {
                                            (node as HierarchyRectNode<T>).rect = current.getBBox()
                                        }
                                    }
                                })
                            })
                        }
                    </g>)
                }}>
            </Chart>,
            svgWrapper,
            () => {
                resolve(root as HierarchyRectNode<T>)
            }
        )
    })
}


function clusterTree<T>(props: IProps<T>) : React.ReactElement {
    const { root, width, height, renderNode } = props

    const [ rootAndRect, setRootAndRect ] = React.useState(null)

    React.useEffect(() => {
        const tree = cluster().separation((a, b) => {
            return 1
        })(root)

        // 各个子节点只要渲染一次
        renderNodeRect(tree, renderNode).then((node) => {
            setRootAndRect(node)
        })
    }, [root])

    const loading = React.useMemo(() => {
        if (!rootAndRect) {
            return true
        }

        return false

    }, [rootAndRect])

    if (loading) {
        return (<div>loading</div>)
    }
    
    const listNodes = rootAndRect.descendants()

    // const links = rootAndRect.links()

    const yRange = range(0, root.height + 1)

    return (
        <Chart width={width} height={height} render={(_width, _height) => {
            const yScale = scaleBand<number>().range([0, _height]).domain(yRange).paddingOuter(.1).paddingInner(.1)
            const xScale = scaleLinear().range([0, _width])
            return (
                <g className={"x-cluster x-tree"}>
                    <g className={"x-node-list"}>
                        {
                            // 动态计算处理节点的位置
                            listNodes.map((node) => {
                                const x = xScale(node.x)
                                const y = yScale(node.depth)
                                return (
                                    <Box x={x} y={y} svgRect={node.rect} childNode={renderNode(node.data)} key={`${x}${y}`}>
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