import * as d3 from "d3";

import { IConfiguracionGrafico } from './modelo';

import { CONFIGURACION_GRAFICO_POR_DEFECTO } from './constantes';


export class HorarioUI {

   elementoRaiz: any;  // Tipo "Selection" D3.js
   svg: any; // Tipo "Selection" D3.js
   configuracion: IConfiguracionGrafico = CONFIGURACION_GRAFICO_POR_DEFECTO

 
   constructor(identificadorElementoRaiz: string) {
      this.elementoRaiz = d3.select('div#' + identificadorElementoRaiz)
      window.addEventListener('resize', this.generarGrafico.bind(this, this.configuracion));
   }

   /**
    * this returns
    * 
    * @param configuracionPersonalizada Esto es una prueba
   */
   public generarGrafico(configuracionPersonalizada: IConfiguracionGrafico) {
      
      // 1.- establecer como elemento único del "div" un svg. Limpiamos lo exitente y creamos el svg
      this.elementoRaiz.selectAll('*').remove();
      
      this.svg = this.elementoRaiz.append('svg')

      // 2.- Definir parámetros de configuracion
      configuracionPersonalizada ? this.establecerConfiguracion(CONFIGURACION_GRAFICO_POR_DEFECTO, configuracionPersonalizada) : null;

      // 3.- Renderizar ejes
      this.renderizarEjes(this.configuracion, this.svg);

      // 4.- Renderizar plantilla
      this.renderizarPlantilla(this.configuracion, this.svg);

      // 5.- Renderizar actividades.
      this.renderizarActividades(this.configuracion, this.svg);
   }

   private establecerConfiguracion(parametrosConfiguracionPersonalizadosPorDefecto: IConfiguracionGrafico, parametrosConfiguracionPersonalizados: IConfiguracionGrafico) {

      console.log(parametrosConfiguracionPersonalizados);
      return parametrosConfiguracionPersonalizadosPorDefecto;

   }

   private renderizarEjes(configuracion: IConfiguracionGrafico, svg: any) {

      console.log(configuracion)
      var altoDiv = this.elementoRaiz.style("height");
      var anchoDiv = this.elementoRaiz.style("width");


      svg.attr("height", altoDiv);
      svg.attr("width", anchoDiv);
      svg.append("rect")
         .attr("x", parseFloat(anchoDiv) / 2)
         .attr("y", parseFloat(altoDiv) / 2)
         .attr("width", "100")
         .attr("height", "100")
         .attr("fill", "red");




      //    console.log(this.elementoRaiz);





   }

   private renderizarPlantilla(configuracion: IConfiguracionGrafico, svg: any) {

   }

   private renderizarActividades(configuracion: IConfiguracionGrafico, svg: any) {

   }




}


