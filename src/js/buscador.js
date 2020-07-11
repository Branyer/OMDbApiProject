const titulo = document.getElementById('titulo');
const boton = document.getElementById('buscar');
const peliculaABuscar = document.getElementById('buscador'); 
const resultado = document.querySelector('.peliculas');
const black = document.querySelector('.fondo-opaco');
const btnSalir = document.querySelector('.boton-salir');
const contDetalles = document.querySelector('.cont-detalles');
const verFavoritos = document.querySelector('.verFavoritos');
const apiKey = '715d100a';

let inShowFavorite = false;
let auxSearch;
let user = '';
let userKey = '';
const borrarPeliculas = () => {
    const arrayPelis = document.querySelectorAll('.pelicula');
    const tam = arrayPelis.length;
    if(tam > 0)
        for(let i = 0; i< tam ; i++) resultado.removeChild(arrayPelis[i]);
    
        return 0;
}

const MostrarFavoritos = () => {
    borrarPeliculas();
    inShowFavorite = true;
    for(let key in user.favoritos) agregarPelicula(key, user.favoritos);

}

const verMas = (e) => {
    black.style.opacity = '1';
    black.style.zIndex = '300';
    const key = e.path[1].id;
    const detallesPelicula = inShowFavorite ? user.favoritos[key] : auxSearch[key];

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

const addFavorite = (e) => {
    const btnFavorito = e.path[1];
    console.log(e.path[3]);
    const keyMovie = e.path[3].id;
    const pelicula = inShowFavorite ? user.favoritos[keyMovie] : auxSearch[keyMovie];
    

    console.log(pelicula);
    if(btnFavorito.title === 'add to favorites'){
        btnFavorito.style.backgroundColor = 'yellow';
        btnFavorito.setAttribute('title', 'remove from favorites');
        user.favoritos[pelicula.imdbID] = pelicula;  
    }else{
        btnFavorito.style.backgroundColor = 'white';
        btnFavorito.setAttribute('title', 'add to favorites');
        if(inShowFavorite) resultado.removeChild((e.path[3]));
        delete user.favoritos[pelicula.imdbID]; 
    }

    localStorage.setItem(userKey, JSON.stringify(user));
    sessionStorage.setItem(userKey, JSON.stringify(user));
}

const esconderVerMas = () => {
    black.style.opacity = '0';
    black.style.zIndex = '0';
    contDetalles.removeChild(document.querySelector('.poster-verMas'));
    contDetalles.removeChild(document.querySelector('.cont-datos'));
}

const buscarPeli = (pelicula) => {
    for(let key in user.favoritos){
        if(pelicula.Title === user.favoritos[key].Title)
            return true; 
    }
    return false;
}

const agregarPelicula = (key, listPelis) => {
    const newMovie = document.createElement('div');
    newMovie.setAttribute('class', 'pelicula');
    newMovie.setAttribute('id', key);

    
    const imagen = document.createElement('img');
    const { Poster } = listPelis[key];
    imagen.setAttribute('src', Poster );
    imagen.setAttribute('alt', key);
    const verDetalles = document.createElement('a');
    verDetalles.innerHTML = 'Ver detalles';
    verDetalles.setAttribute('class', 'btnDetalles');
    verDetalles.onclick = verMas;
    const contFavorito = document.createElement('div');
    contFavorito.setAttribute('class', 'cont-Favorito');
    
    const btnFavorito = document.createElement('div');
    btnFavorito.setAttribute('class', 'btn-favorito');
    btnFavorito.setAttribute('title', 'add to favorites')
    btnFavorito.onclick = addFavorite;
    
    
    const imgEstrella = document.createElement('img');
    imgEstrella.setAttribute('src', './images/estrella.png');
    
    btnFavorito.appendChild(imgEstrella);
    
    if(buscarPeli(listPelis[key])){
        btnFavorito.style.backgroundColor = 'yellow';
        btnFavorito.setAttribute('title', 'remove from favorites');
    } else {
        btnFavorito.style.backgroundColor = 'white';
        btnFavorito.setAttribute('title', 'add to favorites');
    }
    contFavorito.appendChild(btnFavorito);

    newMovie.appendChild(verDetalles); 
    newMovie.appendChild(imagen);
    newMovie.appendChild(contFavorito);
    resultado.appendChild(newMovie);
}

const apiRequest = () =>{

    borrarPeliculas();
    inShowFavorite = false;
    fetch(`https://www.omdbapi.com/?s=${peliculaABuscar.value}&apikey=${apiKey}`)
        .then((resp) => {
            return resp.json();
        }) 
        .then(({ Search }) => {
            auxSearch = Search;
            for(let key in Search ) agregarPelicula(key, Search);
            
        });
}



const getUsuario = () => {
     for(let key in sessionStorage)
         if(key.slice(0,-1) === 'user'){
             userKey = key;
             return JSON.parse(sessionStorage.getItem(key));
         }
}

if(sessionStorage.length > 0) {
    
   user = getUsuario();
   titulo.innerHTML += user.nombre + "!";

} 


 
boton.onclick = apiRequest;
btnSalir.onclick = esconderVerMas;
verFavoritos.onclick = MostrarFavoritos ;
