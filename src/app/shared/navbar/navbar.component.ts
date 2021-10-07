import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleNavbar() {
    console.log("sccess")
    this.navbarOpen = !this.navbarOpen;
  }
}
