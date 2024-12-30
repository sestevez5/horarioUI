import * as d3 from 'd3';
import { IDiaSemana } from './modelo';
import { DIAS_SEMANA } from './constantes';
import { IConfiguracionGrafico } from './parametros';
export class Utilidades {

  // Funciones para trasnformar cadenas en tiempo y viceversa.
  static convertirCadenaHoraEnTiempo: any = d3.timeParse("%I:%M");
  static convertirTiempoEnCadenaHora: any = d3.timeFormat("%I:%M");

  static obtenerDiasSemanaHorario(configuracion: IConfiguracionGrafico): IDiaSemana[] {
    return DIAS_SEMANA.filter((ds: IDiaSemana) => configuracion.configuracionSemana?.diasSemanaHabiles.includes(ds.codigo));
  }

  static anyadirRectangulo(_panel: any, _id: string, _alto: number, _ancho: number, _color: string): any {
    var rect =_panel.append('rect');

    rect
    .attr('id', _id)
    .attr('height', _alto)
    .attr('width', _ancho)
    .attr('fill', _color);

    return rect

  }

  static convertirCadenaHorarEnTiempo(cadena:string): Date {
  const inicioHora=parseInt(cadena.substring(0, 2));
  const inicioMinuto = parseInt(cadena.substring(3, 5));
  const horaEnTiempo: Date = new Date();
  horaEnTiempo.setHours(inicioHora);
  horaEnTiempo.setMinutes(inicioMinuto);
  return horaEnTiempo
}

}