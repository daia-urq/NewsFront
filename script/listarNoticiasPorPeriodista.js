let nombreU = document.getElementById('nombre');
let nombreUsuario = localStorage.getItem('nombreUsuario');
let contenedorMisnoticias = document.getElementById('tbody');
let barraMensaje = document.getElementById('mensaje');

mostraNombre();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:8080/auth/getOne/" + nombreUsuario, requestOptions)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log("periodista: " + JSON.stringify(data));
                obtenerListadoNoticias(data.id);
            })
        }
    })
    .catch(error => console.log('error', error));



async function obtenerListadoNoticias(id) {
    try {
        const response = await fetch('http://localhost:8080/noticia/listByPeriodista/' + id)
        const data = await response.json();
        console.log("noticias de: " + id);
        console.log(data);
        mostrarMisNoticias(data);
    } catch (error) {
        console.log(error);
    }
}

function mostrarMisNoticias(lista){
    data = ""

    lista.forEach(aux => {
        data += `
        <tr>
        <td id="itemNoticia" onclick="redireccionar(${aux[0]})">${aux[1]}</td>      
        <td>${aux[2]}</td>  
        <td>${aux[3]}</td>     
        <td><button onclick="editarNoticia(${aux[0]})"><span id="boot-icon"
            class="bi bi-plus-square" style="opacity: 0.8; color:#4E74A6;"></span></button>
        <button onclick="deleteNoticia(${aux[0]})"><span id="boot-icon"
            class="bi bi-trash" style="opacity: 0.8; color:#4E74A6;"></span></button>
        </td>  
    </tr>       
        `
        contenedorMisnoticias.innerHTML = data;
    });

}

function editarNoticia(id){
    window.location.href = `./modificarNoticia.html?id=`+id;
}


