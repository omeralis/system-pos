import { Groups } from "../groups/groups";
import { units_item } from "../units_item/units_item";

export interface ITEMS{
    id?: number;
    itemName?:string;
    groupNo?:number;
    unitItem?:string;
    Parcode?:number;
    alarmQuantity?:number;
    special?:number;
    priceItem?:number;
    Image?:string;
    units_item?:units_item;
    groups?:Groups;
  }