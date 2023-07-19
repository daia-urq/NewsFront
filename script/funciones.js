function mostrarMensaje(aux, contenedor) { 
    mensaje = `<p>${aux.mensaje}</p> `
  ;
  contenedor.innerHTML = mensaje;
};

function logout(){
  fetch('http://localhost:8080/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Si es necesario, incluye el token de autenticación en los headers
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => {
      if(response.ok){
        response.json().then(data =>{
          console.log(data);
          localStorage.removeItem('token');
          localStorage.removeItem('bearer')
          localStorage.removeItem('nombreUsuario')
          localStorage.removeItem('authorities')
          setTimeout(() => {
            window.location.href = "./index.html";
        }, 1000);
        })
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function mostraNombre(){
  let nom = "" ;
  nom = `<h6 onclick=window.location.href='./perfil.html?perfil=${localStorage.getItem("nombreUsuario")}'>Hola, ${localStorage.getItem('nombreUsuario')}</h6>` ;
 
  if(localStorage.getItem('authorities').includes("ROLE_ADMIN") ||  localStorage.getItem('authorities').includes("ROLE_PERIODISTA")){
    nom += `<button id="panel" class="m-1 p-2" onclick="redireccionar()">Panel</button>`;
  }
  nom += `<button id="logoutButton" onclick="logout()" class="m-1 p-2">Salir</button>`; 
 
  nombreU.innerHTML= nom;
}

function redireccionar() {
  window.location.href = "../panelAdmin.html";
}
