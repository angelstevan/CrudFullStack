document.addEventListener("DOMContentLoaded",leerApi);

const url = "http://localhost:3000/aprendices";

function leerApi()
{
    fetch(url)
    .then((res) => res.json())
    .then((res) =>{
        console.log(res);
    })
}