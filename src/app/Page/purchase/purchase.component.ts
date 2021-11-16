import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  PurchaseData:any = []
  isLoadingSave: boolean = false;
  TotalCost = 0;
  myDate : any;
  selectedItem = null;
  resultPurchase:any = [];
  constructor(private modalService: NgbModal, private Service: ServicesService) { }

  ngOnInit(): void {
    this.getStoreName();
    this.getSupplierName();
    this.getItemName();
    this.GetPurchase();
  }
  PurchaseStoreForm = new FormGroup({
    id: new FormControl(null),
    store: new FormControl(null),
  });
  PurchaseSupplierForm = new FormGroup({
    id: new FormControl(null),
    supplier: new FormControl(null),
  });
  PurchaseForm = new FormGroup({
    purchaseStatus: new FormControl(null),
    purchaseDate: new FormControl(null),
  });
  myDataTime(){
    let date: Date = new Date();
    date.setDate(date.getDate());
    let datePipe: DatePipe = new DatePipe('en-US');
    this.myDate =  datePipe.transform(date , 'yyyy-MM-dd')
  }
  open(content: any) {
    this.modalService.open(content , { size: 'lg' });
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
        console.log('StoreData :',this.ItemData)
      });
    })
  }
  changeQnty(cartQut: any, anty: any) {
    for (let i = 0; i < this.Tablelist.length; i++) {
      if (this.Tablelist[i] == cartQut)
        this.Tablelist[i].quantity = anty;
      this.Tablelist[i].subTotal = this.Tablelist[i].quantity * this.Tablelist[i].unitPrice;
    }
  }
  addList(listData: any) {
    console.log('listData :', listData);
     listData =  this.ItemData.find((i:any)=>
      i.id===listData
    );
    listData.item = listData.id;
    listData.cost =listData.priceItem;
    console.log('listData' , listData)
    if (this.Tablelist.length == 0) {
      listData.quantity = 1;
      listData.subTotal  = listData.quantity * listData.priceItem;
       this.Tablelist.push(listData);
      console.log('Tablelist :' , this.Tablelist)
    }  
    else {
      for (let i = 0; i < this.Tablelist.length; i++) {
        if (this.Tablelist[i].id == listData.id) {
          listData.quantity += 1;
          listData.subTotal  = listData.quantity * listData.priceItem;
          break;
        }
        else if (this.Tablelist[i].id != listData.id && i + 1 == this.Tablelist.length) {
      listData.quantity = 1;
      listData.subTotal  = listData.quantity * listData.priceItem;
       this.Tablelist.push(listData);
          break;
        }
      }
    }
  }
  GetPurchase(){
    this.Service.getPurchase().subscribe(
      (PurchaseRespone:any)=>{
        this.PurchaseData = PurchaseRespone;
        console.log('data :' , this.PurchaseData);
    })
  }
  AddPurchase(){
    this.isLoadingSave = true;
    let PurchaseToPost: any = {
      store:this.PurchaseStoreForm.value.id,
      supplier:this.PurchaseSupplierForm.value.id,
      purchaseStatus:1,
      purchaseDate:this.PurchaseForm.value.purchaseDate,
      data: this.Tablelist
    };
    console.log('purchaseDate' , PurchaseToPost)
      this.Service.postPurchase(PurchaseToPost).subscribe(
        (PurchaseRespone) => {
        this.isLoadingSave = false;
          this.resultPurchase = PurchaseRespone;
          console.log('this.resultPurchase :' , this.resultPurchase )
        },
        (error) => {
        this.isLoadingSave = false;
          console.log(error);
        },
        () => {
          this.Tablelist =[];
          this.PurchaseStoreForm.reset();
          this.PurchaseSupplierForm.reset();
          this.PurchaseForm.reset();
          this.GetPurchase();
          this.modalService.dismissAll();
             }
      );
    }

}
