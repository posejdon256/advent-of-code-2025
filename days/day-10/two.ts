import { clickButton, id, id2 } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Button, Light } from "./types.ts";

let visited = new Set<string>();
export const two = (data: string): number => {
    const machines = splitData(data)
    let result = 0;
    machines.forEach(machine => {
        console.log(machine)
        visited = new Set<string>();
        let current = {light: new Array<Light>(machine.lights.length).fill('.'), depth: 0, clicked: new Array<number>(machine.lights.length).fill(0)};
        visited.add(id(current.light))
        let depth = 0;
        const queue = new Array<{light:Array<Light>, depth:number, clicked: Array<number>}>();
        while(id2(current.light, current.clicked) !== id2(machine.lights, machine.presses)) {
            depth ++;
            for(let i = 0; i <machine.buttons.length; i ++) {
                const newLight = clickButton(current.light, machine.buttons[i]);
                const newClicked = addButtonClick(current.clicked, machine.buttons[i]);
                if(!visited.has(id2(newLight, newClicked)) && isNotTooManyClicks(newClicked, machine.presses)) {
                    visited.add(id2(newLight, newClicked));
                    queue.splice(0, 0, {light: newLight, depth: current.depth + 1, clicked: newClicked});
                }
            }
            if(queue.length === 0) {
                break;
            }
            current = queue.pop()!;
        }
        result += current.depth
    });
    return result;
}

export const addButtonClick = (clicked: Array<number>, button: Button): Array<number> => {
    const newClicked = new Array<number>(clicked.length)
    for(let i = 0; i < clicked.length; i ++) {
        newClicked[i] = clicked[i];
    }
    button.forEach(index => {
        newClicked[index] ++;
    });
    return newClicked
}

export const isNotTooManyClicks = (clicked: Array<number>, required: Array<number>): boolean => {
    for(let i = 0; i < clicked.length; i ++) {
        if(required[i] < clicked[i]) {
            return false;
        }
    }
    return true;
}