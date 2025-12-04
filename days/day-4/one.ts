import { calculateRollsAround } from "./helpers.ts";
import { splitData } from "./splitter.ts";

export const one = (data: string): number => {
    const room = splitData(data);
    let goodRools = 0;
    for(let i = 0; i < room.length; i ++) {
        for(let j = 0; j < room[0].length; j ++) {
            if(room[i][j] === '@' && calculateRollsAround(room, {x: j, y: i}) < 4) {
                goodRools ++;
            }
        }
    }
    return goodRools
}

