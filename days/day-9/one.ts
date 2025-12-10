import { splitData } from "./splitter.ts";

export const one = (data: string): number => {
    const coordinates = splitData(data);
    let max = -1;
    for(let i = 0; i < coordinates.length; i ++) {
        for(let j = 0; j < coordinates.length; j ++) {
            const p1 = coordinates[i];
            const p2 = coordinates[j];

            const newMax = Math.abs(p2.x - (p1.x - 1)) * Math.abs(p2.y - (p1.y - 1));
            if(newMax > max) {
                max = newMax;
            }
        }
    } 
    return max;
}
