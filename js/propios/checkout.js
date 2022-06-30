//-------------Declaraciones inicio
let subtotalButton = document.getElementById("subtotal-checkout");
let cantidadButton = document.getElementById("cantidad-checkout");
let contenedorBoton = document.getElementById("contenedor-limpiarCarrito");
let carroJSON = JSON.parse(localStorage.getItem("carrito")) || [];
let buttonLimpiarCarrito = document.getElementById("limpiar-carrito");
let buttonPagar = document.getElementById("pagar-carrito");
let inputCupon = document.getElementById("input-cupon");
let buttonCupon = document.getElementById("aplicar-cupon");
let precioTotal = localStorage.getItem("precioTotal");
let descuentoStorage = JSON.parse(localStorage.getItem("descuento")) || 0;
let cantidadDescuento = document.getElementById("cantidad-descuento");
let dolar, real;
let currency = document.getElementsByClassName("currency");
let divisa = document.getElementById("divisa");
let contenedorDescuento = document.getElementById("contenedor-descuento");

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
      //Aún no funcionan estos botones.
      let buttonLess = document.getElementById(`less${producto.id}`);
      let buttonMore = document.getElementById(`more${producto.id}`);
      // let inputTotalTable = getElementById("cantidadTotal-input");
      // let precioTotalTable = getElementById("precioTotal-input");

      let deleteButton = document.getElementById(`detele-button${producto.id}`);
      deleteButton.addEventListener("click", () => quitarSticker(producto.id, carrito));
      buttonLess.addEventListener("click", () => quitarUnidadCarrito(producto.id, carrito));
      buttonMore.addEventListener("click", () => agregarUnidadCarrito(producto.id, carrito));
    }
  }
}



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

  actualizarCarrito(carrito)
  actualizarPrecioTotalCarrito(stickerID, carrito);
  obtenerPrecioyCantidadTotal()
  actualizarItems();
  imprimirCarrito(carrito);


}

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

  actualizarCarrito(carrito)
  actualizarPrecioTotalCarrito(stickerID, carrito);
  obtenerPrecioyCantidadTotal()
  actualizarItems();
  imprimirCarrito(carrito);

}

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
    actualizarCarrito(carrito)
    actualizarPrecioTotalCarrito(stickerID, carrito);
    obtenerPrecioyCantidadTotal()
    actualizarItems();
    imprimirCarrito(carrito);
  }



}


function actualizarCarrito(carrito) {

  let carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
  const carroJSON = JSON.parse(carritoJSON);

}

function actualizarPrecioTotalCarrito(stickerID, carrito) {

  for (const sticker of carrito) {
    if (sticker.id == stickerID) {
      sticker.precioTotalC = sticker.precio * sticker.cantidadTotalC;
    }
  }
}

