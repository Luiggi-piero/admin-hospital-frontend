import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from '../../models/hospital.model';

import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) =>
      this.busquedaTotal(termino)
    );
  }

  busquedaTotal(termino: string) {
    this.busquedasService.busquedaTotal(termino).subscribe((resp) => {
      console.log(resp);
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
    });
  }
}
