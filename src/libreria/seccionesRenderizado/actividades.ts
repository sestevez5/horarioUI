
import { ActividadG, IActividadesSesion, ISesion } from '../modelo';
import { Utilidades } from '../utilidades'

import { IConfiguracionGrafico } from '../parametros'
import * as d3 from 'd3';
import { Subject } from 'rxjs';


/**
 * El objetivo de esta clase es el renderizado de las actividades en el horario. Este renderizado depende, además del conjunto de actividades a renderizar, de las opciones de configuración del gráfico. Por tanto, el constructor requiere estos dos objetos para poder actuar 
* @remarks
* hsdahdjs
* @param x -sss 
*/
export class  InterfazActividades {

  configuracionGrafico: IConfiguracionGrafico;
  actividades: ActividadG[];
  interaccionActividades: IInteraccionActividades;

  constructor(_configuracionGrafico: IConfiguracionGrafico,  _actividades: ActividadG[]) {

    this.configuracionGrafico = _configuracionGrafico;
    this.actividades = _actividades;
    this.interaccionActividades = {
    
      seleccionActividad$: new Subject<ActividadG>(),
      entrandoEnActividad$: new Subject<ActividadG>(),
      saliendoDeActividad$: new Subject<ActividadG>(),    // Emite un valor cuando se selecciona una actividad
      moverActividad$: new Subject<ActividadG>(),        // Emite un valor cuando se intenta mover una actividad
      duplicarActividad$: new Subject<ActividadG>(),     // Emite un valor cuando se intenta duplicar una actividad
      eliminarActividad$: new Subject<ActividadG>(),     // Emite un valor cuando se intenta eliminar una actividad
      sobreActividad$: new Subject<ActividadG>(), 
      actividad$: new Subject<ActividadG>(),     // Emite un valor cuando se intenta eliminar una actividad
      anyadirActividadEnSesion$: new Subject<ISesion>()  

    }



  }

  /**
   * @description
   *  Puesto que estamos trabajando con el modelado de un gráfico svg, la estrategia consistirá en construir elementos de tipo "g" (grupos) que, en función de la ubicación temporal de las actividades se les realizarán las transformaciones oportunas.
   *  Lo primero a tener en cuenta es que la instanciación de esta clase requiere de la existencia de paneles "panelDiaSemana". en casa uno de estos paneles se anidarán los paneles correspondientes a las actividades del día al que representa el panel.
   *  Como se observa en el código se itera por cada panel de dias de semana y se invoca a una función que renderiza las actividades asociadas a cada uno de los días de la semana <renderizarActividadesPorDiaSemana>
   */
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

    /**
   * @description
   * Esta función es la responsable de renderizar un conjunto de actividades que comparten el mismo día de la semana. Por tanto, requiere, como parámetro, información del día de la semana y las actividades a renderizar.
   * Las actividades no se van a construir de forma aislada, sino que, construiremos grupos asociados a una sesión y al conjunto de actividades que comparten la sesión. Esto es necesario puesto que habrá controles para poder desplazarnos entre distintas actividades que comparten sesión.
   * A estos paneles que albergan un conjunto de actividades de una sesión dada los denominamos "panelSesionActividades"
   * En esta función lo único que se hace es generar los paneles de tipo "panelSesionActividades" de un día pasado como parámetro. Se delega en la función "renderizarActividadesPorSesionActividad" el contenido de estos paneles.
   */
  private renderizarActividadesPorDiaSemana(panelDiaSemana: string, actividadesG: ActividadG[]) {
    
    // Paso 0: Transformamos la colección de actividades agrupándolas por sesiones.
    const actividadesSesion: IActividadesSesion[] = Utilidades.obtenerActividadesSesiones(actividadesG);
   
    // Paso 1:  Crear los paneles que representarán a las actividades de una sesión
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
   
    // Paso 2: Añadir contenido a los paneles creados.
    this.renderizarActividadesPorSesionActividad(panelesSesionActividades, actividadesSesion);
    
  }
   
