
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

        const user_string = JSON.stringify(obj_usuario);

        if(!existeUsuario(user_string)){

            const keyUser = `user${cantUsers}`;
            localStorage.setItem(keyUser , user_string);
            sessionStorage.setItem(keyUser , user_string); 
        }
         
    }
}


const existeUsuario = (user_string) => {

    for(let key in localStorage)
        if(localStorage[key] === user_string) 
            return true;
    
    return false;

}

const cleanStorage = () => {

    for(let key in localStorage)
        localStorage.removeItem(key);
}

boton.onclick = getData;