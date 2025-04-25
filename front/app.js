document.addEventListener("DOMContentLoaded",mostrarAprendiz);

const url = "http://localhost:3000/aprendices";

const contenido = document.querySelector("#contenido");
const formularioAgregar = document.querySelector("#formularioAgregar");
           
formularioAgregar.addEventListener('submit',obtenerDatosFormularioAgregar)

function mostrarAprendiz()
{

    fetch(url)
    .then((res) => res.json())
    .then((res) =>{
        
        res.forEach(datos => {

            const tr = document.createElement("tr");
            const thID = document.createElement("td");
            const thNombre = document.createElement("td");
            const thApellido = document.createElement("td");
            const thEstaMatriculado = document.createElement("td");
            const thEmail = document.createElement("td");
            const BotonEditar = document.createElement("td");
            BotonEditar.classList.add("btn", "btn-warning", "me-1");
            BotonEditar.textContent = "Editar";

            BotonEditar.addEventListener('click',()=>{
                console.log(datos.id)
                abrirModal(datos)
            })
            
            const BotonEliminar = document.createElement("td");
            BotonEliminar.classList.add("btn", "btn-danger"); 
            BotonEliminar.textContent = "Eliminar";

            BotonEliminar.addEventListener('click',()=>{
                eliminarAprendiz(datos)
            })

            thID.textContent = datos.id;
            thNombre.textContent = datos.nombre;
            thApellido.textContent = datos.apellido;
            thEstaMatriculado.textContent = datos.estaMatriculado;
            thEmail.textContent = datos.email;

            tr.append(thID,thNombre,thApellido,thEstaMatriculado,thEmail,BotonEditar,BotonEliminar);
            contenido.appendChild(tr);

        });
        
    })
}

function obtenerDatosFormularioAgregar(e)
{
    e.preventDefault();

    let datos = JSON.stringify({

        id : document.querySelector("#idAprendizAgregar").value,
        nombre : document.querySelector("#nombreAprendizAgregar").value,
        apellido : document.querySelector("#apellidoAprendizAgregar").value,
        estaMatriculado : document.querySelector("#matriculaAprendizAgregar").value,
        email : document.querySelector("#correoAprendizAgregar").value,

    });

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
        
        Swal.fire({
            title: "Agregado",
            text: "el usuario se agrego con exito!",
            icon: "success"
          });

    })

}

function abrirModal(datos)
{

    let modal = new bootstrap.Modal(document.querySelector("#miModal"));
    modal.show();

    document.querySelector("#idAprendiz").value = datos.id;
    document.querySelector("#nombreAprendiz").value = datos.nombre;
    document.querySelector("#apellidoAprendiz").value = datos.apellido;
    document.querySelector("#matriculaAprendiz").value = String(datos.estaMatriculado);
    document.querySelector("#correoAprendiz").value = datos.email;
    
}

const formularioEditar = document.querySelector("#formularioEditar");
formularioEditar.addEventListener('submit',(e)=>{
    e.preventDefault();
    obtenerDatosFormularioEditar();
})

function obtenerDatosFormularioEditar()
{

    let datosEditados = JSON.stringify({

        id : document.querySelector("#idAprendiz").value,
        nombre : document.querySelector("#nombreAprendiz").value,
        apellido : document.querySelector("#apellidoAprendiz").value,
        estaMatriculado : document.querySelector("#matriculaAprendiz").value,
        email : document.querySelector("#correoAprendiz").value,

    });

    editarAprendiz(datosEditados); 

}

function editarAprendiz(datosEditados)
{

    const idDato = JSON.parse(datosEditados);
    const id = idDato.id;

        const urlEditar = `http://localhost:3000/aprendices/${id}`;

        fetch(urlEditar,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body : datosEditados,
        })
        .then((res)  => res.json())
        .then((res) =>{
            Swal.fire({
                title: "Editado",
                text: "el usuario se edito con exito!",
                icon: "success"
              });

        })
        console.log("añadido")

}

function eliminarAprendiz(datos)
{
    Swal.fire({
        title: "Estas Seguro?",
        text: "estas seguro de eliminar este usuario!",
        icon: "advertencia",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then((result) => {

        fetch(`${url}/${datos.id}`,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json" 
            },
        })
    
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "el usuario se elimino con exito!.",
            icon: "success"
          });
        }
      });
    
}


