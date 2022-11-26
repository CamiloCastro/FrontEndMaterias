import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../../../modelos/inscripcion.model';
import { Materia } from '../../../modelos/materia.model';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { InscripcionService } from '../../../servicios/inscripcion.service';
import { MateriaService } from '../../../servicios/materia.service';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-inscribir',
  templateUrl: './inscribir.component.html',
  styleUrls: ['./inscribir.component.scss']
})
export class InscribirComponent implements OnInit {

  materias: Materia[];
  nombreMateria: string;

  constructor(private materiaServicio: MateriaService, private inscripcionService: InscripcionService,
    private seguridadService: SeguridadService, private estudianteService: EstudianteService) { }  

  ngOnInit(): void {
  }

  buscarMateria(): void{
    this.materiaServicio.buscarNombre(this.nombreMateria).subscribe(
      data => {        
        this.materias = data;
      }
    )
  }

  registrarMateria(idMateria: string): void {

    let idUsuarioActivo = this.seguridadService.usuarioSesionActiva._id;    

    this.seguridadService.getUsuarioPorId(idUsuarioActivo).subscribe(
      data => {        
        this.estudianteService.buscarPorCedula(data.cedula).subscribe(
          data2 => {            
            let k: Inscripcion = {
              año: 2022,
              semestre: 2,
              nota_final: 0.0,
              id_materia: idMateria,
              id_estudiante: data2._id
            }
        
            this.inscripcionService.crear(k).subscribe(
              data => {
                alert("Materia inscrita exitosamente")
              }
            )
          }
        )
      }
    )
    

    
  }

}
