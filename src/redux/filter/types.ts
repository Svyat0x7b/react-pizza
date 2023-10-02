export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'name',
    TITLE_ASC = '-name',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
  }

export type Sort = {
    name: string;
    sortProp: SortPropertyEnum;
}

export interface IFilterSliceState {
    searchValue: string;
    currPage: number;
    activeCategory: number;
    activeSort: Sort;
    category: number,
}