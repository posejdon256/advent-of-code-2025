import { type Light, type Button, type Machine } from "./types.ts";

export const splitData = (data: string): Array<Machine> => {
    const arr = data.split('\n');
    const machines = new Array<Machine>();
    arr.forEach(row => {
        const parts = row.split(' ');
        const lights = parts[0].split('').slice(1, parts[0].length-1);
        const buttons = new Array<Button>()
        for(let i = 1; i < parts.length-1; i ++) {
            buttons.push(parts[i].substring(1, parts[i].length-1).split(',').map(x => Number(x)));
        }
        const presses = parts[parts.length - 1].substring(1, parts[parts.length - 1].length - 1).split(',').map(x => Number(x));
        const machine = {lights, buttons, presses} as Machine
        machines.push(machine)

    });
    return machines;
}