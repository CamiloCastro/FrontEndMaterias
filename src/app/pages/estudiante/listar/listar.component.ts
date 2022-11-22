import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../servicios/estudiante.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  constructor(private servicioEstudiante: EstudianteService) { }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate : true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'string',
        editable: false
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      apellido: {
        title: 'Apellido',
        type: 'string',
      },
      cedula: {
        title: 'Cedula',
        type: 'string',
      },
    }
  }
  source = []

  ngOnInit(): void {

    this.servicioEstudiante.listar().subscribe(
      data => {
        this.source = data;
      }
    )

  }

  deleteConfirm(event) {

    let estudiante_a_eliminar = event.data;

    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "¿Está seguro que quiere eliminar al estudiante " + estudiante_a_eliminar.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, eliminar"
    }).then((result) => {

      if(result.isConfirmed) {
        this.servicioEstudiante.eliminar(estudiante_a_eliminar._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El estudiante ha sido eliminado correctamente',
              'success'
            )
            event.confirm.resolve();
          }
        )
      }
    })    
  }

  createConfirm(event) {    

    let nuevo_estudiante = event.newData;
    delete nuevo_estudiante["_id"]
    this.servicioEstudiante.crear(nuevo_estudiante).subscribe(
      data => {
        Swal.fire(
          'Creado!',
          'El estudiante ha sido creado correctamente',
          'success'
        )
        event.confirm.resolve();
      }
    )
  }

  editConfirm(event) {}
}
