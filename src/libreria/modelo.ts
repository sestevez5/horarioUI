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