  /**
   * @description Esta función es responsable de añadir contenido a las paneles de sesión. Estos paneles albergarán, potencialmente, múltiples actividades. Tendrán como elemento común una cabecera que estará representada por un panel de tipo "panelCabeceraSesionActividades".
   * En la cabecerá se dispondrán los botones para poder movernos entre actividades que comparten sesión. Debido a la complejidad de la creación de estos botones se ha delegado el código a la función "renderizarBotonesPanelCabeceraSesionesActividades".
   * Asimismo, el renderizado de las actividades también se delegan en otras funciones: "renderizarPanelesCuerpoSesionActividades" y "renderizarPanelPieSesionActividades". La primera se responsabilidad de lo que hemos denominado "cuerpo" y es la secció que podrá tener, a su vez, n secciones verticales en su interior.
   * La función "renderizarPanelPieSesionActividades" será la responsable del renderizado del pie, que es la sección en la que se añade el detalle de las actividades.
   */
  private renderizarActividadesPorSesionActividad(panelesSesionActividades: any, actividadesSesion: IActividadesSesion[]) {
  
      const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? (this.configuracionGrafico.panelSesiones.anchoSesion).toString() : '0';
      const altoCabeceraSesion = this.configuracionGrafico.panelSesiones.altoCabecera;

   //---------------------------------------------------------------------------------
  // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
  // Su identificador será el texto 'panelCabeceraSesionActividades' con el id de la
  // sesión.
  //---------------------------------------------------------------------------------
  const panelCabeceraSesionConActividades = panelesSesionActividades.append('g')
    .attr('class', 'panelCabeceraSesionActividades')
    .attr('id', (d: IActividadesSesion) => 'panelCabeceraSesionActividades' + d.sesion.idSesion);

  //---------------------------------------------------------------------------------
  // Definicion del rectángulo que representa a la cabecera de la sesión.
  //---------------------------------------------------------------------------------
  panelCabeceraSesionConActividades.append('rect')
    .attr('class', 'rectPanelCabeceraSesionActividades')
    .attr('height', altoCabeceraSesion+6)  // Es un artificio para ocultar las esquinas inferiores redondeadas
    .attr('width', anchoSesion)
    .attr('rx',6)
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
  this.renderizarPanelesCuerpoSesionActividades(panelesSesionActividades);
  this.renderizarPanelPieSesionActividades(panelesSesionActividades)
  this.anyadirPanelesActividades(actividadesSesion);

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


    const trianguloIzquierdo = pcsa.append("polygon");
    trianguloIzquierdo
      .attr("points", coordenadasTrianguloIzquierdo.map(function (d: any) { return [d.x, d.y].join(","); }).join(" "))
      .attr("fill", "#ccc")
      .attr('class', 'botonCabeceraSesionActividades botonIzquierdoCabeceraSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'botonIzquierdoCabeceraSesionActividades' + d.sesion.idSesion)
      .on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this))
      .on("mouseout", (d: any) => d3.select('body').style("cursor", "default"))
      .on("mouseover", (d: any) => d3.select('body').style("cursor", "pointer"));


