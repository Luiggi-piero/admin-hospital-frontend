import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.crearFormulario();

    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.medicoForm.get('hospital').valueChanges.subscribe((hospId) => {
      this.hospitalSeleccionado = this.hospitales.find((h) => h._id === hospId);
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') return;

    this.medicoService.cargarMedicoPorID(id).subscribe({
      next: (medico) => {
        const {
          nombre,
          hospital: { _id },
        } = medico;

        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/dashboard/medicos']);
      },
    });
  }

  crearFormulario() {
    this.medicoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      hospital: new FormControl('', Validators.required),
    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };

      this.medicoService.actualizarMedico(data).subscribe((resp) => {
        Swal.fire('Médico actualizado', nombre, 'success');
      });
    } else {
      // Crear
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Médico creado', `${nombre} fue creado`, 'success');
          this.router.navigate(['/dashboard/medico', resp.medico._id]);
        });
    }
  }
}
