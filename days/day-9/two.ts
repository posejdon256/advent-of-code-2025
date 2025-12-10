import { id } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Carpet, Point } from "./types.ts";

export const two = (data: string): number => {
    const coordinates = splitData(data);
    const minPoint = {x: Math.min(...coordinates.map(p => p.x)), y: Math.min(...coordinates.map(p => p.y))}
    const maxPoin = {x: Math.max(...coordinates.map(p => p.x)), y: Math.max(...coordinates.map(p => p.y))}
    const green = new Set<number>()
    const red = new Set<number>()
    const visited  = new Set<number>();

        const sizes = new Array<{p1: Point, p2: Point, distance: number}>();
    for(let i = 0; i < coordinates.length; i ++) {
        for(let j = i + 1; j < coordinates.length; j ++) {
            const p1 = coordinates[i];
            const p2 = coordinates[j];
            sizes.push({p1, p2, distance: calculateRectangleSize(p1, p2)});
        }
    }
    sizes.sort((a, b) => b.distance - a.distance)

    coordinates.forEach(coord => {
        red.add(id(coord))
    });
    for(let i = 0; i < coordinates.length; i ++) {
        let p1 = coordinates[i];
        const p2 = coordinates[(i + 1) % coordinates.length];
        const direction = {x: Math.sign(p2.x - p1.x), y: Math.sign(p2.y - p1.y)}
        while(id(p1) !== id(p2)) {
            const newP = {x: p1.x + direction.x, y: p1.y + direction.y};
            if(!red.has(id(newP))) {
                green.add(id(newP))
            }
            p1 = newP;
        }
    }

    console.log('After sets')

    let max = -1;
    for(let i = 0; i < sizes.length; i ++) {
        console.log(sizes.length, i)
        const p1 = sizes[i].p1;
        const p2 = sizes[i].p2;
        const pointsToCheck = generatePointsToCheck(p1, p2);
        let canCalculateMax = true;
        const print = p1.x === 9 && p1.y === 5 && p2.x === 2 && p2.y === 3;
        for(let k = 0; k < pointsToCheck.length; k ++) {
            if(visited.has(id(pointsToCheck[k]))) {
                canCalculateMax = false;
                break;
            }
            if(!isInside(green, red, pointsToCheck[k], print, maxPoin, minPoint)) {
                canCalculateMax = false;
                visited.add(id(pointsToCheck[k]))
                break;
            }
        }

        const newMax = calculateRectangleSize(p1, p2)
        if( canCalculateMax && newMax > max) {
            return newMax;
        }
    }
    return max;
} 

export const generatePointsToCheck = (p1: Point, p2: Point): Array<Point> => {
    const pointsToCheck = new Array<Point>();

    const p3 = {x: p1.x, y: p2.y} as Point;
    const p4 = {x: p2.x, y: p1.y} as Point;
    pointsToCheck.push(p1, p2, p3, p4);
    let direction = {x: 0, y:Math.sign(p2.y - p1.y)} as Point;
    let newP = {x: p1.x, y: p1.y + direction.y};
    while(id(p3) !== id(newP)) {
        pointsToCheck.push({x: newP.x, y: newP.y});
        newP.y += direction.y;
    }
    direction.x = Math.sign(p2.x - p1.x);
    newP.x += direction.x;
    while(id(p2) !== id(newP)) {
        pointsToCheck.push({x: newP.x, y: newP.y});
        newP.x += direction.x;
    }
    direction.y = -direction.y;
    newP.y += direction.y;
    while(id(p4) !== id(newP)) {
        pointsToCheck.push({x: newP.x, y: newP.y});
        newP.y += direction.y;
    }
    direction.x = -direction.x;
    newP.x += direction.x;
    while(id(p1) !== id(newP)) {
        pointsToCheck.push({x: newP.x, y: newP.y});
        newP.x += direction.x;
    }
    pointsToCheck.push({x: newP.x, y: newP.y});
    return pointsToCheck;

}
export const isInside = (green: Set<number>, red: Set<number>, point: Point, print: boolean, max: Point, min: Point): boolean => {
    if(green.has(id(point)) || red.has(id(point))) {
        return true;
    }
    let numberOfIntersections = 0;
    const direction = {x: point.x - min.x < max.x - point.x ? -1 : 1, y: point.y - min.y < max.y - point.y ? -1 : 1}
    let newPoint = {x: point.x, y: point.y};
    while(newPoint.x > min.x - 1 && newPoint.y > min.y - 1 && newPoint.x < max.x + 1 && newPoint.y < max.y + 1) {
        if(green.has(id(newPoint))) {
            numberOfIntersections ++;
        }
        if(red.has(id(newPoint))) {
            const leftPoint = {x: newPoint.x - direction.x, y: newPoint.y};
            const isLeftCatched = green.has(id(leftPoint)) || red.has(id(leftPoint));

            const rightPoint = {x: newPoint.x + direction.x, y: newPoint.y};
            const isRightCatched = green.has(id(rightPoint)) || red.has(id(rightPoint));

            const topPoint = {x: newPoint.x, y: newPoint.y - direction.y};
            const isTopCatched = green.has(id(topPoint)) || red.has(id(topPoint))

            const bottomPoint = {x: newPoint.x, y: newPoint.y + direction.y};
            const isBottomCatched = green.has(id(bottomPoint)) || red.has(id(bottomPoint))
            if((isLeftCatched && isTopCatched) || (isRightCatched && isBottomCatched)) {
                numberOfIntersections ++;
            } else {
                numberOfIntersections += 2
            }
        }
        newPoint.x += direction.x;
        newPoint.y += direction.y;
    }
    if(numberOfIntersections % 2 === 0) {
        return false;
    }
    return true;
}


export const calculateRectangleSize = (p1: Point, p2: Point): number => {
    const x1 = Math.max(p1.x, p2.x)
    const x2 = Math.min(p1.x, p2.x);
    const y1 = Math.max(p1.y, p2.y);
    const y2 = Math.min(p1.y, p2.y)

    return Math.abs(x1 - (x2 - 1)) * Math.abs(y1 - (y2 - 1));
}
