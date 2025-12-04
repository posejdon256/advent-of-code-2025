import type { PrintingRoom } from "./types.ts";

export const calculateRollsAround = (room: PrintingRoom, index: {x: number, y: number}): number => {
    let rolls = 0;
    const possibleX = [...(index.x !== 0 ? [index.x - 1]: []), ...(index.x !== room.length-1 ? [index.x + 1] : []), index.x];
    const possibleY = [...(index.y !== 0 ? [index.y - 1]: []), ...(index.y !== room[0].length-1 ? [index.y + 1] : []), index.y];
    for(let i = 0; i < possibleX.length; i ++) {
        for(let j = 0; j < possibleY.length; j ++) {
            if(!(possibleX[i] === index.x && possibleY[j] === index.y)) {
                if(room[possibleY[j]][possibleX[i]] === '@') {
                    rolls ++;
                }
            }
        }
    }
    return rolls;
}