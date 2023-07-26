let urlPeriodistas = 'http://localhost:8080/periodista/list';
let contenedorPeriodistas = document.getElementById('tbodyPeriodista');
let periodistaLista;

obtenerDatosPeriodista();


async function obtenerDatosPeriodista() {
  try {
    let response = await fetch(urlPeriodistas);
    periodistaLista = await response.json();
    mostrarListaPeriodistas(periodistaLista);
  } catch (error) {
    console.log('error', error);
  }
}


function mostrarListaPeriodistas(lista) {
  let periodistas = "";
  lista.forEach(aux => {
    periodistas += `
        <tr>
            <td>${aux.nombre}</td>      
            <td>${aux.apellido}</td>  
            <td>${aux.email}</td>            
            <td>${aux.sueldo}</td>
            <td>${aux.fechaAlta}</td>
            <td><button onclick="redireccionarEditperiodista(${aux.id})"><span id="boot-icon"
                class="bi bi-plus-square" style="opacity: 0.8; color:#4E74A6;"></span></button>
            <button onclick="deletePeriodista(${aux.id})"><span id="boot-icon"
                class="bi bi-trash" style="opacity: 0.8; color:#4E74A6;"></span></button>
            </td>  
        </tr> `
  });
  contenedorPeriodistas.innerHTML = periodistas;
};

function redireccionarNuevoPeriodista() {
  window.location.href = `./nuevoPeriodista.html`;
}

function redireccionarEditperiodista(id) {
  window.location.href = `./modificarPeriodista.html?id=${id}`;
}

function deletePeriodista(id) {
  fetch('http://localhost:8080/periodista/delete/' + id, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          mostrarMensaje(data, barraMensaje);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      } else {
        response.json().then(error => {
          mostrarMensaje(error, barraMensaje);

        });
      }
    })
    .catch(error => console.error('Error:', error));

}