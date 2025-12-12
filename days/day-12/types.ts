export type Gift = Array<Array<'#' | '.'>>
export type TreeSpace = {
    size: {width: number, height: number},
    gifts: Array<number>
}
export type Data = {
    gifts: Array<Gift>,
    spaces: Array<TreeSpace>
}