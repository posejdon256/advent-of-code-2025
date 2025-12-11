import { clickButton, id, id2 } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Button, Light } from "./types.ts";

let visited = new Set<string>();
export const two = (data: string): number => {
    const machines = splitData(data)
    let result = 0;
    machines.forEach(machine => {
       // console.log(machine)
        visited = new Set<string>();
        const availableButtons = calculateAvailableButtons(machine.buttons, machine.presses);
        let current = {
                light: new Array<Light>(machine.lights.length).fill('.'),
                depth: 0,
                clicked: new Array<number>(machine.lights.length).fill(0),
                availableButtons,
                buttonClicked: new Array<number>()
        };
        visited.add(id(current.light))
        const queue = new Array<{light:Array<Light>, depth:number, clicked: Array<number>, availableButtons: Array<number>, buttonClicked: Array<number>}>();
        while(id(current.light) !== id(machine.lights)) {
            for(let i = 0; i <machine.buttons.length; i ++) {
                if(current.availableButtons[i] <= 0) {
                    continue;
                }
                const newLight = clickButton(current.light, machine.buttons[i]);
                const newClicked = addButtonClick(current.clicked, machine.buttons[i]);
                if(!visited.has(id(newLight)) && isNotTooManyClicks(newClicked, machine.presses)) {
                    visited.add(id(newLight));
                    const availableButtons = Array.from(current.availableButtons);
                    availableButtons[i]--;
                    const buttonClicked = Array.from(current.buttonClicked);
                    buttonClicked.push(i);
                    queue.splice(0, 0, {light: newLight, depth: current.depth + 1, clicked: newClicked, availableButtons: availableButtons, buttonClicked});
                }
            }
            if(queue.length === 0) {
                break;
            }
            current = queue.pop()!;
        }
        console.log(machine.presses, current.buttonClicked)
        //2, (2, 3), 
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

export const calculateAvailableButtons = (buttons: Array<Button>, pressed: Array<number>): Array<number> => {
    const availableButtons = new Array<number>(buttons.length).fill(10000);
    for(let i = 0; i < pressed.length; i++) {
        for(let j = 0; j < buttons.length; j ++) {
            const button = buttons[j];
            if(button.includes(i)) {
                availableButtons[j] = Math.min(availableButtons[j], pressed[i]);
            }
        }
    }
    return availableButtons;
}