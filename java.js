import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlkc2jKHaOWrcFM5XB-IfNXEyFkMAcvXQ",
    authDomain: "myproyect-9d3bf.firebaseapp.com",
    projectId: "myproyect-9d3bf",
    storageBucket: "myproyect-9d3bf.firebasestorage.app",
    messagingSenderId: "680695552001",
    appId: "1:680695552001:web:f7c5a96796bd8de60dc800"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authBtn = document.getElementById("authBtn");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");
const recipeSection = document.getElementById("recipeSection");
const formContainer = document.getElementById("formContainer");

// Función para comprobar el estado de autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está autenticado
        formContainer.style.display = "none"; // Ocultar el formulario
        recipeSection.style.display = "block"; // Mostrar la receta
    } else {
        // Si el usuario no está autenticado
        formContainer.style.display = "block"; // Mostrar el formulario
        recipeSection.style.display = "none"; // Ocultar la receta
    }
});

let isRegistering = true; // Controla si estamos en el modo de registro o inicio de sesión

// Función para crear cuenta o iniciar sesión
const authenticateUser = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        if (isRegistering) {
            // Crear cuenta
            await createUserWithEmailAndPassword(auth, email, password);
            message.textContent = "Cuenta creada exitosamente. ¡Bienvenido!";
            message.style.color = "green";
        } else {
            // Iniciar sesión
            await signInWithEmailAndPassword(auth, email, password);
            message.textContent = "Inicio de sesión exitoso. ¡Bienvenido!";
            message.style.color = "green";
        }
        // Ocultar el formulario y mostrar la receta
        formContainer.style.display = "none";
        recipeSection.style.display = "block";
    } catch (error) {
        // Mensajes personalizados y amigables
        if (error.code === 'auth/user-not-found') {
            message.textContent = "No se ha encontrado una cuenta con este correo. Si no tienes cuenta, ¡regístrate ahora!";
            message.style.color = "red";
        } else if (error.code === 'auth/wrong-password') {
            message.textContent = "La contraseña ingresada es incorrecta. ¿Olvidaste tu contraseña? ¡Recupérala aquí!";
            message.style.color = "red";
        } else {
            message.textContent = "Oops, algo salió mal, no encontramos una cuenta registrada.";
            message.style.color = "black";
        }
    }
};

// Cambiar entre formulario de registro e inicio de sesión
toggleForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (isRegistering) {
        formTitle.textContent = "Iniciar Sesión";
        authBtn.textContent = "Iniciar Sesión";
        toggleForm.textContent = "¿No tienes cuenta? Crear una cuenta";
        isRegistering = false;
    } else {
        formTitle.textContent = "Crear Cuenta";
        authBtn.textContent = "Crear Cuenta";
        toggleForm.textContent = "¿Ya tienes cuenta? Iniciar sesión";
        isRegistering = true;
    }
    message.textContent = "";
});

// Evento del botón para crear cuenta o iniciar sesión
authBtn.addEventListener("click", authenticateUser);