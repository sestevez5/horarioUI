
<<<<<<< HEAD
import { ActividadG, IActividadesSesion } from '../modelo';
import { Utilidades } from '../utilidades'

=======
import { IActividad } from '../modelo';
import { IActividad } from '../modelo';
>>>>>>> 10217517465eed0983d1272e280853c5bf1dfa9b
import { IConfiguracionGrafico } from '../parametros'
import * as d3 from 'd3';




export function renderizarActividades(_configuracion: IConfiguracionGrafico, _svg: any, actividades: ActividadG[]) {


    console.log(actividades);
    calcularColoresActividades(actividades,_configuracion.actividades.criterioColoreado);



}

function calcularColoresActividades(actividades: IActividad[], criterioColoreado: string )
{

    switch (criterioColoreado) {
        case 'TIPO_ACTIVIDAD':
          this.colorearActividadesPorTipoActividad(actividades);
        break;
  
        case 'CONTENIDO':
          this.colorearActividadesPorContenido(actividades);
        break;
  
        case 'GRUPOS':
          this.colorearActividadesPorGrupos(actividades);
        break;
      
        default:
          this.colorearActividadesPorTipoActividad(actividades);
        break;
      }



    d3.selectAll('g.panelSesionActividades').remove();

    d3.selectAll('g.panelDiaSemana').nodes().forEach(
       (nodo: any) => { 
        
        // El id de un panelDiasemana tiene el formato "panelDiaSemana_L". Necesitamos quedarnos con el último carácter. (carácter 15)
        const codigoDiaSemana=nodo['id'].substring(15,16); console.log('codigo:',codigoDiaSemana);
        
         const actividadesACrear = actividades.filter(actG => actG.sesion.diaSemana === codigoDiaSemana);
         renderizarActividadesPorDiaSemana(_configuracion,'g#' + nodo['id'], actividadesACrear)
       }
     );


}

function renderizarActividadesPorDiaSemana(_configuracion: IConfiguracionGrafico, panelDiaSemana: string, actividadesG: ActividadG[]) {
 // Paso 0: Transformamos la colección de actividades agrupándolas por sesiones.
 const actividadesSesion: IActividadesSesion[] = Utilidades.obtenerActividadesSesiones(actividadesG);

 console.log(actividadesG);

 // Paso 1:  Crear los paneles que representarán a las actividades de una sesión
 //const panelesSesionActividades = this.generarPanelesActividadesSesion(panelDiaSemana, actividadesSesion);

 const panelesSesionActividades = d3.select(panelDiaSemana)
   .selectAll('g#act' + 'xx')
   .data(actividadesSesion)
   .enter()
   .append('g')
   .attr('transform', d => `translate(0,${_configuracion.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio))})`)
   .attr('class', 'panelSesionActividades')
   .attr('id', d => 'panelSesionActividades' + d.sesion.idSesion)
   .attr('data-actividades', d => d.actividades.map(act => act.idActividad).join(','))
   .attr('data-actividadVisible', d => d.actividades[0].idActividad);

 // Paso 2: Crear la cabecera de los paneles anteriores.
 //const panelCabeceraSesionActividades = this.renderizarActividadesPorSesionActividad(panelesSesionActividades, actividadesSesion);

}
