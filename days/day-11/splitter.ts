import type { Graph } from "./types.ts";

export const splitData = (data: string): Graph => {
    const arr = data.split('\n');
    const graph  = new Map<string, Array<string>>() as Graph;
    arr.forEach(row => {
        const splittedRow = row.split(' ');
        const key = splittedRow[0].substring(0, splittedRow[0].length-1);
        const values = splittedRow.filter((_, index) => index !== 0);
        graph.set(key, values);
    });
    return graph;
}