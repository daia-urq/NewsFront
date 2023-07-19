let nombreU = document.getElementById('nombre');
const query = location.search;
let parametro = new URLSearchParams(query);
let perfil = parametro.get("perfil");
let datosPefil = document.getElementById('datosPerfil');
let form = document.getElementById('formRegistro');
let token = localStorage.getItem('token');
let raw;
let barraMensaje = document.getElementById('mensajeModal');
let mensaje = '';

if (localStorage.getItem('nombreUsuario')) {
    mostraNombre();
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:8080/auth/getOne/" + perfil, requestOptions)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log(data);
                mostrarDatos(data);
                editar(data);
            })
        }
    })
    .catch(error => console.log('error', error));



function editar(data) {
    let campos = "";

    campos = `
    <div class="mb-3">
        <label for="id" class="form-label d-none">ID:</label>
        <input type="number" class="form-control d-none" id="id" placeholder="id" name="id" value=${data.id}>
    </div>
    <div class="mb-3">
        <label for="nombre2" class="form-label">Nombre:</label>
        <input type="text" class="form-control" id="nombre2" placeholder="Nombre" name="nombre2" value= ${data.nombre}>
    </div>
    <div class="mb-3">
        <label for="apellido" class="form-label">Apellido:</label>
        <input type="text" class="form-control" id="apellido" placeholder="Apellido" name="apellido" value="${data.apellido}">
    </div>
    <div class="mb-3">
        <label for="nombreUsuario" class="form-label">Nombre usuario:</label>
        <input type="text" class="form-control" id="nombreUsuario" placeholder="Nombre Usuario" name="nombreUsuario" value= ${data.nombreUsuario}>
    </div>            
    <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Email" name="email" value= ${data.email}>
    </div>              
    <div class="mb-3">
        <label for="password" class="form-label">password:</label>
        <input type="password" class="form-control" id="password" placeholder="password" name="password" >
    </div>  
    <div class="mb-3">
        <label for="fechaNacimiento" class="form-label">Fecha nacimiento:</label>
        <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento"
        min="1923-01-01" max="2004-12-31" value=${data.fechaNacimiento}>
    </div>
    <button type="submit" class="btn">Editar</button>
    `
    form.innerHTML = campos;

    // Agregar el event listener después de que el elemento selcategoria existe en el documento



}


function mostrarDatos(data) {
    let datos = "";

    datos = `   
    <h6>Nombre: </h6>
    <p>${data.nombre} </p>
    <h6>Apellido: </h6>
    <p>${data.apellido} </p>
    <h6>Nombre usuario: </h6>
    <p>${data.nombreUsuario}  </p>
    <h6>Email: </h6>
    <p>${data.email} </p>
    <h6>Fecha de nacimiento: </h6>
    <p>${data.fechaNacimiento} </p>
    <h6>Fecha de alta: </h6>
    <p>${data.fechaAlta}</p>     
    `
    datosPefil.innerHTML = datos;
    ;
}

let nuevoUsuario;


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombre2 = document.getElementById('nombre2').value;
    let apellido = document.getElementById('apellido').value;
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;
    let id = document.getElementById('id').value;


    nuevoUsuario = { // Inicializar nuevoUsuario con los valores
        nombre,
        apellido,
        nombreUsuario,
        email,
        password,
        fechaNacimiento
    };


    nuevoUsuario.nombre = nombre2
    nuevoUsuario.apellido = apellido;
    nuevoUsuario.nombreUsuario = nombreUsuario;
    nuevoUsuario.email = email;
    nuevoUsuario.password = password;
    nuevoUsuario.fechaNacimiento = fechaNacimiento;

    raw = JSON.stringify(nuevoUsuario);

    let requestOptions2 = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/auth/update/" + id, requestOptions2)       
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, barraMensaje);
                    console.log(data);
                    localStorage.setItem('nombreUsuario', nombreUsuario); 
                    let = nom = localStorage.getItem('nombreUsuario');
                    setTimeout(() => {
                        window.location.href = `./perfil.html?perfil=${nom}`;
                    }, 3000);
                });
            } else {
                response.json().then(error => {
                    mostrarMensaje(error, barraMensaje);
                    console.log(error);
                });
            }
        })
        .catch(error => console.error('Error:', error));
    });