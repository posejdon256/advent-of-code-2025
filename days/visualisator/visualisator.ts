import { type ColorString, Terminal } from 'command-line-draw'; 

export class TerminalDrawer {
    terminal: Terminal;
    constructor() {
        this.terminal = new Terminal({
            width: 1000,
            height: 1000
        });
        console.log(this.terminal.width, this.terminal.height)
        this.terminal.color.background = "black";
        this.terminal.color.foreground = "blue";
    }
    draw(elements: Array<{x: number, y: number, value: string, color: ColorString}>, sleepTime = 0): void {
        for(let i = 0; i < elements.length; i ++) {
            if(elements[i].x < this.terminal.width && elements[i].y < this.terminal.height) {
                this.terminal.write(elements[i].value, elements[i].x, elements[i].y, elements[i].color)
            }
        }
        if(sleepTime) {
            this.sleep(sleepTime);
        }
    }
    draw2DArray(arr: Array<Array<string>>, colors: Map<string, ColorString>, dontDraw: Array<string> = [], shouldSleep = false): void {
        for(let i = 0; i < arr.length; i ++) {
            for(let j = 0; j < arr[i].length; j ++) {
                if(i < this.terminal.width && j < this.terminal.height && !dontDraw.includes(arr[i][j])) {
                    this.terminal.write(arr[i][j], i, j, colors.get(arr[i][j]))
                }
            }
        }
        if(shouldSleep) {
            this.sleep(1000000000);
        }
    }
    sleep(sleepTime: number): void {
        let a = 0;
        for(let j = 0; j < sleepTime; j ++) {
            a ++;
        }
    }

}