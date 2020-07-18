import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HierarchyNode } from 'd3'
import Chart from './components/chart'
import { svgHiddenAttrs  } from './config'
import { IRenderHierarchNodeWithRect, HierarchyRectNode, IRenderNode } from './types'

const renderHierarchNodeWithRect: IRenderHierarchNodeWithRect = function <Datum>(root: HierarchyNode<Datum>, renderNode: IRenderNode<Datum>): 
    Promise<HierarchyRectNode<Datum>> {
    return new Promise((resolve, reject) => {
        const svgWrapper: Element = document.createElement('div')

        let svgHiddenStyle = ''
        Object.keys(svgHiddenAttrs).forEach((key: string) => {
            svgHiddenStyle += `${key}: ${svgHiddenAttrs[key]};`
        })

        svgWrapper.setAttribute('style', svgHiddenStyle)
        document.body.appendChild(svgWrapper)

        const listNodes = root.descendants()

        ReactDOM.render(
            <Chart width={300} height={300} render={(_width, _height) => {
                return null
                    
                    // <g>
                    //     {
                    //         listNodes.map((node) => {
                    //             return React.cloneElement(renderNode(null), {
                    //                 key: node.id, ref: (current) => {
                    //                     if (current) {
                    //                         (node as HierarchyRectNode<Datum>).rect = current.getBBox()
                    //                     }
                    //                 }
                    //             })
                    //         })
                    //     }
                    // </g>)
            }}>
            </Chart>,
            svgWrapper,
            () => {
                resolve(root as HierarchyRectNode<Datum>)
            }
        )
    })
}

export default renderHierarchNodeWithRect