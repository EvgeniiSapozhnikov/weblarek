import {
    IApi,
    IOrder,
    IOrderResult,
    IProductsList,
} from "../../types";

export class WebLarekAPI {
    constructor(private api: IApi) {}

    getProducts(): Promise<IProductsList> {
        return this.api.get<IProductsList>('/product');
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order', order);
    }
}