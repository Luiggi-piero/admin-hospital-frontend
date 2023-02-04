import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
// Declara que existe una funcion de manera global(ubicacion de la funcion 'assets/js/custom.js')
declare function customFunction(): any; 

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  

  constructor(private settingsService: SettingsService, private sidebarService:SidebarService) {}
  ngOnInit(): void {
    customFunction();
    this.sidebarService.cargarMenu();
  }
}
