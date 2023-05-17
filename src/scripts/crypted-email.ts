class CryptedEmail extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute("name");
    const domain = this.getAttribute("domain");
    const tld = this.getAttribute("tld");
    const email = `${name}@${domain}.${tld}`;

    const link = document.createElement("a");
    link.textContent = email;
    link.setAttribute("href", `mailto:${email}`);

    this.appendChild(link);
  }
}

customElements.define("crypted-email", CryptedEmail);
