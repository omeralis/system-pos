import { orderLine } from "./orderLine";

export interface order{
    id?: number,
    customerNo?:string,
    saleDate?:string,
    storeNo :string,
    orderLine :orderLine[]
  }