import type { Point } from "./types.ts";

export const id = (point: Point): number => {
    return point.x * 100000 + point.y;
}