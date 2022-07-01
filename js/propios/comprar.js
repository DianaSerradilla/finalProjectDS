//--------------------------Declaraciones inicio

// Genero la clase de tipo Sticker con su correspondiente constructor
class Sticker {
  constructor(sticker) {
    this.id = sticker.id;
    this.nombre = sticker.nombre;
    this.categoria = sticker.categoria;
    this.img = sticker.img;
    this.precio = sticker.precio;
    this.tags = sticker.tags;
    this.cantidadTotalC = 1;
    this.precioTotalC = sticker.precio;
  }
}

//-----------Guardo en el Storage el carrito o en caso de no haber nada, me entregaría un array vacio
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
// let carrito = [];
//------En todas las pestañas tenemos un carrito que indica la cantidad de stickers y el total del carrito, también lo tenemos en el menu responsive, por eso hay dos variables que tienen el nombre Mobile.
let cantidadTCarrito = document.getElementById("carrito-totalCantidad");
let cantidadTCarritoMobile = document.getElementById(
  "carrito-totalCantidad-mobile"
);
let precioTCarrito = document.getElementById("carrito-totalPrecio");
let precioTCarritoMobile = document.getElementById(
  "carrito-totalPrecio-mobile"
);
//-----------Guardo en el Storage estas variables  o en caso de no haber nada, lo inicializaría en cero

let cantidadStickersREDUCE =
  JSON.parse(sessionStorage.getItem("cantidadTotal")) || 0;
let precioTotalREDUCE = JSON.parse(sessionStorage.getItem("precioTotal")) || 0;
//--------------------------Declaraciones Fin

//-------------Desarrollo de funciones inicio

//------ Funcion para agregar una sola unidad, del mismo sticker, al carrito.
//Recibo por parametros el id del sticker y el carrito, donde hay cargados stickers
function agregarUnidadCarrito(stickerID, carrito) {
  //Recorro el carrito
  for (const sticker of carrito) {
    //Ubico al sticker
    if (sticker.id == stickerID) {
      //Agrego una unidad sticker
      sticker.cantidadTotalC++;
    }
  }
}

//------ Funcion que permite actualizar el precio total, del mismo sticker,
//Recibo por parametros el id del sticker y el carrito, donde hay cargados stickers
function actualizarPrecioTotalCarrito(stickerID, carrito) {
  //Recorro el carrito
  for (const sticker of carrito) {
    //Ubico al sticker
    if (sticker.id == stickerID) {
      //Con el precio y la cantidad Total, puedo sacar el precio total
      sticker.precioTotalC = sticker.precio * sticker.cantidadTotalC;
    }
  }
}

//------ Funcion para agregar al carrito el sticker
//-----Con esta función me permite agregar al carrito el sticker seleccionado.
function comprar(stickerID) {
  impresiones.forEach(sticker => {
    //-----Esta comparación la realizó para encontrar el id del sticker del array con el id que selecciono el usuario.
    if (sticker.id == stickerID) {
      // -----En esta variable guardare, luego de reccorer el carrito,  el objeto que coincida con el id que pasamos a la función.
      let stickerEnCarrito = carrito.find(elemento => elemento.id == stickerID);
      //----- Procedemos a verificar si está o no en el carrito.
      if (stickerEnCarrito) {
        // En caso de que si exista en el carrito, vamos a localizar su posición y guardarla en la variable Index
        let index = carrito.findIndex(
          elemento => elemento.id === stickerEnCarrito.id
        );
        // Luego de localizar su posición, nos paramos sobre ella y trabajamos con estas dos funciones, agrego una unidad y actualizo su precio final
        // carrito[index].agregarUnidadCarrito();
        agregarUnidadCarrito(stickerID, carrito);
        // carrito[index].actualizarPrecioTotalCarrito();
        actualizarPrecioTotalCarrito(stickerID, carrito);
        // En este caso, como ya existe, el mensaje de Toastify será que se agregó nuevamente
        Toastify({
          text: `Has añadido nuevamente ${impresiones[stickerID]
            .nombre} al carrito`,
          duration: 3000,
          close: false,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #007566, #8FC1B5)"
          },
          onClick: function () { } // Callback after click
        }).showToast();
      } else {
        //En el caso de que no exista en el carrito, simple procedemos a crear este objeto nuevo con la clase de Sticker y pushearlo al carrito.
        carrito.push(new Sticker(impresiones[stickerID]));

        Toastify({
          text: `Has añadido ${impresiones[stickerID].nombre} al carrito`,
          duration: 3000,
          close: false,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #007566, #8FC1B5)"
          },
          onClick: function () { } // Callback after click
        }).showToast();
      }
    }
  });

  // Invocamos a la función de obtener el precio y cantidad total para poder imprimirlo en todos los lugares necesarios del DOM
  obtenerPrecioyCantidadTotal();
}

//------ Funcion para obtener el precio total del carrito y la cantidad total de stickers
function obtenerPrecioyCantidadTotal() {
  //------------   Creo el carrito y lo guardo en el storage, lo guardo como objeto.
  let carritoJSON = JSON.stringify(carrito);
  sessionStorage.setItem("carrito", carritoJSON);
  const carroJSON = JSON.parse(carritoJSON);

  //------------ Esto me permite saber la cantidad de stickers comprados.
  //-------- Primero realizo un array solamente con las cantidades (cantidadTotalC)
  let cantidadStickersMAP = carroJSON.map(function (cantidad) {
    return cantidad.cantidadTotalC;
  });
  //---------- Luego, con este array creado y con la función reduce, sumo todos los valores.
  cantidadStickersREDUCE = cantidadStickersMAP.reduce(function (
    valorAnterior,
    valorActual
  ) {
    return valorAnterior + valorActual;
  });

  //------------ Esto me permite saber el precio total monetario de stickers comprados.
  //----- De la misma forma, trabajo con el precio total.

  let precioTotalMAP = carroJSON.map(function (cantidad) {
    return cantidad.precioTotalC;
  });

  precioTotalREDUCE = precioTotalMAP.reduce(function (
    valorAnterior,
    valorActual
  ) {
    return valorAnterior + valorActual;
  });

  //--------Luego lo guardo en el storage
  sessionStorage.setItem("cantidadTotal", cantidadStickersREDUCE);
  sessionStorage.setItem("precioTotal", precioTotalREDUCE);
  //------ Lo imprimo en el DOM
  precioTCarrito.innerHTML = precioTotalREDUCE;
  precioTCarritoMobile.innerHTML = precioTotalREDUCE;
  cantidadTCarrito.innerHTML = cantidadStickersREDUCE;
  cantidadTCarritoMobile.innerHTML = cantidadStickersREDUCE;
}

//-------------Desarrollo de funciones fin

//---Imprimo por fuera de cualquier función para que imprima lo que se encuentra en el storage y no haya conflictos entre el DOM y el storage
precioTCarrito.innerHTML = precioTotalREDUCE;
precioTCarritoMobile.innerHTML = precioTotalREDUCE;
cantidadTCarrito.innerHTML = cantidadStickersREDUCE;
cantidadTCarritoMobile.innerHTML = cantidadStickersREDUCE;
