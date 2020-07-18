import * as React from 'react'
import { StatelessComponent } from 'react'
import { IBoxProps } from '../types'
import { BoxMarginConfig } from '../config'

interface IRectProps {
    rect: SVGRect;
}

function RectBox(props: IRectProps) {
    const { rect, ...otherProps } = props
    if(!rect) {
        return null
    }

    return (
        <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} {...otherProps} ></rect>
    )
}

// 根据传入的 children 动态的生成 box
const Box: StatelessComponent<IBoxProps> = (props) => {
    const [ boxRect, setBoxRect] = React.useState<SVGRect>(null)

    const { x, y, margin = BoxMarginConfig, ...otherProps } = props

    const initBox = React.useCallback((current) => {
        if (current && !boxRect) {
            setBoxRect(current.getBBox())
        }
    }, [])

    return (
        <g transform={`translate(${x}, ${y})`} ref={initBox}>
            <RectBox rect={boxRect} {...otherProps}></RectBox>
            {
                props.children
            }
        </g>
    )
}

export default Box