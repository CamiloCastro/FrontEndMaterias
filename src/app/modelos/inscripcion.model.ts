import { Estudiante } from "./estudiante.model"
import { Materia } from "./materia.model"

export class Inscripcion {

    _id?: string
    año?: number
    semestre?: number
    nota_final?: number
    id_materia?: string
    id_estudiante?: string
    materia?: Materia
    estudiante?: Estudiante

}
