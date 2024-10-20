// Verificar si la cookie se creó correctamente
function checkCookie() {
    const cookies = document.cookie.split(';');
    const cookieExists = cookies.some(cookie => cookie.trim().startsWith('correo='));

    if (cookieExists) {
        console.log('La cookie "correo" se ha creado correctamente.');
    } else {
        console.log('La cookie "correo" no se ha creado.');
    }
}

// Llamar a esta función después de iniciar sesión
checkCookie();
