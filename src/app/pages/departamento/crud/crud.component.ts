import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(private departamentoServicio: DepartamentoService,
     private servicioSeguridad: SeguridadService, private router: Router) { }

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
        editable: false,
        addable: false,
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      descripcion: {
        title: 'Descripcion',
        type: 'number',
      },      
    }
  }
  
  source = []

  ngOnInit(): void {

    if(!this.servicioSeguridad.sesionExiste())
    {
      this.router.navigate(["pages/seguridad/login"]);
    }

    this.servicioSeguridad.getUsuarioPorId(this.servicioSeguridad.usuarioSesionActiva._id).subscribe(
      response => {            
        console.log(response)
        if(response.rol.nombre === "Estudiante")
        {
          console.log("Es estudiante")
          this.router.navigate(["pages/inscripcion/listar"]);        
        }
          
      }
    )


    this.departamentoServicio.listar().subscribe(
      data => {
        this.source = data;
      }
    )

  }

  deleteConfirm(event) {

    let departamentoEliminar = event.data;

    Swal.fire({
      title: 'Eliminar Departamento',
      text: "¿Está seguro que quiere eliminar el departamento " + departamentoEliminar.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, eliminar"
    }).then((result) => {

      if(result.isConfirmed) {
        this.departamentoServicio.eliminar(departamentoEliminar._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El departamento ha sido eliminado correctamente',
              'success'
            )
            event.confirm.resolve();
          }
        )
      }
    })    
  }

  createConfirm(event) {

    let nuevoDepartamento = event.newData;

    delete nuevoDepartamento["_id"]
    this.departamentoServicio.crear(nuevoDepartamento).subscribe(
      data => {
        Swal.fire(
          'Creado!',
          'El departamento ha sido creado correctamente',
          'success'
        )
        event.confirm.resolve(data);
      }
    )
  }

  editConfirm(event) {

    let departamentoActualizar = event.newData;

    Swal.fire({
      title: 'Editar Departamento',
      text: "¿Está seguro que quiere editar el departamento " + departamentoActualizar.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, editar"
    }).then((result) => {

      if(result.isConfirmed) {
        this.departamentoServicio.actualizar(departamentoActualizar).subscribe(
          data => {
            Swal.fire(
              'Editado!',
              'El departamento ha sido editado correctamente',
              'success'
            )
            event.confirm.resolve();
          }
        )
      }
    }) 


  }

}
