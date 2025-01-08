import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessDoneComponent } from './access-done/access-done.component';
import { AdminStockComponent } from './access-done/admin-stock/admin-stock.component';
import { AgregarCantidadComponent } from './access-done/admin-stock/agregar-cantidad/agregar-cantidad.component';
import { EditCantidadesComponent } from './access-done/admin-stock/edit-cantidades/edit-cantidades.component';
import { ListAllComponent } from './access-done/admin-stock/list-all/list-all.component';
import { PhonecasesComponent } from './access-done/admin-stock/phonecases/phonecases.component';

import { VerDetallesComponent } from './access-done/admin-stock/ver-detalles/ver-detalles.component';

import { AdminComponent } from './admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'access-done', component: AccessDoneComponent,
      canActivate: [AuthGuard], // Protección con el guard
      children: [
        { path: 'admin-stock', component: AdminStockComponent,
        children: [
          { path: '', component:PhonecasesComponent ,
              children: [
                { path:'phonecases/:type', component: ListAllComponent },
                { path:'phonecases/agregar-cantidad/:id/:nombre/:borderColor', component: AgregarCantidadComponent },
                { path:'phonecases/edit-quantity/:id/:nombre/:cantidad/:borderColor', component: EditCantidadesComponent },
                { path:'phonecases/ver-detalles/:itemId', component: VerDetallesComponent },
                
              ]}
          ] },
        { path: '', redirectTo: 'details', pathMatch: 'full' } // Redirección por defecto en access-done
      ]
      
    },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección por defecto
      { path: 'super-admin', component: SuperAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
