import * as React from 'react'
import { StatelessComponent } from 'react'

interface IProps {
    x: number;
    y: number;
    svgRect: SVGRect;
    childNode: React.ReactElement;
}

const Box: StatelessComponent<IProps> = (props) => {
    const { x, y, svgRect, childNode } = props
    return (
        <g transform={`translate(${x}, ${y})`} >
            {   
                <rect x={svgRect.x} y={svgRect.y} width={svgRect.width} height={svgRect.height}
                    fill={'transparent'} stroke={'#FF0000'}>
                </rect>
            }
            {
                React.cloneElement(childNode)
            }
        </g>
    )
}

export default Box