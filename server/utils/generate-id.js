export const generateId = (data) => {
    const lastItem = data[data.length];
    return lastItem ? lastItem.id + 1 : data.length + 1;
}