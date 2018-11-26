import { IProductCategory } from 'app/shared/model//product-category.model';

export const enum Size {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL'
}

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    size?: Size;
    imageContentType?: string;
    image?: any;
    category?: string;
    productCategories?: IProductCategory[];
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number,
        public size?: Size,
        public imageContentType?: string,
        public image?: any,
        public category?: string,
        public productCategories?: IProductCategory[]
    ) {}
}
