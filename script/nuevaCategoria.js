let datos = document.getElementById('formCategoria');
let nombre = document.getElementById('nombreCat');
let modalMensaje = document.getElementById('mensajeModal');

let raw;
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let categoria = {
    nombre
}

datos.addEventListener('submit', (e) => {
    //no recaga la pagina
    e.preventDefault();

    // Sobreescribir propiedad existente
    categoria.nombre = nombre.value;
    console.log(nombre);
    console.log(categoria);
    //reinicio de variables

    //objeto a json
    raw = JSON.stringify(categoria);

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
                    mensaje = `<p>` + data.mensaje + `</p>`;
                    mensajeModal.innerHTML = mensaje;                    
                    setTimeout(() => {
                        window.location.href = "./panelAdmin.html";
                    }, 1000);
                });
            } else {
                response.json().then(error => {
                    console.log(error);
                    mostrarMensaje(error, modalMensaje);
                });
            }
        })
        .catch(error => console.error('Error:', error));
});