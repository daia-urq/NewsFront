let barraMensaje = document.getElementById('mensaje');
let nombreU = document.getElementById('nombre');
let token = localStorage.getItem('token');

let datosPeriodista = document.getElementById('formPeriodista');
let nombre2 = document.getElementById('nombre2');
let apellido = document.getElementById('apellido');
let nombreUsuario = document.getElementById('nombreUsuario');
let email = document.getElementById('email');
let password = document.getElementById('password');
let fechaNacimiento = document.getElementById('fechaNacimiento');
let sueldo = document.getElementById('sueldo');
let mensaje = '';
let envio;
let roles = "periodista";

mostraNombre();

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let nuevoPeriodista = { 
    apellido,
    nombre,
    nombreUsuario,
    email,
    password,
    fechaNacimiento,
    sueldo,
    roles
}

datosPeriodista.addEventListener('submit', (ee) => {
    ee.preventDefault();
    
    
    nuevoPeriodista.apellido = apellido.value;
    nuevoPeriodista.nombre = nombre2.value;
    nuevoPeriodista.nombreUsuario = nombreUsuario.value;
    nuevoPeriodista.email = email.value;
    nuevoPeriodista.password = password.value;
    nuevoPeriodista.fechaNacimiento = fechaNacimiento.value;
    nuevoPeriodista.sueldo = sueldo.value;
    nuevoPeriodista.roles = roles;
  

    envio = JSON.stringify(nuevoPeriodista);

    console.log("nuevo periodista" + nuevoPeriodista);
    console.log("envio" + envio);
    let requestOptions2 = {
        method: 'POST',
        headers: myHeaders,
        body: envio,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/periodista/create", requestOptions2)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, barraMensaje);
                    limpiarFormulario()
                    setTimeout(() => {
                        window.location.href = "./panelAdmin.html";
                    }, 1000);
                });
            } else {
                response.json().then(error => {
                    console.log(error.mensaje);
                    mostrarMensaje(error, barraMensaje);           
                });
            }
        })
        .catch(error => console.log('error', error));

});

function limpiarFormulario() {
    nombre2.value = '';
    apellido.value = '';
    nombreUsuario.value = '';
    email.value = '';
    password.value = '';
    fechaNacimiento.value = '';
    sueldo.value = '';
}