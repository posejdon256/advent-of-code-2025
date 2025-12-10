export type Light = '#' | '.'
export type Button = Array<number>
export type Machine = {
    lights: Array<Light>
    buttons: Array<Button>
    presses: Array<number>
}