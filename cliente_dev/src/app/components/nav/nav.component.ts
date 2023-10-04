import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public token;
  public id;
  public user : any = undefined;
  public user_lc : any = undefined;
  public config_global:any={};
  public url;
  constructor(
    //servicio necesario para el metodo de obtener cliente
    private _clienteService : ClienteService,
    //necesario para redirigir en botones a otras paginas
    private _router : Router
  ){
    //token necesario
    this.token = localStorage.getItem('token');
    //id del usuario que se obtiene y esta en el local
    this.id = localStorage.getItem('_id');
    this.url = GLOBAL.url;
    //para usar el api que consulta las categorias
    this._clienteService.obtener_config_publico().subscribe(
      response=>{
        //para obtener las configuraciones del admin
        this.config_global = response.data;
        console.log(this.config_global);
        
      }
    )

    if(this.token){//hara el metodo de obtener cliente siempre y cuando tenga un token
      //metodo para obtener el cliente e indicarlo en el nav cuando inicie sesion
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
          this.user = response.data;
          //se almacena el objeto del cliente en el localstorage y se convierte a string
          localStorage.setItem('user_data',JSON.stringify(this.user));
          if(localStorage.getItem('user_data')){
            this.user_lc = localStorage.getItem('user_data');
            this.user_lc = JSON.parse(this.user_lc);
          }else{
            this.user_lc = undefined;
          }
        },error=>{
          this.user = undefined;
        }
      );
    }
  }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
    //necesario refrescar la pagina antes de vaciar el localstorage
    // window.location.reload();
  }
}
