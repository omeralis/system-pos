import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { ITEMS } from 'src/app/shared/model/Items/items';
import { STORE } from 'src/app/shared/model/store/store';
import { SUPPLIERS } from 'src/app/shared/model/supplier/supplier';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  StoreData: STORE[] = [];
  SupplierData: SUPPLIERS[] = [];
  ItemData: ITEMS[] = [];
  Tablelist: any = [];
  TotalCost = 0;
  constructor(private modalService: NgbModal, private Service: ServicesService) { }

  ngOnInit(): void {
    this.getStoreName();
    this.getSupplierName();
    this.getItemName();
  }
  open(content: any) {
    this.modalService.open(content);
  }
  getStoreName() {
    this.Service.getStore().subscribe((Response: any) => {
      Response.forEach((data: any) => {
        this.StoreData.push(data);
        // console.log('StoreData :',this.StoreData)
      });
    })
  }
  getSupplierName() {
    this.Service.getSupplier().subscribe((Response: any) => {
      Response.forEach((data: any) => {
        this.SupplierData.push(data);
        // console.log('StoreData :',this.SupplierData)
      });
    })
  }
  getItemName() {
    this.Service.getItem().subscribe((Response: any) => {
      Response.forEach((data: any) => {
        this.ItemData.push(data);
        // console.log('StoreData :',this.ItemData)
      });
    })
  }
  addList(listData: any) {
    console.log('listData :', listData)
    if (this.Tablelist.length == 0) {
      listData.quantity = 1;
      this.TotalCost = listData.quantity * listData.priceItem;
      console.log('listData.cost:' , listData.cost);
      this.Tablelist.push(listData);
      console.log('this.Tablelist :', this.Tablelist)
    }
    // else {
    //   for (let i = 0; i < this.Tablelist.length; i++) {
    //     if (this.Tablelist[i].itemName == listData.itemName) {
    //       break;
    //     }
    //     else if (this.Tablelist[i].itemNo != listData.itemNo && i + 1 == this.Tablelist.length) {
    //       this.Tablelist.push(listData);
    //       break;
    //     }
    //   }
    // }
  }
}
