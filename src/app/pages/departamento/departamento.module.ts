import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { CrudComponent } from './crud/crud.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbIconModule,
  ]
})
export class DepartamentoModule { }
