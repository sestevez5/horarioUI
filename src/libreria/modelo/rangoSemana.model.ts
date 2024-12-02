//Las cadenas válidas para los días de la semana son:

import { IDiaSemana } from "./diaSemana.model";

// lunes: "L", martes: "M", miércoles, "X", jueves: "J", viernes: "V", sábado: "S", domingo: "D"
export interface IRangoSemana {
  horaMinima: string,
  horaMaxima: string,
  diasSemanaHabiles: IDiaSemana[], 
}


