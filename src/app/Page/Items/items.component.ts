import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { ITEMS } from 'src/app/shared/model/Items/items';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { Groups } from 'src/app/shared/model/groups/groups';
import { units_item } from 'src/app/shared/model/units_item/units_item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @ViewChild("EditModel") EditModel:any;
  ItemData:ITEMS[]=[];
  GroupNameData:Groups[]=[];
  UnitNameData:units_item[]=[];
  submittedAdd = false;
  isLoadingSave: boolean = false;
  responseMessage:any;
  UpdataForm: FormGroup | any;
  imageSrc: any;
  constructor( public Service: ServicesService ,private modalService: NgbModal,private formBuilder: FormBuilder,) { }

  ItemForm = new FormGroup({
    id: new FormControl(null),
    itemName: new FormControl(null,[Validators.required]),
    groupNo: new FormControl(null,[Validators.required]),
    unitItem: new FormControl(null,[Validators.required]),
    Parcode: new FormControl(null,[Validators.required]),
    alarmQuantity: new FormControl(null,[Validators.required]),
    special: new FormControl(null,[Validators.required]),
    priceItem: new FormControl(null,[Validators.required]),
    Image: new FormControl(null)
  });
 
  private EditForm(): void {
    this.UpdataForm = this.formBuilder.group({
      id: [""],
      itemName: [""],
      groupNo: [""],
      unitItem: [""],
      Parcode: [""],
      alarmQuantity: [""],
      special: [""],
      priceItem: [""],
      Image: [""],
    });
  }

  ngOnInit(): void {
    this.getdata();
    this.getGruopName();
    this.getUnitName();
    this.EditForm();
  }
 
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log('reader' ,reader);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log('this.imageSrc ' , this.imageSrc );
         this.ItemForm.patchValue({
          fileSource: reader.result
        });
        console.log('this.imageSrc ' , this.ItemForm );
      };
    }
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
        console.log('ItemData',this.ItemData)
      }
    )
  }
getGruopName(){
  this.Service.getGroups().subscribe(
    (ItemRespone:any) => {
      ItemRespone.forEach((data:any) => {
        this.GroupNameData.push(data);
        console.log('GroupNameData :',this.GroupNameData)
      });
    }
  )
}
getUnitName(){
  this.Service.getUnit().subscribe(
    (UnitRespone:any) => {
      UnitRespone.forEach((data:any) => {
        this.UnitNameData.push(data);
        console.log('UnitNameData :',this.UnitNameData)
      });
    }
  )
}
  AddItem(){
    console.log('form' , this.ItemForm);
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
