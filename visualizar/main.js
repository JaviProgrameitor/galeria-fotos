contenedorGaleriaFotos = document.querySelector(".container-section-secundaria");

//Template
const templateGaleriaFotos = document.getElementById("template-fotos-galeria").content,
  fragmento = document.createDocumentFragment();

window.addEventListener("DOMContentLoaded", ()=> {
  if(localStorage.getItem("contenido")) {
    let fotos =  JSON.parse(localStorage.getItem("contenido"));

    fotos.forEach(fot => {
      templateGaleriaFotos.querySelector("img").setAttribute("src", fot.url);
      templateGaleriaFotos.querySelector(".titulo-informacion-galeria").textContent = fot.titulo;

      let clone = document.importNode(templateGaleriaFotos, true);
      fragmento.appendChild(clone);
      contenedorGaleriaFotos.appendChild(fragmento);
    });

    objetoGaleria = JSON.parse(localStorage.getItem("contenido"));
  }
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

function eliminarFotos(objeto) {
  let hijos = contenedorGaleriaFotos.children;
  let newHIjos = Array.from(hijos);
  let indexhijo = newHIjos.indexOf(objeto);

  contenedorGaleriaFotos.removeChild(objeto);
  objetoGaleria.splice(indexhijo, 1);

  localStorage.setItem("contenido", JSON.stringify(objetoGaleria));
    contenido = localStorage.getItem("contenido");
};