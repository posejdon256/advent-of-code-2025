import { exampleData } from "./data.ts";
import { splitData } from "./splitter.ts";

export const units = (...methods: Parameters<(...args: any) => any>): boolean => {
    let areOk = true;
    areOk = areOk && splitUnit();
    return areOk;
}

const splitUnit = (): boolean => {
    const room = splitData(exampleData);
    if(room[0][7] === 'S' && room.length === 16 && room[0][0] === '.') {
        return true;
    }
    return false;
}