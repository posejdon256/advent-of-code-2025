export const units = (...methods: Parameters<(...args: any) => any>): boolean => {
    let areOK = true;
    methods.forEach((method, index) => {
        const result = method();
        if(!method()) {
            console.log('UNIT FAILED "', method.name, '"', result, 'NOT EQUAL', true);
            areOK = false;
        }
    });
    return areOK;
}