import * as d3 from "d3";



export class HorarioUI {

   elementoRaiz: any;
   

   public escribirHola() {

var svg = d3.select("#xaa").style("background-color","grey");
var MisDatos = ["a","b","c"]



console.log(svg.selectAll("p"))

var plantillaG =  this.anyadirPlantilla();
var sesionesG = this.anyadirSesionesAPlantilla();
var actividadesG = this.anyadirActividades();

    
};

anyadirPlantilla(){

}

anyadirSesionesAPlantilla(){

}

anyadirActividades(){

}

anyadirRectangulos(_svg: any, _misDatos: Array<string>){

   _svg.selectAll("rect").data(_misDatos).join("rect").text(function(d,i){return d+i})

}
      

   constructor(elementoRaiz: string) {

   }


   

   
   
  }


  