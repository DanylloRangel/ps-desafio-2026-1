import { categoryType } from "./category";

export type sportsItemType = {
    id: string;
    name: string;
    brand: string;
    price: number | string;
    year: number | string;
    image: string;
    category: categoryType;
    amount: number;
}