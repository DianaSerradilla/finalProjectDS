//-------------Declaraciones inicio
let totalStickers = document.getElementById("total-stickers");
let totalStickersS = document.getElementById("total-stickersS");
let mostrarTodos = document.getElementsByClassName("mostrar-todos");


//--------------------------Declaraciones Fin

//-------------Desarrollo de funciones inicio

//-----Función imprimir stickers:
// Esta función me permite imprimir, en la pestaña de "Shop" todos los stickers guardados en la base de datos.
function imprimirStickers(impresiones) {
  //-----Comienzo seleccionando el contenedor en el cual voy a imprimir los stickers.
  let contenedor = document.getElementById("contenedor");

  //-----Esto me va a servir para imprimir el total de stickers en la frase "Mostrando 1-12 de 20 resultados"
  totalStickers.innerHTML = impresiones.length;
  //-----Inicializo el contedor vacio para que luego no se se sobre escriba con los filtros
  contenedor.innerHTML = "";
  for (const sticker of impresiones) {
    let card = document.createElement("div");
    (card.className += "col-lg-4 col-md-6 col-sm-6"), card.setAttribute(
      "id",
      "sticker"
    );
    card.innerHTML = `
                        
                            <div class="product__item">
                                <div class="product__item__pic set-bg" data-setbg="${sticker.img}">
                                 
                                   <img src="${sticker.img}" alt=${sticker.nombre}">
                                </div>
                                <div class="product__item__text">
                                    <h6>${sticker.nombre}</h6>
                                    <a href="#" class="add-cart" id="agregar${sticker.id}">+ Add To Cart</a>
                                   
                                    <h5>$ ${sticker.precio}</h5>
                                    
                                </div>
                            </div>
                     
                            
                        `;

    contenedor.appendChild(card);
    //-----Guardo el boton con el id del sticker para luego invocar a la función de comprar
    let buttonAdd = document.getElementById(`agregar${sticker.id}`);
    buttonAdd.addEventListener("click", () => comprar(sticker.id));
  }
}

//-----Función imprimir Categorias:
//-----Esta función me permite imprimir, en el lado izquierdo todas las categorías que hay, según lo cargado en la base de datos. Como así también, la cantidad de stickers que hay por categoría y poder, invocar y filtrar según categoría.
function imprimirCategorias(categorias, impresiones) {
  let contenedorCategorias = document.getElementById("contenedor-categorias");

  for (const i in categorias) {
    let categoria = document.createElement("li");
    let contadorCantidad = 0;
    for (const sticker of impresiones) {
      if (categorias[i] == sticker.categoria) {
        contadorCantidad++;
      }
    }

    categoria.innerHTML = `<a href="#" id="categoria${categorias[
      i
    ]}"> ${categorias[i]} (${contadorCantidad})</a>`;

    contenedorCategorias.appendChild(categoria);
    contadorCantidad = 0;
    //-----Esto me permite guardar, como ID, la categoría para luego invocar a la función de filtración.
    let buttonCategoria = document.getElementById(`categoria${categorias[i]}`);
    buttonCategoria.addEventListener("click", () =>
      filtrarCategoria(categorias[i], impresiones)
    );
  }
}

//-----Función imprimir Ilustrador:
//----------De la misma forma que anteriormente imprimi las categorías, hice lo mismo con los ilustradores.
function imprimirIlustrador(ilustradores, impresiones) {
  let contenedorIlustradores = document.getElementById(
    "contenedor-ilustradores"
  );

  for (const i in ilustradores) {
    let ilustrador = document.createElement("li");
    let contadorCantidad = 0;
    for (const sticker of impresiones) {
      if (ilustradores[i] == sticker.ilustrador) {
        contadorCantidad++;
      }
    }
    ilustrador.innerHTML = `<a href="#" id="ilustrador${ilustradores[
      i
    ]}"> ${ilustradores[i]} (${contadorCantidad})</a>`;
    contenedorIlustradores.appendChild(ilustrador);
    contadorCantidad = 0;
    let buttonIlustrador = document.getElementById(
      `ilustrador${ilustradores[i]}`
    );
    buttonIlustrador.addEventListener("click", () =>
      filtrarIlustrador(ilustradores[i], impresiones)
    );
  }
}

