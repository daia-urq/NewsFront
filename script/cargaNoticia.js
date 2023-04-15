let datos = document.getElementById('form');
let titulo = document.getElementById('titulo');
let cuerpo =document.getElementById('cuerpo');
let imagen = document.getElementById('imagen');
let barraMensaje = document.getElementById('mensaje');

let men ;
let raw;
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let objeto = {
  titulo,
  cuerpo,
  imagen
}

datos.addEventListener('submit',(e)=>{
  //no recaga la pagina
  e.preventDefault();
  
  // Sobreescribir propiedad existente
  objeto.titulo = titulo.value;  
  // Agregar nueva propiedad
  objeto.cuerpo = cuerpo.value;
  objeto.imagen = imagen.value;

//reinicio de variables
  titulo.value = '';
  cuerpo.value = '';
  imagen.value = '';

  //objeto a json
  raw = JSON.stringify(objeto);

  var requestOptions = {
    method: 'POST', 
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8080/noticia/create", requestOptions)
  .then(response => {
    if (response.ok) {
        response.json().then(data => {
            mostrarMensaje(data, barraMensaje);
            setTimeout(() => {
                window.location.href = "./listarNoticias.html";
            }, 3000);
        });
    } else {
        response.json().then(error => {            
            mostrarMensaje(error, barraMensaje);
        });
    }
})
.catch(error => console.error('Error:', error));
});


