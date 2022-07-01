//-------------Declaraciones inicio
let subtotalButton = document.getElementById("subtotal-checkout");
let cantidadButton = document.getElementById("cantidad-checkout");
let contenedorBoton = document.getElementById("contenedor-limpiarCarrito");
let carroJSON = JSON.parse(sessionStorage.getItem("carrito")) || [];
let buttonLimpiarCarrito = document.getElementById("limpiar-carrito");
let buttonPagar = document.getElementById("pagar-carrito");
let inputCupon = document.getElementById("input-cupon");
let buttonCupon = document.getElementById("aplicar-cupon");
let precioTotal = sessionStorage.getItem("precioTotal");
let descuentoStorage = JSON.parse(sessionStorage.getItem("descuento")) || 0;
let cantidadDescuento = document.getElementById("cantidad-descuento");
let dolar, real;
let currency = document.getElementsByClassName("currency");
let divisa = document.getElementById("divisa");


//-------------Declaraciones fin

//-------------Desarrollo de funciones inicio

//---------Función imprimir carrito
//-------- En base al carrito guardado en storage, lo imprimo en el dom. En caso de que el carrito esté vacio mostrará un mensaje para que el usuario entienda que está ocurriendo.
function imprimirCarrito(carroJSON) {
  let contenedorCarrito = document.getElementById("contenedor-carrito");
  contenedorCarrito.innerHTML = "";
  //En caso de que el carrito esté vacío imprimira esta sección y en caso de que tenga conentido, completará la tabla
  if (carroJSON.length === 0) {
    let card = document.createElement("tr");
    card.innerHTML = `
     <tr>
  <td class="product__cart__item">No hay productos cargados</td>
</tr>`;
    contenedorCarrito.appendChild(card);
  } else {
    for (const producto of carroJSON) {
      let card = document.createElement("tr");
      card.innerHTML = `
    
                                    <td class="product__cart__item">
                                        <div class="product__cart__item__pic">
                                            <img src="${producto.img}" alt="">
                                        </div>
                                      
                                    </td>
                                    <td class="quantity__item">
                                        <div class="quantity">
                                            <div class="pro-qty-2">
                                            <span class="fa fa-angle-left dec qtybtn" id="less${producto.id}"></span>
                                            <input type="text" id="cantidadTotal-input" value="${producto.cantidadTotalC}" readonly>
                                            <span class="fa fa-angle-right inc qtybtn" id="more${producto.id}"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="cart__price"  id="precioTotal-input">$ ${producto.precioTotalC}</td>
                                    <td class="cart__close" id="detele-button${producto.id}"><i class="fa fa-close"></i></td>
    `;

      contenedorCarrito.appendChild(card);
      let buttonLess = document.getElementById(`less${producto.id}`);
      let buttonMore = document.getElementById(`more${producto.id}`);
      let deleteButton = document.getElementById(`detele-button${producto.id}`);
      deleteButton.addEventListener("click", () =>
        quitarSticker(producto.id, carrito)
      );
      buttonLess.addEventListener("click", () =>
        quitarUnidadCarrito(producto.id, carrito)
      );
      buttonMore.addEventListener("click", () =>
        agregarUnidadCarrito(producto.id, carrito)
      );
    }
  }
}

