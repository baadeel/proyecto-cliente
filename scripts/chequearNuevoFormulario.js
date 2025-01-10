
//Seleccionamos la notificacion
const notificacion = document.getElementById("notificacion");
//Seleccionar el campo enviado, si no hay 0
let check = sessionStorage.getItem("enviado") || 0;

//Guardar la ruta de la lista de citas
let paginaReferida2 = "/paginas/concertarCita.html";

//Guardar la ruta de la página referida(de donde venimos)
let url2 = new URL(document.referrer)


//Si es true mostrar notificación y desaparecer a los 5 seg
if (check == "true"){
notificacion.setAttribute("style", "display: block");
sessionStorage.setItem("enviado", false);
setTimeout(() => {
    notificacion.removeAttribute("style");
}, 5000);
console.log(url2.pathname );
if (url2.pathname == paginaReferida2){
    let urlActual2 = new URL(window.location.href);
    let idCitaModificada = urlActual2.searchParams.get("id");
    const fila = document.getElementById(`${idCitaModificada}`);
    fila.setAttribute("style", "animation: focus 5s ease-in forwards;")
    fila.scrollIntoView({behavior: 'smooth'});
    fila.cells[0].focus();
}
    
} else {
    sessionStorage.setItem("enviado", false);
}

