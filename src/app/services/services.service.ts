import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groups } from '../shared/model/groups/groups';
import { ITEMS } from '../shared/model/Items/items';
import { SUPPLIERS } from '../shared/model/supplier/supplier';
import { CUSTOMERS } from '../shared/model/customers/customers';
import { STORE } from '../shared/model/store/store';
import { orderLine } from '../shared/model/order/orderLine';
import { order } from '../shared/model/order/order';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ApiRoutes = {
    groupRoute: {
      group: 'group',
      itemOfgroup:'itemofgroup',
      edit: 'editgroup'
    },
    itemRoute: {
      item: 'item',
      edit: 'edititem'
    },
    supplierRoute:{
      supplier: 'supplier',
      edit: 'editsupplier'
    },
    customerRoute:{
      customer: 'customer',
      edit: 'editcustomer'
    },
    storeRoute:{
      store: 'store',
      edit: 'editstore'
    },
    orderRoute:{
      sales: 'order',
      salesline: 'orderline',
      // edit: 'editstore'
    }
  }

  url = 'http://127.0.0.1:8000/api/';

  isSidebarPinned = false;
  isSidebarToggeled = false;



  constructor(public http: HttpClient) { }
  // gorup 
  getGroups() {
    return this.http.get(this.url + this.ApiRoutes.groupRoute.group);
  }
  getItemOFGroups() {
    return this.http.get(this.url + this.ApiRoutes.groupRoute.itemOfgroup);
  }

  postGroups(nameGroup: any) {
    return this.http.post(this.url + this.ApiRoutes.groupRoute.group, nameGroup);
  }

  EditGroups(dataGroup: Groups) {
    return this.http.post(this.url + this.ApiRoutes.groupRoute.edit, dataGroup);
  }
  // item
  getItem() {
    return this.http.get(this.url + this.ApiRoutes.itemRoute.item);
  }
  postItem(ItemData: ITEMS) {
    return this.http.post(this.url + this.ApiRoutes.itemRoute.item, ItemData);
  }

  EditItem(dataItem: ITEMS) {
    return this.http.post(this.url + this.ApiRoutes.itemRoute.edit, dataItem);
  }
 // SUPPLIERS
 getSupplier() {
  return this.http.get(this.url + this.ApiRoutes.supplierRoute.supplier);
}
postSupplier(SupplierData: SUPPLIERS) {
  return this.http.post(this.url + this.ApiRoutes.supplierRoute.supplier, SupplierData);
}

EditSupplier(SupplierData: SUPPLIERS) {
  return this.http.post(this.url + this.ApiRoutes.supplierRoute.edit, SupplierData);
}
// CUSTOMERS
getCustomer() {
  return this.http.get(this.url + this.ApiRoutes.customerRoute.customer);
}
postCustomer(CustomerData: CUSTOMERS) {
  return this.http.post(this.url + this.ApiRoutes.customerRoute.customer, CustomerData);
}

EditCustomer(CustomerData: CUSTOMERS) {
  return this.http.post(this.url + this.ApiRoutes.customerRoute.edit, CustomerData);
}
//Store
getStore() {
  return this.http.get(this.url + this.ApiRoutes.storeRoute.store);
}
postStore(StoreData: STORE) {
  return this.http.post(this.url + this.ApiRoutes.storeRoute.store, StoreData);
}

EditStore(StoreData: STORE) {
  return this.http.post(this.url + this.ApiRoutes.storeRoute.edit, StoreData);
}
//Sales
postSales(SalesData: order) {
  return this.http.post(this.url + this.ApiRoutes.orderRoute.sales, SalesData);
}
postSalesLine(SalesLineData: orderLine) {
  return this.http.post(this.url + this.ApiRoutes.orderRoute.salesline, SalesLineData);
}
getLastOrder() {
  return this.http.get(this.url + this.ApiRoutes.orderRoute.sales);
}
}
