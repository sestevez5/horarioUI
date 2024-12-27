import { IConfiguracionGrafico } from '../parametros'
import { Utilidades } from '../utilidades';
import * as d3 from "d3";


export function renderizarPanelHorario(_configuracion: IConfiguracionGrafico, _svg: any) {

   /**
    * Definiendo el panel horario
    */
   const panelHorario = _svg.append('g')
      .attr('id', 'panelHorario')
      .attr('transform', `translate(${_configuracion.grafico.panelHorario.x},${_configuracion.grafico.panelHorario.y})`)


   // Añadimos el rectángulo de fondo
   Utilidades.anyadirRectangulo(panelHorario,
      'fondoPanelHorario',
      _configuracion.grafico.panelHorario.alto,
      _configuracion.grafico.panelHorario.ancho,
      _configuracion.grafico.panelHorario.colorPanelHorario)

   // Añadimos los dos ejes
   anyadirEjeX(_configuracion, panelHorario);
   anyadirEjeY(_configuracion, panelHorario);

}

function anyadirEjeX(_configuracion: IConfiguracionGrafico, _panelHorario: any) {

   const escalaHorizontal: any = _configuracion.grafico.ejes.escalaHorizontal;
   const tamanyoLetra: number = _configuracion.grafico.ejes.tamanyoLetra;

   var generadorEjeX = d3.axisTop(escalaHorizontal as d3.ScaleBand<string>);
   generadorEjeX.tickSize(0);

   const ejeX = _panelHorario.append('g')
      .attr('class', 'ejeX')
      .call(generadorEjeX);

   // Elimnamos la línea del eje vertical.
   ejeX.select(".domain").remove()

   // Cambiamos el tamaño del texto.
   ejeX.selectAll(".tick text").attr("font-size", tamanyoLetra);

}

function anyadirEjeY(_configuracion: IConfiguracionGrafico, _panelHorario: any) {

   // Calculamos hora de inicio y fin a partir de las cadenas de entrada
   const horaInicio: any = Utilidades.convertirCadenaHorarEnTiempo(_configuracion.configuracionSemana.horaMinima)
   const horaFin: any = Utilidades.convertirCadenaHorarEnTiempo(_configuracion.configuracionSemana.horaMaxima)

   // Construimos la escala.
   const escala = d3.scaleTime()
      .domain([horaInicio.setMinutes(horaInicio.getMinutes() - 1), horaFin])
      .range([0, _configuracion.grafico.panelHorario.alto]);

   var ejeYGenerator = d3.axisLeft(escala);
   ejeYGenerator.ticks(d3.timeMinute.every(60));

   // Añadimos la escala al svg (panelHorario)
   const ejeY = _panelHorario.append('g')
      .attr('class', 'ejeY')
      .call(ejeYGenerator);

   ejeY.select(".domain").remove()


}
