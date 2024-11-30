import Snap from 'snapsvg';


export class HorarioUI {

   elementoRaiz: any;
   

   public escribirHola() {


      var s = Snap("#xaa");
      var padre = s.parent();
      s.attr({'width':padre.node.clientHeight/2, 'height': padre.node.clientWidth/2, 'fill':'red'})
      
      console.log(padre.node.style.backgroundColor);
      console.log(padre.node.attributeStyleMap);
      console.log(padre.node.computedStyleMap().getAll('background-color').toString());



   // Circle with 80px radius 



      //a('#svg');



   }

   constructor(elementoRaiz: string) {
      this.elementoRaiz = elementoRaiz;  
   }


   

   
   
  }


  