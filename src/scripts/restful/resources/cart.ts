import { Customer } from './customer';
import { ProductExtended } from './product';

export interface Cart {
    readonly id: string;
    readonly products: ProductExtended[];
    readonly customer: Customer;
}