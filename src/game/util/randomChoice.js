import { randomRange } from './randomRange'

export const randomChoice = xs =>
    xs[randomRange(0, xs.length - 1)]
