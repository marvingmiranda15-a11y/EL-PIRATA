// Referencias a los elementos base del DOM
const menuLateral = document.getElementById('menu-lateral');
const btnToggleMenu = document.getElementById('btn-toggle-menu');
const btnInicio = document.getElementById('btn-inicio');
const btnFormulario = document.getElementById('btn-formulario');
const areaCentral = document.getElementById('area-central');

// Array principal donde se almacenan los datos de los usuarios
let listaUsuarios = [];

// 1. Alternar (ocultar/mostrar) menú lateral
btnToggleMenu.addEventListener('click', () => {
    menuLateral.classList.toggle('oculto');
});

// ===================================================
// VISTA: INICIO
// ===================================================
function cargarVistaInicio() {
    btnInicio.classList.add('activo');
    btnFormulario.classList.remove('activo');
    areaCentral.innerHTML = '';

    const btnSaludar = document.createElement('button');
    btnSaludar.textContent = 'Saludar';
    btnSaludar.className = 'btn-saludar';

    btnSaludar.addEventListener('click', () => {
        const bannerPrevio = document.querySelector('.banner-bienvenida');
        if (bannerPrevio) bannerPrevio.remove();

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
// VISTA: FORMULARIO Y GRID ADMINISTRATIVO
// ===================================================
function cargarVistaFormulario() {
    btnFormulario.classList.add('activo');
    btnInicio.classList.remove('activo');
    areaCentral.innerHTML = '';

    // Contenedor vertical que agrupa formulario y grid
    const contenedorPanel = document.createElement('div');
    contenedorPanel.className = 'contenedor-panel';

    // ---------------------------------------------------
    // 1. CONSTRUCCIÓN DE LA CAJA DEL FORMULARIO
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
    // 2. CONSTRUCCIÓN DE LA CAJA DEL GRID / TABLA
    // ---------------------------------------------------
    const cajaTabla = document.createElement('div');
    cajaTabla.className = 'caja-borde';

    const tabla = document.createElement('table');
    tabla.className = 'tabla-grid';

    // Cabecera fija de la tabla
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
    // 3. FUNCIÓN PARA PINTAR LAS FILAS DEL ARRAY EN EL GRID
    // ---------------------------------------------------
    function actualizarGrid() {
        tbody.innerHTML = '';

        if (listaUsuarios.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = `<td colspan="4" class="mensaje-vacio">No hay registros guardados.</td>`;
            tbody.appendChild(filaVacia);
            return;
        }

        // Recorrer el array y generar una fila por elemento
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
            btnBorrar.innerHTML = '&#10006;'; // Símbolo de cruz (X)
            btnBorrar.title = 'Eliminar registro';

            // Acción de eliminar usando splice sobre el array
            btnBorrar.addEventListener('click', () => {
                listaUsuarios.splice(indice, 1);
                actualizarGrid(); // Refresca la tabla tras borrar
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
    // 4. ACCIÓN DEL BOTÓN GUARDAR
    // ---------------------------------------------------
    btnGuardar.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();
        const correo = inputCorreo.value.trim();

        if (nombre === '' || apellido === '' || correo === '') {
            alert('Por favor, completa todos los campos antes de guardar.');
            return;
        }

        // Almacenar en el array como objeto
        listaUsuarios.push({
            nombre: nombre,
            apellido: apellido,
            correo: correo
        });

        // Limpiar los inputs
        inputNombre.value = '';
        inputApellido.value = '';
        inputCorreo.value = '';

        // Refrescar la tabla con el nuevo elemento
        actualizarGrid();
    });

    // Cargar los registros que ya existan en memoria
    actualizarGrid();

    // Insertar el formulario y la tabla al área central
    contenedorPanel.appendChild(cajaForm);
    contenedorPanel.appendChild(cajaTabla);
    areaCentral.appendChild(contenedorPanel);
}

// Eventos de navegación
btnInicio.addEventListener('click', cargarVistaInicio);
btnFormulario.addEventListener('click', cargarVistaFormulario);

// Iniciar con la vista Inicio
cargarVistaInicio();