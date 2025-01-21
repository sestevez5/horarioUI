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
  color: string;
}

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
      idTipoActividad: this.tipoActividad.idTipoActividad,
      color:''
    }
  }
}

