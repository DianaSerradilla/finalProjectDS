const btn = document.getElementById('button');
let nameEmail = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');


document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_9of7hs6';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar consulta';

        nameEmail.value = "";
        email.value = "";
        message.value = "";
        nameEmail.placeholder = "Nombre";
        email.placeholder = "Email";
        message.placeholder = "Mensaje";
        Toastify({
          text: `Mensaje enviado`,
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
      }, (err) => {
        btn.value = 'Enviar consulta';
        Toastify({
          text: `Error: ${err}`,
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
        alert(JSON.stringify(err));
      });



  });

// btn.addEventListener("click", () => {

// })