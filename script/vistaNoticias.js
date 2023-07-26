let urlApi = 'http://localhost:8080/noticia/list';
let contenedorCard = document.getElementById('tarjetas');
let nombreU = document.getElementById('nombre');
let token = localStorage.getItem('token');
let data;

obtenerDatos();

async function obtenerDatos() {
  try {
    const response = await fetch(urlApi);
    data = await response.json();
    // console.log(data);
    mostrarNoticias(data);
    if (localStorage.getItem('nombreUsuario')) {
      mostraNombre();
    }      
  } catch (error) {
    console.log(error);
  }
}


function mostrarNoticias(lista) {
  let cardHtml = "";

  if (!lista.length) {
    cardHtml = `<h6> No hay noticias</h6>`
  }else{
    lista.forEach(aux => {
      cardHtml += `
    <div class="card p-1 m-2" onclick="window.location.href='./detalle.html?id=${aux.id}'">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzj1TTBo4h-xChXl6C3_LPcZtcDLdUmfAyLA&usqp=CAU"  class="card-img-top"
        alt="...">
      <div class="container d-flex flex-wrap justify-content-start align-items-start nombre">    
        <h6><small>${aux.categoria.nombre}</small></h6>  
      </div>
      <div class="container  d-flex flex-wrap justify-content-start align-items-start titulo">   
        <h4>${aux.titulo}</h4>
      </div>
      <div class="container d-flex flex-wrap justify-content-between fecha">   
        <p><small>${aux.fechaCreacion}</small></p>
        <h6><small>${aux.periodista.nombre} ${aux.periodista.apellido}</small></h6>
      </div>
      </div>
    </div> `
    });
  }
  contenedorCard.innerHTML = cardHtml;
};

