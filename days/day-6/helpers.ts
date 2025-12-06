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