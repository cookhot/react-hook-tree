import * as React from 'react'
import { HierarchyNode, cluster } from 'd3-hierarchy'
import { scaleBand, scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { StatelessComponent, Component, useState } from 'react'
import Chart from '../components/chart'

interface IProps<T> {
    root: HierarchyNode<T>;
    // 节点渲染函数
    renderNode: (data: T) => React.ReactElement
    width: number;
    height: number;
}

interface IState {
    inited: boolean,
    padding?: number,
    rect?: SVGRect
}

class Wrapper<T extends SVGSVGElement> extends React.Component<{ transform: string, childNode: React.ReactElement }, IState> {
    ref: React.RefObject<T>

    constructor(props) {
        super(props);
        this.state = { inited: false }
        this.ref = React.createRef()
    }

    // 重现展示节点
    componentDidMount() {
        const box = this.ref.current
        const rect : SVGRect = box.getBBox()
        this.setState({
            rect,
            inited: true
        })
    }

    render () {
        const { childNode, transform } = this.props
        const { inited, rect } = this.state
        return (
            <g transform={transform} style={{ visibility: inited ? 'visible': 'hidden' } } >
                {
                    inited ? (<rect x={rect.x} y={rect.y} width={rect.width} height={rect.height}
                        fill={'transparent'} stroke={'#FF0000'}>
                    </rect>) : null
                }
                { 
                    React.cloneElement(childNode, { ref: this.ref })
                }
            </g>
        )
    }
} 

// any 表示任意数据, 考虑如何展示结果
const clusterTree: StatelessComponent<IProps<any>> = (props) => {
    const { root, width, height, renderNode } = props

    const yRange = range(0, root.height + 1)

    const tree = cluster().separation((a, b) => {
        return 1
    })(root)

    const listNodes = tree.descendants()

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
                                const shape = renderNode(node.data)
                                return (
                                    <Wrapper childNode={shape}
                                    transform={`translate(${x}, ${y})`} key = {`${x}${y}`} />
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