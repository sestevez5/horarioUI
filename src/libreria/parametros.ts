import { IConfiguracionSemana } from "./modelo";

export interface IConfiguracionGrafico {

  // Parámetros del gráfico, en general.
  configuracionSemana?: IConfiguracionSemana;

  grafico?: {
    color: string;

    margen: {
      izquierdo:  number;
      derecho:    number;
      superior:   number;
      inferior:   number;
    },

    dimesiones: {
      ancho:  number | undefined;
      alto:   number | undefined;
    },
    
    ejes: {
      anchoEjeIzquierdo: number 
      altoEjeSuperior: number
      escalaVertical?: any;
      escalaHorizontal?: any;
      tamanyoLetra?: number;
    },

    pixelesPorHora: number | undefined;

    rangoEnTiempo: {
      horaInicio: Date,
      horaFin: Date
    },

    
    panelHorario: {
      x?: number | undefined
      y?: number | undefined
      ancho?: number | undefined 
      alto?: number | undefined 
      colorPanelHorario: string
    }


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

export interface IParametrosEntrada {

  // Parámetros del gráfico, en general.
  configuracionSemana?: IConfiguracionSemana;

  grafico?: {
    pixelesPorHora: number | undefined;
  }

  panelHorario?: {
    colorPanelHorario:  string;
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