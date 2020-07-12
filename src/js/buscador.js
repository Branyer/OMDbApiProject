const titulo = document.getElementById('titulo');
/** BOTONES **/
const btnBuscar = document.getElementById('buscar');
const btnSalir = document.querySelector('.boton-salir');
const btnShowFavoritos = document.querySelector('.verFavoritos');

/**INPUT **/
const peliculaABuscar = document.getElementById('buscador'); 

/**Contenedores **/
const ctnResultado = document.querySelector('.peliculas');
const ctnDetalles = document.querySelector('.cont-detalles');
const fondoVerDetalles = document.querySelector('.fondo-opaco');

const API_KEY = '715d100a';

let inShowFavorite = false;
let resultadoBusqueda = '';
let objUser = ''; 
let userKey = '';

const getUsuario = () => {
     for(let key in sessionStorage)
         if(key.slice(0,-1) === 'user'){
             userKey = key;
             return JSON.parse(sessionStorage.getItem(key));
         }
}

objUser = getUsuario();

if(sessionStorage.getItem(userKey) ) { //Si no hay nada en la sesión regresa a index.html
    
   titulo.innerHTML += objUser.nombre + "!";
   
} else  window.location.replace( 'index.html');  


const apiRequest = () =>{

    borrarPeliculas();
    inShowFavorite = false;

    fetch(`https://www.omdbapi.com/?s=${peliculaABuscar.value}&apikey=${API_KEY}`)
        .then((resp) => resp.json()) 
        .then(({ Search }) => {
            resultadoBusqueda = Search; //asigno las peliculas buscadas a una variable global
            for(let key in Search ) 
                agregarPelicula(key, Search);
        });
}


const borrarPeliculas = () => {
    const arrayPelis = document.querySelectorAll('.pelicula');
    const tam = arrayPelis.length;
    if(tam > 0)
        for(let i = 0; i< tam ; i++) ctnResultado.removeChild(arrayPelis[i]);
    
        return 0;
}

const MostrarFavoritos = () => {
    borrarPeliculas();
    inShowFavorite = true;

    for(let key in objUser.favoritos) 
        agregarPelicula(key, objUser.favoritos);

    }
    
const getPath = (element) => {
    let padre  = '';
    let aux = 0;
    while(!padre.id){
        padre  = element.parentNode;
        element = padre;
        aux++;
        if(aux > 5) break;
    }
    
    return padre;
}

const verMas = (e) => {
    fondoVerDetalles.style.opacity = '1';
    fondoVerDetalles.style.zIndex = '300';

    const key = getPath(e.target).id;
    const detallesPelicula = inShowFavorite ? objUser.favoritos[key] : resultadoBusqueda[key];

    const { Title, Year, imdbID, Poster} = detallesPelicula;
    
    const postImg = document.createElement('img');
    postImg.setAttribute('src', Poster);
    postImg.setAttribute('class', 'poster-verMas');
    ctnDetalles.appendChild(postImg);

    const contDatos = document.createElement('div');
    contDatos.setAttribute('class', 'cont-datos')
    ctnDetalles.appendChild(contDatos);

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
   
    const btnFavorito = e.target.parentNode;
    const keyMovie = getPath(e.target).id;
    const pelicula = inShowFavorite ? objUser.favoritos[keyMovie] : resultadoBusqueda[keyMovie];
   
    if(btnFavorito.title === 'add to favorites'){
        btnFavorito.style.backgroundColor = 'yellow';
        btnFavorito.setAttribute('title', 'remove from favorites');

        objUser.favoritos[pelicula.imdbID] = pelicula;  
    }else{
        btnFavorito.style.backgroundColor = 'white';
        btnFavorito.setAttribute('title', 'add to favorites');

        if(inShowFavorite) ctnResultado.removeChild((e.path[3]));
        delete objUser.favoritos[pelicula.imdbID]; 
    }

    localStorage.setItem(userKey, JSON.stringify(objUser));
    sessionStorage.setItem(userKey, JSON.stringify(objUser));
}

const esconderVerMas = () => {
    fondoVerDetalles.style.opacity = '0';
    fondoVerDetalles.style.zIndex = '0';
    ctnDetalles.removeChild(document.querySelector('.poster-verMas'));
    ctnDetalles.removeChild(document.querySelector('.cont-datos'));
}

const buscarPeli = (pelicula) => {
    for(let key in objUser.favoritos){
        if(pelicula.Title === objUser.favoritos[key].Title)
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
    
    if(buscarPeli(listPelis[key])){ //si la pelicula está en favoritos 
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
    ctnResultado.appendChild(newMovie);
}


btnBuscar.addEventListener('click', apiRequest) ;
btnSalir.addEventListener('click', esconderVerMas);
btnShowFavoritos.addEventListener('click', MostrarFavoritos) ;
