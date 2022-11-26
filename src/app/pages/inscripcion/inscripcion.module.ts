import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionRoutingModule } from './inscripcion-routing.module';
import { ListarComponent } from './listar/listar.component';
import { InscribirComponent } from './inscribir/inscribir.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarComponent,
    InscribirComponent
  ],
  imports: [
    CommonModule,
    InscripcionRoutingModule,
    NbCardModule,
    ngFormsModule,
  ]
})
export class InscripcionModule { }
