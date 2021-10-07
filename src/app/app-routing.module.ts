import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { GroupsComponent } from './Page/groups/groups.component';
import { ItemsComponent } from './Page/Items/items.component';
import { NewInvoiceComponent } from './Page/new-invoice/new-invoice.component';
import { SuppliersComponent } from './Page/suppliers/suppliers.component';

const routes: Routes = [
  {path: '',   redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'newinvoice', component: NewInvoiceComponent},
  {path: 'gorup', component: GroupsComponent},
  {path: 'item', component: ItemsComponent},
  {path: 'supplier', component: SuppliersComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
