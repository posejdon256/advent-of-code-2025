import { exampleData } from "./data.ts";
import { bubbleSortWithTwist } from "./helpers.ts";
import { splitData } from "./splitter.ts";

export const units = (...methods: Parameters<(...args: any) => any>): boolean => {
    let areOk = true;
    areOk = areOk && splitUnit();
    areOk = areOk && bubbleSortUnit();
    return areOk;
}

const splitUnit = () => {
   const { ingredients, ranges} = splitData(exampleData);
   if(ingredients[0] !== 1 || ingredients[1] !== 5) {
    return false;
   }
   if(ranges[0].min !== 3 || ranges[0].max !== 5) {
    return false;
   }
   return true;
}

const bubbleSortUnit = (): boolean => {
    const {ranges} = splitData(exampleData);
    const sorted = bubbleSortWithTwist(ranges);
    if(sorted[0].min !== 3 || sorted[0].max !== 5) {
        return false;
    }
    if(sorted[1].min !== 10 || sorted[1].max !== 20) {
        return false;
    }
    return true;
}