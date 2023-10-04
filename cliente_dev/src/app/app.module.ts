import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//importar los formularios de angular
import { FormsModule } from '@angular/forms';
//importar la libreria de HTTP
import { HttpClientModule } from '@angular/common/http';
//importacion para utilizar los modulos de paginacion de bootstrap
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
//importacion del modulo de starrating para las estrellas en la reseña
import { RatingModule } from 'ng-starrating';


//importamos el app routing
import { routing } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Statement } from '@angular/compiler';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SiderbarComponent } from './components/usuario/siderbar/siderbar.component';
import { IndexProveedorComponent } from './components/proveedores/index-proveedor/index-proveedor.component';
import { ShowProveedorComponent } from './components/proveedores/show-proveedor/show-proveedor.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { IndexReviewComponent } from './components/usuario/reviews/index-review/index-review.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    PerfilComponent,
    SiderbarComponent,
    IndexProveedorComponent,
    ShowProveedorComponent,
    ContactoComponent,
    IndexReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
