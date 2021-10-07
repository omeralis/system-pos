import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string; 
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor() {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      title: "Dashboard",
      icon: "home",
      type: "link",
      path: "/home",
      active: false,
    },
    {
      title: "Clients",
      icon: "user",
      type: "link",
      path: "/clients",
      active: false,
    },
    {
      title: "Users",
      icon: "user",
      type: "link",
      path: "/users",
      active: false,
    },
    {
      title: "Quotations",
      icon: "edit",
      type: "link",
      path: "/quotations",
      active: false,
    },
    {
      title: "Policies",
      icon: "file",
      type: "link",
      path: "/policies",
      active: false,
    },
    {
      title: "Staff",
      type: "link",
      icon: "users",
      path: "/staffs",
      active: false,
    },
    {
      title: "Tickets Management",
      icon: "layers",
      type: "link",
      path: "/tickets",
      active: false,
    },
    {
      title: "Claims Management",
      icon: "layers",
      type: "link",
      path: "/claims",
      active: false,
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
