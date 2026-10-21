const menuLateral = document.getElementById('menu-lateral');
const btnToggleMenu = document.getElementById('btn-toggle-menu');
const btnInicio = document.getElementById('btn-inicio');
const btnFormulario = document.getElementById('btn-formulario');
const areaCentral = document.getElementById('area-central');

// 1. Ocultar / Mostrar menú lateral
btnToggleMenu.addEventListener('click', () => {
    menuLateral.classList.toggle('oculto');
});

// 2. Vista Inicio: Botón Saludar y Banner
function cargarVistaInicio() {
    btnInicio.classList.add('activo');
    btnFormulario.classList.remove('activo');
    areaCentral.innerHTML = '';

    const btnSaludar = document.createElement('button');
    btnSaludar.textContent = 'Saludar';
    btnSaludar.className = 'btn-saludar';

    btnSaludar.addEventListener('click', () => {
        const bannerExistente = document.querySelector('.banner-bienvenida');
        if (bannerExistente) {
            bannerExistente.remove();
        }

        const banner = document.createElement('div');
        banner.className = 'banner-bienvenida';

        const texto = document.createElement('span');
        texto.textContent = 'Bienvenido al mundo web';

        const btnCerrar = document.createElement('button');
        btnCerrar.innerHTML = '&times;';
        btnCerrar.className = 'btn-cerrar';
        btnCerrar.title = 'Cerrar mensaje';

        btnCerrar.addEventListener('click', () => {
            banner.remove();
        });

        banner.appendChild(texto);
        banner.appendChild(btnCerrar);
        areaCentral.appendChild(banner);
    });

    areaCentral.appendChild(btnSaludar);
}

// 3. Vista Formulario: Creación dinámica del formulario
function cargarVistaFormulario() {
    btnFormulario.classList.add('activo');
    btnInicio.classList.remove('activo');
    areaCentral.innerHTML = '';

    const cajaForm = document.createElement('div');
    cajaForm.className = 'caja-formulario';

    const filaDoble = document.createElement('div');
    filaDoble.className = 'fila-doble';

    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.placeholder = 'Nombre';
    inputNombre.className = 'campo-input';

    const inputApellido = document.createElement('input');
    inputApellido.type = 'text';
    inputApellido.placeholder = 'Apellido';
    inputApellido.className = 'campo-input';

    filaDoble.appendChild(inputNombre);
    filaDoble.appendChild(inputApellido);

    const inputCorreo = document.createElement('input');
    inputCorreo.type = 'email';
    inputCorreo.placeholder = 'Correo';
    inputCorreo.className = 'campo-input';

    const contenedorBtn = document.createElement('div');
    contenedorBtn.className = 'contenedor-btn-guardar';

    const btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.className = 'btn-guardar';

    btnGuardar.addEventListener('click', () => {
        alert('¡Datos guardados con éxito!');
    });

    contenedorBtn.appendChild(btnGuardar);

    cajaForm.appendChild(filaDoble);
    cajaForm.appendChild(inputCorreo);
    cajaForm.appendChild(contenedorBtn);

    areaCentral.appendChild(cajaForm);
}

// Escuchadores de eventos
btnInicio.addEventListener('click', cargarVistaInicio);
btnFormulario.addEventListener('click', cargarVistaFormulario);

// Iniciar con la vista Inicio cargada
cargarVistaInicio();