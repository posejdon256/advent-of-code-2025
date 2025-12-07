import type { Room, RoomElement } from "./types.ts";

export const splitData = (data: string):Room => {
    const arr = data.split('\n');
    const room : Room= [];
    arr.forEach(element => {
        const row = element.split('');
        room.push(row as Array<RoomElement>);
    });
    return room;
}