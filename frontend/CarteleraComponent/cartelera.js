export default class CarteleraComponent extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#render(shadow);
    }

    async #render(shadow) {
        await fetch("./CarteleraComponent/carteleraCinemapolis.html")
            .then(response => response.text())
            .then(html => {
                shadow.innerHTML += html;
            })
            .catch("Error loading HTML: " + error);
    }
}