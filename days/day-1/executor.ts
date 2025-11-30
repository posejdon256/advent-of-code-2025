import { one } from "./one.ts";
import { two } from "./two.ts";
import { units } from "./units.ts";
import { dataOne, dataTwo } from "./data.ts";

const executor = (): void => {
    const areUnitsOk = units(one, two);
    if(areUnitsOk) {
        console.log('UNIT TESTS - OK')
        console.log('ONE RESULT - ', one(dataOne));
        console.log('TWO RESULT - ', two(dataTwo));
        return;
    }
    console.log('UNIT TEST - FAILED')
}

executor();