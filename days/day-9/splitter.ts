import type { Point } from "./types.ts";

export const splitData = (data: string): Array<Point> => {
    const arr = data.split('\n');
    const coordinates: Array<Point> = []
    arr.forEach(row => {
        const splittedCoords = row.split(',');
        coordinates.push({x: Number(splittedCoords[0]), y: Number(splittedCoords[1])})

    });
    return coordinates;
}