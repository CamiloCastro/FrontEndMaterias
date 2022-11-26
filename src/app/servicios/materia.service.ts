import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Materia } from '../modelos/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private clienteHttp: HttpClient) { }

  listar(): Observable<Materia[]> {
    return this.clienteHttp.get<Materia[]>(`${environment.url_api_gateway}/materias`);
  }

  crear(nuevaMateria: Materia): Observable<Materia> {
    return this.clienteHttp.post<Materia>(`${environment.url_api_gateway}/materia`, nuevaMateria);
  }

  actualizar(actualizarMateria: Materia): Observable<Materia> {
    let id = actualizarMateria._id;
    return this.clienteHttp.put<Materia>(`${environment.url_api_gateway}/materia/${id}`, actualizarMateria);
  }

  eliminar(id: string): Observable<Materia> {    
    return this.clienteHttp.delete<Materia>(`${environment.url_api_gateway}/materia/${id}`);
  }

  buscarNombre(nombre: string): Observable<Materia[]> {
    return this.clienteHttp.get<Materia[]>(`${environment.url_api_gateway}/materia/nombre/${nombre}`);
  }

}
