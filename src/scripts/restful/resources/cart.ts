import { Product } from './_product';
import { Customer } from './customer';

export interface Cart {
    readonly id: string;
    readonly products: Product[];
    readonly customer: Customer;
}