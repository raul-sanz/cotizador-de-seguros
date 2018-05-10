//constructor para el seguro
class Seguro{
    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
}
    cotizarSeguro (){
    /*
          1 = americano 1.15
          2 = asiatico 1.05
          3 = europeo 1.35
    */
   let cantidad;
   const base = 2000;

   switch (this.marca) {
          case '1':
               cantidad = base * 1.15;
               break;
          case '2':
               cantidad = base * 1.05;
               break;
          case '3':
               cantidad = base * 1.35;
               break;             
   }
   //leer el año
   const diferencia = new Date().getFullYear() - this.anio; 

   //cada año de diferencia hay que reducir un 3% el valor del seguro
   cantidad -= ((diferencia * 3) * cantidad / 100);
   
   /*
   si en tipo es basico valdra un 30% mas
   si es completo valldra 50% mas
   */
   if (this.tipo === 'basico') {
         cantidad *= 1.30;
   }else{
         cantidad *= 1.50;
   }
   
   return cantidad;
}
}

   


//todo lo que se muestra
class Interfaz{
    //mensaje que se imprimira en el HTML
    mostrarMensaje (mensaje, tipo){
        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('mensaje','error');
        } else {
            div.classList.add('mensaje','correcto');
        }

        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000 );
    }
    //imprime el resuñtaado de la cotizacion
    mostrarResultado (seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {
            case '1':
                    marca = 'Americano';
                    break;
            case '2':
                    marca = 'Asiatico';
                    break;
            case '3':
                    marca = 'Europeo';
                    break;
        }
        //crear el div 
        const div = document.createElement('div');
        //Insertar la informacion
        div.innerHTML= `
            <p class="header">Tu Resumen :</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: $${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div)  
        }, 3000);
        ;
    }
}

//addeventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    //leer marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer radio buttons

    const tipo = document.querySelector('input[name ="tipo"]:checked').value;

    //Crear instancia de interfaz
    const interfaz = new Interfaz();

    //revisar que los campos esten lleno
    if(marcaSeleccionada === '' || anioSeleccionado ==='' || tipo === ''){
          //interfaz imprimiendo el error
          interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba denuevo', 'error');
    }else{
          //limpiar resultado anterios
          const resultados = document.querySelector('#resultado div');
          if (resultados != null) {
                resultados.remove();
          }
          //instancia seguro y muestra interface
          const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
          //cotizar seguro
          const cantidad = seguro.cotizarSeguro();
          //mostrar resultado
          interfaz.mostrarResultado(seguro, cantidad);
          interfaz.mostrarMensaje('cotizando...', 'exito');
    }
})
//crear la lista de años en el options
const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');
for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i ;
    option.innerHTML = i;
    selectAnios.appendChild(option);
    
}