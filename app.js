// --- VARIABLES GLOBALES DEL SISTEMA ---
let listaHabitos = [];
const maxHabitos = 10;
let correoUsuarioActivo = "";

// Función para alternar las vistas
function cambiarPantalla(idPantalla) {
    document.getElementById("pantallaRegistro").style.display = "none";
    document.getElementById("pantallaLogin").style.display = "none";
    document.getElementById("pantallaHabitos").style.display = "none";
    
    document.getElementById(idPantalla).style.display = "block";
}

// --- LÓGICA DE REGISTRO ---
function procesarRegistro(event) {
    event.preventDefault(); // Evita recargas inesperadas de página

    const nombre = document.getElementById("regNombre").value.trim();
    const correo = document.getElementById("regCorreo").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const txtError = document.getElementById("errorRegistro");

    txtError.style.display = "none";

    if (nombre === "" || correo === "" || password === "") {
        txtError.innerText = "Por favor, completa todos los campos.";
        txtError.style.display = "block";
        return;
    }

    // Validación estricta con Expresión Regular para el Correo Electrónico
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(correo)) {
        txtError.innerText = "Estructura de correo no válida (ejemplo@dominio.com).";
        txtError.style.display = "block";
        return;
    }

    if (password.length < 6) {
        txtError.innerText = "La contraseña debe tener al menos 6 caracteres.";
        txtError.style.display = "block";
        return;
    }

    // Verificar disponibilidad de llave única en LocalStorage
    if (localStorage.getItem(correo)) {
        txtError.innerText = "Este correo electrónico ya está registrado.";
        txtError.style.display = "block";
        return;
    }

    // Estructurar objeto de usuario
    const nuevoUsuario = {
        nombrePerfil: nombre,
        passwordPerfil: password,
        habitosData: [] // Inicializa con su propio espacio asignado
    };

    localStorage.setItem(correo, JSON.stringify(nuevoUsuario));

    // Resetear formulario físico
    document.getElementById("formRegistro").reset();
    
    alert("¡Cuenta creada correctamente! Procede a iniciar sesión.");
    cambiarPantalla("pantallaLogin");
}

// --- LÓGICA DE INICIO DE SESIÓN ---
function procesarLogin(event) {
    event.preventDefault(); // Detiene recarga automática del formulario

    const correo = document.getElementById("logCorreo").value.trim().toLowerCase();
    const password = document.getElementById("logPassword").value;
    const txtError = document.getElementById("errorLogin");

    txtError.style.display = "none";

    const usuarioJSON = localStorage.getItem(correo);

    if (!usuarioJSON) {
        txtError.innerText = "El correo ingresado no coincide con ninguna cuenta.";
        txtError.style.display = "block";
        return;
    }

    const usuarioObjeto = JSON.parse(usuarioJSON);

    if (usuarioObjeto.passwordPerfil !== password) {
        txtError.innerText = "Contraseña incorrecta.";
        txtError.style.display = "block";
        return;
    }

    // Iniciar sesión activa asociando variables en memoria
    correoUsuarioActivo = correo;
    listaHabitos = usuarioObjeto.habitosData;

    document.getElementById("txtBienvenida").innerText = `Panel de: ${usuarioObjeto.nombrePerfil}`;
    document.getElementById("formLogin").reset();

    cambiarPantalla("pantallaHabitos");
    actualizarInterfaz();
}

// --- LÓGICA OPERACIONAL DE HÁBITOS ---
function registrarHabito() {
    const input = document.getElementById("inputHabito");
    const txtError = document.getElementById("errorHabito");
    const nombreValido = input.value.trim();

    txtError.style.display = "none";

    if (nombreValido === "") {
        txtError.innerText = "La descripción no puede estar vacía.";
        txtError.style.display = "block";
        return;
    }

    if (listaHabitos.length >= maxHabitos) {
        txtError.innerText = `Límite alcanzado. Máximo ${maxHabitos} hábitos por cuenta.`;
        txtError.style.display = "block";
        return;
    }

    listaHabitos.push({
        nombre: nombreValido,
        completadoHoy: false,
        rachaDias: 0
    });

    input.value = "";
    guardarEnBaseDeDatos();
    actualizarInterfaz();
}

function marcarComoCompletado(indice) {
    if (!listaHabitos[indice].completadoHoy) {
        listaHabitos[indice].completadoHoy = true;
        listaHabitos[indice].rachaDias++;
        guardarEnBaseDeDatos();
        actualizarInterfaz();
    }
}

// Persistencia: guarda los cambios únicamente dentro del casillero del usuario activo
function guardarEnBaseDeDatos() {
    const usuarioJSON = localStorage.getItem(correoUsuarioActivo);
    if (usuarioJSON) {
        const usuarioObjeto = JSON.parse(usuarioJSON);
        usuarioObjeto.habitosData = listaHabitos; 
        localStorage.setItem(correoUsuarioActivo, JSON.stringify(usuarioObjeto));
    }
}

function actualizarInterfaz() {
    const contenedor = document.getElementById("contenedorLista");
    const contadorLabel = document.getElementById("contadorTitulo");
    
    contadorLabel.innerText = `Mis Hábitos (${listaHabitos.length} / ${maxHabitos})`;
    contenedor.innerHTML = "";

    if (listaHabitos.length === 0) {
        contenedor.innerHTML = `<p style="color: #9ca3af; text-align: center; font-size: 13px;">No hay hábitos registrados en esta cuenta.</p>`;
        return;
    }

    listaHabitos.forEach((habito, indice) => {
        const item = document.createElement("div");
        item.className = "item-habito";

        const claseNombre = habito.completadoHoy ? "nombre-completado" : "nombre-pendiente";
        const accionHtml = habito.completadoHoy 
            ? `<span class="badge-hecho">✓ Hecho</span>` 
            : `<button class="btn-completar" onclick="marcarComoCompletado(${indice})">Completar</button>`;

        item.innerHTML = `
            <div>
                <span class="${claseNombre}">${habito.nombre}</span>
                <div class="badge-racha">🔥 Racha: ${habito.rachaDias} días</div>
            </div>
            ${accionHtml}
        `;
        contenedor.appendChild(item);
    });
}

function cerrarSesion() {
    correoUsuarioActivo = "";
    listaHabitos = [];
    cambiarPantalla("pantallaLogin");
}