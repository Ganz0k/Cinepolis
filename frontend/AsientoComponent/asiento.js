export default class AsientoComponent extends HTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        await this.#render(shadow);
        this.#seleccionarAsiento(shadow);
    }

    async #render(shadow) {
        await fetch("./AsientoComponent/asientoCinemapolis.html")
            .then(response => response.text())
            .then(html => {
                shadow.innerHTML += html;
            })
            .catch(error => {
                console.error("Error loading HTML: " + error);
            });
    }

    #seleccionarAsiento(shadow) {
        let asientos = shadow.querySelectorAll(".seat");

        asientos.forEach(a => {
            a.addEventListener("click", () => {
                if (a.getAttribute("class") === "seat") {
                    a.setAttribute("class", "seat-selected");
                } else if (a.getAttribute("class") === "seat-selected") {
                    a.setAttribute("class", "seat");
                }
            });
        });
    }
}