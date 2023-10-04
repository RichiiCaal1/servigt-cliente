import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// se importa el archivo global para el uso de la api
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(
    private _http:HttpClient,
  ) { 
    // se trae el localhost/api
    this.url = GLOBAL.url;
  }

  // Se coloca el mismo nombre del backend en routes de back
  obtener_proveedores_slug_publico(slug:any):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  // se concatena el nombre del metodo obtener_proveedores_slug_publico y enviamos cabecera
  return this._http.get(this.url+'obtener_proveedores_slug_publico/'+slug,{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  listar_proveedores_recomendados_publico(categoria:any):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  // se concatena el nombre del metodo listar_proveedores_recomendados_publico y enviamos cabecera
  return this._http.get(this.url+'listar_proveedores_recomendados_publico/'+categoria,{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  listar_proveedores_disponibles_publico():Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  // se concatena el nombre del metodo listar_proveedores_disponibles_publico y enviamos cabecera
  return this._http.get(this.url+'listar_proveedores_disponibles_publico/',{headers:headers});
  }

  // Se coloca el mismo nombre del backend en routes de back
  enviar_mensaje_contacto(data:any):Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  // se concatena el nombre del metodo listar_proveedores_disponibles_publico y enviamos cabecera
  return this._http.post(this.url+'enviar_mensaje_contacto',data,{headers:headers});
  }
  
  obtener_reviews_proveedor_publico(id:any):Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json'});
  // se concatena el nombre del metodo obtener_reviews_proveedor_publico y enviamos cabecera
  return this._http.get(this.url+'obtener_reviews_proveedor_publico/'+id,{headers:headers}); //se realiza el mismo procedimiento que en proveedor.js
  }

}
