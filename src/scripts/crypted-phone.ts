const narrowNbsp = "\u202F";

class CryptedPhone extends HTMLElement {
  constructor() {
    super();

    const country = this.getAttribute("country");
    const area = this.getAttribute("area");
    const block0 = this.getAttribute("block0");
    const block1 = this.getAttribute("block1");

    const link = document.createElement("a");
    link.href = `tel:${country}${area}${block0}${block1}`;
    link.textContent = `${country}${narrowNbsp}${area}${narrowNbsp}${block0}${narrowNbsp}${block1}`;

    this.appendChild(link);
  }
}

customElements.define("crypted-phone", CryptedPhone);
