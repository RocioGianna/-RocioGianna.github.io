class Fondo{
   static fondo = "";

   static setValue(valor){
      Fondo.fondo = valor;
   }

   static getValue(){
      return Fondo.fondo;
   }
}

export function getValue(){
   return Fondo.fondo;
};

export function setValue(valor){
   Fondo.fondo = valor;
}

