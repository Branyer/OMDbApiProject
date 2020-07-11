const titulo = document.getElementById('titulo');
const boton = document.getElementById('buscar');
const peliculaABuscar = document.getElementById('buscador'); 
const resultado = document.querySelector('.peliculas');
const black = document.querySelector('.fondo-opaco');
const btnSalir = document.querySelector('.boton-salir');
const contDetalles = document.querySelector('.cont-detalles');
const apiKey = '715d100a';

let auxSearch;
let user = '';

const borrarPeliculas = () => {
    const arrayPelis = document.querySelectorAll('.pelicula');
    const tam = arrayPelis.length;
    if(tam > 0)
        for(let i = 0; i< tam ; i++) resultado.removeChild(arrayPelis[i]);
    
        return 0;
}

const verMas = (e) => {
    black.style.opacity = '1';
    black.style.zIndex = '300';
    const key = e.path[0].id;
    const detallesPelicula = auxSearch[key];

    const { Title, Year, imdbID, Poster} = detallesPelicula;
 
    const postImg = document.createElement('img');
    postImg.setAttribute('src', Poster);
    postImg.setAttribute('class', 'poster-verMas');
    contDetalles.appendChild(postImg);

    const contDatos = document.createElement('div');
    contDatos.setAttribute('class', 'cont-datos')
    contDetalles.appendChild(contDatos);

    const titulo = document.createElement('h1');
    titulo.innerHTML = Title;
    console.log(titulo);
    contDatos.appendChild(titulo);

    const anio = document.createElement('p');
    anio.innerHTML = `Year : ${Year}`;
    contDatos.appendChild(anio);

    const imdb = document.createElement('p');
    imdb.innerHTML = `imdbID : ${imdbID}`;
    contDatos.appendChild(imdb);

    
}

const esconderVerMas = () => {
    black.style.opacity = '0';
    black.style.zIndex = '0';
    contDetalles.removeChild(document.querySelector('.poster-verMas'));
    contDetalles.removeChild(document.querySelector('.cont-datos'));
}

const apiRequest = () =>{

     borrarPeliculas();

    fetch(`http://www.omdbapi.com/?s=${peliculaABuscar.value}&apikey=${apiKey}`)
        .then((resp) => {
            return resp.json();
        })
        .then(({ Search }) => {
            auxSearch = Search;
            for(let key in Search ){
                const newMovie = document.createElement('div');
                newMovie.setAttribute('class', 'pelicula');

                const imagen = document.createElement('img');
                const { Poster } = Search[key];
                imagen.setAttribute('src', Poster );
                imagen.setAttribute('alt', key);
                const verDetalles = document.createElement('a');
                verDetalles.innerHTML = 'Ver detalles';
                verDetalles.setAttribute('class', 'btnDetalles');
                verDetalles.setAttribute('id', key);
                verDetalles.onclick = verMas;
                newMovie.appendChild(verDetalles); 
                newMovie.appendChild(imagen);
                resultado.appendChild(newMovie);
 
            }
        });
}




   

const getUsuario = () => {
     for(let key in sessionStorage)
         if(key.slice(0,-1) === 'user')
             return JSON.parse(sessionStorage.getItem(key));
}

if(sessionStorage.length === 2) {
    
   user = getUsuario();
   titulo.innerHTML += user.nombre + "!";

}



boton.onclick = apiRequest;
btnSalir.onclick = esconderVerMas;
