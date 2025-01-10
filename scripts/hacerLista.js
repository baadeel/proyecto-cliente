
//Hacer la lista de consulta de citas
let citas = {};
const tabla = document.querySelector("tbody");
let tr = document.createElement("tr");


//Si no hay citas
if (localStorage.length == 0) {
    let td = document.createElement("td");
    let node = document.createTextNode("No hay citas disponibles");
    td.appendChild(node);
    tr.appendChild(td);
    td.setAttribute("colspan", "7");
    tabla.appendChild(tr);
}

//Por cada cita se ordenan y recuperar los datos, después se pinta la tabla
for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    citas = JSON.parse(localStorage.getItem(key));
    let array = new Array(8);
    for (let campo in citas) {
        ordenarCitas(campo, citas, array);
    }
    pintarTabla(array);
}

//Función para ordenar y recuperar los datos
function ordenarCitas(campo, citas, array) {
    switch (campo) {
        case "dni":
            array[0] = citas[campo];
            break;
        case "firstName":
            array[1] = citas["firstName"] + " " + citas["lastName"]
            break;
        case "apptDate":
            array[2] = citas[campo];
            break;
        case "phone":
            array[3] = citas[campo];
            break;
        case "observaciones":
            array[4] = citas[campo];
            break;
        case "idCita":
            array[7] = citas[campo];
        default:
            array[5] = "MODIFICAR ⚙️";
            array[6] = "BORRAR ❌";
    }
}

//Por cada cita se crea un elemento en la tabla y se repesentan los datos de forma correcta
function pintarTabla(array) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", array[7]);
    for (let i = 0; i < array.length; i++) {
        if (i != 7) {
            let td = document.createElement("td");
            switch (i) {
                case 0:
                case 1:
                case 3:
                    let node = document.createTextNode(array[i]);
                    td.appendChild(node);
                    break;
                case 2:
                    let nodeFecha = document.createTextNode(String(array[i]).replace("T", " "));
                    td.appendChild(nodeFecha);
                    break;
                case 4:
                    let div = document.createElement("div");
                    let nodeObservaciones = document.createTextNode(array[i]);
                    div.appendChild(nodeObservaciones);
                    td.appendChild(div);
                    break;
                case 5:
                    let buttonModificar = document.createElement("button");
                    let nodeModificar = document.createTextNode(array[i]);
                    buttonModificar.appendChild(nodeModificar);
                    buttonModificar.setAttribute("onClick", `modificar("${array[7]}")`);
                    td.appendChild(buttonModificar);
                    break;
                case 6:
                    let buttonBorrar = document.createElement("button");
                    let nodeBorrar = document.createTextNode(array[i]);
                    buttonBorrar.appendChild(nodeBorrar);
                    buttonBorrar.setAttribute("onClick", `borrarCita("${array[7]}")`);
                    td.appendChild(buttonBorrar);
                    break;
            }
            tr.appendChild(td);
        }

    }
    tabla.appendChild(tr);
}







