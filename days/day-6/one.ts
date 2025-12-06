import { getNewCalculated } from "./helpers.ts";
import { splitData } from "./splitter.ts";

export const one = (data: string): number => {
    const math = splitData(data)
    let sum = 0;

    for(let i = 0; i < math[0].length; i ++) {
        let columnResult = Number(math[0][i]);
        const sign = math[math.length - 1][i];
        for(let j = 1; j < math.length-1; j ++) {
            columnResult = getNewCalculated(columnResult, Number(math[j][i]), sign as '+' | '*')
        }
        sum += columnResult;
    }
    return sum;
}
