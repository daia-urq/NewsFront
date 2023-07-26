const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let urlApi = 'http://localhost:8080/noticia/list';
let data;
let formulario = document.getElementById('formulario');
let barraMensaje = document.getElementById('mensaje');

let noticia;
let cuerpo;
let textareaValues;
let listaCategorias;
let categoria = {};
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
        noticia = noticiaLista.find(aux => aux.id == id)
        console.log(noticia);
        mostrarForm(noticia, listaCategorias);
    } catch (error) {
        console.log(error);
    }
}

function obtenesValorTextArea() {
    var valortextArea = [];
    var textareas = document.querySelectorAll(".textArea");

    textareas.forEach(function (textarea) {
        valortextArea.push(textarea.value);
    });

    return valortextArea;
}

function mostrarForm(noticia, lista) {
    categoria = {
        id: noticia.categoria.id,
        nombre: noticia.categoria.nombre
    };
    console.log(categoria);
    let categoriaActual = noticia.categoria;
    let form = "";
    let option = "";
    lista.forEach(aux => {
        option += `<option value="${aux.id}" data-valor="${aux.nombre}" ${categoriaActual.id === aux.id ? 'selected' : ''}>${aux.nombre}</option>`;
    });

    form = ` 
    <form id="form">
        <div class="">
            <label for="periodista" class="form-label">Id</label>
            <input type="text" class="form-control" id="periodista" value="${noticia.periodista.id}">
        </div>
        <div class="">
            <label for="titulo" class="form-label">Titulo</label>
            <input type="text" class="form-control" id="titulo" value="${noticia.titulo}">
        </div>
         <div id="textareaContainer">

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


    let nextIndex = 1;
    // Obtener el contenedor donde se agregarán los <textarea>
    let contenedor = document.getElementById("textareaContainer");
    // Borrar contenido previo del contenedor (si lo hay)
    contenedor.innerHTML = "";
    // Recorrer el array y crear los <textarea>
    noticia.cuerpo.forEach(element => {
        var label = document.createElement("label");
        label.setAttribute("for", "cuerpo" + nextIndex);
        label.textContent = "Parrafo " + nextIndex;
        var textarea = document.createElement("textarea");
        textarea.classList.add("textArea");
        textarea.setAttribute("rows", "5");
        textarea.setAttribute("id", "cuerpo" + nextIndex);
        textarea.setAttribute("placeholder", "Escribe aquí...");
        textarea.style.display = "block";
        textarea.style.minWidth = "-webkit-fill-available";
        textarea.style.marginTop = "1rem"

        // Mostrar el texto del array en el <textarea>
        textarea.value = element;
        // Agregar el <textarea> al contenedor
        contenedor.appendChild(label)
        contenedor.appendChild(textarea);
        nextIndex++;
    });

    // Agregar el event listener después de que el elemento selcategoria existe en el documento
    let selcategoria = document.getElementById('categoria');
    selcategoria.addEventListener('change', () => {
        const selectedOption = selcategoria.options[selcategoria.selectedIndex];
        const valor2 = selectedOption.getAttribute('data-valor');
        categoria = {
            id: selectedOption.value,
            nombre: valor2
        };
        console.log(categoria);
    });
    document.getElementById('formulario').addEventListener('submit', modificarNoticia);
}

document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
    textareaValues = obtenesValorTextArea();
    cuerpo = textareaValues;
});


function modificarNoticia() {
    event.preventDefault();
    let textareaValues = obtenesValorTextArea();
    let cuerpo = textareaValues; // Asignar el valor del textarea a la variable cuerpo
    let creador = document.getElementById('periodista').value;
    let titulo = document.getElementById('titulo').value;
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
            creador: creador
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

