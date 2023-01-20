//----- Local Storage
var contenido;
var contenidoCompleto;
let objetoGaleria = [];

//----- Variables HTML
const html = document.querySelector("html"), 
colorPrincipal = getComputedStyle(html).getPropertyValue("--color-principal")

//----- Variables fotos galeria

//Elementos del dom
const imagen = document.querySelector(".imagen"),
  boton = document.querySelector(".boton-imagen"),
  cajitaSeleccionarImagen = document.querySelector(".cajita-seleccionar-imagen"),
  contenedorGaleriaFotos = document.querySelector(".container-section-secundaria");

const cajaFotosGaleria = document.querySelectorAll(".caja-fotos-galeria"),
  cajitaIconEliminar = document.querySelector(".cajita-icon-eliminar");

let inputTituloGaleria = document.querySelector(".titulo-imagen");

//Template
const templateGaleriaFotos = document.getElementById("template-fotos-galeria").content,
  fragmento = document.createDocumentFragment();

cajitaSeleccionarImagen.addEventListener("click", ()=> {
  imagen.click();
})

imagen.addEventListener("change", () => {
  cajitaSeleccionarImagen.style.setProperty("border-color", colorPrincipal);
  cajitaSeleccionarImagen.style.setProperty("color", colorPrincipal);
})

boton.addEventListener("click", () => {
  //logica al seleccionar la imagen
  //console.log(imagen.files);
  var file = imagen.files;
  var supportedImages = ["image/jpeg", "image/png", "image/gif"];

  const reader = new FileReader();

  if(supportedImages.indexOf(file[0].type) != -1) {
    createPreview(file[0]);
    reader.readAsDataURL(file[0]);
  }

  else {
    alert("Archivo no válido")
  }

  reader.addEventListener("load", () => {
    objetoGaleria.push({url: reader.result, titulo: inputTituloGaleria.value});

    localStorage.setItem("contenido", JSON.stringify(objetoGaleria));
    contenido = localStorage.getItem("contenido");
  });

  //estilos
  cajitaSeleccionarImagen.style.setProperty("border-color", "black");
  cajitaSeleccionarImagen.style.setProperty("color", "black");
});

contenedorGaleriaFotos.addEventListener("click", (e) => {
  let padre = e.target.offsetParent;

  if(e.target && e.target.tagName === "IMG") {
    e.target.classList.toggle("efecto");
    padre.querySelector(".cajita-icon-eliminar").classList.toggle("desaparecer");
    padre.querySelector(".cajita-informacion-galeria").classList.toggle("desaparecer");
  }

  if(e.target && e.target.className === "icon-eliminar fa-solid fa-x") {
    eliminarFotos(padre.offsetParent);
  }

  // console.log(e)
  // console.log(padre.className)
  //eliminarFotos(e.target.offsetParent);
});

window.addEventListener("DOMContentLoaded", ()=> {
  if(localStorage.getItem("contenido")) {
    objetoGaleria = JSON.parse(localStorage.getItem("contenido"));
  };
});

//----- Funciones
function createPreview(file) {
  var imgCodified = URL.createObjectURL(file);
  templateGaleriaFotos.querySelector("img").setAttribute("src", imgCodified);
  templateGaleriaFotos.querySelector(".titulo-informacion-galeria").textContent = inputTituloGaleria.value;

  let clone = document.importNode(templateGaleriaFotos, true);
  fragmento.appendChild(clone);
  contenedorGaleriaFotos.appendChild(fragmento);
};


function eliminarFotos(objeto) {
  let hijos = contenedorGaleriaFotos.children;
  let newHIjos = Array.from(hijos);
  let indexhijo = newHIjos.indexOf(objeto);

  contenedorGaleriaFotos.removeChild(objeto);
  objetoGaleria.splice(indexhijo, 1);

  localStorage.setItem("contenido", JSON.stringify(objetoGaleria));
    contenido = localStorage.getItem("contenido");
};