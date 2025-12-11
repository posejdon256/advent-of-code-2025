import { clickButton, id } from "./helpers.ts";
import { splitData } from "./splitter.ts";
import type { Button, Light } from "./types.ts";

let visited = new Set<string>();
export const one = (data: string): number => {
    const machines = splitData(data)
    let result = 0;
    machines.forEach(machine => {
        visited = new Set<string>();
        let current = {light: new Array<Light>(machine.lights.length).fill('.'), depth: 0}
        visited.add(id(current.light))
        let depth = 0;
        const queue = new Array<{light:Array<Light>, depth:number}>();
        while(id(current.light) !== id(machine.lights)) {
            depth ++;
            for(let i = 0; i <machine.buttons.length; i ++) {
                const newLight = clickButton(current.light, machine.buttons[i]);
                if(!visited.has(id(newLight))) {
                    visited.add(id(newLight));
                    queue.splice(0, 0, {light: newLight, depth: current.depth + 1} as {light: Array<Light>, depth: number});
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
