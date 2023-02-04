import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  
  // menu:any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {title: 'Main', url:'/'},
  //       {title: 'Progress bar', url:'progress'},
  //       {title: 'Grafica', url:'grafica1'},
  //       {title: 'Promesa', url:'promesa'},
  //       {title: 'Rxjs', url:'rxjs'},
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {title: 'Hospitales', url:'hospitales'},
  //       {title: 'Médicos', url:'medicos'},
  //       {title: 'Usuarios', url:'usuarios'},
  //     ]
  //   },
  // ]
  constructor() { }
}
