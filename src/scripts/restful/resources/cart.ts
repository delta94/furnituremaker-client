import { Product } from './Product';
import { Customer } from './customer';

export interface Cart {
    id: string;
    products: Product[];
    customer: Customer;
}