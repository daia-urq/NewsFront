let nombreU = document.getElementById('nombre');
let barraMensaje = document.getElementById('mensaje');
let contenedorUsuarios = document.getElementById('tbody');
let mensaje = '';

obtenerUsuarios()
mostraNombre();

async function obtenerUsuarios() {
    try {
        let response = await fetch('http://localhost:8080/auth/list');
        listaUsuarios = await response.json();
        console.log(listaUsuarios);
        mostrarListaPeriodistas(listaUsuarios);
    } catch (error) {
        console.log('error', error);
    }
}


function mostrarListaPeriodistas(lista) {
    let usuarios= "";
    lista.forEach(aux => {
      usuarios += `
          <tr>
            <td>${aux.nombreUsuario}</td>
            <td>${aux.nombre}</td>      
            <td>${aux.apellido}</td>  
            <td>${aux.email}</td>
            <td>${aux.fechaAlta}</td>
            <td>
            <button onclick="deleteUsuario(${aux.id})"><span id="boot-icon"
                class="bi bi-trash" style="opacity: 0.8; color:#4E74A6;"></span></button>
            </td>  
          </tr> `
    });

    contenedorUsuarios.innerHTML = usuarios;
}

function deleteUsuario(id) {
    fetch('http://localhost:8080/auth/delete/' + id, {
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