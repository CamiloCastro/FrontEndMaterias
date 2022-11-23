import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private servicioSeguridad: SeguridadService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.servicioSeguridad.usuarioSesionActiva) {
      request = request.clone({
        setHeaders:{
          Authorization: "Bearer " + this.servicioSeguridad.usuarioSesionActiva.token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == 401) {
          this.router.navigateByUrl("/pages/seguridad/login");
        }
        return throwError(err)
      })
    )
  }

}
