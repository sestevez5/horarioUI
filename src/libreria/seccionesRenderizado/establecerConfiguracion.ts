import * as d3 from "d3";
import { IConfiguracionGrafico, IParametrosEntrada } from '../parametros'
import { Utilidades } from '../utilidades';



export function establecerConfiguracion(_elementoRaiz: any, _configuracion: IConfiguracionGrafico, _parametros: IParametrosEntrada) {

      // Iniciamos la configuración con sus valores por defecto y, a partir de los parámetros de entradas,
      // alteramos su contenido.
      var configuracion: IConfiguracionGrafico = _configuracion

      // Modificamos la configuración por defecto, en caso de que haya parámetros de entrada


      _parametros.configuracionSemana.diasSemanaHabiles?configuracion.configuracionSemana.diasSemanaHabiles = _parametros.configuracionSemana.diasSemanaHabiles:null;
      _parametros.configuracionSemana.horaMinima?configuracion.configuracionSemana.horaMinima = _parametros.configuracionSemana.horaMinima:null;
      _parametros.configuracionSemana.horaMaxima?configuracion.configuracionSemana.horaMaxima = _parametros.configuracionSemana.horaMaxima:null;
      configuracion.actividades.mostrarPanelAcciones = _parametros.actividades?.mostrarPanelAcciones? true: false;
      configuracion.actividades.mostrarSeccionPie = _parametros.actividades?.mostrarSeccionPie? true: false;


   

      


      // estableciendo rango en tiempo
      configuracion.grafico.rangoEnTiempo.horaInicio = Utilidades.convertirCadenaHoraEnTiempo(configuracion.configuracionSemana.horaMinima);
      configuracion.grafico.rangoEnTiempo.horaFin = Utilidades.convertirCadenaHoraEnTiempo(configuracion.configuracionSemana.horaMaxima);

      // estableciendo las dimensiones globales del gráfico
      configuracion.grafico.dimesiones.alto = parseFloat(_elementoRaiz.style('height'));  // No se ha indicado píxeles por hora.
      configuracion.grafico.dimesiones.ancho = parseFloat(_elementoRaiz.style('width'));  // No se ha indicado píxeles por hora.

      // Generando constantes en base a los datos del gráfico
      const altoGrafico: number = configuracion.grafico.dimesiones.alto;
      const anchoGrafico: number = configuracion.grafico.dimesiones.ancho;
      const margenIzq: number = configuracion.grafico.margen.izquierdo;
      const margenDer: number = configuracion.grafico.margen.derecho;
      const margenSup: number = configuracion.grafico.margen.superior;
      const margenInf: number = configuracion.grafico.margen.inferior;
      const anchoEjeIzq: number = configuracion.grafico.ejes.anchoEjeIzquierdo;
      const altoEjeSup: number = configuracion.grafico.ejes.altoEjeSuperior;


      // Estableciendo las dimensiones de la sección: panelHorario
      configuracion.grafico.panelHorario.x = margenIzq + anchoEjeIzq;
      configuracion.grafico.panelHorario.y = margenSup + altoEjeSup;
      configuracion.grafico.panelHorario.alto = altoGrafico - (margenSup + margenInf + altoEjeSup + margenSup);
      configuracion.grafico.panelHorario.ancho = anchoGrafico - (margenIzq + margenDer + anchoEjeIzq);

      // Calculando escalas de ejes.

      // Eje horizontal
      configuracion.grafico.ejes.escalaHorizontal = d3.scaleBand()
      .domain(Utilidades.obtenerDiasSemanaHorario(configuracion).map(ds => ds.denominacion))
      .range([0, configuracion.grafico.panelHorario.ancho])
      .paddingInner(0)
      .paddingOuter(0)

      // eje vertical
      const horaMinima: Date =  Utilidades.convertirCadenaHoraEnTiempo(_configuracion.configuracionSemana?.horaMinima);
      const horaMaxima: Date =  Utilidades.convertirCadenaHoraEnTiempo(_configuracion.configuracionSemana?.horaMaxima);

      configuracion.grafico.ejes.escalaVertical = d3.scaleTime()
      .domain([horaMinima,horaMaxima])
      .range([0, _configuracion.grafico.panelHorario.alto]);


      const svg: any = _elementoRaiz.select('svg');

      svg.attr("height", altoGrafico);
      svg.attr("width", anchoGrafico);
      svg.attr("padding", "0px");
      svg.attr("margin", "0px");

      configuracion.grafico.ejes.tamanyoLetra=20;

          // Establecer escala horizontal: Serán bandas que identifiquen a los días de la semana
    configuracion.escalas.escalaHorizontal = d3.scaleBand()
    .domain(Utilidades.obtenerDiasSemanaHorario(configuracion).map(ds=> ds.denominacion))
    .range([0, configuracion.grafico.panelHorario.ancho])
    .paddingInner(0.0)
    .paddingOuter(0.0);

  // Establecer escala vertical:
  configuracion.escalas.escalaVertical = d3.scaleTime()
    .domain([Utilidades.minimoIntervaloTemporal(configuracion), Utilidades.maximoIntervaloTemporal(configuracion)])
    .range([0, configuracion.grafico.panelHorario.alto]);


      configuracion.panelSesiones.anchoSesion = parseFloat(configuracion.grafico.ejes.escalaHorizontal.bandwidth());

      _configuracion = configuracion;


   }
