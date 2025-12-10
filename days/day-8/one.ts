import { bfs, dinstance } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Distance } from "./types.ts";

export const one = (data: string): number => {
    const points = splitData(data);
    const distances = Array<Distance>();
    for(let i = 0; i <points.length; i ++) {
        for(let j = i + 1; j < points.length; j ++) {
            distances.push({p1: points[i], p2: points[j], distance: dinstance(points[i], points[j])} as Distance);
        }
    }
    distances.sort((a, b) => a.distance - b.distance).splice(1000, distances.length);
    const graph = new Map<number, Array<number>>();
    const visited = new Set<number>();
    distances.forEach(edge => {
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
    distances.forEach(edge => {
        const depth = bfs(graph, edge.p1.id, visited);
        if(depth) {
            sizes.push(depth);
        }
    })
    sizes.sort((a, b) => b-a);
    return sizes[0] * sizes[1] * sizes[2]
}
