import { IDiaSemana, IConfiguracionGrafico } from './modelo';

export const CONFIGURACION_GRAFICO_POR_DEFECTO: IConfiguracionGrafico = {

  configuracionSemana: {
    horaMinima: "08:00",
    horaMaxima: "14:00",
    diasSemanaHabiles: ['L','M','X']
  },

  // Parámetros generales
  grafico: {
    anchoGrafico: undefined,
    altoGrafico: undefined,
    colorGrafico: 'white',
    margenGrafico: {
      margenInferiorGrafico:     30,
      margenDerechoGrafico:      30,
      margenSuperiorGrafico:     30,
      margenIzquierdoGrafico:    50,
    },

    pixelesPorHora: undefined
  },

  panelHorario: {
    altoPanelHorario:     undefined,
    colorPanelHorario:    '#fff',
    anchoPanelHorario:    undefined
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
    colorCabecera:'#fff',
    colorCuerpo:'#f4f4f4'

  },

  escalas: {
    escalaVertical: undefined,
    escalaHorizontal: undefined
  },

  actividades: {
    tamanyoTexto: '15',
    porcentajeZonaSeleccionActividad: 4,
    colores: ['#e4fbc3','#ffd8c1','#e0c1ff','#c1ffff','#c1ffd1','#c1d1ff','#f7ffc1','#f7ffc1'],
    mostrarPanelAcciones: false,
    mostrarSeccionPie: false,
    contenidoSecciones: ["GRU","CON","DEP"],
    altoSeccionPie: 15,
    sobrescribirContenidoAreasPorTipo: true,
    criterioColoreado: 'TIPO_ACTIVIDAD', // Valores posibles: TIPO_ACTIVIDAD, CONTENIDO, GRUPOS
    mostrarMarcaSeleccionActividad: true
    }
  }



export const DIAS_SEMANA: IDiaSemana[] = [
  { codigo: 'L',  denominacion: 'Lunes' },
  { codigo: 'M',  denominacion: 'Martes' },
  { codigo: 'X', denominacion: 'Miércoles' },
  { codigo: 'J',  denominacion: 'Jueves' },
  { codigo: 'V',  denominacion: 'Viernes' },
  { codigo: 'S',  denominacion: 'Sábado' },
  { codigo: 'D',  denominacion: 'Domingo' },
];

