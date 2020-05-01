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
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }
}

export default config