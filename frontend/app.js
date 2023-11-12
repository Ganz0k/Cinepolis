import HeaderComponent from "./HeaderComponent/header.js";
import FooterComponent from "./FooterComponent/footer.js";
import LoginComponent from "./LoginComponent/login.js";
import SignUpComponent from "./SignUpComponent/signUp.js";

window.customElements.define("header-info", HeaderComponent);
window.customElements.define("footer-info", FooterComponent);
window.customElements.define("login-form", LoginComponent);
window.customElements.define("sign-up-form", SignUpComponent);