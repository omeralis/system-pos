import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { ITEMS } from 'src/app/shared/Items/items';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { Groups } from 'src/app/shared/groups/groups';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @ViewChild("EditModel") EditModel:any;
  ItemData:ITEMS[]=[];
  GroupNameData:Groups[]=[];
  submittedAdd = false;
  isLoadingSave: boolean = false;
  responseMessage:any;
  UpdataForm: FormGroup | any;
  constructor( public Service: ServicesService ,private modalService: NgbModal,private formBuilder: FormBuilder,) { }

  ItemForm = new FormGroup({
    id: new FormControl(null),
    itemName: new FormControl(null,[Validators.required]),
    groupNo: new FormControl(null,[Validators.required])
  })
  private EditForm(): void {
    this.UpdataForm = this.formBuilder.group({
      id: [""],
      itemName: [""],
      groupNo: [""],
    });
  }

  ngOnInit(): void {
    this.getdata();
    this.getGruopName();
    this.EditForm();
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(data: ITEMS) {
    this.modalService.open(this.EditModel);
    console.log(data.groups?.nameGroup);
    this.UpdataForm.controls["id"].setValue(data.id);
    this.UpdataForm.controls["itemName"].setValue(data.itemName);
    this.UpdataForm.controls["groupNo"].setValue(data.groups?.id);
  }
  getdata() {
    this.Service.getItem().subscribe(
      (ItemRespone:any) => {
        this.ItemData =ItemRespone;
      }
    )
  }
getGruopName(){
  this.Service.getGroups().subscribe(
    (ItemRespone:any) => {
      ItemRespone.forEach((data:any) => {
        this.GroupNameData.push(data);
      });
    }
  )
}
  AddItem(){
    this.isLoadingSave = true;
    this.submittedAdd = true;
    this.Service.postItem(this.ItemForm.value).subscribe(
      (ItemRespone)=>{
        this.isLoadingSave = false;
        this.getdata();
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.isLoadingSave = false;
      },
      ()=>{
        alert("seccess")
      }
    )
  }
  editItem(){
    this.isLoadingSave = true;
      this.Service.EditItem(this.UpdataForm.value).subscribe(
        (GroupRespone) => {
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
    return this.ItemForm.controls;
  }
  get updataValid() {
    return this.UpdataForm.controls;
  }


}
