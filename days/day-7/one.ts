import type { ColorString } from "command-line-draw";
import { TerminalDrawer } from "../visualisator/visualisator.ts";
import { checkAndFill, findBeam } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import { type RoomElement, type Point, type Room } from "./types.ts";

const drawer = new TerminalDrawer();
export const one = (data: string): number => {
    const room = splitData(data);
    const colorsMap = new Map<string, ColorString>();
    const roomTransposed = new Array<Array<RoomElement>>()
    for(let i = 0; i < room[0].length; i ++) {
        roomTransposed.push(new Array<RoomElement>());
        for(let j = 0; j < room.length; j ++) {
            roomTransposed[i].push(room[j][i]);
        }
    }
    colorsMap.set('^', 'green');colorsMap.set('|', 'green');
    colorsMap.set('.', 'black');
    drawer.draw2DArray(roomTransposed, colorsMap);
    const beam = findBeam(room);
    return beamStepDown(room, {x: beam.x, y: beam.y + 1});
}

export const beamStepDown = (room: Room, point: Point): number => {
    if(point.x < 0 || point.x >= room[0].length || point.y < 0 || point.y >= room.length) {
        return 0;
    }
    if(room[point.y][point.x] === '|') {
        return 0;
    }
    if(room[point.y][point.x] === '.') {
        checkAndFill(room, point, '|'); 
        return beamStepDown(room, {x: point.x, y: point.y + 1});
    }
    drawer.draw([{x: point.x, y: point.y, value: '|', color: 'yellow'}], 10000000)
    checkAndFill(room, point, '|');   
    return beamStepDown(room, {x: point.x - 1, y: point.y+ 1}) + beamStepDown(room, {x: point.x + 1, y: point.y + 1}) + 1;
}