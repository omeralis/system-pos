import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groups } from '../shared/groups/groups';
import { ITEMS } from '../shared/Items/items';
import { SUPPLIERS } from '../shared/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ApiRoutes = {
    groupRoute: {
      group: 'group',
      edit: 'editgroup'
    },
    itemRoute: {
      item: 'item',
      edit: 'edititem'
    },
    supplierRoute:{
      supplier: 'supplier',
      edit: 'editsupplier'
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
 // item
 getSupplier() {
  return this.http.get(this.url + this.ApiRoutes.supplierRoute.supplier);
}
postSupplier(SupplierData: SUPPLIERS) {
  return this.http.post(this.url + this.ApiRoutes.supplierRoute.supplier, SupplierData);
}

EditSupplier(SupplierData: SUPPLIERS) {
  return this.http.post(this.url + this.ApiRoutes.supplierRoute.edit, SupplierData);
}
  // toggleSidebar() {
  //   this.isSidebarToggeled = !this.isSidebarToggeled;
  // }

  // toggleSidebarPin() {
  //   this.isSidebarPinned = !this.isSidebarPinned;
  // }

  // getSidebarStat() {
  //   return {
  //     isSidebarPinned: this.isSidebarPinned,
  //     isSidebarToggeled: this.isSidebarToggeled
  //   }
  // }

}
