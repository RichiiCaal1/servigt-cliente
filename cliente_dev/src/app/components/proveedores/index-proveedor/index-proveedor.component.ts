import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-proveedor',
  templateUrl: './index-proveedor.component.html',
  styleUrls: ['./index-proveedor.component.css']
})
export class IndexProveedorComponent implements OnInit {

  public config_global:any={};
  //variable para el filtro de la categoria
  public filter_categoria = '';
  //varaiable que contiene los proveedores a mostrar
  public proveedores : Array<any> =[];
  //parametro para buscar proveedores
  public filter_proveedores = '';
  //precargador
  public load_data = true;
  //url para concatenarlo al obtner las imagenes de los proveedores
  public url;
  //para el filtro de categorias del lado izquierdo de la pagina
  public filter_cat_proveedores = 'todos';
  //para saber en que ruta esta mi categoria
  public route_categoria:any;
  //variable para la paginacion
  public page = 1;
  //tamaño de cada paginacion
  public pageSize = 6;
  //variable para mostrar por orden los proveedores
  public sort_by = 'Defecto';

  constructor(
    private _clienteService:ClienteService,
    private _route: ActivatedRoute
  ){
    this.url=GLOBAL.url;
      //para usar el api que consulta las categorias
      this._clienteService.obtener_config_publico().subscribe(
        response=>{
          //para obtener las configuraciones del admin
          this.config_global = response.data;
        }
      )

      //para obtener la ruta de las categorias del nav
        this._route.params.subscribe(
          params=>{
            //el parametro que recibe el app routing en categorias del nav
            this.route_categoria = params['categoria'];
            if(this.route_categoria){
              this._clienteService.listar_proveedores_publico('').subscribe(
                response=>{
                  this.proveedores = response.data;
                  //se asigna a proveedores los proveedores de la bd de la categoria de la ruta seleccionada
                  this.proveedores = this.proveedores.filter(item=>item.categoria.toLowerCase()==this.route_categoria);
                  this.load_data = false;
                }
              );
            }else{
              this._clienteService.listar_proveedores_publico('').subscribe(
                response=>{
                  //se asigna a proveedores los proveedores de la bd
                  this.proveedores = response.data;
                  console.log(this.proveedores);
                  
                  this.load_data = false;
                }
              );
            }
          }
        );
  }

  ngOnInit(): void {
    
  }

  buscar_categorias(){
    if(this.filter_categoria){
      var search = new RegExp(this.filter_categoria, 'i');
      this.config_global.categorias = this.config_global.categorias.filter(
        (        item: { titulo: string; })=>search.test(item.titulo)
      );
    }else{
      this._clienteService.obtener_config_publico().subscribe(
        response=>{
          this.config_global = response.data;
        }
      )
    }
  }

  buscar_proveedor(){
    this._clienteService.listar_proveedores_publico(this.filter_proveedores).subscribe(
      response=>{
        //se asigna a proveedores los proveedores de la bd
        this.proveedores = response.data;
        this.load_data = false;
      }
    );
  }

  buscar_por_categoria(){
    if(this.filter_cat_proveedores == 'todos'){//si la seleccion es todos, listara a todos los proveedores
      this._clienteService.listar_proveedores_publico(this.filter_proveedores).subscribe(
        response=>{
  
          this.proveedores = response.data;
          this.load_data = false;
          
        }
      );
    }else{//si hay otra categoria que no es todos, solo buscara el item y listara solo esa categoria
      this._clienteService.listar_proveedores_publico(this.filter_proveedores).subscribe(
        response=>{
  
          this.proveedores = response.data;
          this.proveedores = this.proveedores.filter(item=>item.categoria==this.filter_cat_proveedores);
          this.load_data = false;
        }
      );
      
    }
  }

  reset_productos(){
    this.filter_proveedores = '';
    this._clienteService.listar_proveedores_publico('').subscribe(
      response=>{
        //se asigna a proveedores los proveedores de la bd
        this.proveedores = response.data;
        this.load_data = false;
      }
    );
  }

  orden_por(){
    if(this.sort_by == 'Defecto'){
      this._clienteService.listar_proveedores_publico('').subscribe(
        response=>{
          //se asigna a proveedores los proveedores de la bd
          this.proveedores = response.data;
          this.load_data = false;
        }
      );
    }else if(this.sort_by == 'azTitulo'){//algoritmo de ordenamiento por el valor seleccionado
      this.proveedores.sort(function (a, b) {
        
        if (a.nombres > b.nombres) {
          return 1;
        }
        if (a.nombres < b.nombres) {
          return -1;
        }
      
        return 0;
      });
    }else if(this.sort_by == 'zaTitulo'){//algoritmo de ordenamiento por el valor seleccionado
      this.proveedores.sort(function (a, b) {
        
        if (a.nombres < b.nombres) {
          return 1;
        }
        if (a.nombres > b.nombres) {
          return -1;
        }

        return 0;
      });
    }
    // else if(this.sort_by == 'Popularidad'){//algoritmo de ordenamiento
    //   this.proveedores.sort(function (a, b) {
        
    //     if (a.nventas < b.nventas) {
    //       return 1;
    //     }
    //     if (a.nventas > b.nventas) {
    //       return -1;
    //     }
    //     // a must be equal to b
    //     return 0;
    //   });
    // }
  }
}