//-----------Funcion para agregar una unidad de un sticker en particular.
function agregarUnidadCarrito(stickerID, carrito) {
  for (const sticker of carrito) {
    if (sticker.id == stickerID) {
      sticker.cantidadTotalC++;
      Toastify({
        text: `Has añadido una unidad de ${sticker.nombre} al carrito`,
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

  actualizarCarrito(carrito);
  actualizarPrecioTotalCarrito(stickerID, carrito);
  obtenerPrecioyCantidadTotal();
  actualizarItems();
  imprimirCarrito(carrito);
}

//-----------Funcion para quitar una unidad de un sticker en particular.
function quitarUnidadCarrito(stickerID, carrito) {
  for (const sticker of carrito) {
    if (sticker.id == stickerID) {
      if (sticker.cantidadTotalC == 1) {
        quitarSticker(sticker.id, carrito);
      } else {
        sticker.cantidadTotalC--;
        Toastify({
          text: `Has quitado una unidad de ${sticker.nombre} del carrito.`,
          duration: 3000,
          close: false,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #BF0426,#8C031C)"
          },
          onClick: function () { } // Callback after click
        }).showToast();
      }
    }
  }

  actualizarCarrito(carrito);
  actualizarPrecioTotalCarrito(stickerID, carrito);
  obtenerPrecioyCantidadTotal();
  actualizarItems();
  imprimirCarrito(carrito);
}

//-----------Funcion para eliminar un sticker en particular del carrito.

function quitarSticker(stickerID, carrito) {
  console.log(carrito.length);
  if (carrito.length == 1) {
    limpiarCarrito();

    Toastify({
      text: `El carrito está vacío`,
      duration: 3000,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #BF0426,#8C031C)"
      },
      onClick: function () { } // Callback after click
    }).showToast();
  }
  if (carrito.length >= 2) {
    Toastify({
      text: `Has quitado el sticker del carrito.`,
      duration: 3000,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #BF0426,#8C031C)"
      },
      onClick: function () { } // Callback after click
    }).showToast();
    console.table(carrito);
    let indice = carrito.findIndex(sticker => sticker.id == stickerID);
    carrito.splice(indice, 1);
    actualizarCarrito(carrito);
    actualizarPrecioTotalCarrito(stickerID, carrito);
    obtenerPrecioyCantidadTotal();
    actualizarItems();
    imprimirCarrito(carrito);
  }
}

//-------Funcion que me permite mantener actualizado el carrito
function actualizarCarrito(carrito) {
  let carritoJSON = JSON.stringify(carrito);
  sessionStorage.setItem("carrito", carritoJSON);
  const carroJSON = JSON.parse(carritoJSON);
}

//------------Función limpiar carrito
//--------- Esta función permite que al momento de hacer click sobre limpiar carrito se borre todo del storage como también del DOM y el botón quede con estilos deshabilitados.
function limpiarCarrito() {
  //---------Remuevo del storage
  sessionStorage.removeItem("carrito");
  sessionStorage.removeItem("cantidadTotal");
  sessionStorage.removeItem("precioTotal");
  sessionStorage.removeItem("descuento");
  carroJSON = [];
  //---------Actualizo el DOM
  cantidadButton.innerHTML = 0;
  subtotalButton.innerHTML = 0;
  precioTCarrito.innerHTML = 0;
  precioTCarritoMobile.innerHTML = 0;
  cantidadTCarrito.innerHTML = 0;
  cantidadTCarritoMobile.innerHTML = 0;
  cantidadDescuento.innerHTML = 0;
  divisa.innerHTML = `Divisa<span>$<span id="subtotal-divisa">0</span></span>`;
  // actualizarItems();
  //---------Cambio estilos al boton
  contenedorBoton.className = "continue__btn update__btnDisabled";
  buttonPagar.className = "primary-btnDisabled";
  buttonCupon.className = "button-disabled";
  //---------Vuelvo a imprimir el carrito
  imprimirCarrito(carroJSON);
}

// Esta funcion me permite aplicar el descuento o no el descuento
function aplicarDescuento(cupones, valorInput, precioTotal) {
  //---- Primero verifica si el cupon esta vacio
  if (inputCupon.value == "") {
    Toastify({
      text: `El cupón está vacío, ingrese uno válido`,
      duration: 3000,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #BF0426,#8C031C)"
      },
      onClick: function () { } // Callback after click
    }).showToast();
  } else {
    //--------En caso de que no este vaciom procede a verificar si anteriormente ya cargo un cupon, en caso de tener uno cargado, le avisa que ya no puede realizar mas decuentos.
    if (descuentoStorage != 0) {
      Toastify({
        text: `Ya ha aplicado un descuento.`,
        duration: 3000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #BF0426,#8C031C)"
        },
        onClick: function () { } // Callback after click
      }).showToast();
    } else {
      // En caso de que no haya cargado, proceso a realizar el descuento
      // Comienzo ubicando la posicion del descuento en el arrays y lo guardo
      const disponibilidadCupon = cupones.indexOf(valorInput.toUpperCase());
      // En caso de que sea -1 significa que esta en el arrays
      if (disponibilidadCupon != -1) {
        let descuento;
        let nuevoValor;
        // console.log(precioTotal)
        switch (disponibilidadCupon) {
          // Para los dos primeros valores le aplico el 10% de descuento
          case 0:
          case 1:
            descuento = precioTotal * 0.1;
            nuevoValor = precioTotal - descuento;
            sessionStorage.setItem("precioTotal", nuevoValor);
            Toastify({
              text: `El descuento se ha aplicado correctamente.`,
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
            break;
          // Para los dos segundos valores le aplico el 20% de descuento

          case 2:
          case 3:
            descuento = precioTotal * 0.2;
            nuevoValor = precioTotal - descuento;
            sessionStorage.setItem("precioTotal", nuevoValor);
            Toastify({
              text: `El descuento se ha aplicado correctamente.`,
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
            break;
          case 4:
            // Para el ultimo valor le aplico el 50% de descuento

            descuento = precioTotal * 0.1;
            nuevoValor = precioTotal - descuento;
            sessionStorage.setItem("precioTotal", nuevoValor);
            Toastify({
              text: `El descuento se ha aplicado correctamente.`,
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
            break;
          default:
            break;
        }
        // Guardo del descuento el storage para luego reutilzarlo, en este caso lo imprimo en el DOM
        sessionStorage.setItem("descuento", descuento);
        descuentoStorage = JSON.parse(sessionStorage.getItem("descuento"));
        cantidadDescuento.innerHTML = descuentoStorage;
        actualizarItems();
      } else {
        // En caso de que sea -1 significa que no existe ese cupon en el arrays
        Toastify({
          text: `El cupón no es válido.`,
          duration: 3000,
          close: false,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #BF0426,#8C031C)"
          },
          onClick: function () { } // Callback after click
        }).showToast();
      }
    }
  }
}

//------------Esta fucion me permite pagar, primero verificarara si ya he cargado algun cupon, en caso de no haber cargado, le consultara si quiere cargar. En caso de que si haya cargado, le avisara que no se puede cargar

function pagar() {
  if (descuentoStorage == 0) {
    Swal.fire({
      title: "¿Tienes algún cupón?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Colócalo y tendrás un descuento");

      } else if (result.isDenied) {
        Swal.fire(
          "Recibimos tu pago, nos pondremos en contacto contigo",
          "",
          "success"
        );
        limpiarCarrito();
      }
    });
  } else {
    Swal.fire(
      "Recibimos tu pago, nos pondremos en contacto contigo",
      "",
      "success"
    );
    limpiarCarrito();
  }


}

//------ Esta funcion me permite avisar que el carrito esta vacio, si bien es una funcion sencilla, es muy repetitiva.
function avisoCarritoVacio() {
  Toastify({
    text: `El carrito está vacío`,
    duration: 3000,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #BF0426,#8C031C)"
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

//----------Esta funcion me permite actualizar las impresiones del DOM, similiar a la funcion anterior, es sencilla pero muy repetitiva.
function actualizarItems() {
  cantidadButton.innerHTML = sessionStorage.getItem("cantidadTotal");
  subtotalButton.innerHTML = sessionStorage.getItem("precioTotal");
  precioTCarrito.innerHTML = sessionStorage.getItem("precioTotal");
  precioTCarritoMobile.innerHTML = sessionStorage.getItem("precioTotal");
  cantidadTCarrito.innerHTML = sessionStorage.getItem("cantidadTotal");
  cantidadTCarritoMobile.innerHTML = sessionStorage.getItem("cantidadTotal");
  cantidadDescuento.innerHTML = sessionStorage.getItem("descuento");
}

//--------Funcion que me permite obtener la cotización del dolar, en base a una API e imprimarla en el DOM.
async function obtenerDolar() {
  //Guardo la URL de la API
  const URLUSD = "https://api-dolar-argentina.herokuapp.com/api/bbva";
  //Guardo la respuesta gracias a fecth
  const resp = await fetch(URLUSD);
  //Lo convierto en un array
  const data = await resp.json();
  //Guardo el valor que me interesa, en este caso, la cotización de venta
  let dolar = parseInt(data.venta);
  //Realizo la conversión de pesos a dolares
  let nuevoValor = Math.ceil(sessionStorage.getItem("precioTotal") / dolar);
  //La imprimo en el DOM
  divisa.innerHTML = `USD<span>$<span id="subtotal-divisa">${nuevoValor}</span></span>`;
}
//--------Funcion que me permite obtener la cotización del real, en base a una API e imprimarla en el DOM.
async function obtenerReal() {
  //Guardo la URL de la API
  const URLREAL = "https://api-dolar-argentina.herokuapp.com/api/real/bbva";
  //Guardo la respuesta gracias a fecth
  const resp = await fetch(URLREAL);
  //Lo convierto en un array
  const data = await resp.json();
  console.log(data);
  //Guardo el valor que me interesa, en este caso, la cotización de venta
  let real = parseInt(data.venta);
  //Realizo la conversión de pesos a reales
  let nuevoValor = Math.ceil(sessionStorage.getItem("precioTotal") / real);
  //La imprimo en el DOM
  divisa.innerHTML = `BRL<span>$<span id="subtotal-divisa">${nuevoValor}</span></span>`;
}

//-------Funcion para detectar que cotización quiere el usuario
function cotizacion(selector) {
  // Guardamos el selector que ha clickeado el usuario y lo usamos como guia en el switch
  switch (selector) {
    case 0:
      divisa.innerHTML = `USD<span><span id="subtotal-divisa">Cargando cotización..</span></span>`;
      // Se usa el timeOut para darle un tiempo de espera y que el usuario sepa que está ocurriendo gracias al mensaje de "Cargando cotización"
      setTimeout(obtenerDolar, 2000);
      break;
    case 1:
      divisa.innerHTML = `USD<span><span id="subtotal-divisa">Cargando cotización..</span></span>`;
      setTimeout(obtenerReal, 2000);
      break;
  }
}

//-------------Desarrollo de funciones fin

//-------------Invocación de funciones inicio

for (let i = 0; i < currency.length; i++) {
  currency[i].addEventListener("click", () => {
    // console.log(i);
    buttonPagar.innerText = "Cargando cotización...";
    cotizacion(i);
  });
}
imprimirCarrito(carroJSON);

//Esto primero verifica en que condición se encuentra el carrito para, que en caso que esté vació no realizar nada y solamente dar un aviso. En caso de que el carrito tenga elemento, si invoca a la función.
buttonLimpiarCarrito.addEventListener("click", () => {
  if (carroJSON.length === 0) {
    avisoCarritoVacio();
  } else {
    limpiarCarrito();
  }
});

buttonPagar.addEventListener("click", () => {
  if (carroJSON.length === 0) {
    avisoCarritoVacio();
  } else {
    pagar();
  }
});

buttonCupon.addEventListener("click", () => {
  if (carroJSON.length === 0) {
    avisoCarritoVacio();
  } else {
    aplicarDescuento(cupones, inputCupon.value, precioTotal);
  }
  //Realizo esta accion para que no quede cargado el cupón, debe figurar el placeholder original
  inputCupon.placeholder = "Código cupon";
  inputCupon.value = "";
});

//---------Esto me permite inicializar, si es que el carrito esta vacio, los estilos d los botones.
if (carroJSON.length === 0) {
  contenedorBoton.className = "continue__btn update__btnDisabled";
  buttonPagar.className = "primary-btnDisabled";
  buttonCupon.className = "button-disabled";
}

cantidadDescuento.innerHTML = descuentoStorage;
cantidadButton.innerHTML = JSON.parse(sessionStorage.getItem("cantidadTotal"));
subtotalButton.innerHTML = JSON.parse(sessionStorage.getItem("precioTotal"));

//-------------Invocación de funciones fin
