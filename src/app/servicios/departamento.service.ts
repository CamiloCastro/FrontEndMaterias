import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Departamento } from '../modelos/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private clienteHttp: HttpClient) { }

  listar(): Observable<Departamento[]> {
    return this.clienteHttp.get<Departamento[]>(`${environment.url_api_gateway}/departamento`);
  }

  crear(nuevoDepartamento: Departamento): Observable<Departamento> {
    return this.clienteHttp.post<Departamento>(`${environment.url_api_gateway}/departamento`, nuevoDepartamento);
  }

  eliminar(id: string): Observable<Departamento> {
    return this.clienteHttp.delete<Departamento>(`${environment.url_api_gateway}/departamento/${id}`);
  }

  actualizar(departamentoActualizar: Departamento): Observable<Departamento> {
    let id = departamentoActualizar._id;
    return this.clienteHttp.put<Departamento>(`${environment.url_api_gateway}/departamento/${id}`, departamentoActualizar);
  }
  
}
