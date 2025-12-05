import { bubbleSortWithTwist } from "./helpers.ts";
import { splitData } from "./splitter.ts";


export const one = (data: string): number => {
    let sum = 0;
    const { ingredients, ranges} = splitData(data);
    const sorted = bubbleSortWithTwist(ranges);
    for(let i = 0; i < ingredients.length; i ++) {
        for(let j = 0; j < sorted.length; j ++) {
            if(ingredients[i] >= sorted[j].min && ingredients[i] <= sorted[j].max) {
                sum ++;
            }
        }
    }
    return sum;
}
