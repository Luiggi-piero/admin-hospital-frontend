import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  menu:any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url:'/'},
        {title: 'Progress bar', url:'progress'},
        {title: 'Grafica', url:'grafica1'},
        {title: 'Promesa', url:'promesa'},
        {title: 'Rxjs', url:'rxjs'},
      ]
    },
  ]
  constructor() { }
}
