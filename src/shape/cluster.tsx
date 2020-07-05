import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HierarchyNode, cluster } from 'd3-hierarchy'
import { scaleBand, scaleLinear } from 'd3-scale'
import { range } from 'd3-array'
import { StatelessComponent } from 'react'
import { Suspense, lazy } from 'react'
// import VirtualSvgElement from './virtual'
import Chart from '../components/chart'
// import Box from '../components/box'

interface IRenderNode<T> {
    (data: T) : React.ReactElement
}

interface IProps<T> {
    root: HierarchyNode<T>;
    // 节点渲染函数
    renderNode: IRenderNode<T>;
    width: number;
    height: number;
}

interface HierarchyRectNode<Datum> extends HierarchyNode<Datum> {
    rect?: SVGRect
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

    // renderNodeRect(root, renderNode)

    React.useEffect(() => {
        renderNodeRect(root, renderNode).then((root) => {
            console.log(root)
        })
    }, [])
    
    return (<Suspense fallback={<div>Loading...</div>}>
        
    </Suspense>)

    // const [ loading, setLoading ] = React.useState(false)




    // 检查类型
    // type RectDatum = T & { rect?: SVGRect  }

    // const rootRect: HierarchyRectNode<T, RectDatum> = renderNodeRect<T, RectDatum>(root, renderNode)

    // 加载一次
    // React.useEffect(() => {
    //     setInit(true)
    // }, [])


    


    // 根据 renderNode 生成虚拟的节点信息

    // const [ inited, setInit ] = React.useState(false)

    // const yRange = range(0, root.height + 1)

    // React.useEffect(() => {
    //     setInit(true)
    // }, [])

    // if (!inited) {
    //     return (
    //         <VirtualSvgElement root={root} width={width} height={height} renderNode={renderNode}>
    //         </VirtualSvgElement>
    //     )
    // }

    // return (<div>hello world</div>)

    // // 虚拟节点加载并且获取节点数据
    // const tree = cluster().separation((a, b) => {
    //     return 1
    // })(root)

    // const listNodes = tree.descendants()
    // // 对节点进行绘制
    // const links = tree.links()

    // return (
    //     <Chart width={width} height={height} render={(_width, _height) => {
    //         const yScale = scaleBand<number>().range([0, _height]).domain(yRange).paddingOuter(.1).paddingInner(.1)
    //         const xScale = scaleLinear().range([0, _width])
    //         return (
    //             <g className={"x-cluster x-tree"}>
    //                 <g className={"x-node-list"}>
    //                     {
    //                         // 动态计算处理节点的位置
    //                         listNodes.map((node) => {
    //                             const x = xScale(node.x)
    //                             const y = yScale(node.depth)

    //                             console.log(node.data.rect)

    //                             return (
    //                                 <Box x={x} y={y} childNode={renderNode(node.data)} key={`${x}${y}`}>
    //                                 </Box>
    //                             )
    //                         })
    //                     }
    //                 </g>
    //             </g>
    //         )
    //     }}>
    //      </Chart>
    // )
}

// any 表示任意数据, 考虑如何展示结果
// const clusterTree: StatelessComponent<IProps> = (props) => {
//     const { root, width, height, renderNode } = props

//     const [ inited, setInit ] = React.useState(false)

//     const yRange = range(0, root.height + 1)

//     React.useEffect(() => {
//         setInit(true)
//     }, [])

//     if (!inited) {
//         return (
//             <VirtualSvgElement root={root} width={width} height={height} renderNode={renderNode}>
//             </VirtualSvgElement>
//         )
//     }

//     // 虚拟节点加载并且获取节点数据
//     const tree = cluster().separation((a, b) => {
//         return 1
//     })(root)

//     const listNodes = tree.descendants()
//     // 对节点进行绘制
//     const links = tree.links()

//     return (
//         <Chart width={width} height={height} render={(_width, _height) => {
//             const yScale = scaleBand<number>().range([0, _height]).domain(yRange).paddingOuter(.1).paddingInner(.1)
//             const xScale = scaleLinear().range([0, _width])
//             return (
//                 <g className={"x-cluster x-tree"}>
//                     <g className={"x-node-list"}>
//                         {
//                             // 动态计算处理节点的位置
//                             listNodes.map((node) => {
//                                 const x = xScale(node.x)
//                                 const y = yScale(node.depth)

//                                 console.log(node.data.rect)
                                
//                                 return (
//                                     <Box x={x} y={y} childNode={renderNode(node.data)} key={`${x}${y}`}>
//                                     </Box>
//                                 )
//                             })
//                         }
//                     </g>
//                 </g>
//             )
//         }}>
//         </Chart>
//     )
// }

export default clusterTree