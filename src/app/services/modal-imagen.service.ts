import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  // Informa de un cambio de la imagen en la bd
  public nuevaImagen: EventEmitter<string>= new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  constructor() {}

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // http://localhost:3000/api/upload/usuarios/df
  
    if(img.includes('https')){
      this.img = img;
    }else{
      const urlImg = `${base_url}/upload/${tipo}/${img}`;
      this.img = urlImg;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
