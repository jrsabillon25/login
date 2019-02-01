function validate(e, obj){
    if(e.keyCode === 32){
        e.preventDefault();
    }
}

function validateFields(view){
    var user, password;
    switch(view){
        case 'Login':
            user = document.getElementById("input-user-login");
            password = document.getElementById("input-password-login");

            if(user.value === "" || password.value === ""){
                alert("Ingrese usuario y contraseña.");
                return false;
            }
            break;
        case 'Registro':
            user = document.getElementById("input-user-registro");
            password = document.getElementById("input-password-registro");

            if(user.value === "" || password.value === ""){
                alert("Ingrese usuario y contraseña.");
                return false;
            }else{
                if(password.value.length < 8){
                    alert("Su contraseña es demasiado corta.");
                    return false;
                }
            }
            break;    
    }
}
