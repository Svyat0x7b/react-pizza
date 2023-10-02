import { calcTotalAmount } from "./calcTotalAmount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const items = localStorage.getItem('cart');
    const parsedItems = items ? JSON.parse(items) : [];
    if(parsedItems.length)  {
        return {
            items: parsedItems,
            totalPrice: calcTotalPrice(parsedItems),
            totalAmount: calcTotalAmount(parsedItems),
        }
    } 
    return {
        items: [],
        totalPrice: 0,
        totalAmount: 0,
    };
}