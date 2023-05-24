let datos = document.getElementById('form');
let titulo = document.getElementById('titulo');
let cuerpo = document.getElementById('cuerpo');
let imagen = document.getElementById('imagen');
let selcategoria = document.getElementById('categoria');
let barraMensaje = document.getElementById('mensaje');
let nombreU = document.getElementById('nombre');

let listaCategorias;
let categoria;
let selectedOption;
let valor2;

//objeto para el fetch de crear noticia
let raw;

//notica aux
let noticia = {
  titulo,
  cuerpo,
  imagen,
  categoria
}

obtenerDatos();
//lista de noticias
async function obtenerDatos() {
  try {
    const response = await fetch('http://localhost:8080/categoria/list')
    listaCategorias = await response.json();
    mostrarLista(listaCategorias);
    if(localStorage.getItem('nombreUsuario')){
      mostraNombre();
    }
  } catch (error) {
    console.log(error);
  }
}

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json",);

//escuchando el envio del formulario
datos.addEventListener('submit', (e) => {
  //no recaga la pagina
  e.preventDefault();

  // Agregar nuevo valor a la propieda objeto
  noticia.titulo = titulo.value;
  noticia.cuerpo = cuerpo.value;
  noticia.imagen = imagen.value;
  noticia.categoria = {
    id: selectedOption.value,
    nombre: valor2
  }

  //reinicio de variables
  titulo.value = '';
  cuerpo.value = '';
  imagen.value = '';

  //objeto a json para pasar por el fetch
  raw = JSON.stringify(noticia);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/noticia/create", requestOptions)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          mostrarMensaje(data, barraMensaje);
          //una vez creada la noticia vuelve a la lista de noticias
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
  });

function mostrarLista(lista) {
  let option = "";
  lista.forEach(aux => {
    option += `<option value="${aux.id}" data-valor="${aux.nombre}">${aux.nombre}</option>`;
  });
  selcategoria.innerHTML = option;
}

//escucha un cambio en select y trae dos valores prar el nombre y id de categoria
selcategoria.addEventListener('change', () => {
  selectedOption = selcategoria.options[selcategoria.selectedIndex];
  valor2 = selectedOption.getAttribute('data-valor');
});