"use strict";var auxSearch,titulo=document.getElementById("titulo"),boton=document.getElementById("buscar"),peliculaABuscar=document.getElementById("buscador"),resultado=document.querySelector(".peliculas"),black=document.querySelector(".fondo-opaco"),btnSalir=document.querySelector(".boton-salir"),contDetalles=document.querySelector(".cont-detalles"),apiKey="715d100a",user="",borrarPeliculas=function(){var e=document.querySelectorAll(".pelicula"),t=e.length;if(t>0)for(var r=0;r<t;r++)resultado.removeChild(e[r]);return 0},verMas=function(e){black.style.opacity="1",black.style.zIndex="300";var t=e.path[0].id,r=auxSearch[t],a=r.Title,n=r.Year,c=r.imdbID,o=r.Poster,l=document.createElement("img");l.setAttribute("src",o),l.setAttribute("class","poster-verMas"),contDetalles.appendChild(l);var s=document.createElement("div");s.setAttribute("class","cont-datos"),contDetalles.appendChild(s);var i=document.createElement("h1");i.innerHTML=a,console.log(i),s.appendChild(i);var u=document.createElement("p");u.innerHTML="Year : ".concat(n),s.appendChild(u);var d=document.createElement("p");d.innerHTML="imdbID : ".concat(c),s.appendChild(d)},esconderVerMas=function(){black.style.opacity="0",black.style.zIndex="0",contDetalles.removeChild(document.querySelector(".poster-verMas")),contDetalles.removeChild(document.querySelector(".cont-datos"))},apiRequest=function(){borrarPeliculas(),fetch("http://www.omdbapi.com/?s=".concat(peliculaABuscar.value,"&apikey=").concat(apiKey)).then((function(e){return e.json()})).then((function(e){var t=e.Search;for(var r in auxSearch=t,t){var a=document.createElement("div");a.setAttribute("class","pelicula");var n=document.createElement("img"),c=t[r].Poster;n.setAttribute("src",c),n.setAttribute("alt",r);var o=document.createElement("a");o.innerHTML="Ver detalles",o.setAttribute("class","btnDetalles"),o.setAttribute("id",r),o.onclick=verMas,a.appendChild(o),a.appendChild(n),resultado.appendChild(a)}}))},getUsuario=function(){for(var e in sessionStorage)if("user"===e.slice(0,-1))return JSON.parse(sessionStorage.getItem(e))};2===sessionStorage.length&&(user=getUsuario(),titulo.innerHTML+=user.nombre+"!"),boton.onclick=apiRequest,btnSalir.onclick=esconderVerMas;