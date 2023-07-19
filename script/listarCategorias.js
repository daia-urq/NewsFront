let urlApi = 'http://localhost:8080/categoria/cantidad';
let contenedorCategorias = document.getElementById('tbody');
let categoriaLista;
let barraMensaje = document.getElementById('mensajeAdmin');
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
      <td>${aux[0]}</th>      
      <td>${aux[1]}</th>   
      <td> <a href="./modificarCategoria.html?id=${aux.id}"><button type="button" class="button">
          <i class="bi bi-pencil-square"></i></button></a>
      <button class="button" type="button" onclick="deleteCategoria(${aux.id})">
          <i class="bi bi-trash3"></i></button></td>
          
  </tr> `
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