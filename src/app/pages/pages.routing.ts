import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data:{title:'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data:{title:'Progress'}  },
          { path: 'grafica1', component: Grafica1Component, data:{title:'Grafica 1'}  },
          { path: 'account-settings', component: AccountSettingsComponent, data:{title:'Account settings'}  },
          { path: 'promesa', component: PromesaComponent, data:{title:'Promesa'}  },
          { path: 'rxjs', component: RxjsComponent, data:{title:'Rxjs'}  },
          { path: 'perfil', component: PerfilComponent, data:{title:'Perfil'}  },


          // Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, data:{title:'Administración de usuarios'}  },
          { path: 'medicos', component: MedicosComponent, data:{title:'Administración de médicos'}  },
          { path: 'medico/:id', component: MedicoComponent, data:{title:'Administración de médico'}  },
          { path: 'hospitales', component: HospitalesComponent, data:{title:'Administración de hospitales'}  },
        ],
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
