let datos = document.getElementById('formCategoria');
let nombre = document.getElementById('nombre');
let modalMensaje = document.getElementById('mensajeModal');

let raw;
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let objeto = {
    nombre
}

datos.addEventListener('submit', (e) => {
    //no recaga la pagina
    e.preventDefault();

    // Sobreescribir propiedad existente
    objeto.nombre = nombre.value;

    //reinicio de variables
    nombre.value = '';

    //objeto a json
    raw = JSON.stringify(objeto);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/categoria/create", requestOptions)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, modalMensaje);
                    setTimeout(() => {
                        window.location.href = "./panelAdmin.html";
                    }, 3000);
                });
            } else {
                response.json().then(error => {
                    mostrarMensaje(error, barraMensaje);
                });
            }
        })
        .catch(error => console.error('Error:', error));
});