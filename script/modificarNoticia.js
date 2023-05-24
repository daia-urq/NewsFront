const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let urlApi = 'http://localhost:8080/noticia/list';
let data;
let formulario = document.getElementById('formulario');
let barraMensaje = document.getElementById('mensaje');
let noticia;

let listaCategorias;
let categoria;
let selectedOption;
let valor2;

obtenerDatos();

async function obtenerDatos() {
    try {
        try {
            const response = await fetch('http://localhost:8080/categoria/list')
            listaCategorias = await response.json();
        } catch (error) {
            console.log(error);
        }
        const response = await fetch(urlApi)
        noticiaLista = await response.json();
        noticia = noticiaLista.find(aux => aux.id == id)
        mostrarForm(noticia, listaCategorias);
    } catch (error) {
        console.log(error);
    }
}

function mostrarForm(noticia, lista) {
    let form = "";
    let option = "";
    lista.forEach(aux => {
        option += `<option value="${aux.id}" data-valor="${aux.nombre}">${aux.nombre}</option>`;
    });

    form = ` 
    <form id="form">
        <div class="">
            <label for="titulo" class="form-label">Titulo</label>
            <input type="text" class="form-control" id="titulo" value="${noticia.titulo}">
        </div>
        <div class="">
            <label for="cuerpo">Cuerpo noticia</label>
            <textarea class="form-control" rows="5" id="cuerpo">${noticia.cuerpo}</textarea>
        </div>
        <div class="">
            <label for="imagen" class="form-label">Imagen</label>
            <input type="text" class="form-control" id="imagen" value="${noticia.imagen}">
        </div>
        <div class="">
            <label for="" class="form-label">Categoria</label>
            <select class="form-select" id="categoria" name="categoria">
            ` + option + `                                  
            </select>
        </div>
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn">Submit</button>
        </div>
    </form>`
    formulario.innerHTML = form;

    // Agregar el event listener después de que el elemento selcategoria existe en el documento
    const selcategoria = document.querySelector('#categoria');
    selcategoria.addEventListener('change', () => {
        const selectedOption = selcategoria.options[selcategoria.selectedIndex];
        const valor2 = selectedOption.getAttribute('data-valor');
        categoria = {
            id: selectedOption.value,
            nombre: valor2
        }
    });
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
            imagen: imagen,
            categoria: categoria,
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