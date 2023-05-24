let urlApi = 'http://localhost:8080/noticia/list';
const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let contenedorNoticia = document.getElementById("noticiaCont");
let nombreU= document.getElementById('nombre');
let token = localStorage.getItem('token');
obtenerrDatos();


async function obtenerrDatos() {
  try {
    const response = await fetch(urlApi)
    const data = await response.json();   

    let noticia = data.find(aux => aux.id == id);

    mostrarCard(noticia)
    if(localStorage.getItem('nombreUsuario')){
      mostraNombre();
    }
  } catch (error) {
    console.log(error);
  }
}


function mostrarCard(noticia) {
  let noti = "";

  noti= `<div id="cardDetail" class="card m-5">
            <div >
                <div >
                    <img id="cardimg" src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png" alt="...">
                </div>
                <div class="d-flex flex-column justify-content-evenly align-items-start">
                    <div class="card-body">
                        <h2 class="card-title">${noticia.titulo}</h2>    
                     </div>     
                     <div class="card-body">

                        <p class="card-text">${noticia.categoria.nombre}</p>                      
                        <p class="card-text">${noticia.fechaCreacion}</p>
                        <p class="card-text">${noticia.cuerpo}</p>
                    </div>         
                </div>
            </div>    
        </div>`
    ;

    contenedorNoticia.innerHTML = noti;
}


