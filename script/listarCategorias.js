let urlApi = 'http://localhost:8080/categoria/cantidad';
let contenedorCategorias = document.getElementById('tbody');
let categoriaLista;
let barraMensaje = document.getElementById('mensaje');
let nombreU = document.getElementById('nombre');
let token = localStorage.getItem('token');

obtenerDatos();

async function obtenerDatos() {
  try {
    const response = await fetch(urlApi)
    categoriaLista = await response.json();
    mostrarLista(categoriaLista);  

    if(localStorage.getItem('nombreUsuario')){
      mostraNombre();
    }

  } catch (error) {
    console.log(error);
  }
}

function mostrarLista(lista) {
  let categoria = "";
  lista.forEach(aux => {
    categoria += `
      <tr>
      <td>${aux[1]}</td>      
      <td>${aux[2]}</td>  
      <td>
      <button data-bs-toggle="modal" data-bs-target="#modalUpdateCategoria" onclick="prepararModal(${aux[0]}, '${aux[1]}')">
        <span id="boot-icon" class="bi bi-plus-square" style="opacity: 0.8; color:#4E74A6;"></span>
      </button>
      <button onclick="deleteCategoria(${aux[0]})">
        <span id="boot-icon" class="bi bi-trash" style="opacity: 0.8; color:#4E74A6;"></span>
      </button>
    </td>       
  </tr>`
  });

  contenedorCategorias.innerHTML = categoria;
};


function deleteCategoria(id) {

  fetch('http://localhost:8080/categoria/delete/' + id, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          mostrarMensaje(data, barraMensaje);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      } else {
        response.json().then(error => {
          mostrarMensaje(error, barraMensaje);
        });
      }
    })
    .catch(error => console.error('Error:', error));
}