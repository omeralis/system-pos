import { ITEMS } from "../Items/items";
import { SUPPLIERS } from "../supplier/supplier";


export interface STORE{
    id?: number;
    purchaseNo?: number;
    purchaseDate?: Date;
    itemNo?: number;
    supplierNo?: number;
    quantity?:string;
    alarmQuantity?:string;
    cost?:string;
    other?:number;
    supplier?:SUPPLIERS;
    item?:ITEMS;
  }
  