    const trianguloDerecho = pcsa.append("polygon");
    trianguloDerecho
      .attr('points', coordenadasTrianguloDerecho.map(function (d: any) { return [d.x, d.y].join(","); }).join(" "))
      .attr('fill', (d: IActividadesSesion) => d.actividades.length>1?'white':'#ccc')
      .attr('class', 'botonCabeceraSesionActividades botonDerechoCabeceraSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'botonDerechoCabeceraSesionActividades'+d.sesion.idSesion)
      .on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this))
      .on("mouseout", (d: any) => d3.select('body').style("cursor", "default"))
      .on("mouseover", (d: any) => d3.select('body').style("cursor", "pointer") );

  }

  private renderizarPanelesCuerpoSesionActividades(panelSesionActividades: any) {
    const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? this.configuracionGrafico.panelSesiones.anchoSesion.toString() : '0';

    
    const altoPie = this.configuracionGrafico.panelSesiones.altoPie;
    const altoCabeceraSesion = this.configuracionGrafico.panelSesiones.altoCabecera;

    //---------------------------------------------------------------------------------
    // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
    // Su identificador será el texto 'panelCuerpoSesionActividades' con el id de la
    // sesión.
    //---------------------------------------------------------------------------------
    const panelCuerpoSesionConActividades = panelSesionActividades.append('g')
      .attr('class', 'panelCuerpoSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'panelCuerpoSesionActividades' + d.sesion.idSesion)
      .attr('transform', `translate(0,${altoCabeceraSesion})`)

    panelCuerpoSesionConActividades.append('clipPath')
      .attr('id', (d: any) => 'rectanguloRecortador' + d.sesion.idSesion)
      .append('rect')
      .attr('id', (d:any) => 'rectRecortador' + d.sesion.idSesion)
      .attr('height', (d: any) => {
      const coordenadaHoraInicio = this.configuracionGrafico.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio));
      const coordenadaHoraFin = this.configuracionGrafico.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaFin));
      return coordenadaHoraFin - coordenadaHoraInicio-altoCabeceraSesion - altoPie;
    })
      .attr('width', (d: any) => anchoSesion)


    panelCuerpoSesionConActividades
      .attr("clip-path", (d: any) => {

        return `url(#${'rectanguloRecortador' + d.sesion.idSesion})`
      })


     return panelCuerpoSesionConActividades;
  }
  
  private renderizarPanelPieSesionActividades(panelSesionActividades: any) {

    const altoPie = this.configuracionGrafico.panelSesiones.altoPie;
    const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? this.configuracionGrafico.panelSesiones.anchoSesion.toString() : '0';
    const altoCabeceraSesion = this.configuracionGrafico.panelSesiones.altoCabecera;
    const colorCabecera = this.configuracionGrafico.panelSesiones.colorCabecera

    //---------------------------------------------------------------------------------
    // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
    // Su identificador será el texto 'panelPieSesionActividades' con el id de la
    // sesión.
    //---------------------------------------------------------------------------------
    const panelPieSesionConActividades = panelSesionActividades.append('g')
      .attr('class', 'panelPieSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'panelPieSesionActividades' + d.sesion.idSesion);



    //---------------------------------------------------------------------------------
    // Definicion del rectángulo que representa a la cabecera de la sesión.
    //---------------------------------------------------------------------------------
    panelPieSesionConActividades.append('rect')
      .attr('class', 'rectPanelPieSesionActividades')
      .attr('height', altoPie)  // Es un artificio para ocultar las esquinas inferiores redondeadas
      .attr('width', anchoSesion)
      // .attr('rx',10)
      .attr('y', (d: any) => {
        const coordenadaHoraInicio = this.configuracionGrafico.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio));
      
        const coordenadaHoraFin = this.configuracionGrafico.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaFin));
        return coordenadaHoraFin - coordenadaHoraInicio - altoPie;
      })
      .attr('fill', '#ccc');

    // Se añade el texto de la cabecera: hora inicio-fin
    panelPieSesionConActividades.append('text')
      .attr('x', parseInt(anchoSesion) / 2)
      .text((d: IActividadesSesion) => d.sesion.horaInicio + ' - ' + d.sesion.horaFin)
      .attr('y', altoCabeceraSesion / 2)
      .attr('font-size', '.6em')
      .attr('fill', 'white')
      .attr('dominant-baseline', 'central')
      .attr('text-anchor', 'middle');

     return panelPieSesionConActividades;
    
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

  private anyadirPanelesActividades(actividadesSesiones: IActividadesSesion[]) {

    const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? this.configuracionGrafico.panelSesiones.anchoSesion.toString() : '0';
    const mostrarSeccionPie = this.configuracionGrafico.actividades.mostrarSeccionPie? this.configuracionGrafico.actividades.mostrarSeccionPie : false;
    const altoSeccionPie = this.configuracionGrafico.actividades.altoSeccionPie? this.configuracionGrafico.actividades.altoSeccionPie : 0;

    
    actividadesSesiones.forEach(as => {

      //Paso 1: Crear paneles de actividades de unasesion.
      //PAso 2: Renderizar actividades


      // alto del panel que representa a una actividad. (vertical) 
      const altoPanelActividad = Utilidades.altoPanel(this.configuracionGrafico, as.sesion) - this.configuracionGrafico.panelSesiones.altoCabecera - this.configuracionGrafico.panelSesiones.altoPie;
      
      // Dimensiones paneles secciones (vertical) 
      //const altoPanelesSecciones = mostrarSeccionPie?altoPanelActividad-altoSeccionPie :0;

      // Dimensiones panel: Zonal selección
      const anchoZonaSeleccion = parseFloat(anchoSesion) * this.configuracionGrafico.actividades.porcentajeZonaSeleccionActividad / 100;
      const altoZonaSeleccion = altoPanelActividad;  // No lo cambiamos

      // Localizamos el panel relativo al cuerpo de la actividadesSesion
      // y le añadimos los paneles que representarán a cada una de sus actividades.
      const idPanel = '#panelCuerpoSesionActividades' + as.sesion.idSesion;
      const panelesActividades: any = d3.select(idPanel).selectAll('act' + 'xx').data(as.actividades).enter().append('g');


      panelesActividades
        .attr('class', (d: any, i: any, n: any) => {
          if (i == 0) return 'panelActividad visible'
          else return 'panelActividad'
        })
        .attr('id', (d: any) => 'panelActividad_' + d.idActividad)
        .attr('transform', (d: any, i: any, n: any) => `translate(${(i) * parseFloat(anchoSesion)},0)`)
        .attr('x', (d: any, i: any, n: any) => (i) * parseFloat(anchoSesion))
        .attr('y', 0)
        .attr('height', altoPanelActividad)
        .attr('altoSeccionPie',(d: any) => (mostrarSeccionPie && altoSeccionPie && d.detalleActividad)?altoSeccionPie:0)
        .attr('width', anchoSesion);

        // A cada panel de una actividad además le añadimos las tres secciones
        const entidadesSecciones = []
        this.configuracionGrafico.actividades.contenidoSecciones.forEach(
          entidad=> entidadesSecciones.push(entidad)
        )

 

        as.actividades.forEach(
          actividad => {

            // Paso 1: Renderizamos cada una de las secciones verticales: pueden haber múltipler
            const panelActividad = d3.select('g#panelActividad_' + actividad.idActividad);
        
       
            for (let index = 1; index < entidadesSecciones.length+1; index++) {
              this.renderizarSeccionContenidoPanelActividad(panelActividad, actividad, index, this.obtenerCadenasEntidadesHorario(actividad, entidadesSecciones[index-1]));
              
            }

            // Paso 2: en el caso de que se quiera añadir una botonera se ejecutaría el método "renderizarSeccionBotonesAccionPanelActividad"

            //-------------------------------- PENDIENTE ---------------------//
            this.configuracionGrafico.actividades.mostrarPanelAcciones? this.renderizarSeccionBotonesAccionPanelActividad(panelActividad, actividad): null;

            // Paso 3: en el caso de que se quiera añadir una botonera se ejecutaría el método "renderizarSeccionBotonesAccionPanelActividad"
            //CONFIGURACION_GRAFICO.actividades.mostrarPanelAcciones? this.renderizarSeccionBotonesAccionPanelActividad(panelActividad, actividad): null;

            //-------------------------------- PENDIENTE ---------------------//
            //mostrarSeccionPie && altoSeccionPie !== 0 && actividad.detalleActividad?this.renderizarSeccionPieActividad(panelActividad, actividad):null;


          }
        )


      // -------------------------------------------------------------------
      // Añadimos el rectángulo
      // -------------------------------------------------------------------
      const rectZonaSeleccion = panelesActividades.select('.panelActividadZonaSeleccion').append('rect')
          .attr('class', 'rectActividad')
          .attr('width', anchoZonaSeleccion)
          .attr('height', altoZonaSeleccion)
          .attr('fill', '#eee')
          .on("click", (d: any, i: any, e: any) => {

            const marcadaActividadActualComoSeleccionada = d3.select('g#panelActividad_' + i.idActividad).attr('class').split(' ').includes('actividadSeleccionada');
            d.ctrlKey ? null : Utilidades.desmarcarActividadesComoSeleccionadas(this.actividades);

            marcadaActividadActualComoSeleccionada ?
              d3.selectAll('g#panelActividad_' + i.idActividad).attr('class', 'panelActividad actividadSeleccionada') :
              d3.select('g#panelActividad_' + i.idActividad).attr('class', 'panelActividad');

            d3.select('g#panelActividad_' + i.idActividad).attr('class').split(' ').includes('actividadSeleccionada') ?
              Utilidades.desmarcarActividadesComoSeleccionadas(this.actividades,[i.idActividad]) :
              Utilidades.marcarActividadesComoSeleccionadas([i.idActividad]);
          });




      const botonesMoverDuplicar = panelesActividades.select('.panelActividadZonaSeleccion').append('svg:foreignObject')
        .attr("width", anchoZonaSeleccion + 'px')
        .attr("height", altoZonaSeleccion/2 + 'px')
        .attr("y",'3px')
        .append("xhtml:div")
        .style("width", anchoZonaSeleccion + 'px')
        .style("height", (altoZonaSeleccion/2)-3 + 'px')
        .style('text-align','center')
        .html(`<i class="fas fa fa-expand-arrows-alt" style="font-size:8px; "/><p style="font-size:4px"></p><i class="fas fa fa-copy" style="font-size:8px;"/i>`);

      const panelBotonesAnyadirEliminar = panelesActividades.select('.panelActividadZonaSeleccion').append('svg:foreignObject')
  
        .attr("width", anchoZonaSeleccion + 'px')
        .attr("height", altoZonaSeleccion/2 + 'px')
        .attr("y",altoZonaSeleccion/2+'px')
        .append("xhtml:div")
          .style("width", anchoZonaSeleccion + 'px')
          .style("height", altoZonaSeleccion/2 + 'px')
          .style("display", 'flex')
          .style("align-items","end")
          .style('justify-content', 'center')
          .style('text-align','center')
          .html(`<i class="fas fa fa-trash" style="font-size:8px;"/><p style="font-size:2px"><i class="fas fa fa-plus" style="font-size:8px; "/i>`)
                    .on("click", (d: any, i: any, e: any) => {
            const botonEliminarActividadPulsado: boolean = d.srcElement.classList.contains('fa-trash') ? true : false;
            const botonAnyadirActividadPulsado: boolean = d.srcElement.classList.contains('fa-plus') ? true : false;
            if (botonEliminarActividadPulsado) { this.interaccionActividades.eliminarActividad$.next(i);};
            if (botonAnyadirActividadPulsado) { this.interaccionActividades.anyadirActividadEnSesion$.next(i.sesion)};
          })


      // -------------------------------------------------------------------
      // Añadimos funcionalidad drag and drop
      // -------------------------------------------------------------------

      //-------------------------------- PENDIENTE ---------------------//
      //this.anyadirFuncionalidadDragAndDrop(botonesMoverDuplicar);



    }
    );

  }

  private obtenerCadenasEntidadesHorario( actividad: ActividadG, tipoEntidad: string ):string[] {

    
    switch (tipoEntidad) {

      case "GRU":
        return actividad.grupos?.map(grupo => grupo.codigo)
      break;

      case "DEP":
        return actividad.dependencia ? [actividad.dependencia.codigo] : []
      break;

      case "CON":
        {

          if (this.configuracionGrafico.actividades?.sobrescribirContenidoAreasPorTipo && actividad.asignaturas?.length===0) {
           
            return [actividad.tipoActividad.codigo]

          }
                 
          return actividad.asignaturas?.map(contenidoLectivo => contenidoLectivo.codigo);
        }
      break;

      case "DOC":
        return actividad.docentes?.map(docente => docente.alias)
      break;
    
      default:
        return []
      break;
    }


    
  }

  private renderizarSeccionContenidoPanelActividad(panelActividad: any, actividad: ActividadG, numeroSeccion: number, listaCadenas: string[]) {
   
    const numeroSecciones = this.configuracionGrafico.actividades.contenidoSecciones.length;
    const panelActividadBBox =
    {
      'x': panelActividad.attr('x')+panelActividad.attr('altoSeccionPie'),
      'y': panelActividad.attr('y'),
      'height': panelActividad.attr('height')-panelActividad.attr('altoSeccionPie'),
      'width': panelActividad.attr('width')
    }

    const porcentajeAnchoZonaSeleccion = this.configuracionGrafico.actividades.mostrarPanelAcciones? this.configuracionGrafico.actividades.porcentajeZonaSeleccionActividad : 0;
    
    //Si en al configuración se indica que no se debe mostrar el panel de botones de acción, se cambia el porcentaje por el valor 0.
    const anchoZonaSeleccion = this.configuracionGrafico.actividades.mostrarPanelAcciones? panelActividadBBox.width*(porcentajeAnchoZonaSeleccion/100): 0;
    const panelSeccionBBox =
    {
      'x': (numeroSeccion-1) * (panelActividadBBox.width*(1-porcentajeAnchoZonaSeleccion/100) / numeroSecciones)+panelActividadBBox.width*(porcentajeAnchoZonaSeleccion/100),
      'y': panelActividadBBox.y,
      'height': panelActividadBBox.height,
      'width': panelActividadBBox.width * (1-porcentajeAnchoZonaSeleccion/100) / numeroSecciones
    }


    const panelSeccion = panelActividad.append('g')
      .attr('class', 'panelActividadSeccion panelActividadSeccion_' + numeroSeccion)
      .attr('id', 'panelActividadSeccion_' + numeroSeccion + '_' + actividad.idActividad)
      .attr('transform', `translate(${(panelSeccionBBox.x)},0)`)
      .attr('x', panelSeccionBBox.x)
      .attr('y', panelSeccionBBox.y)
      .attr('height', panelSeccionBBox.height)
      .attr('width', panelSeccionBBox.width)

    const rectPanelSeccion = panelSeccion.append('rect')
      .attr('height', panelSeccionBBox.height)
      .attr('width', panelSeccionBBox.width+1)
      .attr('fill', actividad.color);

    // Añadimos una línea que separa las secciones verticales de esta nueva sección
    if (numeroSeccion <= this.configuracionGrafico.actividades.contenidoSecciones.length)
    {
      const lineaFinalSeccion = panelSeccion.append('line')
      .attr('x1', panelSeccionBBox.width)
      .attr('y1', 0)
      .attr('x2',panelSeccionBBox.width)
      .attr('y2', panelSeccionBBox.height)
      .attr('stroke-width', '0.5')
      .attr('stroke', 'grey')  

    }


    const panelContenidoSeccion = panelSeccion
      .append('g')
      .attr('class', 'panelContenidoSeccion panelContenidoSeccion_' + numeroSeccion)
      .attr('id', 'panelContenidoSeccion_' + numeroSeccion + '_' + actividad.idActividad)



    const rectPanelSection = panelSeccion.append('rect')
      .attr('id',  'rectActivarGestionActividad_' + numeroSeccion + '_' + actividad.idActividad )
      .attr('class','rectActivarGestionActividad')
      .attr('height', panelSeccionBBox.height)
      .attr('width', panelSeccionBBox.width * (100 - porcentajeAnchoZonaSeleccion) / 100)
      .attr('opacity', '0')

      .on("click", (d: any, i: any, e: any) => {
        this.interaccionActividades.seleccionActividad$.next(i);   

        
        if (this.configuracionGrafico.actividades.mostrarMarcaSeleccionActividad)
        {
          d3.select('#circuloActividadSeleccionada').remove();
          panelActividad.append('circle')
          .attr('id', 'circuloActividadSeleccionada')
          .attr('cx', panelActividad.attr('width')-5)
          .attr('cy', 4)
          .attr('r', 3)
          .attr('fill', 'red')    
        }
     
       })
      .on("mouseover", (d: any, i: any, e: any) => {
        this.interaccionActividades.entrandoEnActividad$.next(i);
        if (this.configuracionGrafico.actividades.mostrarMarcaSeleccionActividad)
        {
          panelActividad.append('circle')
          .attr('id', 'circuloActividadSobrevolada')
          .attr('cx', panelActividad.attr('width')-5)
          .attr('cy', 4)
          .attr('r', 3)
          .attr('fill', 'orange')
        }
     })
     .on("mouseleave", (d: any, i: any, e: any) => {
      this.interaccionActividades.saliendoDeActividad$.next(i);
       d3.select('#circuloActividadSobrevolada').remove();

   });


   //-------------------------------- PENDIENTE ---------------------//
    //const panelContenidolistaCadenas = this.renderizarContenidoPanelesSeccionesActividades(panelContenidoSeccion, listaCadenas);



  }

  private renderizarSeccionBotonesAccionPanelActividad(panelActividad: any, actividad: ActividadG) {


    panelActividad.append('g')
      .attr('class', 'panelActividadZonaSeleccion')
      .attr('id', 'panelActividadZonaSeleccion_' + actividad.idActividad);

  }

  private renderizarSeccionPieActividad(panelActividad: any, actividad: ActividadG) {



    const anchoSesion = this.configuracionGrafico.panelSesiones.anchoSesion ? this.configuracionGrafico.panelSesiones.anchoSesion.toString() : '0';
    const anchoZonaSeleccion = 
    this.configuracionGrafico.actividades?.mostrarPanelAcciones? 
    parseFloat(anchoSesion) * this.configuracionGrafico.actividades.porcentajeZonaSeleccionActividad / 100:
    0;
    const altoSeccionPie = this.configuracionGrafico.actividades.altoSeccionPie? this.configuracionGrafico.actividades.altoSeccionPie : 0;
   
    // Creamos un objeto que registre las dimensiones del panel
    const panelSeccionPieActividadBBox =
    {
      'x': anchoZonaSeleccion,
      'y': panelActividad.attr('height')-panelActividad.attr('altoSeccionPie'),
      'height': altoSeccionPie,
      'width': panelActividad.attr('width')-anchoZonaSeleccion
    }

    // Creamos el panel
    const panelZonaPieActividad = panelActividad.append('g')
      .attr('class', 'panelActividadSeccionPie')
      .attr('id', 'panelActividadSeccionPie_' + actividad.idActividad)
      .attr('transform', `translate(${(panelSeccionPieActividadBBox.x)},${(panelSeccionPieActividadBBox.y)})`)
      .attr('height', panelSeccionPieActividadBBox.height)
      .attr('width', panelSeccionPieActividadBBox.width)

    // Añadimos el rectángulo al panel
    panelZonaPieActividad.append('rect')
      .attr('height', panelSeccionPieActividadBBox.height)
      .attr('width', panelSeccionPieActividadBBox.width)
      .attr('fill', actividad.color);

    // Añadimos texto al panel con el contenido del detalle de la actividad
    panelZonaPieActividad.append('text')
      .attr('x', panelSeccionPieActividadBBox.width / 2)
      .text(actividad.detalleActividad)
      .attr('y', panelSeccionPieActividadBBox.height / 2)
      .attr('font-size', '0.8em')
      .attr('dominant-baseline', 'central')
      .attr('text-anchor', 'middle')

      // Añadimos una línea que separa las secciones verticales de esta nueva sección
      panelZonaPieActividad.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', panelSeccionPieActividadBBox.width)
      .attr('y2', 0)
      .attr('stroke-width', '0.5')
      .attr('stroke', 'grey')
      // .attr('stroke-dasharray','1')


  }





}


interface IInteraccionActividades {

  seleccionActividad$: Subject<ActividadG>
  entrandoEnActividad$: Subject<ActividadG>; 
  saliendoDeActividad$: Subject<ActividadG>;    // Emite un valor cuando se selecciona una actividad
  moverActividad$: Subject<ActividadG>;        // Emite un valor cuando se intenta mover una actividad
  duplicarActividad$: Subject<ActividadG>;     // Emite un valor cuando se intenta duplicar una actividad
  eliminarActividad$: Subject<ActividadG>;     // Emite un valor cuando se intenta eliminar una actividad
  sobreActividad$: Subject<ActividadG>; 
  actividad$: Subject<ActividadG>;     // Emite un valor cuando se intenta eliminar una actividad
  anyadirActividadEnSesion$: Subject<ISesion>;  // Emite un valor cuando se intenta añadir una actividad en la misma sesión que la actividad seleccionada

}
