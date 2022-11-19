import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../modelos/estudiante.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private clienteHttp: HttpClient) { }

  listar() : Observable<Estudiante[]> {
    return this.clienteHttp.get<Estudiante[]>(`${environment.url_api_gateway}/estudiante`);
  }

  eliminar() {}

  crear() {}

  actualizar() {}


}
