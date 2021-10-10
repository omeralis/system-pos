import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { ITEMS } from 'src/app/shared/model/Items/items';
import { STORE } from 'src/app/shared/model/store/store';
import { SUPPLIERS } from 'src/app/shared/model/supplier/supplier';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @ViewChild("EditModel") EditModel:any;
  StoreData:STORE[]=[];
  items_store:ITEMS[]=[];
  supplier_store:SUPPLIERS[]=[];
  UpdataForm: FormGroup | any;
  isLoadingSave: boolean = false;
  responseMessage:any;
  submittedAdd = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public Service: ServicesService ,private formBuilder: FormBuilder) { }
  
  StoreForm = new FormGroup({
    id: new FormControl(null),
    purchaseNo: new FormControl(null,[Validators.required]),
    purchaseDate: new FormControl(null,[Validators.required]),
    itemNo: new FormControl(null,[Validators.required]),
    supplierNo: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required]),
    alarmQuantity: new FormControl(null,[Validators.required]),
    cost: new FormControl(null,[Validators.required]),
    priceItem: new FormControl(null,[Validators.required]),
    other: new FormControl(null),
  })
  private EditForm(): void {
    this.UpdataForm = this.formBuilder.group({
      id: [""],
      purchaseNo: [""],
      purchaseDate: [""],
      itemNo: [""],
      supplierNo: [""],
      quantity: [""],
      alarmQuantity: [""],
      cost: [""],
      priceItem: [""],
      other: [""]
    });
  }
  ngOnInit(): void {
    this.getdata();
    this.getItemName();
    this.getSupplierName();
    this.EditForm();
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(data: STORE) {
    this.modalService.open(this.EditModel);
    console.log(data);
    this.UpdataForm.controls["id"].setValue(data.id);
    this.UpdataForm.controls["purchaseNo"].setValue(data.purchaseNo);
    this.UpdataForm.controls["purchaseDate"].setValue(data.purchaseDate);
    this.UpdataForm.controls["priceItem"].setValue(data.priceItem);
    this.UpdataForm.controls["itemNo"].setValue(data.itemNo);
    this.UpdataForm.controls["supplierNo"].setValue(data.supplierNo);
    this.UpdataForm.controls["quantity"].setValue(data.quantity);
    this.UpdataForm.controls["alarmQuantity"].setValue(data.alarmQuantity);
    this.UpdataForm.controls["cost"].setValue(data.cost);
    this.UpdataForm.controls["other"].setValue(data.other);
  }
  getdata() {
    this.Service.getStore().subscribe(
      (StoreRespone:any) => {
        this.StoreData=StoreRespone;
        console.log(this.StoreData)
      }
    )
  }
  getItemName(){
    this.Service.getItem().subscribe(
      (StoreRespone:any) => {
        StoreRespone.forEach((data:any) => {
          this.items_store.push(data);
        });
      }
    )
  }
  getSupplierName(){
    this.Service.getSupplier().subscribe(
      (StoreRespone:any) => {
        StoreRespone.forEach((data:any) => {
          this.supplier_store.push(data);
        });
      }
    )
  }
  AddStore(){
    this.isLoadingSave = true;
    this.submittedAdd = true;
    this.Service.postStore(this.StoreForm.value).subscribe(
      (storeRespone)=>{
        this.isLoadingSave = false;
        this.getdata();
        console.log("storeRespone" , storeRespone)
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.isLoadingSave = false;
      },
      ()=>{
        // alert("seccess")
      }
    )
  }

  EditStore(){
    this.isLoadingSave = true;
      this.Service.EditStore(this.UpdataForm.value).subscribe(
        (StoreRespone) => {
          this.isLoadingSave = false;
          this.getdata();
          this.modalService.dismissAll();
        },
        (error) => {
          console.log(error);
          this.isLoadingSave = false;
        },
      )
    }

  get addSaveValid() {
    return this.StoreForm.controls;
  }
  get updataValid() {
    return this.UpdataForm.controls;
  }

}
