export interface IGrupo {
  idGrupo: string;
  codigo: string;
  denominacion: string;
}

export interface IPeriodoVigencia {
  idPeriodoVigencia: string;
  denominacion: string;
  fechaInicio: Date;
  fechaFin: Date;
  computo: number;
}

export interface IDocente {
  idDocente: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  foto: string;
  alias: string;
}

export interface IDiaSemana {
  codigo: string,
  denominacion: string,
}

export interface IDependencia {
  idDependencia: string;
  codigo: string;
  denominacion: string;
}

export interface IConfiguracionSemana {
  horaMinima: string,
  horaMaxima: string,
  diasSemanaHabiles: string[],

}

export interface IAsignatura {
  idAsignatura: string;
  codigo: string;
  denominacion: string;
}

export interface IPlantilla {
  idPlantilla: string;
  denominacion: string;
  sesionesPlantilla: ISesion[];
}

// lunes: "L", martes: "M", miércoles, "X", jueves: "J", viernes: "V", sábado: "S", domingo: "D"
export interface IRangoSemana {
  horaMinima: string,
  horaMaxima: string,
  diasSemanaHabiles: IDiaSemana[],
}

export interface ISesion {
  idSesion: string;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

<<<<<<< HEAD
=======
export interface IAlumno {
  idAlumno: string;
  idGrupo: string;
  email: string;
  foto: string;
  primerApellido: string;
  segundoApellido: string;
  nombre: string;
  denominacionLarga: string;

}

>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b
export interface ITipoActividad {
  idTipoActividad: string;
  codigo: string;
  denominacionLarga: string;
  obligaDocentes: boolean;
  permiteDocentes: boolean
  obligaAsignaturas: boolean;
  permiteAsignaturas: boolean;
  obligaGrupos: boolean;
  permiteGrupos: boolean;
  obligaDetalle: boolean;
  permiteDetalle: boolean;
  esLectiva: boolean;
  tipoPredeterminado: boolean

}

<<<<<<< HEAD
export interface IAlumno {
  idAlumno: string;
  idGrupo: string;
  email: string;
  foto: string;
  primerApellido: string;
  segundoApellido: string;
  nombre: string;
  denominacionLarga: string;

}

=======
>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b
export interface IActividad {
  idActividad: string;
  idSesion: string;
  detalleActividad: string;
  grupos: string[];
  docentes: string[];
  asignaturas: string[];
  dependencia: string;
  idPeriodoVigencia: string;
  idTipoActividad: string;
<<<<<<< HEAD
}

export interface IActividadesSesion {
  sesion: ISesion;
  actividades: ActividadG[]
}


=======
  color: string;
}

>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b
export class Actividad {
  public tipoActividad: ITipoActividad;
  public idActividad: string;
  public sesion: ISesion;
  detalleActividad: string;
  docentes: IDocente[];
  asignaturas: IAsignatura[];
  grupos: IGrupo[];
  dependencia: IDependencia | undefined;
  periodoVigencia: IPeriodoVigencia;
  alumnos: IAlumno[]  // Lazy load

  public actualizarActividad(actividad: Actividad): void {
    this.tipoActividad = actividad.tipoActividad;
    this.detalleActividad = actividad.detalleActividad;
    this.sesion = actividad.sesion;
    this.docentes = actividad.docentes;
    this.dependencia = actividad.dependencia;
    this.grupos = actividad.grupos;
    this.asignaturas = actividad.asignaturas;
    this.periodoVigencia = actividad.periodoVigencia;
  }

  public obtenerIActividad(): IActividad {

    return {
      idActividad: this.idActividad,
      idSesion: this.sesion.idSesion,
      detalleActividad: this.detalleActividad,
      grupos: this.grupos.map(grupo => grupo.idGrupo),
      docentes: this.docentes.map(docente => docente.idDocente),
      asignaturas: this.asignaturas.map(asignatura => asignatura.idAsignatura),
      dependencia: this.dependencia.idDependencia,
      idPeriodoVigencia: this.periodoVigencia.idPeriodoVigencia,
<<<<<<< HEAD
      idTipoActividad: this.tipoActividad.idTipoActividad
=======
      idTipoActividad: this.tipoActividad.idTipoActividad,
      color:''
>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b
    }
  }
}

<<<<<<< HEAD
export class ActividadG extends Actividad{

  nivelAncho: number;
  color: string;
  public estado: EstadoActividad;

  constructor(actividad: Actividad) {
    super();
    this.idActividad = actividad.idActividad;
    this.detalleActividad = actividad.detalleActividad;
    this.sesion = actividad.sesion;
    this.docentes = actividad.docentes;
    this.dependencia = actividad.dependencia;
    this.grupos = actividad.grupos;
    this.asignaturas = actividad.asignaturas;
    this.periodoVigencia = actividad.periodoVigencia;
    this.nivelAncho = 0;
    this.color = '';
    this.tipoActividad = actividad.tipoActividad;

  }



}

export enum EstadoActividad {
  NUEVA = 0,
  MODIFICADA = 1,
  ELIMINADA = 2,
  SINCAMBIOS = 3
}
=======
>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b
