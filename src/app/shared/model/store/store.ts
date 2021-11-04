import { ITEMS } from "../Items/items";
import { SUPPLIERS } from "../supplier/supplier";


export interface STORE{
    id?: number;
    storeName?:string;
    purchaseNo?: number;
    purchaseDate?: Date;
    priceItem?:number;
    itemNo?: number;
    supplierNo?: number;
    quantity?:string;
    alarmQuantity?:string;
    cost?:string;
    other?:number;
    supplier_store?:SUPPLIERS;
    items_store?:ITEMS;
  }
  