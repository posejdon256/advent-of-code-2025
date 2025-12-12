import { dataOne } from "./data.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";
import { units } from "./units.ts";

const executor = (): void => {
    const areUnitsOk = units();
    if(areUnitsOk) {
        console.log('UNIT TESTS - OK')
        console.time('one');
        console.log('ONE RESULT - ', one(dataOne));
        console.timeEnd('one');
        console.time('two');
        console.log('TWO RESULT - ', two(dataOne));
        console.timeEnd('two');
        return;
    }
    console.log('UNIT TEST - FAILED')
}

executor();