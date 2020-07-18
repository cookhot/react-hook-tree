export interface Margin {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export const svgHiddenAttrs = {
    visibility: 'hidden',
    position: 'fixed',
    'z-index': -9999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll'
}

export const BoxMarginConfig = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
}

export const ChartMarginConfig = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
}


export default Margin