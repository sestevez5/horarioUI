import { IDiaSemana } from '../modelo';
import { IConfiguracionGrafico } from '../parametros'
import { Utilidades } from '../utilidades';



export function renderizarPanelesDiasSemana(_configuracion: IConfiguracionGrafico, _svg: any) {

   //-------------------------------------------------
   // Definición del panel
   //-------------------------------------------------
   // aux obtiene todos los elementos g con id  "panelDiaSemana" qe ya existan
   const aux: any = _svg.select('g#panelHorario').selectAll('g#panelDiaSemana').data(Utilidades.obtenerDiasSemanaHorario(_configuracion));
   const panelesDiasSemana = _svg.select('g#panelHorario').selectAll('g#panelDiaSemana').data(Utilidades.obtenerDiasSemanaHorario(_configuracion)).enter().append('g');
   panelesDiasSemana.merge(aux);
   panelesDiasSemana.exit().remove();

   // Establecemos los parámetros de todos los elementos
   panelesDiasSemana.merge(aux)
      .attr('id', (d: IDiaSemana) => 'panelDiaSemana_'+d.codigo)
      .attr('class', 'panelDiaSemana')
      .attr('transform', (d: IDiaSemana) => `translate(${_configuracion.grafico.ejes.escalaHorizontal ? _configuracion.grafico.ejes.escalaHorizontal(d.denominacion) : 0},0)`);

   panelesDiasSemana
      .append('line')
      .attr('x1', _configuracion.grafico.ejes.escalaHorizontal?.bandwidth)
      .attr('y1', 0)
      .attr('x2', _configuracion.grafico.ejes.escalaHorizontal?.bandwidth)
      .attr('y2', _configuracion.grafico.panelHorario.alto as number)
      .attr('stroke-width', '0.3')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '0.1')
}
