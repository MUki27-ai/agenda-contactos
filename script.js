// Agenda de contactos
// Cada contacto tiene: id, nombre, telefono y correo

let contactos = [
  { id: 1, nombre: "Ana Quispe", telefono: "984 123 456", correo: "ana.quispe@correo.com" },
  { id: 2, nombre: "Luis Mamani", telefono: "951 654 321", correo: "luis.mamani@correo.com" },
];

// Referencias a elementos del DOM
const lista = document.getElementById("listaContactos");
const vacio = document.getElementById("vacio");
const contador = document.getElementById("contador");

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
  tarjeta.append(avatar, datos);
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

mostrarContactos();
