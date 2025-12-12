import { splitData } from "./splitter.ts";

export const one = (data: string): number => {
    const giftsData = splitData(data);
    let result = 0;
    giftsData.spaces.forEach(space => {
        let sum = 0;
        space.gifts.forEach((gift, index) => {
            sum += gift * 3;
        });
        result += space.size.height * space.size.width / 3 < sum ? 0 : 1
    });
    return result
}
