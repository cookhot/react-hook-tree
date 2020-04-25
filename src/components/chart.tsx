import * as React from 'react'
import { StatelessComponent } from 'react'
import config, { Margin } from '../config'

interface IProps  {
    width: number;
    height: number;
    render?: (width: number, height: number) => React.ReactNode;
    margin?: Margin;
}

const Chart: StatelessComponent<IProps> = (props) => {
    const { width, height, margin = config.margin } = props

    const _width = width - margin.left - margin.right
    const _height = height - margin.top - margin.bottom

    return (
        <svg width={props.width} height={props.height} viewBox={`0, 0, ${props.width}, ${props.height}`}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                {props.render ? props.render(_width, _height) : null}
            </g>
        </svg>
    )
}

export default Chart