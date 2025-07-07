const ingresoTarea = document.querySelector("#ingresoTarea");
const bttnAgregar = document.querySelector("#agregar");
const listado = document.querySelector("#cuerpoTabla");
const tareasTotales = document.querySelector("#tareasTotales");
const tareasPendientes = document.querySelector("#tareasPendientes");

let listadoTareas = [];

bttnAgregar.addEventListener("click", () => {
  if (ingresoTarea.value) {
    const nuevaTarea = {
      id: Date.now(),
      tarea: ingresoTarea.value,
      estado: false
    };
    listadoTareas.push(nuevaTarea);
    ingresoTarea.value = "";
    renderizarTareas();
  } else {
    alert("Ingrese una tarea válida");
  }
});

function renderizarTareas() {
  listado.innerHTML = "";
  
  listadoTareas.forEach((tarea) => {
    listado.innerHTML += `
      <tr>
        <td>${tarea.id}</td>
        <td>${tarea.tarea}</td>
        <td>${tarea.estado ? "Completada" : "Pendiente"}</td>
        <td>
          <button class="bttnEliminar" data-id="${tarea.id}">Eliminar</button>
          ${!tarea.estado ? `<button class="bttnCompletar" data-id="${tarea.id}">Completar</button>` : ""}
        </td>
      </tr>`;
  });

  actualizarContadores();

  const bttnEliminar = document.querySelectorAll(".bttnEliminar");
  bttnEliminar.forEach((bttn) => {
    bttn.addEventListener("click", () => {
      const id = bttn.getAttribute("data-id");
      listadoTareas = listadoTareas.filter((tarea) => tarea.id != id);
      renderizarTareas();
    });
  });

  const bttnCompletar = document.querySelectorAll(".bttnCompletar");
  bttnCompletar.forEach((bttn) => {
    bttn.addEventListener("click", () => {
      const id = bttn.getAttribute("data-id");
      listadoTareas = listadoTareas.map((tarea) => {
        if (tarea.id == id) {
          return { ...tarea, estado: true };
        }
        return tarea;
      });
      renderizarTareas();
    });
  });
}

function actualizarContadores() {
  const total = listadoTareas.length;
  const pendientes = listadoTareas.filter((tarea) => !tarea.estado).length;
  tareasTotales.innerHTML = `Total de tareas: ${total}`;
  tareasPendientes.innerHTML = `Tareas pendientes: ${pendientes}`;
}
