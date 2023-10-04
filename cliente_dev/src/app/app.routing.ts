import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { AuthGuard } from "./guards/auth.guard";
import { IndexProveedorComponent } from "./components/proveedores/index-proveedor/index-proveedor.component";
import { ShowProveedorComponent } from "./components/proveedores/show-proveedor/show-proveedor.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { IndexReviewComponent } from "./components/usuario/reviews/index-review/index-review.component";

const appRoute : Routes = [
    //se dirige al inicio.component
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    
    //modulo de perfil del cliente
    {path: 'cuenta/perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    //modulo de reseñas del cliente
    {path: 'cuenta/reviews', component: IndexReviewComponent, canActivate: [AuthGuard]},

    // ruta de proveedores sin guard porque se podra visualizar por todo el publico
    {path: 'proveedores', component: IndexProveedorComponent},
    {path: 'proveedores/categoria/:categoria', component: IndexProveedorComponent},
    //se utiliza el atributo de cada elemento del slug
    {path: 'proveedores/:slug', component: ShowProveedorComponent},

    //para entrar al mensaje de contacto
    {path: 'contacto', component: ContactoComponent},


]

export const appRoutingPorviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);