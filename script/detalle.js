let urlApi = 'http://localhost:8080/noticia/list';
const query = location.search;
let parametro = new URLSearchParams(query);
let id = parametro.get("id");
let contenedor = document.getElementById("noticiaCont");

obtenerrDatos();


async function obtenerrDatos() {
  try {
    const response = await fetch(urlApi)

    const data = await response.json();

    console.log(data);

    let noticia = data.find(aux => aux.id == id);
    console.log(noticia);

    mostrarCard(noticia)

  } catch (error) {
    console.log(error);

  }
}


function mostrarCard(noticia) {
  let card = "";

  card = `<div id="cardDetail" class="card m-5">
            <div >
                <div >
                    <img id="cardimg" src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png" alt="...">
                </div>
                <div class="d-flex flex-column justify-content-evenly align-items-start">
                    <div class="card-body">
                        <h2 class="card-title">${noticia.titulo}</h2>
                        <p class="card-text">${noticia.cuerpo}</p>
                    </div>         
                </div>
            </div>    
        </div>`
    ;

  contenedor.innerHTML = card;
}


