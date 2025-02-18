import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuDesplegadoComponent } from './components/header/menu-desplegado/menu-desplegado.component';
import { PromosComponent } from './promos/promos.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsapComponent } from './components/whatsap/whatsap.component';
import { HomeCoversMuestrasComponent } from './pages/home/home-covers-muestras/home-covers-muestras.component';
import { ScrollAnimationDirective } from './pages/home/directives/scroll-animation.directive';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarseComponent } from './pages/cuenta/registrarse/registrarse.component';
import { AccederComponent } from './pages/cuenta/acceder/acceder.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrearComponent } from './pages/crear/crear.component';
import { AuthInterceptor } from './pages/admin/core/auth.interceptor';
import { PersonalizeComponent } from './pages/crear/personalize/personalize.component';
import {MatStepperModule} from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChoiceCaseComponent } from './pages/crear/choice-case/choice-case.component';
import { IphoneCover2dComponent } from './pages/crear/iphone-cover2d/iphone-cover2d.component';
import { IphoneCover3dComponent } from './pages/crear/iphone-cover3d/iphone-cover3d.component';

import { SuccessComponent } from './pages/payment/success/success.component';
import { CancelComponent } from './pages/payment/cancel/cancel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserDetailComponent } from './pages/crear/personalize/user-detail/user-detail.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { HeaderAlternativoComponent } from './components/header-alternativo/header-alternativo.component';
import { ContenedorTopAlternativoComponent } from './pages/home/contenedor-top-alternativo/contenedor-top-alternativo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuDesplegadoComponent,
    PromosComponent,
    FooterComponent,
    WhatsapComponent,
    HomeCoversMuestrasComponent,
    ScrollAnimationDirective,
    ContactComponent,
    HomeComponent,
    CuentaComponent,
    RegistrarseComponent,
    AccederComponent,
    CrearComponent,
    PersonalizeComponent,
    ChoiceCaseComponent,
    IphoneCover2dComponent,
    IphoneCover3dComponent,
    SuccessComponent,
    CancelComponent,
    UserDetailComponent,
    ServerErrorComponent,
    HeaderAlternativoComponent,
    ContenedorTopAlternativoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [ {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
