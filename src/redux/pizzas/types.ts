export type Pizza = {
    id: string,
    name:string,
    price: number,
    imageUrl: string,
    types: string[],
    sizes: number[]
    rating: number,
    category: number,
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}
export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };

export interface IPizzaSliceState {
    items: Pizza[];
    itemById: Pizza;
    status: Status;
}
