import type { MathFactor } from "./types.ts";

export const splitData = (data: string): Array<Array<string>> => {
    const arr = data.split('\n');
    const math: Array<Array<string>> = [];
    arr.forEach(row => {
        math.push(row.split(' ').filter(elem => elem !== ' ' && elem !== ''));
    });
    return math;
}

export const splitToFullArr = (data: string): Array<Array<MathFactor>> => {
    const arr = data.split('\n');
    return arr.map((row, ind) => row.split('').map(elem => elem === ' ' ? ' ' : ind !== arr.length - 1 ? Number(elem) : elem  as '*' | '+'))
}