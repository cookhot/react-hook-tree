import * as React from 'react'
import { StatelessComponent, SVGProps } from 'react'
import Margin, { ChartMarginConfig } from '../config'

declare interface IProps<SVGSVGElement> extends SVGProps<SVGSVGElement>  {
    width: number;
    height: number;
    render?: (width: number, height: number) => React.ReactNode;
    margin?: Margin;
}

export default React.forwardRef<SVGSVGElement, IProps<SVGSVGElement>>((props, ref) => {
    const { width, height, margin = ChartMarginConfig, render, ...othersProps } = props

    const _width = width - margin.left - margin.right
    const _height = height - margin.top - margin.bottom

    return (
        <svg className={'v-chart'} width={props.width} height={props.height} {...othersProps}
        viewBox={`0, 0, ${props.width}, ${props.height}`}>
            <g transform={`translate(${margin.left}, ${margin.top})`} ref={ref}>
                {render ? render(_width, _height) : null}
            </g>
        </svg>
    )
})