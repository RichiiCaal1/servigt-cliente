import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

//para usar el izitoast
declare var iziToast:any;
//para usar el formateo de los campos con cleavejs
declare var Cleave:any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto: any = {};
  // public load_btn = false;

  constructor(
    private _guestService: GuestService,
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
  }

  ngOnInit(): void {
    setTimeout(()=>{
      new Cleave('#cont-phone', {
          blocks: [8],
            uppercase: false
        });
      });
  }

  registro(registroForm:any){
    if(registroForm.valid){
      // this.load_btn = true;
      this._guestService.enviar_mensaje_contacto(this.contacto).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
              title: 'ÉXITO',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se envió correctamente el mensaje.'
          });
          this.contacto = {};
          // this.load_btn = false;
        }
      );
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
