import * as hg from './libreria';

var configuracion = {

    grafico: {
       //pixelesPorHora:500
    },
     configuracionSemana: {
   
       horaMinima: '08:00',
       horaMaxima: '14:00',
       diasSemanaHabiles: ['L','M','X','J','V']
   
     },
   
   
   }
   
   
   
   
   // 2.- plantilla que se rendeizará en el gráfico (Colecció de sesiones)
   var plantilla =  {
     idPlantilla: '1',
     plantillaPorDefecto: true,
     denominacion: 'prueba',
     sesionesPlantilla: [{
         diaSemana: "L",
         horaInicio: "08:00",
         horaFin: "08:55",
         idSesion: "P1L1"
   
     },
     {
         diaSemana: "L",
         horaInicio: "08:55",
         horaFin: "09:50",
         idSesion: "P1L2"
   
     },
     {
         diaSemana: "L",
         horaInicio: "09:50",
         horaFin: "10:45",
         idSesion: "P1L3"
   
     },
     {
         diaSemana: "L",
         horaInicio: "11:15",
         horaFin: "12:10",
         idSesion: "P1L4"
   
     },
     {
         diaSemana: "L",
         horaInicio: "12:10",
         horaFin: "13:05",
         idSesion: "P1L5"
   
     },
     {
         diaSemana: "L",
         horaInicio: "13:05",
         horaFin: "14:00",
         idSesion: "P1L6"
   
     },{
         diaSemana: "M",
         horaInicio: "08:00",
         horaFin: "08:55",
         idSesion: "P1M1"
   
     },
     {
         diaSemana: "M",
         horaInicio: "08:55",
         horaFin: "09:50",
         idSesion: "P1M2"
   
     },
     {
         diaSemana: "M",
         horaInicio: "09:50",
         horaFin: "10:45",
         idSesion: "P1M3"
   
     },
     {
         diaSemana: "M",
         horaInicio: "11:15",
         horaFin: "12:10",
         idSesion: "P1M4"
   
     },
     {
         diaSemana: "M",
         horaInicio: "12:10",
         horaFin: "13:05",
         idSesion: "P1M5"
   
     },
     {
         diaSemana: "M",
         horaInicio: "13:05",
         horaFin: "14:00",
         idSesion: "P1M6"
   
     },{
         diaSemana: "X",
         horaInicio: "08:00",
         horaFin: "08:55",
         idSesion: "P1X1"
   
     },
     {
         diaSemana: "X",
         horaInicio: "08:55",
         horaFin: "09:50",
         idSesion: "P1X2"
   
     },
     {
         diaSemana: "X",
         horaInicio: "09:50",
         horaFin: "10:45",
         idSesion: "P1X3"
   
     },
     {
         diaSemana: "X",
         horaInicio: "11:15",
         horaFin: "12:10",
         idSesion: "P1X4"
   
     },
     {
         diaSemana: "X",
         horaInicio: "12:10",
         horaFin: "13:05",
         idSesion: "P1X5"
   
     },
     {
         diaSemana: "X",
         horaInicio: "13:05",
         horaFin: "14:00",
         idSesion: "P1X6"
   
     },
     {
         diaSemana: "J",
         horaInicio: "08:00",
         horaFin: "08:55",
         idSesion: "P1J1"
   
     },
     {
         diaSemana: "J",
         horaInicio: "08:55",
         horaFin: "09:50",
         idSesion: "P1J2"
   
     },
     {
         diaSemana: "J",
         horaInicio: "09:50",
         horaFin: "10:45",
         idSesion: "P1J3"
   
     },
     {
         diaSemana: "J",
         horaInicio: "11:15",
         horaFin: "12:10",
         idSesion: "P1J4"
   
     },
     {
         diaSemana: "J",
         horaInicio: "12:10",
         horaFin: "13:05",
         idSesion: "P1J5"
   
     },
     {
         diaSemana: "J",
         horaInicio: "13:05",
         horaFin: "14:00",
         idSesion: "P1J6"
   
     },
     {
         diaSemana: "V",
         horaInicio: "08:00",
         horaFin: "08:55",
         idSesion: "P1V1"
   
     },
     {
         diaSemana: "V",
         horaInicio: "08:55",
         horaFin: "09:50",
         idSesion: "P1V2"
   
     },
     {
         diaSemana: "V",
         horaInicio: "09:50",
         horaFin: "10:45",
         idSesion: "P1V3"
   
     },
     {
         diaSemana: "V",
         horaInicio: "11:15",
         horaFin: "12:10",
         idSesion: "P1V4"
   
     },
     {
         diaSemana: "V",
         horaInicio: "12:10",
         horaFin: "13:05",
         idSesion: "P1V5"
   
     },
     {
         diaSemana: "V",
         horaInicio: "13:05",
         horaFin: "14:00",
         idSesion: "P1V6"
   
     }]
   }








function init(elementoRaiz){

var x = new hg.HorarioUI('horarioUI')

x.renderizarGrafico(configuracion, plantilla);



}

init()



