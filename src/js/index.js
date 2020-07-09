
const boton = document.getElementById('submit');

const getData = () => {
    const cantUsers = localStorage.length;
    const user = document.getElementById('user').value.toUpperCase();
    const pass = document.getElementById('pass').value;
    console.log("xd");
    if( user && pass ) { //si los valores no estan vacios 
        
        const obj_usuario = {
            'nombre' : user,
            'contrasena' : pass
        }
        console.log("xd");
        if(!existeUsuario(obj_usuario)){
            
            const user_string = JSON.stringify(obj_usuario);
            const keyUser = `user${cantUsers}`;
            localStorage.setItem(keyUser , user_string);
            sessionStorage.setItem(keyUser , user_string); 
        }
         
    }
}


const existeUsuario = (obj_usuario) => {

    for(let key in localStorage){
        
        if(key.slice(0,-1) === 'user'){

            const aux_user = JSON.parse(localStorage[key]);

            if(aux_user.nombre === obj_usuario.nombre && aux_user.contrasena === obj_usuario.contrasena ){
                sessionStorage.setItem(key, localStorage[key]);
                return true;
            }
        }
    }
    
    return false;
}

const cleanStorage = () => {

    for(let key in localStorage)
        localStorage.removeItem(key);
}

boton.onclick = getData;