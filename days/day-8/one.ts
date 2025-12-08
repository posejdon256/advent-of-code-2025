import { dinstance, getClosestPaths, bfs } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Point } from "./types.ts";

export const one = (data: string): number => {
    const points = splitData(data);
    const distances = new Array<Array<number>>(points.length);
    for(let i = 0; i <points.length; i ++) {
        distances[i] = new Array<number>(points.length);
        for(let j = i + 1; j < points.length; j ++) {
            distances[i][j] = dinstance(points[i], points[j]);
        }
    }
    const sortedDistances = getClosestPaths(distances, points);

    const graph = new Map<number, Array<number>>();
    const visited = new Map<number, boolean>();
    sortedDistances.forEach(edge => {
        const {p1, p2} = edge;

        if(!graph.get(p1.id)) {
            graph.set(p1.id, []);
        }
        if(!graph.get(p2.id)) {
            graph.set(p2.id, []);
        }
        graph.get(p1.id)!.push(p2.id);
        graph.get(p2.id)!.push(p1.id);
    });
    const sizes: Array<number> = [];
    sortedDistances.forEach(edge => {
        const depth = bfs(graph, edge.p1.id, visited);
        if(depth) {
            sizes.push(depth);
        }
    })
    sizes.sort((a, b) => b-a);
    return sizes[0] * sizes[1] * sizes[2]
}
