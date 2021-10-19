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
  // Items:Groups[]=[];
  active = 0;
  cartlist: any = [];
  lastOrderID:any=[];
  dataOrder:orderLine[]=[];
  AddForm: FormGroup | any;
  Qut = 1;
  
	data=[
        {
          "orderId": 1,
          "itemNo": 1,
          "quantity": 1,
          "unitPrice": 1,
          "subTotal": 1
        },
          {
          "orderId": 1,
          "itemNo": 1,
          "quantity": 1,
          "unitPrice": 1,
          "subTotal": 1
        }
]

  constructor(
    private modalService: NgbModal,
    public Service: ServicesService,
    private formBuilder: FormBuilder,
  ) { }

  orderForm = new FormGroup({
    id: new FormControl(),
    customerNo: new FormControl(1,[Validators.required]),
    saleDate: new FormControl('2021-10-14',[Validators.required]),
    storeNo: new FormControl(1,[Validators.required])
  });
  orderLineForm = new FormGroup({
    id: new FormControl(null),
    orderId: new FormControl(this.orderForm.value.id,[Validators.required]),
    itemNo: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required]),
    unitPrice: new FormControl(null,[Validators.required]),
    subTotal: new FormControl(null,[Validators.required]),
  })
  private AddOrderForm() {
    this.AddForm = this.formBuilder.group({
      data:this.formBuilder.array([
        this.formBuilder.group({
          orderId: [1],
          itemNo:[null],
          quantity:[10],
          unitPrice:[null],
          subTotal:[null],
        }),
      ])
    });
  }

  ngOnInit(): void {
    this.getItemOfGroup();
    this.AddOrderForm();
    this.AddForm.get('data') as FormArray;
  }

  getItemOfGroup() {
    this.Service.getItemOFGroups().subscribe((GroupRespone: any) => {
      this.ItemOfgroupData = GroupRespone;
    });
  }
  addToCart(cartToAdd: any) {
    if (this.cartlist.length == 0) {
      this.cartlist.push(cartToAdd);
      console.log('1:');
    } else {

      for (let i=0; i <  this.cartlist.length; i++) {
        console.log("if tow :", i +"  ling",this.cartlist.length)
        if ( this.cartlist[i] == cartToAdd) 
        {
          this.Qut++;
          console.log('2:',  this.cartlist[i].itemName, cartToAdd.itemName);
          break;
        }
         else if( this.cartlist[i] != cartToAdd && i+1 ==this.cartlist.length)
         {
          this.cartlist.push(cartToAdd);
          console.log('3:',  this.cartlist[i].itemName, cartToAdd.itemName);
          break;
        }

      }
    }
  }

  AddIOrder(){
    this.Service.postSales(this.orderForm.value).subscribe(
      (OrderRespone)=>{
        this.modalService.dismissAll();
        this.lastOrderID = OrderRespone;
        this.AddForm.value.orderId = this.lastOrderID.id;
        console.log( this.AddForm.value.orderId)
        this.Service.postSalesLine(this.AddForm.value).subscribe(
          (OrderLineRespone)=>{
            this.modalService.dismissAll();
            console.log("OrderLineRespone" , OrderLineRespone);
          },
          (error) => {
            console.log(error);
          },
          ()=>{
          }
        )
        // }
      },
      (error) => {
        console.log(error);
      },
      ()=>{
       // alert("seccess")
      }
    );
  }

  get dataControls() {
    return this.AddForm.get('data') as FormArray;
 }
  removeToCart(cartITem: any) {
    this.cartlist.pop(cartITem);
  }
}
