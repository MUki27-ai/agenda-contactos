// Agenda de contactos
// Cada contacto tiene: id, nombre, telefono y correo

let contactos = [
  { id: 1, nombre: "Ana Quispe", telefono: "984 123 456", correo: "ana.quispe@correo.com" },
  { id: 2, nombre: "Luis Mamani", telefono: "951 654 321", correo: "luis.mamani@correo.com" },
];

// Id del contacto que se está mostrando en el detalle (null si ninguno)
let contactoVisible = null;

// Referencias a elementos del DOM
const lista = document.getElementById("listaContactos");
const vacio = document.getElementById("vacio");
const contador = document.getElementById("contador");
const detalle = document.getElementById("detalle");
const formulario = document.getElementById("formContacto");
const campoNombre = document.getElementById("nombre");
const campoTelefono = document.getElementById("telefono");
const campoCorreo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

// Obtiene las iniciales de un nombre: "Ana Quispe" -> "AQ"
function obtenerIniciales(nombre) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(function (parte) {
      return parte[0].toUpperCase();
    })
    .join("");
}

// Expresiones regulares para validar los datos
const PATRON_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,50}$/;
const PATRON_TELEFONO = /^[0-9+\s-]{6,15}$/;
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Devuelve un texto de error, o "" si los datos son correctos
function validarContacto(nombre, telefono, correo) {
  if (nombre === "" || telefono === "" || correo === "") {
    return "Completa nombre, teléfono y correo.";
  }
  if (!PATRON_NOMBRE.test(nombre)) {
    return "El nombre solo puede tener letras y espacios (mínimo 2).";
  }
  if (!PATRON_TELEFONO.test(telefono)) {
    return "El teléfono solo puede tener números, espacios, + o - (6 a 15 caracteres).";
  }
  if (!PATRON_CORREO.test(correo)) {
    return "El correo no es válido. Ejemplo: ana@correo.com";
  }
  const repetido = contactos.some(function (c) {
    return c.correo.toLowerCase() === correo.toLowerCase();
  });
  if (repetido) {
    return "Ya existe un contacto con ese correo.";
  }
  return "";
}

// Muestra un mensaje de confirmación ("ok") o de validación ("error")
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

// Crea un botón con texto, clase y acción al hacer clic
function crearBoton(texto, clase, accion) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = clase;
  boton.textContent = texto;
  boton.addEventListener("click", accion);
  return boton;
}

// Crea la tarjeta (li) de un contacto
function crearTarjeta(contacto) {
  const tarjeta = document.createElement("li");
  tarjeta.className = "tarjeta";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = obtenerIniciales(contacto.nombre);

  const datos = document.createElement("div");
  datos.className = "datos";

  const nombre = document.createElement("strong");
  nombre.textContent = contacto.nombre;

  const telefono = document.createElement("span");
  telefono.textContent = contacto.telefono;

  datos.append(nombre, telefono);

  const acciones = document.createElement("div");
  acciones.className = "acciones";
  acciones.append(
    crearBoton("Ver", "secundario", function () {
      verDetalle(contacto.id);
    })
  );

  tarjeta.append(avatar, datos, acciones);
  return tarjeta;
}

// Dibuja la lista completa de contactos en pantalla
function mostrarContactos() {
  lista.innerHTML = "";

  contactos.forEach(function (contacto) {
    lista.appendChild(crearTarjeta(contacto));
  });

  vacio.hidden = contactos.length > 0;
  contador.textContent = contactos.length === 1 ? "1 contacto" : contactos.length + " contactos";
}

// Muestra toda la información de un contacto
function verDetalle(id) {
  const contacto = contactos.find(function (c) {
    return c.id === id;
  });
  if (!contacto) return;

  document.getElementById("detalleNombre").textContent = contacto.nombre;
  document.getElementById("detalleTelefono").textContent = contacto.telefono;
  document.getElementById("detalleCorreo").textContent = contacto.correo;

  contactoVisible = id;
  detalle.hidden = false;
}

function cerrarDetalle() {
  contactoVisible = null;
  detalle.hidden = true;
}

document.getElementById("cerrarDetalle").addEventListener("click", cerrarDetalle);

// Registrar un nuevo contacto al enviar el formulario
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue

  const nombre = campoNombre.value.trim();
  const telefono = campoTelefono.value.trim();
  const correo = campoCorreo.value.trim();

  const error = validarContacto(nombre, telefono, correo);
  if (error !== "") {
    mostrarMensaje(error, "error");
    return;
  }

  contactos.push({ id: Date.now(), nombre: nombre, telefono: telefono, correo: correo });
  mostrarContactos();

  formulario.reset();
  campoNombre.focus();
  mostrarMensaje("Contacto guardado: " + nombre + ".", "ok");
});

// Al volver a escribir, se borra el mensaje de error anterior
formulario.addEventListener("input", function () {
  if (mensaje.classList.contains("error")) {
    mostrarMensaje("", "");
  }
});

mostrarContactos();
