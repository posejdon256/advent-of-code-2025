import { exampleData } from "./data.ts";
import { calculateRollsAround } from "./helpers.ts";
import { splitData } from "./splitter.ts";

export const units = (...methods: Parameters<(...args: any) => any>): boolean => {
    let areOk = true;
    areOk = areOk && splitTest();
    areOk = areOk && rollsAroundTest();
    return areOk;
}

const splitTest = (): boolean => {
    const splitted = splitData(exampleData);
    if(!splitted.every(row => row.length === 10)) {
        return false;
    }
    if(splitted[0][0] !== '.' || splitted[0][2] !== '@') {
        return false;
    }
    return true;
} 

const rollsAroundTest = (): boolean => {
    const room = splitData(exampleData);
    const rolls1 = calculateRollsAround(room, {x: 2, y: 0});
    if(rolls1 !== 3) {
        console.log('rolls1 problem', rolls1);
        return false;
    }
    const rolls2 = calculateRollsAround(room, {x:   7, y: 0});
    if(rolls2 !== 4) {
        console.log('rools2 problem', rolls2);
        return false;
    }
    return true
}
