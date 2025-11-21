export const last = (list: Array<any>): any | undefined => {
    if (!Array.isArray(list) || !list.length) {
        return undefined;
    }
    return list.at(-1);
};
