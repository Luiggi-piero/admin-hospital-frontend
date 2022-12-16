import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
// Declara que existe una funcion de manera global(ubicacion de la funcion 'assets/js/custom.js')
declare function customFunction(): any; 

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customFunction();
  }
}
