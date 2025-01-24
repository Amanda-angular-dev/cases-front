import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { ChoiceCaseComponent } from './pages/crear/choice-case/choice-case.component';
import { CrearComponent } from './pages/crear/crear.component';
import { IphoneCover2dComponent } from './pages/crear/iphone-cover2d/iphone-cover2d.component';
import { IphoneCover3dComponent } from './pages/crear/iphone-cover3d/iphone-cover3d.component';
import { PersonalizeComponent } from './pages/crear/personalize/personalize.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { HomeComponent } from './pages/home/home.component';
import { CancelComponent } from './pages/payment/cancel/cancel.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { ServerErrorComponent } from './server-error/server-error.component';


const routes: Routes = [
  { path:'contact',component:ContactComponent},
  { path: 'server-error', component: ServerErrorComponent },
  {path:'home',component:HomeComponent},
  {path:'mi-cuenta',component:CuentaComponent},
  {path:'create',component:CrearComponent,
  children: [
    { path: '', redirectTo: 'choice-case', pathMatch: 'full' },
    { path: 'personalize', component: PersonalizeComponent },
    { path: 'choice-case', component: ChoiceCaseComponent },
    { path: 'iphone-cover-2d', component: IphoneCover2dComponent },
    { path: 'iphone-cover-3d', component: IphoneCover3dComponent },
  ],},
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'home' } // Redirección para rutas no válidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
