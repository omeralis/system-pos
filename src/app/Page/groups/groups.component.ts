import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import { Groups } from 'src/app/shared/model/groups/groups';
import { AlertifyServiceService } from 'src/app/services/Alertify/alertify-service.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @ViewChild("EditModel") EditModel:any;
  myform: FormGroup | undefined;
  submittedAdd = false;
  groupsData:Groups[]=[];
  result:any=[];
  UpdataForm: FormGroup | any;
  isLoadingSave: boolean = false;
  responseMessage:any;
  constructor(config: NgbModalConfig, private modalService: NgbModal, public groupService: ServicesService , 
    private formBuilder: FormBuilder,private alertify: AlertifyServiceService,) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  groupForm = new FormGroup({
    id: new FormControl(null),
    nameGroup: new FormControl(null,[Validators.required])
  })


  ngOnInit(): void {
    this.myform = new FormGroup({
      groupForm: new FormGroup({
        nameGroup: new FormControl('', Validators.required),
      }),
    });
    this.EditForm();
    this.gitdata();
  }
  private EditForm(): void {
    this.UpdataForm = this.formBuilder.group({
      id: [""],
      nameGroup: [""],
    });
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(data:Groups) {
    console.log(data);
    this.modalService.open(this.EditModel);
    this.UpdataForm.controls["id"].setValue(data.id);
    this.UpdataForm.controls["nameGroup"].setValue(data.nameGroup);
  }

  gitdata() {
    this.groupService.getGroups().subscribe(
      (GroupRespone) => {
        this.result= GroupRespone;
        this.groupsData=this.result;
        console.log( this.groupsData)
      }
    )
  }

  addNewGroup() {
    this.isLoadingSave = true;
    this.submittedAdd = true;
    this.groupService.postGroups(this.groupForm.value).subscribe(
      (GroupRespone) => {
        console.log("result" , GroupRespone);
          this.isLoadingSave = false;
           this.gitdata();
           this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.isLoadingSave = false;
      },
      ()=>{
        this.alertify.success("add success");
      }
    )
  }
editGroup(){
  this.isLoadingSave = true;
    this.groupService.EditGroups(this.UpdataForm.value).subscribe(
      (GroupRespone) => {
        this.isLoadingSave = false;
        this.gitdata();
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
        this.isLoadingSave = false;
      },
    )
  }


  get addSaveValid() {
    return this.groupForm.controls;
  }
  get updataStaffValid() {
    return this.UpdataForm.controls;
  }
  

}
