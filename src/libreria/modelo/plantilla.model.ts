import { ISesion } from './sesion.model';
export interface IPlantilla {
  idPlantilla: string;
  denominacion: string;
  sesionesPlantilla: ISesion[];
}
