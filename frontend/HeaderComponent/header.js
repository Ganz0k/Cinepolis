export default class HeaderComponent extends HTMLElement {

    #location = window.location.pathname;

    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        await this.#render(shadow);

        if (this.#location == "/frontend/index.html") {
            this.#default(shadow);
        }
    }

    async #render(shadow) {
        await fetch("./HeaderComponent/headerCinemapolis.html")
            .then(response => response.text())
            .then(html => {
                shadow.innerHTML += html;
            })
            .catch(error => {
                console.error("Error loading HTML: " + error);
            });
    }

    #default(shadow) {
        let rightHeader = shadow.querySelector(".right-header");
        let btnLogin = document.createElement("button");
        btnLogin.setAttribute("id", "btn-login");
        btnLogin.innerHTML = "INICIAR SESIÓN";
        rightHeader.appendChild(btnLogin);
    }
}