function mostrarMensaje(aux, contenedor) {
  mensaje = `<p>${aux.mensaje}</p> `;
  contenedor.innerHTML = mensaje;
  setTimeout(() => {
    mensaje = `<p></p> `
    contenedor.innerHTML = mensaje;
  }, 2500);
};

function logout() {
  // let token = localStorage.getItem('token');
  // console.log(token);

  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", 
  // "Bearer " + token)

  var requestOptions = {
    method: 'POST',
    // headers: myHeaders,
    redirect: 'follow'
  };

  fetch('http://localhost:8080/auth/logout' ,requestOptions)
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        localStorage.removeItem('token');
        localStorage.removeItem('bearer')
        localStorage.removeItem('nombreUsuario')
        localStorage.removeItem('authorities');
        setTimeout(() => {
          window.location.href = `./index.html`;
      }, 1000);
  
      });
    } else {
      response.json().then(error => {
        console.log("error data:");
        console.log(error);
      })
    }
  }).catch(error => console.error('Error:', error));
}

function mostraNombre() {
  let nom = "";
  nom = `<h6 onclick=window.location.href='./perfil.html?perfil=${localStorage.getItem("nombreUsuario")}'>Hola, ${localStorage.getItem('nombreUsuario')}</h6>`;

  if (localStorage.getItem('authorities').includes("ROLE_ADMIN")) {
    nom += `<button id="panel" class="m-1 p-2" onclick="redireccionarPanel()">Panel</button>`;
  } else if( localStorage.getItem('authorities').includes("ROLE_PERIODISTA")){
    nom += `<button id="panel" class="m-1 p-2" onclick="redireccionarPeriodista()">Panel</button>`;
  }
  nom += `<button id="logoutButton" onclick="logout()" class="m-1 p-2">Salir</button>`;
  nombreU.innerHTML = nom;
}

function redireccionarPanel() {
  window.location.href = "../panelAdmin.html";
}

function redireccionarPeriodista() {
  window.location.href = "../panelPeriodista.html";
}