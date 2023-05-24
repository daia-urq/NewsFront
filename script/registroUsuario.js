let datos = document.getElementById('formRegistro');
let nombre = document.getElementById('nombre');
let nombreUsuario = document.getElementById('nombreUsuario');
let email = document.getElementById('email');
let password = document.getElementById('password');
let fechaNacimiento = document.getElementById('fechaNacimiento');
let barraMensaje = document.getElementById('mensaje');
let raw;
let roles = "user";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let nuevoUsuario = {
    nombre,
    nombreUsuario,
    email,
    password,
    fechaNacimiento,
    roles
}

//escuchando el envio del formulario
datos.addEventListener('submit', (e) => {
    //no recaga la pagina
    e.preventDefault();
    // Agregar nuevo valor a la propieda usuario
    nuevoUsuario.nombre = nombre.value;
    nuevoUsuario.nombreUsuario = nombreUsuario.value;
    nuevoUsuario.email = email.value;
    nuevoUsuario.password = password.value;
    nuevoUsuario.fechaNacimiento = fechaNacimiento.value;
    nuevoUsuario.roles = roles;

    nombre.value = '';
    nombreUsuario.value = '';
    email.value = '';
    password.value = '';
    fechaNacimiento.value = '';

    //objeto a json para pasar por el fetch
    raw = JSON.stringify(nuevoUsuario);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/auth/nuevo", requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, barraMensaje);
                    setTimeout(() => {
                        window.location.href = "./index.html";
                    }, 1000);
                });
            } else {
                response.json().then(error => {
                    mostrarMensaje(error, barraMensaje);
                });
            }
        })
        .catch(error => console.log('error', error));

});