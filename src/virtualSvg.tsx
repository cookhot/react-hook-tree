import * as React from 'react'
import * as ReactDom from 'react-dom'
import { StatelessComponent } from 'react'

interface ISVGPropsRect {
    x: number,
    y: number,
    width: number,
    height: number
}

const VirtualSvg: StatelessComponent<{ childNode: React.ReactElement }> = (props) => {
    return (
        <svg>
            {
                props.childNode
            }
        </svg>
    )
}


export default (ele: React.ReactElement): ISVGPropsRect => {
    const el = document.createElement('div')
    // const fragment = document.createDocumentFragment()
    // document.documentElement.appendChild(fragment)
    const aa = ReactDom.createPortal(
        <svg>
            <text>hello world</text>
        </svg>, 
    el)
    console.log(aa)
    return null
}
