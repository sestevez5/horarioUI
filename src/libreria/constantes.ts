import { IDiaSemana } from './modelo';
import { IConfiguracionGrafico } from './parametros';

export const CONFIGURACION_POR_DEFECTO: IConfiguracionGrafico = {

  configuracionSemana: {
    horaMinima: "08:00",
    horaMaxima: "14:00",
    diasSemanaHabiles: ['L', 'M', 'X', 'V']
  },

  // Parámetros generales
  grafico: {
    color: 'white',
    margen: {
      inferior: 10,
      derecho: 30,
      superior: 10,
      izquierdo: 50,
    },

    dimesiones: {
      ancho: undefined,
      alto: undefined
    },

    ejes: {
      anchoEjeIzquierdo: 30,
      altoEjeSuperior: 20,
    },

    pixelesPorHora: undefined,

    rangoEnTiempo: {
      horaInicio: undefined,
      horaFin: undefined
    },

    panelHorario: {
      colorPanelHorario: '#bbb',
    },

  },





  panelDiaSemana: {
    colorPanelDiaSemana: '#444',
  },

  panelSesiones: {

    alto: 1,   // 1=alto del contenedor.
    ancho: 1,  // 1=ancho del contenedor.
    margenLateral: 0,
    altoCabecera: 11,
    anchoSesion: undefined,
    altoPie: 0,
    colorCabecera: '#fff',
    colorCuerpo: '#f4f4f4'

  },


  actividades: {
    tamanyoTexto: '15',
    porcentajeZonaSeleccionActividad: 4,
    colores: ['#e4fbc3', '#ffd8c1', '#e0c1ff', '#c1ffff', '#c1ffd1', '#c1d1ff', '#f7ffc1', '#f7ffc1'],
    mostrarPanelAcciones: false,
    mostrarSeccionPie: false,
    contenidoSecciones: ["GRU", "CON", "DEP"],
    altoSeccionPie: 15,
    sobrescribirContenidoAreasPorTipo: true,
    criterioColoreado: 'TIPO_ACTIVIDAD', // Valores posibles: TIPO_ACTIVIDAD, CONTENIDO, GRUPOS
    mostrarMarcaSeleccionActividad: true
  }
}



export const DIAS_SEMANA: IDiaSemana[] = [
  { codigo: 'L', denominacion: 'Lunes' },
  { codigo: 'M', denominacion: 'Martes' },
  { codigo: 'X', denominacion: 'Miércoles' },
  { codigo: 'J', denominacion: 'Jueves' },
  { codigo: 'V', denominacion: 'Viernes' },
  { codigo: 'S', denominacion: 'Sábado' },
  { codigo: 'D', denominacion: 'Domingo' },
];

