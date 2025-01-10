//MODIFICAR CITA

//Guardar la ruta de la lista de citas
let paginaReferida = "/paginas/consultarCita.html";
//Guardar la ruta de la página referida(de donde venimos)
let url = new URL(document.referrer)

//Seleccionar los input y texarea + unirlos en un Array
const inputFormulario = document.querySelectorAll("input");
let inputFormularioArray = Array.from(inputFormulario);
const textArea = document.querySelector("textarea");
inputFormularioArray.push(textArea);



//Función para redirigir con parámetros
function modificar(idCita) {
    window.location.href = `concertarCita.html?id=${idCita}`;
}

//Función para recuperar y poder editar la información
function modificarFormulario(idCita) {
    let cita = localStorage.getItem(idCita);
    let citaObjeto = JSON.parse(cita);
    const salir = document.querySelector("a");
    inputFormularioArray.forEach(element => {
        let campo = element.getAttribute("id");
        element.value = citaObjeto[campo];
    });
    boton.innerText = "Guardar datos";
    boton.setAttribute("onclick", `modificarCita("${idCita}")`);
    console.log(idCita);
    form.setAttribute("action", `consultarCita.html?id=${idCita}`);
    salir.setAttribute("href", "/paginas/consultarCita.html");
}

//Comprobar si queremos editar alguna cita
if (url.pathname == paginaReferida && inputFormularioArray.length > 6) {
    let urlActual = new URL(window.location.href);
    let idCita = urlActual.searchParams.get("id");
    modificarFormulario(idCita);
}


//BORRAR CITA

function borrarCita(idCita) {
    const fila = document.getElementById(`${idCita}`);

    fila.setAttribute("style", "transition: all .5s linear; background-color: var(--color-error); opacity: 0.2; transform: translateX(20%);");
    Array.from(fila.children).forEach(element => {
        element.setAttribute("style", "border: none");
    })
    
        setTimeout(() => {
            fila.remove();  
            
                if (localStorage.length == 0) {
                    let td = document.createElement("td");
                    let node = document.createTextNode("No hay citas disponibles");
                    td.appendChild(node);
                    tr.appendChild(td);
                    td.setAttribute("colspan", "7");
                    td.setAttribute("class", "noCitas");
                    tabla.appendChild(tr);
                }
            
        }, 500);



    localStorage.removeItem(`${idCita}`);
}
