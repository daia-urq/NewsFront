const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let formulario = document.getElementById('formulario');
let noticia;
let urlApi = 'http://localhost:8080/noticia/list';
let data;
let barraMensaje = document.getElementById('mensaje');

obtenerDatos();

async function obtenerDatos() {
    try {
        const response = await fetch(urlApi)

        data = await response.json();
        noticia = data.find(aux => aux.id == id)
        console.log(noticia);
        mostrarForm(noticia);

    } catch (error) {
        console.log(error);
    }
}

function mostrarForm(noticia) {
    let form = "";

    form = ` 
    <form id="form">
    <div class="">
        <label for="titulo" class="form-label">Titulo</label>
        <input type="text" class="form-control" id="titulo" value="${noticia.titulo}">
    </div>
    <div class="">
        <label for="cuerpo">Cuerpo noticia</label>
        <textarea class="form-control" rows="5" id="cuerpo"> ${noticia.cuerpo}</textarea>
    </div>
    <div class="">
        <label for="imagen" class="form-label">Imagen</label>
        <input type="text" class="form-control" id="imagen" value="${noticia.imagen}">

    </div>
    <div class="d-flex justify-content-end">
        <button type="submit" class="btn">Submit</button>
    </div>
</form>`
    formulario.innerHTML = form;
    document.getElementById('form').addEventListener('submit', modificarNoticia);
}



function modificarNoticia() {
    event.preventDefault();
    let titulo = document.getElementById('titulo').value;
    let cuerpo = document.getElementById('cuerpo').value;
    let imagen = document.getElementById('imagen').value;

    fetch(`http://localhost:8080/noticia/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo,
            cuerpo: cuerpo,
            imagen: imagen
        })
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                mostrarMensaje(data, barraMensaje);
                setTimeout(() => {
                    window.location.href = "./listarNoticias.html";
                }, 3000);
            });
        } else {
            response.json().then(error => {            
                mostrarMensaje(error, barraMensaje);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}



