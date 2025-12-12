import { presentsData } from "./data.ts";
import type { Data, Gift, TreeSpace } from "./types.ts";

export const splitData = (data: string): Data => {
    const gifts = Array<Gift>()
    const spaces = new Array<TreeSpace>();
    const spacesRows = data.split('\n');
    const giftsAsStrings = presentsData;

    spacesRows.forEach(space => {
        const splitted = space.split(' ');
        const size = splitted[0].split('x').map(x => Number(x))
        const giftsNeeded = splitted.filter((_, index) => index !== 0).map(x => Number(x));
        const treeSpace: TreeSpace = { size: {width: size[0], height: size[1]}, gifts: giftsNeeded};
        spaces.push(treeSpace);
    });

    giftsAsStrings.forEach(gift => {
        const rows = gift.split('\n');
        const giftReady = new Array<Array<'.' | '#'>>();
        rows.forEach(row => {
            giftReady.push(row.split('') as Array<'.' | '#'>)
        });
        gifts.push(giftReady);
    });
    return {
        gifts,
        spaces
    }
}