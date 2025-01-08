import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { AccessDoneComponent } from './access-done/access-done.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LateralMenuComponent } from './access-done/lateral-menu/lateral-menu.component';
import { AdminStockComponent } from './access-done/admin-stock/admin-stock.component';
import { AgregarCantidadComponent } from './access-done/admin-stock/agregar-cantidad/agregar-cantidad.component';
import { VerDetallesComponent } from './access-done/admin-stock/ver-detalles/ver-detalles.component';
import { ListAllComponent } from './access-done/admin-stock/list-all/list-all.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AgregarAdminComponent } from './super-admin/agregar-admin/agregar-admin.component';
import { EditCantidadesComponent } from './access-done/admin-stock/edit-cantidades/edit-cantidades.component';
import { HeaderComponent } from './access-done/header/header.component';

import { PhonecasesComponent } from './access-done/admin-stock/phonecases/phonecases.component';
import { FilterBorderColorPipe } from './pipes/filter-border-color.pipe';



@NgModule({
  declarations: [AdminComponent, 
    LoginComponent,
     AccessDoneComponent, 
     LateralMenuComponent, 
     AdminStockComponent, 
     AgregarCantidadComponent,
      VerDetallesComponent,
       ListAllComponent,
        SuperAdminComponent, 
        AgregarAdminComponent, 
        EditCantidadesComponent, HeaderComponent, PhonecasesComponent, FilterBorderColorPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
})
export class AdminModule { }
