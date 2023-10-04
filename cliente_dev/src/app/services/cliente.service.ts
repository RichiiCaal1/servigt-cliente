import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// se importa el archivo global para el uso de la api
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//utilizar el JwtHelperService
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http:HttpClient,
  ) { 
    // se trae el localhost/api
    this.url = GLOBAL.url;
  }

  // Se coloca el mismo nombre del backend en routes de back
  login_cliente(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    // se concatena el nombre del metodo listar_clientes_filtro_admin y enviamos cabecera
    return this._http.post(this.url+'login_cliente',data,{headers:headers}); //se realiza el mismo procedimiento que en cliente.js
  }

  obtener_cliente_guest(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    // se concatena el nombre del metodo obtener_cliente_guest y enviamos cabecera
    return this._http.get(this.url+'obtener_cliente_guest/'+id,{headers:headers}); //se realiza el mismo procedimiento que en cliente.js
  }

  // Se coloca el mismo nombre del backend en routes de back
  actualizar_perfil_cliente_guest(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    // se concatena el nombre del metodo actualizar_perfil_cliente_guest y enviamos cabecera
    return this._http.put(this.url+'actualizar_perfil_cliente_guest/'+id,data,{headers:headers}); //se realiza el mismo procedimiento que en cliente.js
  }

  //metodo para definir el rol, funciona con true para tener el acceso y false de que no tiene el acceso
  
  public isAuthenticated():boolean{
    // se asigna el mismo de local storage para validar si hay un token
    //NOTA: get item regresa string | null, por lo que no se podria utilizar en decodeToken que acepta unicamente string, por lo que se declara que la constante puede ser string o nulo
    const token:string = localStorage.getItem('token') || '';

    if(!token){ // primera validacion: si no hay token que retorne falso y no permita entrar
      return false
    }
    try {// se utiliza try catch para agregar una excepcion y evitar errores dentro de los elementos del navegador
    // despues de veriricar que existe un token, se decodifica
      const helper = new JwtHelperService();
      //se define la const como var para poder utilizarlo en el ultimo retorno
      var decodedToken = helper.decodeToken(token);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if(!decodedToken){// segunda validacion: si el token es distinto, que retorne falso y no permita entrar
        //eliminamos el token que no coincide para optimizar los elementos usados
        localStorage.clear();
        return false      
      } 
    } catch (error) {
      //eliminamos el token que no coincide para optimizar los elementos usados
      localStorage.clear();
      return false       
    }
    //si no hay alguno de esos errores, dara acceso al elemento
    return true;
  }

   // Se coloca el mismo nombre del backend en routes de back
  obtener_config_publico():Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  // se concatena el nombre del metodo obtener_config_publico y enviamos cabecera
  return this._http.get(this.url+'obtener_config_publico',{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  listar_proveedores_publico(filtro:any):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  // se concatena el nombre del metodo listar_proveedores_publico y enviamos cabecera
  return this._http.get(this.url+'listar_proveedores_publico/'+filtro,{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  emitir_review_proveedor_cliente(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
  // se concatena el nombre del metodo emitir_review_proveedor_cliente y enviamos cabecera
  return this._http.post(this.url+'emitir_review_proveedor_cliente',data,{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  obtener_review_proveedor_cliente(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    // se concatena el nombre del metodo obtener_review_proveedor_cliente y enviamos cabecera
  return this._http.get(this.url+'obtener_review_proveedor_cliente/'+id,{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  obtener_reviews_cliente(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
  // se concatena el nombre del metodo obtener_reviews_cliente y enviamos cabecera
  return this._http.get(this.url+'obtener_reviews_cliente/'+id,{headers:headers});
  }

  registro_cliente(data:any):Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json'});
  // se concatena el nombre del metodo obtener_reviews_proveedor_publico y enviamos cabecera
  return this._http.post(this.url+'registro_cliente',data,{headers:headers}); //se realiza el mismo procedimiento que en proveedor.js
  }
}
