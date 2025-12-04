import type { PrintingRoom, Thing } from "./types.ts";

export const splitData = (data: string): PrintingRoom => {
    const arr = data.split('\n');
    const room: PrintingRoom = [];
    arr.forEach(row => {
        const things: Array<Thing> = row.split('') as Array<Thing>;
        room.push(things);
    });
    return room;
}