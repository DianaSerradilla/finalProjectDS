//-------------Declaraciones inicio

let stickersIndex = document.getElementsByClassName("stickers-index");

//-------------Declaraciones fin

//-------------Desarrollo de funciones inicio

//-----Función imprimir stickers:
// La misma sirve para poder imprimir en el index, es decir en "Inicio", los stickers traidos de la base de datos(arrays). Cuenta con una peculiaridad a diferencia de lo que se ve en la pestaña de "Shop" y es que:
// - Primero: imprime solo 9, no todo el arrays.
// - Segundo: según su atributo(nuevo,oferta o popular), agrega una clase respectivamente para luego poder filtrar
// Desde esta pestañana podemos acceder a comprar agregando con el boton "add to cart"

function imprimirStickersIndex(impresiones) {
  //------Primero elijo el contenedor en el cual voy a incluir estos stickers.
  let contenedorIndex = document.getElementById("contenedorIndex");
  //-----Lo inicializo vacío para que no se sobreescriba la información luego.
  contenedorIndex.innerHTML = "";
  //-------Este contador me va a servir para cortar el bucle e imprimir solo 9.
  let contador = 0;

  for (const sticker of impresiones) {
    contador++;
    if (contador < 9) {
      let cardIndex = document.createElement("div");
      //------Este switch lo que hace es leer el atributo y en base a eso, le coloca una cierta clase al contenedor del sticker.
      switch (sticker.atributo) {
        case "nuevo":
          cardIndex.className +=
            "col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals";
          break;
        case "oferta":
          cardIndex.className +=
            "col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales";

          break;
        case "popular":
          cardIndex.className +=
            "col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix ";
          break;
        default:
          break;
      }
      //------Aquí procedo a imprimir la tarjeta con el sticker y su información
      cardIndex.innerHTML = `
        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="">
                                <img src="${sticker.img}" alt="${sticker.nombre}">
                                <ul class="product__hover">
                                    <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>

                                    <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>${sticker.nombre}</h6>
                                <a href="#" class="add-cart" id="agregar${sticker.id}">+ Add To Cart</a>

                                <h5>$ ${sticker.precio}</h5>
                               
                            </div>
          </div>
        `;
      contenedorIndex.appendChild(cardIndex);
      //---------Aquí procedo a guardar en el boton el ID con el número del ID del Sticker para luego invocar a la función "comprar".
      let buttonAdd = document.getElementById(`agregar${sticker.id}`);
      buttonAdd.addEventListener("click", () => comprar(sticker.id));
    } else {
      //------Rompo con el bucle en caso de que el contador supere los 9.
      break;
    }
  }
}
//-------------Desarrollo de funciones fin

//-------------Invocación de funciones inicio

imprimirStickersIndex(impresiones);

//-------------Invocación de funciones fin
