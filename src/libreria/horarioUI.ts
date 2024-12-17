import * as d3 from "d3";

import { IConfiguracionGrafico } from './modelo/configuracionGrafico.model'
import { CONFIGURACION_GRAFICO_POR_DEFECTO } from './modelo/constantes/configuracionPorDefecto';



export class HorarioUI {

   elementoRaiz: any;  // Tipo "Selection" D3.js
   svg:any; // Tipo "Selection" D3.js
   configuracion: IConfiguracionGrafico=CONFIGURACION_GRAFICO_POR_DEFECTO

     

   constructor(identificadorElementoRaiz: string) {

      this.elementoRaiz= d3.select('div#'+identificadorElementoRaiz)
      window.addEventListener('resize', this.generarGrafico.bind(this, this.configuracion));

      
      
   }



   // Métodos públicos. De acceso a consumidores
   public generarGrafico(configuracionPersonalizada: IConfiguracionGrafico){

      // 1.- establecer como elemento único del "div" un svg. Limpiamos lo exitente y creamos el svg
      this.elementoRaiz.selectAll('*').remove();
      this.svg = this.elementoRaiz.append('svg')
    
      // 2.- Definir parámetros de configuracion
      configuracionPersonalizada?this.establecerConfiguracion(CONFIGURACION_GRAFICO_POR_DEFECTO, configuracionPersonalizada):null;

      // 2.- Definir parámetros de configuracion


      // 3.- Definir ejes.



      // En la generación se elimina cualquier posible imagen svg y se genere de nuevo.


 
      


      // this.definirParametrosConfiguracion();
      //
      
      //this.generarSvg(this.svg);

      this.renderizarEjes(this.configuracion, this.svg);

      // this.renderizarPlantillas(this.svg);
      // this.renderizarActividades(this.svg);

       
   
   

   } 


   private establecerConfiguracion(parametrosConfiguracionPersonalizadosPorDefecto: IConfiguracionGrafico, parametrosConfiguracionPersonalizados: IConfiguracionGrafico){

      return parametrosConfiguracionPersonalizadosPorDefecto;

   }


   private renderizarEjes(configuracion: IConfiguracionGrafico,svg:any){

      var altoDiv=this.elementoRaiz.style("height");
      var anchoDiv=this.elementoRaiz.style("width");

      
   svg.attr("height", altoDiv);
   svg.attr("width", anchoDiv);
   svg.append("rect")
   .attr("x", parseFloat(anchoDiv)/2)
   .attr("y", parseFloat(altoDiv)/2)
   .attr("width", "100")
   .attr("height", "100")
   .attr("fill", "red");



      
   //    console.log(this.elementoRaiz);


      


      }



   private generarSvg(svg: any) {
      if (svg) {
         d3.select('svg').remove();
       }
      svg = d3.select(this.elementoRaiz).append('svg');
      return svg;
      
   }

   private renderizarPlantillas(svg: any){
      
   }

   private renderizarActividades(svg: any){
      
   }

  

   //console.log(svg);
   
   
  }


  