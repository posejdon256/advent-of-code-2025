import type { Range } from "./types.ts";

export const splitData = (data: string):{ranges: Array<Range>, ingredients: Array<number>}=> {
    const rows = data.split('\n');
    let ranges: Array<Range> = [];
    let ingredients: Array<number> = [];
    let stage = 1;
    rows.forEach(row => {
        if(row === '') {
            stage = 2;
            return;
        }
        if(stage === 1) {
            const range = row.split('-').map(x => Number(x));
            ranges.push({min: range[0], max: range[1]});
        } else if(stage === 2) {
            const ingredient = Number(row);
            ingredients.push(ingredient);
        }
        
    });
    return {ranges, ingredients};

}
