import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from 'src/app/services/services.service';
import { Groups } from 'src/app/shared/model/groups/groups';

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
  Qut = 1;
  constructor(
    private modalService: NgbModal,
    public Service: ServicesService,
    private formBuilder: FormBuilder
  ) { }

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

  removeToCart(cartITem: any) {
    this.cartlist.pop(cartITem);
  }
}
