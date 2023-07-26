const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let nombreU = document.getElementById('nombre');
let token = localStorage.getItem('token');
let barraMensaje = document.getElementById('mensaje');
let mensaje = '';

let contenedorFormPeriodistas = document.getElementById('formPeriodista');

let envioDatos;

let changePasswordCheckbox;
let passwordFieldsContainer;
let nuevaContraseña;


mostraNombre();
obtenerDatos();

function togglePasswordFields() {
    if (changePasswordCheckbox.checked) {
        passwordFieldsContainer.style.display = 'block';
    } else {
        passwordFieldsContainer.style.display = 'none';       
    }
}

async function obtenerDatos() {
    try {
        const response = await fetch('http://localhost:8080/periodista/getOneid/' + id)
        auxPeriodista = await response.json();
        mostrarFormPeriodista(auxPeriodista);
    } catch (error) {
        console.log(error);
    }
}

function mostrarFormPeriodista(aux) {
    let form = "";
    form = `
        <div class="mb-3">
            <label for="nombre2" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="nombre2" placeholder="Nombre"
            name="nombre2" value="${aux.nombre}">
        </div>
        <div class="mb-3">
            <label for="apellido" class="form-label">Apellido:</label>
            <input type="text" class="form-control" id="apellido" placeholder="Apellido"
            name="apellido" value="${aux.apellido}">
        </div>
        <div class="mb-3">
            <label for="nombreUsuario" class="form-label">Nombre usuario:</label>
            <input type="text" class="form-control" id="nombreUsuario" placeholder="Nombre Usuario"
            name="nombreUsuario" value="${aux.nombreUsuario}">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="email" name="email" value="${aux.email}">
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
            min="1923-01-01" max="2004-12-31" value="${aux.fechaNacimiento}">
        </div>
        <div class="mb-3">
            <label for="sueldo" class="form-label">Sueldo:</label>
            <input type="number" class="form-control" id="sueldo" name="sueldo" min="1" value="${aux.sueldo}">
        </div>
        <button type="submit" class="btn">Modificar</button>`

    contenedorFormPeriodistas.innerHTML = form;

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
    sueldo.value = '';
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

contenedorFormPeriodistas.addEventListener('submit', (ee) => {
    ee.preventDefault();

    let nombre = document.getElementById('nombre2');
    let apellido = document.getElementById('apellido');
    let nombreUsuario = document.getElementById('nombreUsuario');
    let email = document.getElementById('email');
    let fechaNacimiento = document.getElementById('fechaNacimiento');
    let sueldo = document.getElementById('sueldo');
    newPasswordInput = document.getElementById('password');

    let modificarPeriodista = {
        apellido,
        nombreUsuario,
        email,
        password,
        fechaNacimiento,
        sueldo,
        nombre
    }    
    
    if (changePasswordCheckbox.checked) {
        modificarPeriodista.password = newPasswordInput.value;
    }else{
        modificarPeriodista.password = null;
    }

    modificarPeriodista.apellido = apellido.value;
    modificarPeriodista.nombre = nombre.value;
    modificarPeriodista.nombreUsuario = nombreUsuario.value;
    modificarPeriodista.email = email.value;
    modificarPeriodista.fechaNacimiento = fechaNacimiento.value;
    modificarPeriodista.sueldo = sueldo.value;

    let raw = JSON.stringify(modificarPeriodista);
  
    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/periodista/update/" + id, requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, barraMensaje);
                    limpiarFormulario();
                    setTimeout(() => {
                        window.location.href = "./panelAdmin.html";
                    }, 1000);
                });
            } else {
                response.json().then(error => {
                    console.log(error.mensaje);
                    console.log(error);
                    mostrarMensaje(error, barraMensaje);
                });
            }
        })
        .catch(error => console.log('error', error));

});