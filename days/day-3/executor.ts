import { dataOne } from "./data.ts";
import { one } from "./one.ts";
import { two } from "./two.ts";
import { units } from "./units.ts";

const executor = (): void => {
    const areUnitsOk = units();
    if(areUnitsOk) {
        console.log('UNIT TESTS - OK')
        console.log('ONE RESULT - ', one(dataOne));
        console.log('TWO RESULT - ', two(dataOne));
        return;
    }
    console.log('UNIT TEST - FAILED')
}

executor();