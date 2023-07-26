let contenedorLista = document.getElementById('tbody');
let data;
let barraMensaje = document.getElementById('mensaje');
let nombreU = document.getElementById('nombre');
obtenerDatos();

async function obtenerDatos() {
  try {
    const response = await fetch('http://localhost:8080/noticia/list')
    listaNoticias = await response.json();
    mostrarLista(listaNoticias);
    if(localStorage.getItem('nombreUsuario')){
      mostraNombre();
    }
  } catch (error) {
    console.log(error);
  }
}

function mostrarLista(lista) {
    let noticia = "";
 
      lista.forEach(aux => {
        noticia += `
        <tr>
        <td id="itemNoticia" onclick="redireccionar(${aux.id})">${aux.titulo}</td>
        <td>${aux.fechaCreacion}</td>
        <td>${aux.periodista.nombre} ${aux.periodista.apellido}</td>
        <td>${aux.categoria.nombre}</td>
        <td> 
        <button class="button" type="button" onclick="deleteNoticia(${aux.id})">
            <i class="bi bi-trash3" style="color:#F2911B;"></i></button> 
        </td>            
    </tr> `
      });  
    
    
    contenedorLista.innerHTML = noticia;
  };


  function redireccionar(id) {
    window.location.href = `./detalle.html?id=${id}`;
  }
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