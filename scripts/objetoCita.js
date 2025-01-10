//Crear el objeto CITA y guardar en localStorage
function nuevaCita(){
    if (contadorDeErrores(errores) != 0) {
        preventDefault();
    } else if (form.checkValidity()){
        const CITA = {
            apptDate: form.apptDate.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            dni: form.dni.value,
            phone: form.phone.value,
            birthDate: form.birthDate.value,
            observaciones: form.observaciones.value,
            idCita: form.apptDate.value + form.dni.value
           }
           let citaString = JSON.stringify(CITA);
           localStorage.setItem(CITA.idCita, citaString)
    }
}

//Misma función con parámetro idCita para modificar una cita
function modificarCita(idCita){
    if (contadorDeErrores(errores) != 0) {
        preventDefault();
    } else if (form.checkValidity()){
        const CITA = {
            apptDate: form.apptDate.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            dni: form.dni.value,
            phone: form.phone.value,
            birthDate: form.birthDate.value,
            observaciones: form.observaciones.value,
            idCita: idCita
           }
           console.log(form.observaciones.value);
           let citaString = JSON.stringify(CITA);
           localStorage.setItem(idCita, citaString)
    }
}







