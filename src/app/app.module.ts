import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from "ng2-file-upload";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewInvoiceComponent } from './Page/new-invoice/new-invoice.component';
import { IconsModule } from './shared/icons/icons.module';
import { GroupsComponent } from './Page/groups/groups.component';
import { ToastsComponent } from './shared/toasts/toasts.component';
import { ItemsComponent } from './Page/Items/items.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SuppliersComponent } from './Page/suppliers/suppliers.component';
import { CustomersComponent } from './Page/customers/customers.component';
import { StoreComponent } from './Page/store/store.component';
import { SalesComponent } from './Page/sales/sales.component';
import { PurchaseComponent } from './Page/purchase/purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    NewInvoiceComponent,
    GroupsComponent,
    ToastsComponent,
    ItemsComponent,
    SuppliersComponent,
    CustomersComponent,
    StoreComponent,
    SalesComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IconsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FileUploadModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
