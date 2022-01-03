
const urlbase = "https://api.github.com/users";

$("form").on("submit", function(ev) {
    ev.preventDefault();
    const nomusuario = $("#nombre").val();
    const numrepoPagina = $("#repoPagina").val();
    const numpagina = $("#pagina").val();
    
    getUser(nomusuario);
    
    getrepo(nomusuario,numrepoPagina,numpagina);

})

async function getUser(nomusuario) {
    const datosuser = await request(nomusuario);
    $("#resultados").html(`
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Datos Usuario</h5>
                <img src="${datosuser.avatar_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">Nombre de usuario: ${datosuser.name}</p>
                        <p class="card-text">Nombre de login: ${datosuser.login}</p>
                        <p class="card-text">Cantidad de repositorios: ${datosuser.public_repos}</p>
                        <p class="card-text">Localidad: ${datosuser.location}</p>
                        <p class="card-text">Tipode usuario: ${datosuser.type}</p>
                    </div>
            </div>
        </div>
    `)
}

async function  request(url) {
    try {

        const datos = await fetch (`${urlbase}/${url}`);

        console.log(`${urlbase}/${url}`);

        const resultado = await datos.json();
        
        console.log(resultado);

        return resultado;

    } 
    catch (err=“Not Found”) {
        alert("Usuario no disponible");
    }
    finally {
        console.log("Gracias por la consulta")
    }

}


async function getrepo(nomusuario,numrepoPagina,numpagina) {
    // obtengo datos repositorios
    const repositorios = await request(`${nomusuario}/repos?page=${numpagina}&per_page=${numrepoPagina}`);
    // muestro en html datos repositorios
    $("#resultados2").html(`
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Nombre de repositorios</h5>
                <div class="card-repositorios">
                </div>
            </div>
        </div>
    `)
    for (const repositorio of repositorios) {
        $(".card-repositorios").append(`
            <p class="card-text">${repositorio.name}</p>
        `)
    }
}
