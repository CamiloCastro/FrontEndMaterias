import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../../../modelos/inscripcion.model';
import { Materia } from '../../../modelos/materia.model';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { InscripcionService } from '../../../servicios/inscripcion.service';
import { MateriaService } from '../../../servicios/materia.service';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  inscripciones: Inscripcion[];

  constructor(private seguridadService: SeguridadService, private estudianteService: EstudianteService,
              private inscripcionService: InscripcionService) { }

  ngOnInit(): void {
    
    let idUsuarioActivo = this.seguridadService.usuarioSesionActiva._id;    

    this.seguridadService.getUsuarioPorId(idUsuarioActivo).subscribe(
      data => {        
        this.estudianteService.buscarPorCedula(data.cedula).subscribe(
          data2 => {         
            this.inscripcionService.buscarPorEstudiante(data2._id).subscribe(
              data3 => {
                this.inscripciones = data3;
              }
            )
          }
        )
      }
    )

  }

  eliminarInscripcion(id: string): void {
    this.inscripcionService.eliminar(id).subscribe(
      data => {
        alert("Inscripcion eliminada correctamente")
        let indiceAEliminar = -1;
        for(let i = 0;i < this.inscripciones.length; i++)
        {
            if(this.inscripciones[i]._id === id)
            {
              indiceAEliminar = i;
              break;
            }
        }
        this.inscripciones.splice(indiceAEliminar, 1);
      }
    )
  }

}
