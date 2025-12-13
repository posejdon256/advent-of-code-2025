import type { ColorString } from "command-line-draw";
import { TerminalDrawer } from "../visualisator/visualisator.ts";
import { checkAndFill, findBeam } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Point, Room, RoomElement } from "./types.ts";

const splittersPaths = new Map<string, number>();
const drawer = new TerminalDrawer();
export const two = (data: string): number => {
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
    return beamStepDown(room, {x: beam.x, y: beam.y + 1}) + 1;
}

export const beamStepDown = (room: Room, point: Point): number => {
    if(point.x < 0 || point.x >= room[0].length || point.y < 0 || point.y >= room.length) {
        return 0;
    }
    drawer.draw([{x: point.x + 1, y: point.y - 1, value: '|', color: 'yellow'}, {x: point.x - 1, y: point.y + 1, value: '|', color: 'blue'}], 1000000);
    if(room[point.y][point.x] === '.') {
       return beamStepDown(room, {x: point.x, y: point.y + 1});
    }    const leftTimeline = {x: point.x - 1, y: point.y + 1} as Point;
    const leftId = leftTimeline.x + '_' + leftTimeline.y;
    const leftNumberOfPaths = splittersPaths.get(leftId) || beamStepDown(room, leftTimeline);

    splittersPaths.set(leftId, leftNumberOfPaths);

    const rightTimeline = {x: point.x + 1, y: point.y + 1} as Point;
    const rightId = rightTimeline.x + '_' + rightTimeline.y;
    const rightNumberOfPaths =  splittersPaths.get(rightId) || beamStepDown(room, rightTimeline) ;
    splittersPaths.set(rightId, rightNumberOfPaths);

    return splittersPaths.get(rightId)! + splittersPaths.get(leftId)! + 1;
}