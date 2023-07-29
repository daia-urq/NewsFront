function deleteNoticia(id) {
    fetch('http://localhost:8080/noticia/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    mostrarMensaje(data, barraMensaje);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                });
            } else {
                response.json().then(error => {
                    mostrarMensaje(error, barraMensaje);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function redireccionar(id) {
    window.location.href = `./detalle.html?id=${id}`;
}

function redireccionar(id) {
    window.location.href = `./detalle.html?id=${id}`;
  }