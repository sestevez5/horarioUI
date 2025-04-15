
import { ActividadG, IActividadesSesion } from '../modelo';
import { Utilidades } from '../utilidades'

import { IConfiguracionGrafico } from '../parametros'
import * as d3 from 'd3';


export class  InterfazActividades {

  configuracionGrafico: IConfiguracionGrafico;
  actividades: ActividadG[];
  svg: any

  constructor(_configuracionGrafico: IConfiguracionGrafico, _svg: any, _actividades: ActividadG[]) {

    this.configuracionGrafico = _configuracionGrafico;
    this.actividades = _actividades;
    this.svg = _svg;

  }

  public renderizarActividades() {

    d3.selectAll('g.panelSesionActividades').remove();
  
    d3.selectAll('g.panelDiaSemana').nodes().forEach(
       (nodo: any) => {
         const codigoDiaSemana = nodo['id'].substring(15,16);
         const actividadesACrear = this.actividades.filter(actG => actG.sesion.diaSemana === codigoDiaSemana);
         this.renderizarActividadesPorDiaSemana('g#' + nodo['id'], actividadesACrear)
       }
     );
  
  }

  private renderizarActividadesPorDiaSemana(panelDiaSemana: string, actividadesG: ActividadG[]) {
    // Paso 0: Transformamos la colección de actividades agrupándolas por sesiones.
    const actividadesSesion: IActividadesSesion[] = Utilidades.obtenerActividadesSesiones(actividadesG);
   

    // Paso 1:  Crear los paneles que representarán a las actividades de una sesión
    //const panelesSesionActividades = this.generarPanelesActividadesSesion(panelDiaSemana, actividadesSesion);
   
    const panelesSesionActividades = d3.select(panelDiaSemana)
      .selectAll('g#act' + 'xx')
      .data(actividadesSesion)
      .enter()
      .append('g')
      .attr('transform', d => `translate(0,${this.configuracionGrafico.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio))})`)
      .attr('class', 'panelSesionActividades')
      .attr('id', d => 'panelSesionActividades' + d.sesion.idSesion)
      .attr('data-actividades', d => d.actividades.map(act => act.idActividad).join(','))
      .attr('data-actividadVisible', d => d.actividades[0].idActividad);
   
    // Paso 2: Crear la cabecera de los paneles anteriores.
    this.renderizarActividadesPorSesionActividad(panelesSesionActividades, actividadesSesion);
    
   
  }
   
  private renderizarActividadesPorSesionActividad(panelSesionActividades: any, actividadesSesion: IActividadesSesion[]) {
  
      const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? (this.configuracionGrafico.panelSesiones.anchoSesion).toString() : '0';
      const altoCabeceraSesion = this.configuracionGrafico.panelSesiones.altoCabecera;

   //---------------------------------------------------------------------------------
  // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
  // Su identificador será el texto 'panelCabeceraSesionActividades' con el id de la
  // sesión.
  //---------------------------------------------------------------------------------
  const panelCabeceraSesionConActividades = panelSesionActividades.append('g')
    .attr('class', 'panelCabeceraSesionActividades')
    .attr('id', (d: IActividadesSesion) => 'panelCabeceraSesionActividades' + d.sesion.idSesion);

  //---------------------------------------------------------------------------------
  // Definicion del rectángulo que representa a la cabecera de la sesión.
  //---------------------------------------------------------------------------------
  panelCabeceraSesionConActividades.append('rect')
    .attr('class', 'rectPanelCabeceraSesionActividades')
    .attr('height', altoCabeceraSesion*2)  // Es un artificio para ocultar las esquinas inferiores redondeadas
    .attr('width', anchoSesion)
    .attr('rx',0)
    .attr('fill', '#ccc');

  // Se añade el texto de la cabecera: hora inicio-fin
  panelCabeceraSesionConActividades.append('text')
    .attr('x', parseInt(anchoSesion) / 2)
    .text((d: IActividadesSesion) => d.sesion.horaInicio + ' - ' + d.sesion.horaFin)
    .attr('y', altoCabeceraSesion / 2)
    .attr('font-size', '.6em')
    .attr('fill', 'white')
    .attr('dominant-baseline', 'central')
    .attr('text-anchor', 'middle');

  this.renderizarBotonesPanelCabeceraSesionesActividades(panelCabeceraSesionConActividades);
  // this.renderizarPanelesCuerpoSesionActividades(panelSesionActividades);
  // this.renderizarPanelPieSesionActividades(panelSesionActividades)

  // this.anyadirPanelesActividades(actividadesSesion);

   return panelCabeceraSesionConActividades;


  }

