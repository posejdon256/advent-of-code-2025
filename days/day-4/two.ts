import { calculateRollsAround } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { PrintingRoom } from "./types.ts";

export const two = (data: string): number => {
    const room = splitData(data);
    let goodRools = 0;
    let prevState = 0;
    do {
        const indexesToUpdate: Array<{x: number, y: number}> = [];
        prevState = goodRools;
        for(let i = 0; i < room.length; i ++) {
            for(let j = 0; j < room[0].length; j ++) {
                if(room[i][j] === '@' && calculateRollsAround(room, {x: j, y: i}) < 4) {
                    indexesToUpdate.push({x: j, y: i});
                    goodRools ++;
                }
            }
        }
        updateIndexes(room, indexesToUpdate);
    } while(goodRools !== prevState)
    return goodRools
}

export const updateIndexes = (room: PrintingRoom, indexes: Array<{x: number, y: number}>): void  => {
    indexes.forEach(({x, y}) => {
        room[y][x] = 'x'
    });
}