const narrowNbsp = "\u202F";

class CryptedPhone extends HTMLAnchorElement {
  constructor() {
    super();

    const country = this.getAttribute("country");
    const area = this.getAttribute("area");
    const block0 = this.getAttribute("block0");
    const block1 = this.getAttribute("block1");

    this.href = `tel:${country}${area}${block0}${block1}`;
    this.textContent = `${country}${narrowNbsp}${area}${narrowNbsp}${block0}${narrowNbsp}${block1}`;
  }
}

customElements.define("crypted-phone", CryptedPhone, { extends: "a" });
