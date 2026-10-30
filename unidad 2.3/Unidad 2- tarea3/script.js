// Referencias a los componentes base
const menuLateral = document.getElementById('menu-lateral');
const btnToggleMenu = document.getElementById('btn-toggle-menu');
const btnInicio = document.getElementById('btn-inicio');
const btnFormulario = document.getElementById('btn-formulario');
const areaCentral = document.getElementById('area-central');

// Array global donde residen los registros (CRUD)
let listaUsuarios = [];

// 1. Mostrar u ocultar el menú lateral
btnToggleMenu.addEventListener('click', () => {
    menuLateral.classList.toggle('oculto');
});

// ===================================================
// VISTA: INICIO (Construcción dinámica)
// ===================================================
function cargarVistaInicio() {
    btnInicio.classList.add('activo');
    btnFormulario.classList.remove('activo');
    areaCentral.innerHTML = '';

    // Botón Saludar
    const btnSaludar = document.createElement('button');
    btnSaludar.textContent = 'Saludar';
    btnSaludar.className = 'btn-saludar';

    btnSaludar.addEventListener('click', () => {
        // Remover banner previo si existe
        const bannerExistente = document.querySelector('.banner-bienvenida');
        if (bannerExistente) bannerExistente.remove();

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

// ===================================================
// VISTA: FORMULARIO + GRID (CRUD dinámico)
// ===================================================
function cargarVistaFormulario() {
    btnFormulario.classList.add('activo');
    btnInicio.classList.remove('activo');
    areaCentral.innerHTML = '';

    const contenedorPanel = document.createElement('div');
    contenedorPanel.className = 'contenedor-panel';

    // ---------------------------------------------------
    // A. Formulario dinámico
    // ---------------------------------------------------
    const cajaForm = document.createElement('div');
    cajaForm.className = 'caja-borde';

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

    contenedorBtn.appendChild(btnGuardar);

    cajaForm.appendChild(filaDoble);
    cajaForm.appendChild(inputCorreo);
    cajaForm.appendChild(contenedorBtn);

    // ---------------------------------------------------
    // B. Tabla / Grid dinámico
    // ---------------------------------------------------
    const cajaTabla = document.createElement('div');
    cajaTabla.className = 'caja-borde';

    const tabla = document.createElement('table');
    tabla.className = 'tabla-grid';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Opciones</th>
        </tr>
    `;
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');
    tabla.appendChild(tbody);
    cajaTabla.appendChild(tabla);

    // ---------------------------------------------------
    // C. Renderizado del Array en el Grid
    // ---------------------------------------------------
    function actualizarGrid() {
        tbody.innerHTML = '';

        if (listaUsuarios.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = `<td colspan="4" class="mensaje-vacio">No hay registros guardados.</td>`;
            tbody.appendChild(filaVacia);
            return;
        }

        listaUsuarios.forEach((usuario, indice) => {
            const tr = document.createElement('tr');

            const tdNombre = document.createElement('td');
            tdNombre.textContent = usuario.nombre;

            const tdApellido = document.createElement('td');
            tdApellido.textContent = usuario.apellido;

            const tdCorreo = document.createElement('td');
            tdCorreo.textContent = usuario.correo;

            const tdOpciones = document.createElement('td');
            const btnBorrar = document.createElement('button');
            btnBorrar.className = 'btn-borrar';
            btnBorrar.innerHTML = '&#10006;'; // Símbolo 'X'
            btnBorrar.title = 'Eliminar registro';

            // Eliminar del Array mediante su índice
            btnBorrar.addEventListener('click', () => {
                listaUsuarios.splice(indice, 1);
                actualizarGrid();
            });

            tdOpciones.appendChild(btnBorrar);

            tr.appendChild(tdNombre);
            tr.appendChild(tdApellido);
            tr.appendChild(tdCorreo);
            tr.appendChild(tdOpciones);

            tbody.appendChild(tr);
        });
    }

    // ---------------------------------------------------
    // D. Evento Guardar datos en el Array
    // ---------------------------------------------------
    btnGuardar.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const correo = inputCorreo.value.trim();

        if (nombre === '' || apellido === '' || correo === '') {
            alert('Por favor, llena todos los campos antes de guardar.');
            return;
        }

        // Agregar al array
        listaUsuarios.push({
            nombre: nombre,
            apellido: apellido,
            correo: correo
        });

        // Limpiar inputs
        inputNombre.value = '';
        inputApellido.value = '';
        inputCorreo.value = '';

        // Refrescar tabla
        actualizarGrid();
    });

    // Cargar los registros existentes
    actualizarGrid();

    // Agregar formulario y tabla al área central
    contenedorPanel.appendChild(cajaForm);
    contenedorPanel.appendChild(cajaTabla);
    areaCentral.appendChild(contenedorPanel);
}

// Eventos de selección del menú lateral
btnInicio.addEventListener('click', cargarVistaInicio);
btnFormulario.addEventListener('click', cargarVistaFormulario);

// Iniciar por defecto en Inicio
cargarVistaInicio();