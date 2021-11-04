import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { ValidatorsService } from 'src/app/services/Validators/validators.service';
import { CUSTOMERS } from 'src/app/shared/model/customers/customers';
import { order } from 'src/app/shared/model/order/order';
import { STORE } from 'src/app/shared/model/store/store';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers:[DatePipe]
})
export class SalesComponent implements OnInit {
  @ViewChild("contentvoucher") contentvoucher:any;
  ItemOfgroupData: any = [];
  AllItemData: any = [];
  PriceItem: any;
  active = 0;
  Total = 0;
  cartlist: any = [];
  customer: CUSTOMERS[] = [];
  StoreData: STORE[] = [];
  Unitprice:any;
  myDate : any;
  sumbit:boolean = false;
  voucherSales : any =[];
  resultSales:any = [];
  customerName:CUSTOMERS|undefined;
  SaleDate:order|undefined;
  OrderNo:any;
  invoiceTotle = 0;
  constructor(private modalService: NgbModal, public Service: ServicesService, private fb: FormBuilder ,private validatorsService:ValidatorsService) {
   }
  ngOnInit(): void {
    this.getItemOfGroup();
    this.getAllItem();
    this.GetCustomer();
    this.GetStore();
    this.myDataTime();
    this.watchFormSubmit();
  }

  CustomerForm = new FormGroup({
    id: new FormControl(null ,[Validators.required]),
    customerName: new FormControl(null),
    phone: new FormControl(null),
    other: new FormControl(null),
  });
  StoreForm = new FormGroup({
    id: new FormControl(null ,[Validators.required])
  });

  myDataTime(){
    let date: Date = new Date();
    date.setDate(date.getDate());
    let datePipe: DatePipe = new DatePipe('en-US');
    this.myDate =  datePipe.transform(date , 'yyyy-MM-dd')
  }
  getAllItem() {
    this.Service.getItem().subscribe((GroupRespone: any) => {
      this.AllItemData = GroupRespone;
    });
  }
  getItemOfGroup() {
    this.Service.getItemOFGroups().subscribe((GroupRespone: any) => {
      this.ItemOfgroupData = GroupRespone;
    });
  }
  GetCustomer() {
    this.Service.getCustomer().subscribe((GroupRespone: any) => {
      this.customer = GroupRespone;
    });
  }
  GetStore() {
    this.Service.getStore().subscribe((GroupRespone: any) => {
      this.StoreData = GroupRespone;
    })
  }
  changeQnty(cartQut: any, anty: any) {
    for (let i = 0; i < this.cartlist.length; i++) {
      if (this.cartlist[i] == cartQut)
        this.cartlist[i].quantity = anty;
      this.cartlist[i].subTotal = this.cartlist[i].quantity * this.cartlist[i].unitPrice;
    }
    this.calculateTotal();
  }
  changeQntymin(cartQut: any) {
    for (let i = 0; i < this.cartlist.length; i++) {
      if (this.cartlist[i] == cartQut && this.cartlist[i].quantity > 0)
        this.cartlist[i].quantity -= 1;
      this.cartlist[i].subTotal = this.cartlist[i].quantity * this.cartlist[i].unitPrice;
    }
    this.calculateTotal();
  }
  changeQntyPlus(cartQut: any) {
    for (let i = 0; i < this.cartlist.length; i++) {
      if (this.cartlist[i] == cartQut)
        this.cartlist[i].quantity += 1;
      this.cartlist[i].subTotal = this.cartlist[i].quantity * this.cartlist[i].unitPrice;
    }
    this.calculateTotal();
  }
  calculateTotal() {
    this.Total=0;
    this.cartlist.forEach((cart: any) => {
      this.Total += cart.subTotal;
    });
  }
  addToCart(cartToAdd: any) {
    if (this.cartlist.length == 0) {
      cartToAdd.quantity = 1;
      cartToAdd.unitPrice = cartToAdd.store_item[0].priceItem;
      cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
      cartToAdd.itemNo = cartToAdd.store_item[0].itemNo;
      this.cartlist.push(cartToAdd);
      this.calculateTotal();
    } else {
      for (let i = 0; i < this.cartlist.length; i++) {
        if (this.cartlist[i].id == cartToAdd.id) {
          this.cartlist[i].quantity += 1;
          cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
          this.calculateTotal();
          break;
        }
        else if (this.cartlist[i].itemNo != cartToAdd.itemNo && i + 1 == this.cartlist.length) {
          cartToAdd.quantity = 1;
          cartToAdd.unitPrice = cartToAdd.store_item[0].priceItem;
          cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
          cartToAdd.itemNo = cartToAdd.store_item[0].itemNo;
          this.cartlist.push(cartToAdd);
          this.calculateTotal();
          break;
        }
      }
    }
  }
  watchFormSubmit() {
    this.sumbit = true;
    this.validatorsService.submitedForm.subscribe((submit)=>{
       if(submit){
          this.StoreForm.markAllAsTouched;
          this.CustomerForm.markAllAsTouched;
       }
    })
  }
  AddIOrder() {
    if (this.CustomerForm.invalid) {
      this.CustomerForm.markAllAsTouched;
      return;
    }
    if (this.StoreForm.invalid) {
      this.StoreForm.markAllAsTouched;
      return;
    }
    
    let orderToPost: any = {
      customerNo:this.CustomerForm.value.id,
      saleDate: this.myDate,
      storeNo: this.StoreForm.value.id,
      data: this.cartlist
    };
    this.Service.postOrdersave(orderToPost).subscribe(
      (OrderRespone) => {
        // console.log(OrderRespone);
        this.resultSales = OrderRespone;
        // console.log('voucherSales :', this.resultSales)
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.Service.postInvoice(this.resultSales).subscribe((Response) =>{
          this.voucherSales = Response;
          console.log(this.voucherSales)
          this.OrderNo =  this.voucherSales[0].orderId;
          this.customerName = this.voucherSales[0].lines_order.order_customer.customerName;
          this.SaleDate = this.voucherSales[0].lines_order.saleDate;
          this.voucherSales.forEach((element:any) => {
            this.invoiceTotle += element.subTotal;
          });
        })
        this.modalService.open(this.contentvoucher);
        this.ResetToCart() ;
           }
    );
  }
  removeToCart(cartITem: any) {
    this.cartlist = this.cartlist.filter(
      (licenses: any) => JSON.stringify(licenses.id) !== JSON.stringify(cartITem.id)
    );
    this.calculateTotal();
  }
  ResetToCart(){
    this.cartlist=[];
    this.CustomerForm.reset();
    this.StoreForm.reset();
    this.active = 0;
    this.Total = 0;
  }
  get addCustomerValid() {
    return this.CustomerForm.controls;
  }
  get addStoreValid() {
    return this.StoreForm.controls;
  }
}
