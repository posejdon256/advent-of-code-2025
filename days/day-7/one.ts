import { checkAndFill, findBeam } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Point, Room } from "./types.ts";

export const one = (data: string): number => {
    const room = splitData(data);
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
    checkAndFill(room, point, '|');   
    return beamStepDown(room, {x: point.x - 1, y: point.y+ 1}) + beamStepDown(room, {x: point.x + 1, y: point.y + 1}) + 1;
}