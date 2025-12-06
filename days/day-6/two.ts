import { splitToFullArr } from "./splitter.ts"
import type { MathFactor} from './types.ts'

export const two = (data: string): number => {
    let sum = 0;
    const math = splitToFullArr(data)
    const emptyIndexes = getSpaceIdexes(math);
    sum += considerCalculation(math, 0, emptyIndexes[0] - 1);
    for(let i = 0; i < emptyIndexes.length-1; i ++) {
        sum += considerCalculation(math, emptyIndexes[i] + 1, emptyIndexes[i + 1]-  1);
    }
    sum += considerCalculation(math, emptyIndexes[emptyIndexes.length-1] + 1, math[0].length-1)
    return sum;

}


export const getSpaceIdexes = (math: Array<Array<MathFactor>>): Array<number> => {
    const indexes: Array<number> = []
    for(let i = 0; i < math[0].length; i ++) {
        let areAllEmpty = true;
        for(let j = 0; j < math.length; j ++) {
            if(math[j][i] !== ' ') {
                areAllEmpty = false
            }
        }
        if(areAllEmpty) {
            indexes.push(i);
        }
    }
    return indexes;
}

export const considerCalculation = (math: Array<Array<MathFactor>>, start: number, end: number): number => {
    let calculated = 0;
    const sign = math[math.length - 1].find((_sign, ind) =>  ind <= end  && ind >= start &&_sign !== ' ')
    for(let i = end; i >= start; i --) {
        const newNumber = createNumber(math, i);
        calculated = getNewCalculated(calculated, newNumber, sign as '*' | '+');
    }
    return calculated;
}

export const getNewCalculated = (oldCalculated: number, newNumber: number, sign: '+' | '*'): number => {
    if(sign === '+') {
        return oldCalculated + newNumber;
    }
    //sign === *
    if(oldCalculated === 0) {
        return newNumber;
    }
    return oldCalculated * newNumber
}

export const createNumber = (math: Array<Array<MathFactor>>, column: number): number => {
    let base = 1;
    let newNumber = 0;
    for(let i = math.length - 2; i >= 0; i --) {
        if(math[i][column] !== ' ') {
            newNumber += base * (math[i][column] as number);
            base *= 10;
        }
    }
    return newNumber;
}