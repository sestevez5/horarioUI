import * as d3 from "d3";

import { IConfiguracionGrafico, IParametrosEntrada } from './parametros';

import { CONFIGURACION_POR_DEFECTO } from './constantes';
import { Utilidades } from "./utilidades";
import { renderizarPanelHorario } from "./seccionesRenderizado/panelHorario"
import { renderizarPanelesDiasSemana } from "./seccionesRenderizado/panelesDiasSemana"
import { renderizarPlantilla } from "./seccionesRenderizado/plantilla";
import { renderizarActividades } from "./seccionesRenderizado/actividades";


export class HorarioUI {

   elementoRaiz: any;  // Tipo "Selection" D3.js
   svg: any; // Tipo "Selection" D3.js
   configuracion: IConfiguracionGrafico = CONFIGURACION_POR_DEFECTO;


   constructor(identificadorElementoRaiz: string) {
      this.elementoRaiz = d3.select('div#' + identificadorElementoRaiz)
      window.addEventListener('resize', this.generarGrafico.bind(this, this.configuracion));
   }

   /**
    * this returns
    * 
    * @param configuracionPersonalizada Esto es una prueba
   */
   public generarGrafico(_parametros?: IParametrosEntrada) {

      // 1.- establecer como elemento único del "div" un svg. Limpiamos lo exitente y creamos el svg
      this.elementoRaiz.selectAll('*').remove();

      // 2.- Creamos el único elemento svg que contendrá el gráfico. 
      this.svg = this.elementoRaiz.append('svg')

      // 2.- Definir parámetros de configuracion
      this.establecerConfiguracion(this.configuracion, _parametros);

      // 3.- Renderizar el panel Horario. Sección en la que se incluye todo el contenido.
      renderizarPanelHorario(this.configuracion, this.svg);

      // 4.- Renderizar los paneles de cada día de la semana.
      renderizarPanelesDiasSemana(this.configuracion, this.svg);
     
      // 5.- Renderizar la plantilla horaria: sesiones.
      renderizarPlantilla(this.configuracion, this.svg);

      // 6.- Renderizar las actividades.
      renderizarActividades(this.configuracion, this.svg);
   }

   private establecerConfiguracion(_configuracion: IConfiguracionGrafico, _parametros?: IParametrosEntrada) {

      // Iniciamos la configuración con sus valores por defecto y, a partir de los parámetros de entradas,
      // alteramos su contenido.
      var configuracion: IConfiguracionGrafico = CONFIGURACION_POR_DEFECTO;

      // Modificamos la configuración por defecto, en caso de que haya parámetros de entrada
      if (_parametros) {

      }


      // estableciendo rango en tiempo
      configuracion.grafico.rangoEnTiempo.horaInicio = Utilidades.convertirCadenaHoraEnTiempo(configuracion.configuracionSemana.horaMinima);
      configuracion.grafico.rangoEnTiempo.horaFin = Utilidades.convertirCadenaHoraEnTiempo(configuracion.configuracionSemana.horaMaxima);

      // estableciendo las dimensiones globales del gráfico
      configuracion.grafico.dimesiones.alto = parseFloat(this.elementoRaiz.style('height'));  // No se ha indicado píxeles por hora.
      configuracion.grafico.dimesiones.ancho = parseFloat(this.elementoRaiz.style('width'));  // No se ha indicado píxeles por hora.

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

      const anchoPanelhorario = configuracion.grafico.panelHorario.ancho;


      // Calculando escalas de ejes.
      configuracion.grafico.ejes.escalaHorizontal = d3.scaleBand()
      .domain(Utilidades.obtenerDiasSemanaHorario(configuracion).map(ds => ds.denominacion))
      .range([0, anchoPanelhorario])
      .paddingInner(0)
      .paddingOuter(0)


      this.svg.attr("height", altoGrafico);
      this.svg.attr("width", anchoGrafico);
      this.svg.attr("padding", "0px");
      this.svg.attr("margin", "0px");

      configuracion.grafico.ejes.tamanyoLetra=20;



      _configuracion = configuracion;




      // El resultado vienen en milisegundos y los convierto en horas.
      //  const rangoEnHoras = (horaFin.getTime()-horaInicio.getTime())/(3600000);
      //  const factorAlto = this.configuracion.panelSesiones.alto;
      //  const factorAncho = this.configuracion.panelSesiones.ancho;


   }


  



}


