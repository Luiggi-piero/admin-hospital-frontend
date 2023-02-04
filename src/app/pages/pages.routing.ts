import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Account settings' },
      },
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { title: 'Búsqueda' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { title: 'Grafica 1' },
      },
      { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' },
      },
      {
        path: 'promesa',
        component: PromesaComponent,
        data: { title: 'Promesa' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },

      // Mantenimientos
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'Administración de hospitales' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { title: 'Administración de médicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { title: 'Administración de médico' },
      },

      // Rutas del administrador
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { title: 'Administración de usuarios' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
