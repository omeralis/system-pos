import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { SUPPLIERS } from 'src/app/shared/supplier/supplier';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  @ViewChild("EditModel") EditModel:any;
  SupplierData:SUPPLIERS[]=[];
  result:any=[];
  UpdataForm: FormGroup | any;
  isLoadingSave: boolean = false;
  responseMessage:any;
  submittedAdd = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public Service: ServicesService ,private formBuilder: FormBuilder) { }
  SupplierForm = new FormGroup({
    id: new FormControl(null),
    supplierName: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required]),
    other: new FormControl(null),
  })

  ngOnInit(): void {
    this.getdata();
    this.EditForm();
  }
  private EditForm(): void {
    this.UpdataForm = this.formBuilder.group({
      id: [""],
      supplierName: [""],
      phone: [""],
      other: [""]
    });
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(data:SUPPLIERS) {
    console.log(data);
    this.modalService.open(this.EditModel);
    this.UpdataForm.controls["id"].setValue(data.id);
    this.UpdataForm.controls["supplierName"].setValue(data.supplierName);
    this.UpdataForm.controls["phone"].setValue(data.phone);
    this.UpdataForm.controls["other"].setValue(data.other);
  }
  getdata() {
    this.Service.getSupplier().subscribe(
      (GroupRespone) => {
        this.result= GroupRespone;
        this.SupplierData=this.result;
        console.log( this.SupplierData)
      }
    )
  }

  addNewSuppliers() {
    this.isLoadingSave = true;
    this.submittedAdd = true;
    this.Service.postSupplier(this.SupplierForm.value).subscribe(
      (SupplierRespone) => {
        console.log("result" , SupplierRespone);
          this.isLoadingSave = false;
           this.getdata();
           this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.isLoadingSave = false;
      },
      ()=>{
        // this.alertify.success("add success");
      }
    )
  }


  editGroup(){
    this.isLoadingSave = true;
      this.Service.EditSupplier(this.UpdataForm.value).subscribe(
        (SupplierRespone) => {
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
    return this.SupplierForm.controls;
  }
}
