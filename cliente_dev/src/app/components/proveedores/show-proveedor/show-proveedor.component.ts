import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';
import { GuestService } from 'src/app/services/guest.service';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

//para usar el tinyslider
declare var tns:any;
//para usar el lightGallery y usar previsualizaciones de imagenes en la pagina
declare var lightGallery:any;
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-show-proveedor',
  templateUrl: './show-proveedor.component.html',
  styleUrls: ['./show-proveedor.component.css']
})
export class ShowProveedorComponent implements OnInit {
  public token;
  public slug: any;
  public proveedor:any={};
  public url;
  public cliente : any = {};
  //para almacenar los proveedores recomendados
  public proveedores_rec : Array<any>=[];
  public id;
  public totalstar=5;
  public review:any={};

  public reviews : Array<any>=[];
  public page = 1;
  public pageSize = 15;
  //conteo de estrellas
  public count_five_star = 0;
  public count_four_star = 0;
  public count_three_star = 0;
  public count_two_star = 0;
  public count_one_star = 0;
  //puntos de sus reseñas
  public total_puntos = 0;
  //puntos maximos dependiendo de las reseñas que tenga cada proveedor
  public max_puntos =0;
  //para aplicar la formula de las variables de arriba
  public porcent_raiting = 0;
  public puntos_raiting = 0;
  //porcentaje individual de cada estrella
  public cinco_porcent = 0;
  public cuatro_porcent = 0;
  public tres_porcent = 0;
  public dos_porcent = 0;
  public uno_porcent = 0;

  constructor(
    private _route : ActivatedRoute,
    private _guestService : GuestService,
    private _clienteService : ClienteService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ){
     // Suscribirse al evento de navegación
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      // Restablecer la posición de desplazamiento a la parte superior de la página
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  });

  
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;

    if(this.id){
      this._clienteService.obtener_cliente_guest(this.id,this.token).subscribe(
        response=>{
          this.cliente = response.data;
          console.log(this.cliente);
        }
      );
    }else{
      console.log('No hay sesion activa');
    }

    this._route.params.subscribe(
      params=>{
        this.slug = params['slug'];
        console.log(this.slug);

        this._guestService.obtener_proveedores_slug_publico(this.slug).subscribe(
          response=>{
            //se obtiene todo el elemento del proveedor que corresponde al slug sleeccionado
            this.proveedor = response.data;

            //para mostrar las reviews del proveedor
            this._guestService.obtener_reviews_proveedor_publico(this.proveedor._id).subscribe(
              response=>{
                //para recorrer el dato y buscar el numero de estrellas
                response.data.forEach((element: any) => {
                  if(element.estrellas == 5){
                    this.count_five_star = this.count_five_star +1;
                  }else if(element.estrellas == 4){
                    this.count_four_star = this.count_four_star +1;
                  }else if(element.estrellas == 3){
                    this.count_three_star = this.count_three_star +1;
                  }else if(element.estrellas == 2){
                    this.count_two_star = this.count_two_star +1;
                  }else if(element.estrellas == 1){
                    this.count_one_star = this.count_one_star +1;
                  }

                  //porcentaje individual de cada estrella
                  this.cinco_porcent = (this.count_five_star*100)/response.data.length;
                  this.cuatro_porcent = (this.count_four_star*100)/response.data.length;
                  this.tres_porcent = (this.count_three_star*100)/response.data.length;
                  this.dos_porcent = (this.count_two_star*100)/response.data.length;
                  this.uno_porcent = (this.count_one_star*100)/response.data.length;

                  //rendimiento neto en puntos del proveedor en base a toda su calificacion
                  let puntos_cinco = 0;
                  let puntos_cuatro = 0;
                  let puntos_tres = 0;
                  let puntos_dos = 0;
                  let punto_uno = 0;

                  puntos_cinco = this.count_five_star * 5;
                  puntos_cuatro = this.count_four_star * 4;
                  puntos_tres = this.count_three_star * 3;
                  puntos_dos = this.count_two_star * 2;
                  punto_uno = this.count_one_star * 1;

                  this.total_puntos = puntos_cinco + puntos_cuatro + puntos_tres + puntos_dos + punto_uno;
                  //el numero de reseñas multiplicado por 5 porque es el valor maximo de estrellas
                  this.max_puntos = response.data.length * 5;
                  //aplicando la formula que determina porcentaje del desempeño con los valores del total con el maximo
                  this.porcent_raiting = parseFloat(((this.total_puntos * 100) / this.max_puntos).toFixed(2));
                  //porcentaje de los puntos del proveedor PD: no deberia pasar de 5
                  this.puntos_raiting = (this.porcent_raiting*5)/100;
                  console.log(this.puntos_raiting);



                });
                this.reviews = response.data;
              }
            );

            this._guestService.listar_proveedores_recomendados_publico(this.proveedor.categoria).subscribe(
              response=>{
                this.proveedores_rec = response.data;
                
              }
            );
          }
        );
      }
    );    
  }

  ngOnInit(): void {
    //para mostrar las imagenes, timeout para refrescar galeria
    setTimeout(()=>{
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });
      
      //para tener una galeria dentro de la pagina
      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

    //para mostrar los proveedores recomendados
    tns({
      container: '.cs-carousel-inner-two',
      controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
      navPosition: "top",
      controlsPosition: "top",
      mouseDrag: !0,
      speed: 600,
      autoplayHoverPause: !0,
      autoplayButtonOutput: !1,
      nav: false,
      controlsContainer: "#custom-controls-related",
      responsive: {
        0: {
          items: 1,
          gutter: 20
        },
        480: {
          items: 2,
          gutter: 24
        },
        700: {
          items: 3,
          gutter: 24
        },
        1100: {
          items: 4,
          gutter: 30
        }
      }
    });
    },500)



  }

  openModal(proveedor:any){
    this.review = {};
    this.review.proveedor = this.proveedor._id;
    this.review.cliente = this.cliente._id;

    console.log(this.review);
    
  }


  emitir(id:any){
    if(this.review.review){
      if(this.totalstar && this.totalstar >=0){
        this.review.estrellas = this.totalstar;

        console.log(this.review);
        this._clienteService.emitir_review_proveedor_cliente(this.review,this.token).subscribe(
          response=>{
            iziToast.show({
              title: 'ÉXITO',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Tu reseña ha sido agregada al proveedor'
          });
          $('#review-'+id).modal('hide');
          $('.modal-backdrop').removeClass('show');
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
          message: 'Ingrese una puntuación'
        });
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        // color rojo
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un mensaje de la reseña'
      });
    }
  }
}
