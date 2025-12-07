import type{ Room, Point, RoomElement } from "./types.ts";

export const findBeam = (room: Room): Point => {
    for(let i = 0; i < room[0].length; i ++) {
        if(room[0][i] === 'S') {
            return { x: i, y: 0};
        }
    }
    throw Error('Cannot find Beam');
}


export const checkAndFill = (room: Room, point: Point, element: RoomElement): void => {
    if(point.x < 0 || point.x >= room[0].length || point.y < 0 || point.y >= room.length) {
        return;
    }
    room[point.y][point.x] = element;
}