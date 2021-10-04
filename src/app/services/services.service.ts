import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Groups } from '../shared/groups/groups';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url= 'http://127.0.0.1:8000/api/group/';
  url2= 'http://127.0.0.1:8000/api/editgroup/';

  isSidebarPinned = false;
  isSidebarToggeled = false;


  
  constructor(public http:HttpClient) { }
  getGroups(){
    return this.http.get(this.url);
  }

  postGroups(nameGroup:any){
    return this.http.post(this.url , nameGroup);
  }

  EditGroups(dataGroup:Groups){
    return this.http.post(this.url2 , dataGroup);
  }


  toggleSidebar() {
    this.isSidebarToggeled = ! this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = ! this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    }
  }
 
}
