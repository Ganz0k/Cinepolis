import HeaderComponent from "./HeaderComponent/header.js";
import FooterComponent from "./FooterComponent/footer.js";
import LoginComponent from "./LoginComponent/login.js";
import SignUpComponent from "./SignUpComponent/signUp.js";
import SectionTitleComponent from "./SectionTitleComponent/sectionTitle.js";
import CarritoComponent from "./CarritoComponent/carrito.js";
import PeliculaComponent from "./PeliculaComponent/pelicula.js";
import AsientoComponent from "./AsientoComponent/asiento.js";

window.customElements.define("header-info", HeaderComponent);
window.customElements.define("footer-info", FooterComponent);
window.customElements.define("login-form", LoginComponent);
window.customElements.define("sign-up-form", SignUpComponent);
window.customElements.define("section-title", SectionTitleComponent);
window.customElements.define("carrito-list", CarritoComponent);
window.customElements.define("pelicula-details", PeliculaComponent);
window.customElements.define("asientos-info", AsientoComponent);