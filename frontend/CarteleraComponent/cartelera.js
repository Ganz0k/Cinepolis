export default class CarteleraComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.#render();
    }

    async #render() {
        const shadow = this.shadowRoot;

        try {
            const response = await fetch("./CarteleraComponent/carteleraCinemapolis.html");
            const html = await response.text();

            console.log("Contenido HTML cargado:", html);
            shadow.innerHTML = html;
        } catch (error) {
            console.error("Error loading HTML:", error);
        }
    }
}

customElements.define("cartelera-info", CarteleraComponent);
