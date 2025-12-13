import type { ColorString } from "command-line-draw";
import { TerminalDrawer } from "../visualisator/visualisator.ts";
import { calculateRollsAround } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { PrintingRoom } from "./types.ts";

export const two = (data: string): number => {
    const room = splitData(data);
    const drawer = new TerminalDrawer();
    let goodRools = 0;
    const colorsMap = new Map<string, ColorString>();
    colorsMap.set('@', 'white');
    colorsMap.set('x', 'yellow');
    colorsMap.set('.', 'black');
    let prevState = 0;
    drawer.draw2DArray(room, colorsMap);
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
        drawer.draw(indexesToUpdate.map(elem => ({x: elem.y, y: elem.x, value:' ', color:'yellow'})), 100000000)

    } while(goodRools !== prevState)
    return goodRools
}

export const updateIndexes = (room: PrintingRoom, indexes: Array<{x: number, y: number}>): void  => {
    indexes.forEach(({x, y}) => {
        room[y][x] = 'x'
    });
}