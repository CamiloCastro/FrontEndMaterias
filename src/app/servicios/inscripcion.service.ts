import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Inscripcion } from '../modelos/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private clienteHttp: HttpClient) { }

  crear(nuevaInscripcion: Inscripcion) : Observable<Inscripcion> {
    return this.clienteHttp.post<Inscripcion>(`${environment.url_api_gateway}/inscripcion`, nuevaInscripcion);
  }

  eliminar(id: string) : Observable<Inscripcion> {
    return this.clienteHttp.delete<Inscripcion>(`${environment.url_api_gateway}/inscripcion/${id}`);
  }

  buscarPorEstudiante(idEstudiante: string): Observable<Inscripcion[]> {
    return this.clienteHttp.get<Inscripcion[]>(`${environment.url_api_gateway}/inscripcion/estudiante/${idEstudiante}`);
  }

}
