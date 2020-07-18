import * as React from 'react'
import { StatelessComponent } from 'react'
import { IBoxProps, Margin } from '../types'
import { BoxMarginConfig } from '../config'

interface IRectProps {
    rect: SVGRect;
    margin?: Margin;
}

function RectBox(props: IRectProps) {
    const { rect, margin = BoxMarginConfig,  ...otherProps } = props
    if(!rect) {
        return null
    }

    const outerRect = React.useMemo(() => {
        return {
            x: rect.x - margin.left,
            y: rect.y - margin.top,
            width: rect.width + margin.right + margin.left,
            height: rect.height + margin.bottom + margin.top
        }
    }, [rect, margin])

    return (
        <rect {...outerRect} {...otherProps} ></rect>
    )
}

// 根据传入的 children 动态的生成 box
const Box: StatelessComponent<IBoxProps> = (props) => {
    const [ boxRect, setBoxRect ] = React.useState<SVGRect>(null)

    const { x, y, ...otherProps } = props

    const initBox = React.useCallback((current) => {
        if (current && !boxRect) {
            setBoxRect(current.getBBox())
        }
    }, [])

    const dx = React.useMemo(() => {
        if (!boxRect) {
            return x
        }
        return +x - (boxRect.width / 2)
    }, [boxRect])

    const dy = React.useMemo(() => {
        if (!boxRect) {
            return y
        }
        return +y - (boxRect.height / 2)
    }, [boxRect])

    return (
        <g transform={`translate(${dx}, ${dy})`} ref={initBox}>
            <RectBox rect={boxRect} {...otherProps}></RectBox>
            {
                props.children
            }
        </g>
    )
}

export default Box