//-----Función imprimir Precios:
//-------Esta me permite imprimir los rangos de precios, para luego poder filtrar.
function imprimirPrecios() {
  let contenedorPrecios = document.getElementById("contenedor-precios");
  //-----Hay dos contadores debido a que utilice rango de precios, es decir, stickers que valen de de 0 a 50, de 50 a 100 y así. Por eso hay uno que arranca en cero y el otro en 50.
  let contador = 0;
  let contadorUno = 50;
  for (let i = 0; i <= 4; i++) {
    let precio = document.createElement("li");
    //----Dejé esta parte comentada para la comparación con un operador avanzado.
    // if(i!=4){
    //   precio.innerHTML =
    // `<li><a href="#" id="${i}" >$${contador}.00 - $${contadorUno}.00</a></li>`
    // }else{
    //     precio.innerHTML =
    //   `<a href="#" id="4">$250.00+</a>`
    // }
    //Operadores avanzados
    i != 4
      ? (precio.innerHTML = `<li><a href="#" id="${i}" >$${contador}.00 - $${contadorUno}.00</a></li>`)
      : (precio.innerHTML = `<a href="#" id="4">$250.00+</a>`);
    contador += 50;
    contadorUno += 50;
    contenedorPrecios.appendChild(precio);
    let buttonPrecio = document.getElementById(`${i}`);
    buttonPrecio.addEventListener("click", () => filtrarPrecio(i, impresiones));
  }
}

//-----Función filtrar por categoria:
// Esta función me permite, al momento de hacer click sobre alguna categoría, imprimir solamente aquellos stickers que pertenezcan a esa categoría.
function filtrarCategoria(categoria, impresiones) {
  //-----Genero un nuevo array según categoría y luego invoco a la función que imprime los stickers y le envio este nuevo arrays.
  const impresionesXCategoria = impresiones.filter(
    sticker => sticker.categoria == categoria
  );
  contenedor.innerHTML = "";
  //-------Esto lo realizo para modificar la cantidad de total de stickers mostrados en la frase "Mostrando 1-12 de 20 resultados"
  totalStickers.innerHTML = impresionesXCategoria.length;
  imprimirStickers(impresionesXCategoria);
}

//-----Función filtrar por ilustrador:
//-----De la misma forma que con las categorías, lo realizo para los ilustradores.
function filtrarIlustrador(ilustrador, impresiones) {
  const impresionesXIlustrador = impresiones.filter(
    sticker => sticker.ilustrador == ilustrador
  );
  contenedor.innerHTML = "";
  totalStickers.innerHTML = impresionesXIlustrador.length;
  imprimirStickers(impresionesXIlustrador);
}

//-----Función filtrar por precio:
//--------Esta función me da la funciionalidad de imprimir según el rango de precios.
function filtrarPrecio(i, impresiones) {
  let impresionesXPrecio = [];
  //------- La i, que la envio desde la función de imprimirPrecios, son los rangos de precios.
  // 0: 0 a 50
  // 1: 50 a 100
  // 2: 100 a 150
  // 3: 150 a 250
  // 4: mas de 250
  // Voy modificando el array creado anteriormente
  switch (i) {
    case 0:
      impresionesXPrecio = impresiones.filter(
        sticker => sticker.precio > 0 && sticker.precio <= 50
      );
      break;
    case 1:
      impresionesXPrecio = impresiones.filter(
        sticker => sticker.precio > 50 && sticker.precio <= 100
      );
      break;
    case 2:
      impresionesXPrecio = impresiones.filter(
        sticker => sticker.precio > 100 && sticker.precio <= 150
      );
      break;
    case 3:
      impresionesXPrecio = impresiones.filter(
        sticker => sticker.precio > 150 && sticker.precio <= 250
      );
      break;
    case 4:
      impresionesXPrecio = impresiones.filter(sticker => sticker.precio > 250);
      break;
    default:
      break;
  }
  contenedor.innerHTML = "";
  totalStickers.innerHTML = impresionesXPrecio.length;
  //----Invoco a la función de imprimirStickers con este nuevo arrays creado.
  imprimirStickers(impresionesXPrecio);
}

//-----Función Mostrar todos:

//Esta función se la coloco a todo aquel boton que tenga la clase mostrar-todos y por ende, diga "Mostrar todos" y lo que hace es volver a reimprimir todos los sticjers nuevamente.
for (let i = 0; i < mostrarTodos.length; i++) {
  mostrarTodos[i].addEventListener("click", () =>
    imprimirStickers(impresiones)
  );
}




//-------------Desarrollo de funciones fin

//-------------Invocación de funciones inicio
imprimirStickers(impresiones);
imprimirCategorias(categorias, impresiones);
imprimirIlustrador(ilustradores, impresiones);
imprimirPrecios();

//-------------Invocación de funciones fin
