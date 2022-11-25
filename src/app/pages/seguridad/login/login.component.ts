import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../modelos/usuario.model';
import Swal from "sweetalert2"

import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private servicioSeguridad: SeguridadService, private router: Router) { }

  usuario?: string
  password? :string

  ngOnInit(): void {

    if(this.servicioSeguridad.sesionExiste()) {
      this.servicioSeguridad.getUsuarioPorId(this.servicioSeguridad.usuarioSesionActiva._id).subscribe(
        response => {            
          if(response.rol.nombre === "Administrador")
            this.router.navigate(["pages/estudiantes/listar"]);
          else
            this.router.navigate(["pages/inscripcion/listar"]);
        }
      )
    }    

  }

  login(): void {   

    let u: Usuario = {
      correo: this.usuario,
      contrasena: this.password
    }

    this.servicioSeguridad.login(u).subscribe(
      data => {
        console.log(data)
        this.servicioSeguridad.guardarDatosSesion(data);

        this.servicioSeguridad.getUsuarioPorId(data.user_id).subscribe(
          response => {            
            if(response.rol.nombre === "Administrador")
              this.router.navigate(["pages/estudiantes/listar"]);
            else
              this.router.navigate(["pages/inscripcion/listar"]);
          }
        )


        
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error["error"]["msg"],
          timer: 5000
        })
      }
    )

  }

}
