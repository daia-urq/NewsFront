let urlApi = 'http://localhost:8080/noticia/list';
const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let contenedorNoticia = document.getElementById("noticiaCont");
let nombreU = document.getElementById('nombre');
let token = localStorage.getItem('token');

let auxNombre = localStorage.getItem('nombreUsuario');
let form = document.getElementById('comentarios');
let auxUsuario;

// limita a 140 los caracteres del comnetario
let comentarioTextarea = document.getElementById('comentarioTextarea');
comentarioTextarea.addEventListener('input', function () {
  const maxLength = 140;
  if (this.value.length > maxLength) {
    this.value = this.value.substring(0, maxLength);
  }
});

var rol = localStorage.getItem('authorities');
rol = JSON.parse(rol);
var botonComentar = document.getElementById('botonComentar');
var restriccionDeRoles = ["ROLE_ADMIN", "ROLE_PERIODISTA"];

if (restriccionDeRoles.includes(rol[0].authority)) {
  console.log("entre");
  botonComentar.disabled = true;
  botonComentar.textContent = "Acceso restringido";
}

if (localStorage.getItem('nombreUsuario')) {
  mostraNombre();
}

obtenerDatos();
obtenerComentarios(id);

obtenerUsuario().then((aux) => {
  auxUsuario = aux;
  comentar(auxUsuario.id, id)
})

async function obtenerDatos() {
  try {
    const response = await fetch(urlApi)
    const data = await response.json();

    let noticia = data.find(aux => aux.id == id);

    mostrarCard(noticia);

  } catch (error) {
    console.log(error);
  }
}

function mostrarCard(noticia) {
  let noti = "";

  let parrafos = "";

  noticia.cuerpo.forEach((parrafo) => {
    parrafos += `
      <p class="card-text">${parrafo}</p>
    `
  });

  noti = `<div id="cardDetail" class="m-5">          
          <div>
            <img id="cardimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj1TTBo4h-xChXl6C3_LPcZtcDLdUmfAyLA&usqp=CAU" alt="...">
          </div>
          <div class=" d-flex flex-wrap justify-content-between info">
            <p id="cat">${noticia.categoria.nombre}</p>                                         
            <p id="fecha">${noticia.fechaCreacion}</p>   
          </div>  
          <div class="d-flex flex-column justify-content-evenly align-items-start">
                  <div class="card-body">
                    <h2 class="card-title">${noticia.titulo}</h2>    
                  </div>  
              
                  <p id="autor">Por ${noticia.periodista.nombre} ${noticia.periodista.apellido}</p>  
                  <div id="parrafosNoticia" class="card-body">`
    + parrafos +
    `             
                  </div>     
          </div>
        </div>`
    ;

  contenedorNoticia.innerHTML = noti;
}

async function obtenerUsuario() {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const response2 = await fetch("http://localhost:8080/auth/getOne/" + auxNombre, requestOptions)
    const data2 = await response2.json();
    return data2;
  } catch (error) {
    console.log(error);
  }
}

function comentar(id_usuario, id_noticia) {


  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let comentario = document.getElementById('comentarioTextarea').value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    comentario = limpiarComentario(comentario);

    var raw = JSON.stringify({
      "noticia": id_noticia,
      "usuario": id_usuario,
      "comentario": comentario
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/comentario/create", requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            setTimeout(() => {
              location.reload();
            }, 1000)
          })
        }
      })
      .catch(error => console.log('error', error));
  });
}

function obtenerComentarios(id) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://localhost:8080/comentario/noticia/" + id, requestOptions)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          mostrarComentarios(data);
        })
      }
    })
    .catch(error => console.log('error', error));
}

function mostrarComentarios(lista) {
  let contenedorComentario = document.getElementById('contenedorComentario');
  let comentarios = '';

  lista.forEach(element => {

    comentarios += `
    <div class="container d-flex comentario">
      <h6 class="">${element[3]}</h6 >
      <p class="">${element[1]}</p>
      <div id="eliminar" class="container d-flex justify-content-between align-items-center"   
          <h5>${element[2]}</h5>
          `;

    if (auxNombre == element[3]) {
      comentarios +=` 
      <button">
        <span id="boot-icon" class="bi bi-trash" style="opacity: 0.8; color:#4E74A6;"></span>
      </button>
    `;
    }

  comentarios +=`</div>
    </div>`
  });

  contenedorComentario.innerHTML = comentarios
}

function limpiarComentario(comentario) {
  return comentario.replace(/\n{2,}/g, '\n');
}