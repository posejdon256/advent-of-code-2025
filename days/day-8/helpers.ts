import type { Distance, Point, Point3D } from './types.ts'

export const dinstance = (p1:  Point3D, p2: Point3D): number => {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z); // sqrt can be removed for part 1
}

export const manhattanDistane = (p1: Point3D, p2: Point3D): number => {
    return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y) + Math.abs(p2.z - p1.z);
}

export const getClosestPaths = (distances: Array<Array<number>>, points: Array<Point3D>): Array<Distance> => {
        const sortedDistances = new Array<Distance>();
        for(let i = 0; i < 1000; i ++) {
            addNewPath(sortedDistances, distances, points)
        }
        return sortedDistances;
}

export const addNewPath = (sortedDistances: Array<Distance>, distances: Array<Array<number>>, points: Array<Point3D>): Distance => {
    let min = null as Distance | null;
    for(let j = 0; j < distances.length; j ++)  {
        for(let k = j + 1; k < distances[j].length; k ++) {
            if(min === null || min!.distance > distances[j][k]) {
                min = {p1: points[j], p2: points[k], distance: distances[j][k], indexX: k, indexY: j};
            }
        }
    }
    sortedDistances.push(min!);
    distances[min?.indexY!][min?.indexX!] = 10000000;
    return min!;
}

export const placeNewDistancceInSortedArr = (newDistance: Distance, distances: Array<Distance>): void => {
    for(let i = 0; i < distances.length; i ++) {
        if(distances[i]!.distance > newDistance.distance) {
            distances.splice(i, 0, newDistance);
            return;
        }
        if(i === distances.length - 1 ) {
            distances.push(newDistance);
            return;
        }
    }
}

export const bfs = (graph: Map<number, Array<number>>, current: number, visited: Map<number, boolean>, depth = 0): number =>  {
    if(visited.get(current)) {
        return depth;
    }
    const children = graph.get(current);
    if(children) {
        visited.set(current, true);

        let sum = 1;
        for(let i = 0; i < children.length; i ++) {
            sum += bfs(graph, children[i], visited, depth);
        }
        depth += sum;
    }
    return depth;
}