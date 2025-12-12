import { splitData } from "./splitter.ts";
import { init } from 'z3-solver'    

export const two = async (data: string): Promise<number> => {
    const { Context } = await init();
    //@ts-ignore
    const { Optimize, Int} = new Context('main');
    const machines = splitData(data)
    let result = 0;
   for(let machineInd = 0; machineInd < machines.length; machineInd ++) {
        const optimizer = new Optimize();
        const machine = machines[machineInd];
        //@ts-ignore
        const variables = [];
        for(let i = 0; i < machine.buttons.length; i ++) {
            variables.push(Int.const(String.fromCodePoint(i + 97)));
            optimizer.add(variables[i].ge(Int.val(0)))
        }
        for(let presssInd = 0; presssInd < machine.presses.length; presssInd ++) {

            let equation = Int.val(0);
            for(let i = 0; i < machine.buttons.length; i ++) {
                for(let j = 0 ; j < machine.buttons[i].length; j ++) {
                    if(presssInd === machine.buttons[i][j]) {
                       //@ts-ignore
                       equation = equation.add(variables[i]);
                    }
                }
            }
            equation = equation.eq(Int.val(machine.presses[presssInd]));
            //@ts-ignore
           // console.log(optimizer.toString())
            optimizer.add(equation);
        }
        const sum = variables.reduce((arith, val) => arith.add(val), Int.val(0));
        optimizer.minimize(sum)
        const result2 = await optimizer.check();
        if(result2 === 'sat') {
             result += parseInt(optimizer.model().eval(sum).toString());
        }
    }
    return result;
}