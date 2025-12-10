import type { Button, Light } from "./types.ts";

export const id = (lights: Array<Light>): string => {
    return lights.join('');
}

export const id2 = (lights: Array<Light>, pressed: Array<number>): string => {
    return lights.join('') + '_' + pressed.join('-');
}

export const areLightsEqual = (lights1: Array<Light>, lights2: Array<Light>): boolean => {
    if(lights1.length !== lights2.length) {
        throw Error('Lights has to have same size')
    }
    for(let i = 0; i < lights1.length;  i++) {
        if(lights1[i] !== lights2[i]) {
            return false;
        }
    }
    return true;
}


export const clickButton = (lights: Array<Light>, button: Button): Array<Light> => {
    const newLights = new Array<Light>();
    for(let i = 0; i < lights.length; i ++) {
        newLights.push(lights[i]);
    }
    for(let i = 0; i < button.length; i ++ ) {
        newLights[button[i]] = newLights[button[i]] === '.' ? '#' : '.';
    }
    return newLights;
}