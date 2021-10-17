import { order } from "./order";

export interface orderLine{
    id?: number,
    orderId?: number,
    itemNo?:string,
    quantity?:number,
    unitPrice :number,
    subTotal :number,
    order:order;
  }