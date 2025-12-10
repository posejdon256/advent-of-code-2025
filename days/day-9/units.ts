import { exampleData } from "./data.ts";
import { splitData } from "./splitter.ts";
import { generatePointsToCheck } from "./two.ts";

export const units = (...methods: Parameters<(...args: any) => any>): boolean => {
    let areOk = true;
    areOk = areOk && splitUnit();
    areOk = areOk && generatePointsToCheckUnit();
    return areOk;
}

const splitUnit = (): boolean => {
    const coordinates = splitData(exampleData)
    if(coordinates[0].x === 7 && coordinates[0].y === 1) {
        return true;
    }
    return false;
}

const generatePointsToCheckUnit = (): boolean => {
    const p1 = {x: 0, y: 0}
    const p2 = {x: 2, y: 2};
    const points = generatePointsToCheck(p1, p2);
    const points2 = generatePointsToCheck(p2, p1);
    return true;
}