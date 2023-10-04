import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgForm } from '@angular/forms';

//para utilizar las alertas mejoradas de iziToast
declare var iziToast:any;
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variable para el usuario
  public user : any = {};
  public user_new : any = {};
  public usuario : any = {};
  public token;


  constructor(
    //para el enrutado
    private _router : Router,
    //para utilizar el servicio de cliente y tomar la data del cliente que esta ingresando
    private _clienteService:ClienteService
  ){
    //toma el token del localstorage y analizarlo para que cuando logee, no ingrese al login
    this.token = localStorage.getItem('token');
    //condicional para cuando se tenga un token no ingrese al login
    if(this.token){
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    
  }

  login(loginForm:any){
    if(loginForm.valid){
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteService.login_cliente(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: response.message
            });
          }else{
            //guardamos la data del usuario en thisusuario
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);

            //cuando inicie sesion, lo dirige a la pagina de inicio
            this._router.navigate(['/']);

          }
         
        },
        error=>{
          console.log(error);
          
        }
      );
      
    }else{
      iziToast.show({
        title: 'ERROR',
        // color rojo
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      });
    }
  }

  registro(registroForm:NgForm){
    if(registroForm.valid){
      let data = {
        nombres: this.user_new.nombres,
        apellidos: this.user_new.apellidos,
        email: this.user_new.email,
        password: this.user_new.password
      }
      this._clienteService.registro_cliente(data).subscribe(
        response=>{
          iziToast.show({
              title: 'MENSAJE',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: response.message
          });
        }
      );
      registroForm.resetForm();
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
    });
    }
  }

}