//------------Función limpiar carrito
//--------- Esta función permite que al momento de hacer click sobre limpiar carrito se borre todo del storage como también del DOM y el botón quede con estilos deshabilitados.
function limpiarCarrito() {
  //---------Remuevo del storage
  localStorage.removeItem("carrito");
  localStorage.removeItem("cantidadTotal");
  localStorage.removeItem("precioTotal");
  localStorage.removeItem("descuento");
  // localStorage.setItem("carrito", []);
  // localStorage.setItem("cantidadTotal", 0);
  // localStorage.setItem("precioTotal", 0);
  // localStorage.setItem("descuento", 0);
  carroJSON = [];
  //---------Actualizo el DOM
  cantidadButton.innerHTML = 0;
  subtotalButton.innerHTML = 0;
  precioTCarrito.innerHTML = 0;
  precioTCarritoMobile.innerHTML = 0;
  cantidadTCarrito.innerHTML = 0;
  cantidadTCarritoMobile.innerHTML = 0;
  cantidadDescuento.innerHTML = 0;
  divisa.innerHTML = `Divisa<span>$<span id="subtotal-divisa">0</span></span>`
  // actualizarItems();
  //---------Cambio estilos al boton
  contenedorBoton.className = "continue__btn update__btnDisabled";
  buttonPagar.className = "primary-btnDisabled"
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
      const disponibilidadCupon = cupones.indexOf(valorInput.toUpperCase())
      // En caso de que sea -1 significa que esta en el arrays
      if (disponibilidadCupon != -1) {
        let descuento;
        let nuevoValor;
        // console.log(precioTotal)
        switch (disponibilidadCupon) {
          // Para los dos primeros valores le aplico el 10% de descuento
          case 0:
          case 1:
            descuento = (precioTotal * 0.1);
            nuevoValor = precioTotal - descuento;
            localStorage.setItem("precioTotal", nuevoValor);
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
            descuento = (precioTotal * 0.2);
            nuevoValor = precioTotal - descuento;
            localStorage.setItem("precioTotal", nuevoValor);
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

            descuento = (precioTotal * 0.1);
            nuevoValor = precioTotal - descuento;
            localStorage.setItem("precioTotal", nuevoValor);
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
        localStorage.setItem("descuento", descuento);
        descuentoStorage = JSON.parse(localStorage.getItem("descuento"));
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
      title: '¿Tienes algún cupón?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Colócalo y tendrás un descuento',)
        contenedorDescuento.classList.remove("display-none");
        contenedorDescuento.classList.add("display");
      } else if (result.isDenied) {
        Swal.fire('Recibimos tu pago, nos pondremos en contacto contigo', '', 'success')
        limpiarCarrito();
      }
    })
  } else {
    Swal.fire('Recibimos tu pago, nos pondremos en contacto contigo', '', 'success')
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


// Swal.mixin({
//   input: 'text',
//   confirmButtonText: 'Siguiente &rarr',
//   showCancelButton: true,
//   progressSteps: ['1']
// }).queue([
//   {
//     title: "Ingrese el código de descuento"
//   }
// ]).then((result) => {
//   if (result.value) {
//     Swal.fire({
//       title: '¡Completado!'
//     })
//   }
// })

//----------Esta funcion me permite actualizar las impresiones del DOM, similiar a la funcion anterior, es sencilla pero muy repetitiva. 
function actualizarItems() {
  cantidadButton.innerHTML = localStorage.getItem("cantidadTotal");
  subtotalButton.innerHTML = localStorage.getItem("precioTotal");
  precioTCarrito.innerHTML = localStorage.getItem("precioTotal");
  precioTCarritoMobile.innerHTML = localStorage.getItem("precioTotal");
  cantidadTCarrito.innerHTML = localStorage.getItem("cantidadTotal");
  cantidadTCarritoMobile.innerHTML = localStorage.getItem("cantidadTotal");
  cantidadDescuento.innerHTML = localStorage.getItem("descuento");
}


async function obtenerDolar() {
  const URLUSD = "https://api-dolar-argentina.herokuapp.com/api/bbva";
  const resp = await fetch(URLUSD);
  const data = await resp.json();
  let dolar = parseInt(data.venta);
  let nuevoValor = Math.ceil(localStorage.getItem("precioTotal") / dolar);
  divisa.innerHTML = `USD<span>$<span id="subtotal-divisa">${nuevoValor}</span></span>`

}

async function obtenerReal() {
  const URLREAL = "https://api-dolar-argentina.herokuapp.com/api/real/bbva";
  const resp = await fetch(URLREAL);
  const data = await resp.json();
  let real = parseInt(data.venta);
  let nuevoValor = Math.ceil(localStorage.getItem("precioTotal") / real);
  divisa.innerHTML = `BRL<span>$<span id="subtotal-divisa">${nuevoValor}</span></span>`
}


function cotizacion(selector) {

  switch (selector) {
    case 0:
      divisa.innerHTML = `USD<span><span id="subtotal-divisa">Cargando cotización..</span></span>`
      setTimeout(obtenerDolar, 2000);
      break;
    case 1:
      divisa.innerHTML = `USD<span><span id="subtotal-divisa">Cargando cotización..</span></span>`
      setTimeout(obtenerReal, 2000);

      break;
  }
  buttonPagar.innerText = "PAGAR";

}


//-------------Desarrollo de funciones fin


//-------------Invocación de funciones inicio

for (let i = 0; i < currency.length; i++) {
  currency[i].addEventListener("click", () => {
    // console.log(i);
    buttonPagar.innerText = "Cargando cotización...";

    cotizacion(i)
  })

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
  inputCupon.placeholder = 'Código cupon';
  inputCupon.value = "";
})


//---------Esto me permite inicializar, si es que el carrito esta vacio, los estilos d los botones. 
if (carroJSON.length === 0) {
  contenedorBoton.className = "continue__btn update__btnDisabled";
  buttonPagar.className = "primary-btnDisabled"
  buttonCupon.className = "button-disabled";
}

cantidadDescuento.innerHTML = descuentoStorage;
cantidadButton.innerHTML = JSON.parse(localStorage.getItem("cantidadTotal"));
subtotalButton.innerHTML = JSON.parse(localStorage.getItem("precioTotal"));

//-------------Invocación de funciones fin
