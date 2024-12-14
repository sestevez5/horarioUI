import * as d3 from "d3";



export class HorarioUI {

   elementoRaiz: any;
   svg:any;

     

   constructor(elementoRaiz: string) {
      this.elementoRaiz= elementoRaiz;

      this.renderizarGrafico();

      
      

   }

   public renderizarGrafico(){
      window.addEventListener('resize', this.generarGrafico.bind(this));
      this.generarGrafico()
   }



   public generarGrafico(){
      if (this.svg) {
         d3.select('svg').remove();
       }
   
       this.svg = d3.select(this.elementoRaiz).append('svg');
       
   
   
   var altoDiv=d3.select(this.elementoRaiz).style("height");
   var anchoDiv=d3.select(this.elementoRaiz).style("width");

   this.svg.attr("height", altoDiv);
   this.svg.attr("width", anchoDiv);





   this.svg.append("rect")
   .attr("x", parseFloat(anchoDiv)/2)
   .attr("y", parseFloat(altoDiv)/2)
   .attr("width", "100")
   .attr("height", "100")


   .attr("fill", "red");
      }

   //console.log(svg);
   
   
  }


  