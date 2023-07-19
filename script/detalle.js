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

  let parrafos = "";
  
  noticia.cuerpo.forEach((parrafo) => {
    parrafos += `
      <p class="card-text">${parrafo}</p>
    `
  });

  noti= `<div id="cardDetail" class="card m-5">          
          <div>
            <img id="cardimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj1TTBo4h-xChXl6C3_LPcZtcDLdUmfAyLA&usqp=CAU" alt="...">
          </div>
          <div class="container d-flex flex-wrap justify-content-around info">
          <p>${noticia.categoria.nombre}</p>           
          <p>${noticia.periodista.nombre} ${noticia.periodista.apellido}</p>                                
          <p>${noticia.fechaCreacion}</p>   
        </div>  
          <div class="d-flex flex-column justify-content-evenly align-items-start">
            <div class="card-body">
              <h2 class="card-title">${noticia.titulo}</h2>    
            </div>  
            <div class="card-body">` 
            + parrafos + 
            `             
            </div>     
          </div>
        </div>`
    ;

    contenedorNoticia.innerHTML = noti;
}


