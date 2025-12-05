import { bubbleSortWithTwist } from "./helpers.ts";
import { splitData } from "./splitter.ts"

let sum = 0;
export const two = (data: string): number => {

    const {ranges} = splitData(data);
    const sorted = bubbleSortWithTwist(ranges);
    for(let i = 0; i < sorted.length; i ++) {
        sum += sorted[i].max - sorted[i].min + 1;
    }
    return sum;

}
