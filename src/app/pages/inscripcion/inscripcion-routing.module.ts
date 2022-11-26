import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscribirComponent } from './inscribir/inscribir.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListarComponent
  },
  {
    path: 'inscribir',
    component: InscribirComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionRoutingModule { }
