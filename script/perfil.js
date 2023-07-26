const query = location.search;
let parametro = new URLSearchParams(query);
let perfil = parametro.get("perfil");
let nombreU = document.getElementById('nombre');
let barraMensaje = document.getElementById('mensajeModal');
let datosPefil = document.getElementById('datosPerfil');
let mensaje = '';

let form = document.getElementById('formRegistro');

let envioInfo;
let changePasswordCheckbox;
let passwordFieldsContainer;
let nuevaContraseña;

mostraNombre();

function togglePasswordFields() {
    if (changePasswordCheckbox.checked) {
        passwordFieldsContainer.style.display = 'block';
    } else {
        passwordFieldsContainer.style.display = 'none';       
    }
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:8080/auth/getOne/" + perfil, requestOptions)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
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
        <label for="changePassword" class="form-check-label">Cambiar contraseña:</label>
        <input type="checkbox" class="form-check-input" id="changePassword"
        name="changePassword">
    </div>
    <div id="passwordFields" style="display: none;">
        <div class="mb-3">
            <label for="password" class="form-label">Nueva contraseña:</label>
            <input type="password" class="form-control" id="password"
            placeholder="Nueva contraseña" name="password">
        </div>        
    </div>  
    <div class="mb-3">
        <label for="fechaNacimiento" class="form-label">Fecha nacimiento:</label>
        <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento"
        min="1923-01-01" max="2004-12-31" value=${data.fechaNacimiento}>
    </div>
    <button type="submit" class="btn">Modificar</button>
    `
    form.innerHTML = campos;

    changePasswordCheckbox = document.getElementById('changePassword');
    passwordFieldsContainer = document.getElementById('passwordFields');    

    changePasswordCheckbox.addEventListener('change', togglePasswordFields);
}

function limpiarFormulario() {
    nombre.value = '';
    apellido.value = '';
    nombreUsuario.value = '';
    email.value = '';
    password.value = '';
    fechaNacimiento.value = '';
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
    let nombre = document.getElementById('nombre2').value;
    let apellido = document.getElementById('apellido').value;
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let email = document.getElementById('email').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;
    let id = document.getElementById('id').value;
    newPasswordInput = document.getElementById('password');

    nuevoUsuario = { 
        nombre,
        apellido,
        nombreUsuario,
        email,
        password,
        fechaNacimiento
    };

    if (changePasswordCheckbox.checked) {
        nuevoUsuario.password = newPasswordInput.value;
    }else{
        nuevoUsuario.password = null;
    }

    nuevoUsuario.nombre = nombre;
    nuevoUsuario.apellido = apellido;
    nuevoUsuario.nombreUsuario = nombreUsuario;
    nuevoUsuario.email = email;
    nuevoUsuario.fechaNacimiento = fechaNacimiento;

    envioInfo = JSON.stringify(nuevoUsuario);

    let requestOptions2 = {
        method: 'PUT',
        headers: myHeaders,
        body: envioInfo,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/auth/update/" + id, requestOptions2)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, barraMensaje);
                    perfil = nuevoUsuario.nombreUsuario;                   
                    localStorage.setItem('nombreUsuario', nuevoUsuario.nombreUsuario);
                    limpiarFormulario();
                    setTimeout(() => {
                        window.location.href = `./perfil.html?perfil=${perfil}`;
                    }, 1000);
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



