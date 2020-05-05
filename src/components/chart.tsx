import * as React from 'react'
import { StatelessComponent, SVGProps } from 'react'
import config, { Margin } from '../config'

interface IProps<SVGSVGElement> extends SVGProps<SVGSVGElement>  {
    width: number;
    height: number;
    render?: (width: number, height: number) => React.ReactNode;
    margin?: Margin;

}

const Chart: StatelessComponent<IProps<SVGSVGElement>> = (props) => {
    const { width, height, margin = config.margin, render, ...othersProps } = props

    const _width = width - margin.left - margin.right
    const _height = height - margin.top - margin.bottom

    return (
        <svg className={'v-chart'} width={props.width} height={props.height} {...othersProps}
        viewBox={`0, 0, ${props.width}, ${props.height}`}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {render ? render(_width, _height) : null}
            </g>
        </svg>
    )
}

export default Chart