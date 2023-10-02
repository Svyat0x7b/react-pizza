export type CartItem = {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    amount: number,
}

export interface ICartSliceState {
    totalPrice: number,
    totalAmount: number,
    items: CartItem[],
}