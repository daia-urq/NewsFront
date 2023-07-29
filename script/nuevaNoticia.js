let datos = document.getElementById('form');
let titulo = document.getElementById('titulo');
let imagen = document.getElementById('imagen');
let selcategoria = document.getElementById('categoria');
let barraMensaje = document.getElementById('mensaje');
let nombreU = document.getElementById('nombre');

let creador;
let textareaValues;
let listaCategorias;
let categoria;
let selectedOption;
let valor2;

//objeto para el fetch de crear noticia
let raw;

//notica aux
let noticia = {
  titulo: '',
  cuerpo: [],
  imagen: '',
  categoria: {},
  creador: null
}

obtenerDatos();

//lista de noticias
async function obtenerDatos() {
  try {
    const response = await fetch('http://localhost:8080/categoria/list')
    listaCategorias = await response.json();
    mostrarLista(listaCategorias);
    if (localStorage.getItem('nombreUsuario')) {
      mostraNombre();
    }
  } catch (error) {
    console.log(error);
  }
}

async function obtenerPeriodista() {
  try {
    const requestOptions2 = {
      method: 'GET',
      redirect: 'follow'
    };   
    let nombreUsuario = localStorage.getItem('nombreUsuario');
    let response2 = await fetch(`http://localhost:8080/periodista/getOne/${nombreUsuario}`, requestOptions2);
    let resultado2 = await response2.json();
    return resultado2;
  } catch (error) {
    console.log(error);
  }
}

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Escuchando el envío del formulario
datos.addEventListener("submit", async function (e) {
  try {
    // Evitar recargar la página
    e.preventDefault();
    // Obtener el periodista
    let periodista = await obtenerPeriodista();

    //escucha un cambio en select y trae dos valores prar el nombre y id de categoria
    if (!selectedOption) {
      selectedOption = selcategoria.options[selcategoria.selectedIndex];
      valor2 = selectedOption.getAttribute('data-valor');
    }

    // Agregar nuevos valores a la propiedad objeto
    noticia.titulo = titulo.value;
    noticia.cuerpo = textareaValues;
    noticia.creador = periodista.id;
    noticia.imagen = imagen.value;
    noticia.categoria = {
      id: selectedOption.value,
      nombre: valor2
    };

    // Reinicio de variables
    titulo.value = '';
    imagen.value = '';
    textareaValues = [];
    creador = null;

    // Objeto a JSON para pasar por el fetch
    const raw = JSON.stringify(noticia);

    // console.log(noticia);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/noticia/create", requestOptions);

    if (response.ok) {
      let data = await response.json();
      mostrarMensaje(data, barraMensaje);
      setTimeout(() => {
        window.location.href = "./panelPeriodista.html";
      }, 1500);
    } else {
      let error = await response.json();
      mostrarMensaje(error, barraMensaje);
    }
  } catch (error) {
    console.error(error);
  }
});


function mostrarLista(lista) {
  let option = "";
  lista.forEach(aux => {
    option += `<option value="${aux.id}" data-valor="${aux.nombre}">${aux.nombre}</option>`;
  });
  selcategoria.innerHTML = option;
}

function obtenesValorTextArea() {
  var valortextArea = [];
  var textareas = document.querySelectorAll(".textArea");

  textareas.forEach(function (textarea) {
    valortextArea.push(textarea.value);
  });

  return valortextArea;
}

function agregarTextArea() {
  var container = document.getElementById("textareaContainer");
  var nextIndex = container.children.length + 1;

  var div = document.createElement("div");
  div.classList.add("container-textarea");

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
  
  div.appendChild(label);
  div.appendChild(textarea);
  container.appendChild(div);
}


// Evento para el botón "Agregar párrafo"
document.getElementById("addTextareaButton").addEventListener("click", function () {
  agregarTextArea();
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  textareaValues = obtenesValorTextArea();
  noticia.cuerpo = textareaValues;
});