import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriaService } from '../../../servicios/materia.service';
import { SeguridadService } from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(private materiaServicio: MateriaService, private router: Router,
    private servicioSeguridad: SeguridadService) { }  

  settings = {
    columns: {
      _id : {
        title: "ID",
        editable: false,
        addable: false
      },
      nombre: {
        title: "Nombre"
      },
      creditos: {
        title: "Creditos"
      },
      departamento: {
        title: "ID Departamento",
        valuePrepareFunction: (data) => {
          return data._id;
        }
      }
    },
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
  }
  source = []

  ngOnInit(): void {

    if(!this.servicioSeguridad.sesionExiste())
    {
      this.router.navigate(["pages/seguridad/login"]);
    }

    this.servicioSeguridad.getUsuarioPorId(this.servicioSeguridad.usuarioSesionActiva._id).subscribe(
      response => {            
        if(response.rol.nombre === "Estudiante")
          this.router.navigate(["pages/inscripcion/listar"]);        
      }
    )

    this.materiaServicio.listar().subscribe(
      data => {
        this.source = data;
      }
    )

  }

  createConfirm(event) {

    let nuevaMateria = event.newData;   

    delete nuevaMateria["_id"]
    nuevaMateria["id_departamento"] = nuevaMateria["departamento"]
    delete nuevaMateria["departamento"]    

    this.materiaServicio.crear(nuevaMateria).subscribe(
      data => {
        Swal.fire(
          'Creado!',
          'La materia ha sido creada correctamente',
          'success'
        )
        data["departamento"] = {
          _id: data["id_departamento"]
        }
        delete data["id_departamento"]
        console.log(data);
        event.confirm.resolve(data);
      }
    )

  }

  editConfirm(event) {

    let materiaActualizar = event.newData;
    
    materiaActualizar["id_departamento"] = materiaActualizar["departamento"]
    delete materiaActualizar["departamento"]  

    Swal.fire({
      title: 'Editar Materia',
      text: "??Est?? seguro que quiere editar la materia " + materiaActualizar.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, editar"
    }).then((result) => {

      if(result.isConfirmed) {
        this.materiaServicio.actualizar(materiaActualizar).subscribe(
          data => {
            Swal.fire(
              'Editada!',
              'La materia ha sido editada correctamente',
              'success'
            )
            console.log(data);
            materiaActualizar["departamento"] = {
              _id: materiaActualizar["id_departamento"]
            }
            event.confirm.resolve(materiaActualizar);
          }
        )
      }
    }) 


  }


  

  deleteConfirm(event) {

    let materiaEliminar = event.data;

    Swal.fire({
      title: 'Eliminar Materia',
      text: "??Est?? seguro que quiere eliminar la materia " + materiaEliminar.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, eliminar"
    }).then((result) => {

      if(result.isConfirmed) {
        this.materiaServicio.eliminar(materiaEliminar._id).subscribe(
          data => {
            Swal.fire(
              'Eliminada!',
              'La materia ha sido eliminada correctamente',
              'success'
            )
            event.confirm.resolve();
          }
        )
      }
    })   

  }

}
