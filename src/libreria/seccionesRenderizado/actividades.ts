
import { IActividad } from '../modelo';
import { IConfiguracionGrafico } from '../parametros'
import * as d3 from 'd3';




export function renderizarActividades(_configuracion: IConfiguracionGrafico, _svg: any, actividades: IActividad[]) {


    d3.selectAll('g.panelSesionActividades').remove();

    d3.selectAll('g.panelDiaSemana').nodes().forEach(
       (nodo: any) => {
         const actividadesACrear = actividades.filter(actG => actG.sesion.diaSemana === nodo['id']);
         this.renderizarActividadesPorDiaSemana('g#' + nodo['id'], actividadesACrear)
       }
     );


}

function renderizarActividadesPorDiaSemana(panelDiaSemana: string, actividadesG: IActividad[]) {
  console.log(panelDiaSemana);

}
