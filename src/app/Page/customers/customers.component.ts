import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { CUSTOMERS } from 'src/app/shared/model/customers/customers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild("EditModel") EditModel:any;
  customerData:CUSTOMERS[]=[];
  result:any=[];
  UpdataForm: FormGroup | any;
  isLoadingSave: boolean = false;
  responseMessage:any;
  submittedAdd = false;
  constructor( private modalService: NgbModal, public Service: ServicesService ,private formBuilder: FormBuilder) { }

  CustomerForm = new FormGroup({
    id: new FormControl(null),
    customerName: new FormControl(null,[Validators.required]),
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
      customerName: [""],
      phone: [""],
      other: [""]
    });
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(data:CUSTOMERS) {
    console.log(data);
    this.modalService.open(this.EditModel);
    this.UpdataForm.controls["id"].setValue(data.id);
    this.UpdataForm.controls["customerName"].setValue(data.customerName);
    this.UpdataForm.controls["phone"].setValue(data.phone);
    this.UpdataForm.controls["other"].setValue(data.other);
  }
  getdata() {
    this.Service.getCustomer().subscribe(
      (CustomerRespone) => {
        this.result= CustomerRespone;
        this.customerData=this.result;
        console.log( this.customerData)
      }
    )
  }

  addNewCustomer() {
    this.isLoadingSave = true;
    this.submittedAdd = true;
    this.Service.postCustomer(this.CustomerForm.value).subscribe(
      (CustomerRespone) => {
        console.log("result" , CustomerRespone);
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
      this.Service.EditCustomer(this.UpdataForm.value).subscribe(
        (CustomerRespone) => {
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
    return this.CustomerForm.controls;
  }
}
