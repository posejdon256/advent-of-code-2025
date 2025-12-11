import { splitData } from "./splitter.ts";
import type { DFS_Data, Graph } from "./types.ts";

export const one = (data: string): number => {
    const graph = splitData(data);
    const start: DFS_Data = {node: 'you', visited: new Set<string>()};
    return dfs(graph, start)
}

export const dfs = (graph: Graph, current: DFS_Data): number => {
    if(current.visited.has(current.node)) {
        return 0;
    }
    if(current.node === 'out') {
        return 1;
    }
    const children = graph.get(current.node);
    let paths = 0;
    for(let i = 0; i <children!.length; i ++ ) {
        const visited = new Set(current.visited);
        visited.add(current.node);
        paths += dfs(graph, { node: children![i], visited} as DFS_Data)
    }
    return paths;
}
