import { Customer } from './customer';
import { Product } from './product';

export interface Cart {
    readonly id: string;
    readonly products: Product[];
    readonly customer: Customer;
}