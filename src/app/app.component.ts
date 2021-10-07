import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'POS';
  navbarOpen = false;
  constructor(private appService: ServicesService) {}
  // getClasses() {
  //   const classes = {
  //     'pinned-sidebar': this.appService.getSidebarStat().isSidebarPinned,
  //     'toggeled-sidebar': this.appService.getSidebarStat().isSidebarToggeled
  //   }
  //   return classes;
  // }
  // toggleSidebar() {
  //   this.appService.toggleSidebar();
  // }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
