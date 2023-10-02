export const calcTotalAmount = (items) => {
    return items ? items.reduce((sum, obj) => {
        return obj.amount + sum;
    }, 0) : 0;
}