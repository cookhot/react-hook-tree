export interface Margin {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

declare interface Config {
    margin: Margin
}

const config : Config = {
    margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    }
}

export default config