export default class PeliculaComponent extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        await this.#render(shadow);
        this.#mostrarPelicula(shadow);
    }

    async #render(shadow) {
        await fetch("./PeliculaComponent/peliculaCinemapolis.html")
            .then(response => response.text())
            .then(html => {
                shadow.innerHTML += html;
            })
            .catch(error => {
                console.error("Error loading HTML: " + error);
            });
    }

    #mostrarPelicula(shadow) {
        const urlParams = new URLSearchParams(window.location.search);
        const idPelicula = urlParams.get("id");
        const imagenURL = urlParams.get("imagen");
        console.log(idPelicula);

        fetch(`http://127.0.0.1:3000/api/peliculas/${idPelicula}`)
            .then(response => response.json())
            .then(data => {
                // let blob = new Blob([new Uint8Array(data.imagen.data)], { type: "image/jpg" });
                let imagen = shadow.querySelector("img");
                imagen.setAttribute("src", imagenURL);
                imagen.setAttribute("alt", data.nombre);

                let titulo = shadow.querySelector("#titulo");
                titulo.innerHTML = data.nombre;

                let sinopsis = shadow.querySelector("#sinopsis-text");
                sinopsis.innerHTML = data.descripcion;

                let celdas = shadow.querySelectorAll("td");

                for (let i = 0; i < data.horarios.length; i++) {
                    celdas[i].innerHTML = `<input type="radio" name="horario"> ${data.horarios[i]}`;
                }
            });
    }
}