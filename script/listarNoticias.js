let urlApi = 'http://localhost:8080/noticia/list';
let contenedorCard = document.getElementById('tbody');
let data;
let barraMensaje = document.getElementById('mensaje');

obtenerDatos();

async function obtenerDatos() {
  try {
    const response = await fetch(urlApi)

    data = await response.json();

    mostrarLista(data);

  } catch (error) {
    console.log(error);
  }
}



function mostrarLista(lista) {

    let cardHtml = "";
    lista.forEach(aux => {
      cardHtml += `
      <tr>
      <td>${aux.titulo}</th>
      <td>${aux.fechaCreacion}</td>
      <td>Proximamente</td>
      <td>Proximamente</td>
      <td> <a href="./modificarNoticia.html?id=${aux.id}"><button type="button" class="button">
          <i class="bi bi-pencil-square"></i></button></a>
      <button class="button" type="button" onclick="deleteNoticia(${aux.id})">
          <i class="bi bi-trash3"></i></button></td>
          
  </tr> `
    });
  
    contenedorCard.innerHTML = cardHtml;
  };


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