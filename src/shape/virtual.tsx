import * as React from 'react'
import { HierarchyNode } from 'd3-hierarchy'
import Chart from '../components/chart'
import { curveStepAfter } from 'd3';


interface IProps<T> {
    root: HierarchyNode<T>;
    renderNode: (data: T) => React.ReactElement;
    width: number;
    height: number;
}

const VirtualSvgElement: React.StatelessComponent<IProps<any>> = (props) => {
    const { root, width, height, renderNode } = props
    const nodes = root.descendants()
    const ref = React.useRef()

    return (
        <Chart width={width} height={height} ref={ref} style={{ visibility: 'hidden' }}
            render={(_width, _height) => {
            return (
                <React.Fragment>
                    {
                        nodes.map((node) => {
                            const Shape = renderNode(node.data)
                            return React.cloneElement(Shape, { key: node.id, ref: (current) => {
                                    if(current) {
                                        node.data.rect = current.getBBox()
                                    }
                                } 
                            })
                        })
                    }
                </React.Fragment>
            )
        }}>
        </Chart>
    )    
} 

export default VirtualSvgElement