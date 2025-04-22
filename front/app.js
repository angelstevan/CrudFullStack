document.addEventListener("DOMContentLoaded",mostrarAprendiz);

const url = "http://localhost:3000/aprendices";

const contenido = document.querySelector("#contenido");
const formulario = document.querySelector("#formulario");

formulario.addEventListener('submit',mostrarAprendiz)

function obtenerDatosFormulario(e)
{

    e.preventDefault();
    let datos = JSON.stringify({

        id : document.querySelector("#idAprendiz"),
        nombre : document.querySelector("#nombreAprendiz"),
        apellido : document.querySelector("#apellidoAprendiz"),
        estaMatriculado : document.querySelector("#matriculaAprendiz"),
        email : document.querySelector("#correoAprendiz"),

    })

    agregarAprendiz(datos); 

}

function agregarAprendiz(datos)
{

    fetch(url,{

        method : "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
    })

    .then((res) => res.json())

    .then((res) =>{
        
    })

}

function mostrarAprendiz()
{

    fetch(url)
    .then((res) => res.json())
    .then((res) =>{
        console.log(res)
        const tr = document.createElement("tr");
        const thID = document.createElement("th");
        const thNombre = document.createElement("th");
        const thApellido = document.createElement("th");
        const thEstaMatriculado = document.createElement("th");
        const thEmail = document.createElement("th");
        const BotonEditar = document.createElement("th");
        const BotonEliminar = document.createElement("th");

        BotonEliminar.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        BotonEliminar.textContent = "Eliminar";

        BotonEditar.classList.add("btn", "btn-warning", "btn-sm", "me-1");
        BotonEditar.textContent = "Editar";

        thID.textContent = res.id;
        thNombre.textContent = res.nombre;
        thApellido.textContent = res.apellido;
        thEstaMatriculado.textContent = res.estaMatriculado;
        thEmail.textContent = res.email;

        tr.append(thID,thNombre,thApellido,thEstaMatriculado,thEmail,BotonEditar,BotonEliminar);
        contenido.appendChild(tr);

        
    })
}
