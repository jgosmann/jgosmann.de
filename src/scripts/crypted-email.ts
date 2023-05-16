class CryptedEmail extends HTMLAnchorElement {
  constructor() {
    super();

    const name = this.getAttribute("name");
    const domain = this.getAttribute("domain");
    const tld = this.getAttribute("tld");

    const email = `${name}@${domain}.${tld}`;
    this.textContent = email;
    this.setAttribute("href", `mailto:${email}`);
  }
}

customElements.define("crypted-email", CryptedEmail, { extends: "a" });
