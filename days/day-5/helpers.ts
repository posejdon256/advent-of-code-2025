import type { Range } from "./types.ts";

export const binarySearchInRange = (range: Range, sortedRanges: Array<Range>): number => {
    return 1;

}

export const bubbleSortWithTwist = (ranges: Array<Range>): Array<Range> => {
    const sorted: Array<Range> = [ranges[0]];
    for(let i = 1; i < ranges.length; i ++) {
        let range = ranges[i]
        for(let j = 0; j < sorted.length; j ++) {
            const current = sorted[j];
            if((range.max >= current.min && range.min <= current.max) || (current.max >= range.min && current.min <= range.max)) {
                range = {min: Math.min(range.min, current.min), max: Math.max(range.max, current.max)};
                sorted.splice(j, 1);
                j --;
            }
            if(range.max < current.min) {
                sorted.splice(j, 0, range);
                break;
            }
            if(j === sorted.length - 1) {
                sorted.splice(j + 1, 0, range);
                break;
            }
            if(current.max < range.min) {
                continue;
            }

        }
    }
    return sorted;

}