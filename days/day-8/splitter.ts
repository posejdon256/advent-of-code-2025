import type { Point3D } from "./types.ts";

export const splitData = (data: string): Array<Point3D> => {
    const arr = data.split('\n');
    let id = 0;
    const points: Array<Point3D> = [];
    arr.forEach(row => {
        const coordinates = row.split(',').map(coordinate => Number(coordinate));
        points.push({x: coordinates[0], y: coordinates[1], z: coordinates[2], id} as Point3D)
        id++;
    });
    return points;
}