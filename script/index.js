let datos = document.getElementById('formLogin');
let nombreUsuario = document.getElementById('nombreUsuario');
let password = document.getElementById('password');
let barraMensaje = document.getElementById('mensaje');
let mensaje = '';
let raw;


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let usuario = {
    nombreUsuario,
    password
}

//escuchando el envio del formulario
datos.addEventListener('submit', (e) => {
    //no recaga la pagina
    e.preventDefault();
    // Agregar nuevo valor a la propieda usuario
    usuario.nombreUsuario = nombreUsuario.value;
    usuario.password = password.value;

    nombreUsuario.value = '';
    password.value = '';

    //objeto a json para pasar por el fetch
    raw = JSON.stringify(usuario);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/auth/login", requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    loginStorage(data);
                    let auth = JSON.stringify(data.authorities); 
                    if(auth.includes("ROLE_ADMIN") || auth.includes("ROLE_PERIODISTA")){
                        window.location.href = "../panelAdmin.html";
                    }else{
                        window.location.href = "../vistaNoticias.html";
                    }
                });
            } else {
                response.json().then(error => {
                    mensaje = `<p>Error al acceder</p>`;
                    barraMensaje.innerHTML = mensaje;
                    setTimeout(() => {
                        window.location.href = "./index.html";
                    }, 1000);
                })
            }
        }).catch(error => console.error('Error:', error));

});


function loginStorage(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('bearer', data.bearer);
    localStorage.setItem('nombreUsuario', data.nombreUsuario);
    localStorage.setItem('authorities', JSON.stringify(data.authorities));
}






