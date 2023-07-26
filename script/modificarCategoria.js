let datosUpdate = document.getElementById('formUpdateCategoria');
let envioModificado;
let modalMensaje2 = document.getElementById('mensajeModal2');
let categoriaModificada = {
    nombre
}

function prepararModal(id, nombre) {
    var inputNuevoNombreCategoria = document.getElementById('inputNuevoNombreCategoria');
    inputNuevoNombreCategoria.value = nombre;


    datosUpdate.addEventListener('submit', (eee) => {
        eee.preventDefault();
        let nombreModificado = document.getElementById('inputNuevoNombreCategoria');

        categoriaModificada.nombre = nombreModificado.value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        envioModificado = JSON.stringify(categoriaModificada);

        console.log(envioModificado);
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: envioModificado,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/categoria/update/" + id, requestOptions)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        mensaje = `<p>` + data.mensaje + `</p>`;
                        mensajeModal2.innerHTML = mensaje;
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
}

