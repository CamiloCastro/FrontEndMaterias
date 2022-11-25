import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { info } from 'console';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  elUsuario = new BehaviorSubject<Usuario>(new Usuario())

  constructor(private clienteHttp: HttpClient) { 
    this.verificarSesionActual();
  }

  public get usuarioSesionActiva(): Usuario {
    return this.elUsuario.value;
  }

  setUsuario(user: Usuario) {
    this.elUsuario.next(user)
  }

  getUsuario() {
    return this.elUsuario.asObservable();
  }

  login(infoUsuario: Usuario): Observable<Usuario> { 
    return this.clienteHttp.post<Usuario>(`${environment.url_api_gateway}/login`, infoUsuario);
  }

  guardarDatosSesion(datosSesion: any) { 

    let data: Usuario = {
      _id: datosSesion.user_id,
      token: datosSesion.token
    }

    localStorage.setItem("sesion", JSON.stringify(data));
    this.setUsuario(data)

  }

  logout() { 
    localStorage.removeItem("sesion")
    this.setUsuario(new Usuario())
  }

  verificarSesionActual() { 

    let sesionActual = this.getDatosSesion();

    if(sesionActual) {
      this.setUsuario(JSON.parse(sesionActual))
    }

  }

  sesionExiste() : boolean { 
    let sesionActual = this.getDatosSesion();
    return (sesionActual) ? true : false;
  }

  getDatosSesion() { 

    let sesionActual = localStorage.getItem("sesion")
    return sesionActual;

  }

  getUsuarioPorId(id: string): Observable<Usuario> {
    return this.clienteHttp.get<Usuario>(`${environment.url_api_gateway}/usuario/${id}`);
  }


}
