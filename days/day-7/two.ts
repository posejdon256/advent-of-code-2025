import { checkAndFill, findBeam } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Point, Room } from "./types.ts";

const splittersPaths = new Map<string, number>();

export const two = (data: string): number => {
    const room = splitData(data);
    const beam = findBeam(room);
    return beamStepDown(room, {x: beam.x, y: beam.y + 1}) + 1;
}

export const beamStepDown = (room: Room, point: Point): number => {
    if(point.x < 0 || point.x >= room[0].length || point.y < 0 || point.y >= room.length) {
        return 0;
    }
    if(room[point.y][point.x] === '.') {
       return beamStepDown(room, {x: point.x, y: point.y + 1});
    }
    const leftTimeline = {x: point.x - 1, y: point.y + 1} as Point;
    const leftId = leftTimeline.x + '_' + leftTimeline.y;
    const leftNumberOfPaths = splittersPaths.get(leftId) || beamStepDown(room, leftTimeline);
    splittersPaths.set(leftId, leftNumberOfPaths);

    const rightTimeline = {x: point.x + 1, y: point.y + 1} as Point;
    const rightId = rightTimeline.x + '_' + rightTimeline.y;
    const rightNumberOfPaths =  splittersPaths.get(rightId) || beamStepDown(room, rightTimeline) ;
    splittersPaths.set(rightId, rightNumberOfPaths);

    return splittersPaths.get(rightId)! + splittersPaths.get(leftId)! + 1;
}