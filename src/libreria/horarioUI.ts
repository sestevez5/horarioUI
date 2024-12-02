import Snap from 'snapsvg';


export class HorarioUI {

   elementoRaiz: any;
   

   public escribirHola() {
      console.log()


      var s = Snap(this.elementoRaiz);
      var padre = s.parent();
      console.log(padre.node.clientHeight);
      console.log(padre.node.clientWidth);
      s.attr({'width':padre.node.clientHeight/2, 'height': padre.node.clientWidth/2, 'fill':'red'})
      console.log(s.node.clientHeight)

      console.log(padre.node.style.backgroundColor);
      console.log(padre.node.attributeStyleMap);
      console.log(padre.node.computedStyleMap().getAll('background-color').toString());



   // Circle with 80px radius 



      //a('#svg');



   }

   public obtenerObjetoRaiz() {

      var s = Snap('#'+this.elementoRaiz);

      console.log(s);
   }

   constructor(elementoRaiz: string) {
      this.elementoRaiz = elementoRaiz;  
   }


   

   
   
  }


  