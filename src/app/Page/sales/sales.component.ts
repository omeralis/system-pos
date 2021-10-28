import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { Groups } from 'src/app/shared/model/groups/groups';
import { orderLine } from 'src/app/shared/model/order/orderLine';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  ItemOfgroupData: any = [];
  PriceItem: any;
  // Items:Groups[]=[];
  active = 0;
  cartlist: any = [];
  lastOrderID: any = [];
  dataOrder: orderLine[] = [];
  // AddForm: FormGroup | any;
  Qut = 1;
// a:any;
  // orderNo: any;

  constructor(private modalService: NgbModal, public Service: ServicesService, private formBuilder: FormBuilder,) { }

  orderForm = new FormGroup({
    id: new FormControl(),
    customerNo: new FormControl(1, [Validators.required]),
    saleDate: new FormControl('2021-10-14', [Validators.required]),
    storeNo: new FormControl(1, [Validators.required])
  });
  // orderLineForm = new FormGroup({
  //   id: new FormControl(null),
  //   orderId: new FormControl(this.orderForm.value.id,[Validators.required]),
  //   itemNo: new FormControl(null,[Validators.required]),
  //   quantity: new FormControl(null,[Validators.required]),
  //   unitPrice: new FormControl(null,[Validators.required]),
  //   subTotal: new FormControl(null,[Validators.required]),
  // })


  ngOnInit(): void {
    this.getItemOfGroup();
  }

  getItemOfGroup() {
    this.Service.getItemOFGroups().subscribe((GroupRespone: any) => {
      this.ItemOfgroupData = GroupRespone;
    });
  }

  addToCart(cartToAdd: any) {
    if (this.cartlist.length == 0) {
      cartToAdd.quantity = 1;
     
      cartToAdd.unitPrice = cartToAdd.store_item[0].priceItem;
      cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;

      this.cartlist.push(cartToAdd);
    } else {
      for (let i = 0; i < this.cartlist.length; i++) {
        if (this.cartlist[i] == cartToAdd) {
          this.cartlist[i].quantity += 1;
          cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
          break;
        }
        else if (this.cartlist[i] != cartToAdd && i + 1 == this.cartlist.length) {
          cartToAdd.quantity = 1;

          cartToAdd.unitPrice = cartToAdd.store_item[0].priceItem;
          cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
          this.cartlist.push(cartToAdd);
          break;
        }

      }
    }
  }

  AddIOrder() {
    this.Service.postSales(this.orderForm.value).subscribe(
      (OrderRespone) => {
        this.modalService.dismissAll();
        this.lastOrderID = OrderRespone;
        console.log('this.cartlist 1 :', this.cartlist);
        this.cartlist.orderId = this.lastOrderID.id,
        console.log(this.cartlist.orderId);
        this.Service.postSalesLine(this.cartlist).subscribe(
          (OrderLineRespone) => {
            console.log("OrderLineRespone", OrderLineRespone);
          },
          (error) => {
            console.log(error);
          },
          () => {
          }
        )
      },
      (error) => {
        console.log(error);
      },
      () => {
        // alert("seccess")
      }
    );
  }


  removeToCart(cartITem: any) {
    this.cartlist.pop(cartITem);
  }
}
