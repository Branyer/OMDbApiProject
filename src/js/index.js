//PAGINA DE INICIO
const btnSubmit = document.getElementById('submit');

const getData = () => {
    const cantUsers = localStorage.length;
    const user = document.getElementById('user').value.toUpperCase();
    const pass = document.getElementById('pass').value;

    if( user && pass ) { //si los valores no estan vacios 
        
        const objUser = {
            'nombre' : user,
            'contrasena' : pass,
            'favoritos' : {} 
        }

        if(!existeUsuario(objUser)){
            
            const user_string = JSON.stringify(objUser);
            const keyUser = `user${cantUsers}`;
            localStorage.setItem(keyUser , user_string);
            sessionStorage.setItem(keyUser , user_string);
        }
         
    }
}


const existeUsuario = (objUser) => {

    for(let key in localStorage){
        
        if(key.slice(0,-1) === 'user'){

            const aux_user = JSON.parse(localStorage[key]);

            if(aux_user.nombre === objUser.nombre && aux_user.contrasena === objUser.contrasena ){
                sessionStorage.setItem(key, localStorage[key]);
                return true;
            }
        }
    }

    return false;
}

const cleanLocalStorage = () => {

    for(let key in localStorage)
        localStorage.removeItem(key);
}

const cleanSessionStorage = () => {

    for(let key in sessionStorage)
        sessionStorage.removeItem(key);
}

cleanSessionStorage(); 

btnSubmit.addEventListener('click', getData );


