import { buildPath } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { DFS_Data, Graph } from "./types.ts";

let paths_visited = new Map<string, number>();
export const two = (data: string): number => {
    const graph = splitData(data);
    const start: DFS_Data = {node: 'svr', visited: new Set<string>()};
    paths_visited = new Map<string, number>();
    const fftDac = dfs(graph, {node: 'fft', visited: new Set<string>()}, 'dac');
    paths_visited = new Map<string, number>();
    const dacOut = dfs(graph, {node: 'dac', visited: new Set<string>()}, 'out')
    paths_visited = new Map<string, number>();
    const svrFft = dfs(graph, start, 'fft')
    paths_visited = new Map<string, number>();
    return dacOut * fftDac * svrFft
}

export const dfs = (graph: Graph, current: DFS_Data, exit: string): number => {
    if(current.visited.has(current.node)) {
        return 0;
    }
    if(current.node === exit) {
        paths_visited.set(current.node, 1);
        return 1;
    } else if(current.node === exit) {
        return 0;
    }
    if(paths_visited.has(current.node)) {
        return paths_visited.get(current.node)!;
    }
    const children = graph.get(current.node);
    if(!children) {
        return 0
    }
    let paths = 0;
    for(let i = 0; i <children!.length; i ++ ) {
        const visited = new Set(current.visited);
        visited.add(current.node);
        paths += dfs(graph, { node: children![i], visited} as DFS_Data, exit)
    }
    paths_visited.set(current.node, paths);
    return paths;
}