//Documento para validar la información del formulario

//Seleccionar los input del formulario y poner en un array
const arrayCampos = Array.from(document.querySelectorAll("#form input"));

//Seleccionar los span de cada campo y ponerlos en un array
const arrayErrores = Array.from(document.querySelectorAll("#form .error"))

//Seleccionar los label de cada campo y ponerlos en un array
const arrayLabel = Array.from(document.querySelectorAll("#form label"));

//Seleccionar span con contador de errores
const contadorErrores = document.querySelector("#contadorErrores");

//Seleccionar el botón
const boton = document.getElementById("boton")

//Selecionar formulario
const form = document.getElementById("form");

//Seleccionar los svg(icono de error) de cada campo y ponerlos en un array
const arraySvg = Array.from(document.querySelectorAll("#form svg"));

//Expresiones regulares
const letras = /^[a-zA-ZöüäáéíóúÁÉÍÓÚñÑ\s]+$/;
const numeros = /^\d{9,}$/;
const ochoLetrasUnNumero = /^\d{8}[a-zA-Z]{1}$/;

//Contador
let contador;




let errores = new Array(6);

//Función: Comprobar si los campos estan vacíos
boton.addEventListener("click", function (e) {
    let focus = false;
    arrayCampos.forEach((element, index) => {
        //Comprobamos si hay campos vacíos
        if (element.value.trim() === "") {
            e.preventDefault();
            mostrarError(index, element, "Este campo no puede estar vacío");
        }
        //Hacer focus donde esté el primer error del formulario
        if (arrayErrores[index].textContent != "") {
            if (!focus) {
                arrayCampos[index].focus();
                focus = true;
            }
        }
    });
    //Comprobamos si hay errores
    if (contadorDeErrores(errores) != 0) {
        console.log("hola")
        e.preventDefault();
    } else if (form.checkValidity()){
        //Creamos un campo en sessionStorage que será validado en el index para saber si hay un nuevo formulario enviado
        sessionStorage.setItem("enviado", true );
    }

    


})

//Comprobamos si se rellena bien cada campo
arrayCampos.forEach((element, index) => {
    if (index !== 0 && index !== 5) {
        element.addEventListener("input", function () {
            switch (index) {
                case 1:
                case 2:
                    if (letras.test(element.value)) {
                        eliminarError(index, element);
                    } else if (element.value == "") {
                        mostrarError(index, element, "Este campo no puede estar vacío");
                    } else {
                        mostrarError(index, element, "Solo puede contener letras");
                    }
                    break;
                case 3:
                    if (ochoLetrasUnNumero.test(element.value)) {
                        eliminarError(index, element);
                    } else if (element.value == "") {
                        mostrarError(index, element, "Este campo no puede estar vacío");
                    } else {
                        mostrarError(index, element, "Debe contener 8 números y 1 letra")
                    }
                    break;
                case 4:
                    if (numeros.test(element.value)) {
                        eliminarError(index, element);
                    } else if (element.value == "") {
                        mostrarError(index, element, "Este campo no puede estar vacío");
                    } else {
                        mostrarError(index, element, "Debe contener más de 9 números.")
                    }
            }
        })
    } else {
        element.addEventListener("change", function () {
            const fechaSeleccionada = new Date(element.value);
            const fechaHoy = new Date();

            if (index == 0) {
                if (fechaSeleccionada < fechaHoy) {
                    mostrarError(index, element, "La fecha seleccionada es más antigua que la actual");
                } else {
                    eliminarError(index, element);
                }
            } else {
                if (fechaSeleccionada > fechaHoy) {
                    mostrarError(index, element, "Selecciona una fecha de nacimiento correcta");
                } else {
                    eliminarError(index, element);
                }
            }
        })
    }
});


//Mostrar error en la interfaz
function mostrarError(index, element, mensaje) {
    errores[index] = true;
    arrayErrores[index].textContent = mensaje;
    element.setAttribute("style", "border: 1px solid var(--color-error);");
    arrayLabel[index].setAttribute("style", "color: var(--color-error");
    arraySvg[index].setAttribute("style", "display: block");
    contadorDeErrores(errores);
}

//Eliminar error de la interfaz
function eliminarError(index, element) {
    errores[index] = false;
    arrayErrores[index].textContent = "";
    element.removeAttribute("style");
    arrayLabel[index].removeAttribute("style");
    arraySvg[index].removeAttribute("style");
    contadorDeErrores(errores);
}

//Contador de errores
function contadorDeErrores(errores) {
    let contador = 0;
    errores.forEach((error) => {
        if (error == true) {
            contador++;
        }
    })
    if (contador > 0) {
        if (contador == 1) {
            contadorErrores.textContent = "Tienes " + contador + " error";
        } else { contadorErrores.textContent = "Tienes " + contador + " errores"; }
        contadorErrores.setAttribute("style", "color: red; display: block");
    } else {
        contadorErrores.textContent = "";
    }
    return contador;
}