  private renderizarBotonesPanelCabeceraSesionesActividades(pcsa: any) {
    const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? this.configuracionGrafico.panelSesiones.anchoSesion.toString() : '0';
    const altoCabeceraSesion = this.configuracionGrafico.panelSesiones.altoCabecera;
    const desplazamientoHorizontal = parseFloat(anchoSesion) / 2 - 15;
    const desplHorizontal2 = desplazamientoHorizontal + 10
    const desplVertical1 = altoCabeceraSesion / 18;
    const desplVertical2 = altoCabeceraSesion / 2;
    const desplVertical3 = altoCabeceraSesion * 17 / 18;

    const coordenadasTrianguloIzquierdo = [
      { 'x': parseFloat(anchoSesion) / 2 - desplazamientoHorizontal, 'y': desplVertical1 + 1 },
      { 'x': parseFloat(anchoSesion) / 2 - desplHorizontal2 + 2, 'y': desplVertical2 },
      { 'x': parseFloat(anchoSesion) / 2 - desplazamientoHorizontal, 'y': desplVertical3 - 1 },
    ];

    const coordenadasTrianguloDerecho = [
      { 'x': parseFloat(anchoSesion) / 2 + desplazamientoHorizontal, 'y': desplVertical1 + 1 },
      { 'x': parseFloat(anchoSesion) / 2 + desplHorizontal2-2, 'y': desplVertical2 },
      { 'x': parseFloat(anchoSesion) / 2 + desplazamientoHorizontal, 'y': desplVertical3 - 1 },
    ];

    // Obtener actividad
    const trianguloIzquierdo = pcsa.append("polygon");
    trianguloIzquierdo.attr("points", coordenadasTrianguloIzquierdo.map(function (d: any) { return [d.x, d.y].join(","); }).join(" "))
      .attr("fill", "#ccc")
      .attr('class', 'botonCabeceraSesionActividades botonIzquierdoCabeceraSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'botonIzquierdoCabeceraSesionActividades' + d.sesion.idSesion)
      .on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this))
      .on("mouseout", (d: any) => d3.select('body').style("cursor", "default"))
      .on("mouseover", (d: any) => d3.select('body').style("cursor", "pointer"));


    const trianguloDerecho = pcsa.append("polygon");
    pcsa.append("polygon")
      .attr('points', coordenadasTrianguloDerecho.map(function (d: any) { return [d.x, d.y].join(","); }).join(" "))
      .attr('fill', (d: IActividadesSesion) => d.actividades.length>1?'white':'#ccc'
        )
      .attr('class', 'botonCabeceraSesionActividades botonDerechoCabeceraSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'botonDerechoCabeceraSesionActividades'+d.sesion.idSesion)
      .on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this))
      .on("mouseout", (d: any) => d3.select('body').style("cursor", "default"))
      .on("mouseover", (d: any) => d3.select('body').style("cursor", "pointer") );

  }

  private actualizarActividadVisibleDeUnaSesion(d: any, i: IActividadesSesion, e: any) {

    var botonDerechoPulsado: boolean = d.srcElement.classList.contains('botonDerechoCabeceraSesionActividades') ? true : false;

    const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? this.configuracionGrafico.panelSesiones.anchoSesion.toString() : '0';
    const panelSesionActividadesActual = d3.select('#panelSesionActividades' + i.sesion.idSesion);
    const idActividadesEnSesion: string[] = panelSesionActividadesActual.attr('data-actividades').split(',');
    const idActividadVisible = panelSesionActividadesActual.attr('data-actividadVisible')
    var posActual = idActividadesEnSesion.indexOf(idActividadVisible);
    if (botonDerechoPulsado && posActual < idActividadesEnSesion.length - 1) posActual++;
    if (!botonDerechoPulsado && posActual > 0) posActual--;

    const colorBotonDerecho = posActual === idActividadesEnSesion.length - 1 ? '#ccc' : 'white';
    const colorBotonizquierdo = posActual === 0 ? '#ccc' : 'white';

    panelSesionActividadesActual.select('.botonIzquierdoCabeceraSesionActividades').attr('fill', colorBotonizquierdo);
    panelSesionActividadesActual.select('.botonDerechoCabeceraSesionActividades').attr('fill', colorBotonDerecho);

    panelSesionActividadesActual.attr('data-actividadVisible', idActividadesEnSesion[posActual]);

    // Obtenemos todos los paneles de actividad contenidos en el cuerpo
    // de la entidad Actividades-sesion
    panelSesionActividadesActual
      .selectAll('.panelActividad')
      .attr('transform', function (d, i, n) {
        return `translate(${(i-(posActual))*parseFloat(anchoSesion)},0)`
      })

  }
}

