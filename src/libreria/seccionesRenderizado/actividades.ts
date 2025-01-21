
import { IActividad } from '../modelo';
import { IConfiguracionGrafico } from '../parametros'




export function renderizarActividades(_configuracion: IConfiguracionGrafico, _svg: any, actividades: IActividad[]) {

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




}
