import * as d3 from "d3";
import { Subject } from 'rxjs';


import { IConfiguracionGrafico, IParametrosEntrada } from './parametros';

import { CONFIGURACION_POR_DEFECTO } from './constantes';
import { establecerConfiguracion } from "./seccionesRenderizado/establecerConfiguracion"
import { renderizarPanelHorario } from "./seccionesRenderizado/panelHorario"
import { renderizarPanelesDiasSemana } from "./seccionesRenderizado/panelesDiasSemana"
import { renderizarPlantilla } from "./seccionesRenderizado/plantilla";
import { renderizarActividades } from "./seccionesRenderizado/actividades";
<<<<<<< HEAD
import { Actividad, ActividadG, IPlantilla, ISesion } from "./modelo";
import { Utilidades } from "./utilidades";
=======
import { IActividad, IPlantilla, ISesion } from "./modelo";
>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b


export class HorarioUI {

   elementoRaiz: any;  // Tipo "Selection" D3.js
   svg: any; // Tipo "Selection" D3.js
   configuracion: IConfiguracionGrafico = CONFIGURACION_POR_DEFECTO;
   plantilla: IPlantilla


   //Observables
   seleccionSesion$ = new Subject<ISesion>();


   constructor(identificadorElementoRaiz: string) {
      this.elementoRaiz = d3.select('div#' + identificadorElementoRaiz)
      window.addEventListener('resize', this.generarGrafico.bind(this, this.configuracion, this.plantilla));
   
   }

   public renderizarGrafico(_configuracionGrafico: IConfiguracionGrafico, _plantilla?: IPlantilla) {
      window.addEventListener('resize', this.generarGrafico.bind(this, _configuracionGrafico, _plantilla));
      this.generarGrafico(_configuracionGrafico, _plantilla);
<<<<<<< HEAD

   }

   public obtenerConfiguracion(): IConfiguracionGrafico{

      return this.configuracion;
  
    }
   public actualizarActividades(actividades: Actividad[]) {

      var actividadesG = [];
      actividades.forEach(
        act => {
          const nuevaActividadG = new ActividadG(act);
          actividadesG.push(nuevaActividadG);
        }
      );
  
      Utilidades.calcularFactorAnchoActividadesG(actividadesG, actividadesG);
     
      Utilidades.calcularColoresActividadesG(actividadesG, this.configuracion);
  
      renderizarActividades(this.configuracion, this.svg, actividadesG);
  
    }
  
=======
   }

   public AnyadirActividades( actividades: IActividad ) {

      renderizarActividades(this.configuracion, this.svg, actividades);



   }
>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b

   /**
    * this returns
    * 
    * @param configuracionPersonalizada Esto es una prueba
   */
   private generarGrafico(_parametros?: IParametrosEntrada, _plantilla?: IPlantilla ) {

      // 1.- establecer como elemento único del "div" un svg. Limpiamos lo exitente y creamos el svg
      this.elementoRaiz.selectAll('*').remove();

      // 2.- Creamos el único elemento svg que contendrá el gráfico. 
      this.svg = this.elementoRaiz.append('svg')

      // 2.- Definir parámetros de configuracion
      establecerConfiguracion(this.elementoRaiz, this.configuracion, _parametros);

      // 3.- Renderizar el panel Horario. Sección en la que se incluye todo el contenido.
      renderizarPanelHorario(this.configuracion, this.svg);

      // 4.- Renderizar los paneles de cada día de la semana.
      renderizarPanelesDiasSemana(this.configuracion, this.svg);
     
      // 5.- Renderizar la plantilla horaria: sesiones.
      if (_plantilla) {
         renderizarPlantilla(this.configuracion, this.svg, _plantilla, this.seleccionSesion$);
      }
      

   }







}




      // // 6.- Renderizar las actividades.
      // renderizarActividades(this.configuracion, this.svg);
