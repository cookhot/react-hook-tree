export interface Margin {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface Rect {
    width?: number;
    height?: number;
    radius?: number;
}

declare interface Config {
    margin: Margin,
    rect: Rect
}



const config : Config = {
    margin: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    },
    rect: {
        height: 30,
        width: 60,
        radius: 8
    }
}

export default config