export const buildPath = (nodes: Set<string>): string => {
    const elements = Array.from(nodes.values());
    elements.sort();
    const result = elements.join('-')
    console.log(result);
    return result;
}