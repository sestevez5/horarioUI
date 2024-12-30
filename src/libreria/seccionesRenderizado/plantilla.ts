import { IPlantilla, ISesion } from '../modelo';
import { IConfiguracionGrafico } from '../parametros'
import * as d3 from 'd3';
import { Utilidades } from '../utilidades';
import { Subject } from 'rxjs';

export function renderizarPlantilla(_configuracion: IConfiguracionGrafico, _svg: any, _plantilla: IPlantilla, _seleccionSesion$: Subject<ISesion>) {

    d3.selectAll('g.panelDiaSemana').nodes().forEach(
        (nodo: d3.BaseType) => {

            // Los ids de los días de la semana tiene el formato g#<codigoDiaSemana>. Nos quedamoas con el código de un caracter
            const codigoDiaSemana = nodo['id'].replace('panelDiaSemana_', '');
            const sesiones: ISesion[] = _plantilla.sesionesPlantilla
                .filter(sesion => sesion.diaSemana === codigoDiaSemana);
            renderizarSesiones(_configuracion, nodo['id'], sesiones, _seleccionSesion$)
        });




}

function renderizarSesiones(_configuracion: IConfiguracionGrafico, idPanelDiaSemana: string, _sesiones: ISesion[],_seleccionSesion$: Subject<ISesion>) {

    const panelDiaSemana = d3.select('#' + idPanelDiaSemana);

    // la constante panelesSesion contendrá todos los elementos "g" 
    const panelesSesiones = panelDiaSemana.selectAll('g#sesion' + 'pp').data(_sesiones).enter().append('g')
        .attr('transform', d => `translate(0,${_configuracion.grafico.ejes.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.horaInicio))})`)
        .attr('class', 'panelSesion')
        .attr('id', d => 'sesion_' + d.idSesion)
        .on("click", (d: any, e:any) => {
            _seleccionSesion$.next(e);
          });

    renderizarCabeceraSesiones(panelesSesiones, _configuracion);
    renderizarCuerpoSesiones(panelesSesiones, _configuracion);
}


function renderizarCabeceraSesiones(panelesSesiones: any, _configuracion:IConfiguracionGrafico) {

        const anchoSesion: number = _configuracion.panelSesiones.anchoSesion;
        const altoCabecera: number = _configuracion.panelSesiones.altoCabecera

        // Creación de la cabecera de la sesión
        const panelesCabeceraSesion = panelesSesiones.append('g')
        .attr('class', 'panelCabeceraSesion')
        .attr('id', d => 'cabeceraSesion_'+d.idSesion)
    
    
        panelesCabeceraSesion.append('rect')
        .attr('class', 'fondoPanelSesionCabecera')
        .attr('id', d => 'fondoPanelSesionCabecera' + d.idSesion)
        .attr('height', altoCabecera)
        .attr('width', anchoSesion)
        .attr('fill', _configuracion.panelSesiones.colorCabecera);

        panelesCabeceraSesion.append('text')
        .attr('x', anchoSesion / 2)
        .text(d => d.horaInicio + ' - ' + d.horaFin)
        .attr('y', altoCabecera / 2)
        .attr('font-size', '.7em')
        .attr('dominant-baseline', 'central')
        .attr('text-anchor', 'middle')

}

function renderizarCuerpoSesiones(panelesSesiones: any, _configuracion:IConfiguracionGrafico) {

    const anchoSesion: number = _configuracion.panelSesiones.anchoSesion;
    const altoCabecera: number = _configuracion.panelSesiones.altoCabecera;
    const escalaVertical: any = _configuracion.grafico.ejes.escalaVertical;

    // Creación de la cabecera de la sesión
    const panelesCuerpoSesion = panelesSesiones.append('g')
    .attr('class', 'panelCuerpoSesion')
    .attr('id', d => 'cuerpoSesion_'+d.idSesion)
    .attr('transform', `translate(0,${altoCabecera})`);


    panelesCuerpoSesion.append('rect')
    .attr('class', 'fondoPanelSesion')
    .attr('id', d => 'fondoPanelSesion_' + d.idSesion)
    .attr('height', (d: ISesion) => {
        const coordenadaHoraInicio = escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.horaInicio));
        const coordenadaHoraFin = escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.horaFin));
        return coordenadaHoraFin - coordenadaHoraInicio - altoCabecera;
      })
    .attr('width', anchoSesion)
    .attr('fill', _configuracion.panelSesiones.colorCuerpo);

    // panelesCuerpoSesion.append('text')
    // .attr('x', anchoSesion / 2)
    // .text(d => d.horaInicio + ' - ' + d.horaFin)
    // .attr('y', altoCabecera / 2)
    // .attr('font-size', '.7em')
    // .attr('dominant-baseline', 'central')
    // .attr('text-anchor', 'middle')

}