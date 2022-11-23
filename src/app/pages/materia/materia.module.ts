import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriaRoutingModule } from './materia-routing.module';
import { CrudComponent } from './crud/crud.component';


@NgModule({
  declarations: [    
    CrudComponent
  ],
  imports: [
    CommonModule,
    MateriaRoutingModule
  ]
})
export class MateriaModule { }
