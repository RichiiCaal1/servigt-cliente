import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  //inyectando el servicio y del router con el constructor
    constructor(
      private _clienteService: ClienteService,
      //para utilizar las redirecciones
      private _router:Router
    ){
  
    }
    
    canActivate():any{
      //si el metodo del servicio retorna falso, redirecciona al login
      if(!this._clienteService.isAuthenticated()){ //se define que los unicos que pueden ingresar al login son los usuarios con rol admin
        this._router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }