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


export interface IConfiguracionGrafico {

  // Parámetros del gráfico, en general.
  configuracionSemana?: IConfiguracionSemana;

  grafico?: {
    colorGrafico: string;
    margenGrafico: {
      margenIzquierdoGrafico:  number;
      margenDerechoGrafico:    number;
      margenSuperiorGrafico:   number;
      margenInferiorGrafico:   number;
    };

    anchoGrafico:  number | undefined;
    altoGrafico:   number | undefined;

    pixelesPorHora: number | undefined;
  }

  panelHorario?: {
    anchoPanelHorario:  number | undefined;
    altoPanelHorario:   number | undefined;
    colorPanelHorario:  string;
  }

  panelDiaSemana?: {
    //colorPanelDiaSemana: string;
  }

  panelSesiones?: {
    alto?: number;
    ancho?: number;
    margenLateral: number; // porcentaje
    anchoSesion: number | undefined;
    altoCabecera: number;
    altoPie: number;
    colorCabecera: string;
    colorCuerpo: string;

  }

  escalas?: {
    escalaVertical: any;
    escalaHorizontal: any;
  }

  actividades?: {
    tamanyoTexto?: string;
    porcentajeZonaSeleccionActividad: number | undefined;
    altoSeccionPie: number | undefined;
    colores: string[];
    mostrarPanelAcciones: boolean;
    separacionActividades?: number | undefined;
    contenidoSecciones?: Array<string>
    sobrescribirContenidoAreasPorTipo: boolean
    mostrarSeccionPie: boolean 
    criterioColoreado?: string // Valores posibles: TIPO_ACTIVIDAD, CONTENIDO
    mostrarMarcaSeleccionActividad: boolean

  }


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
 