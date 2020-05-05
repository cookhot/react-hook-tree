import * as React from 'react'
import { StatelessComponent } from 'react'
import { Rect }  from '../config'

interface IProps {
    render?: () => React.ReactNode;
    x: number;
    y: number;
    rect: Rect
}

// 生成节点信息
const VNode: StatelessComponent<IProps> = (props) => {
    let { x, y, rect } = props

    const { width, height, radius } = rect

    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect x={-width / 2} y={-height / 2}  width={width} height={height} 
                fill={'transparent'} stroke={'red'} rx={radius} ry={radius}>
            </rect>
            {
                props.render ? props.render() : null
            }
        </g>
    )
}

export default VNode