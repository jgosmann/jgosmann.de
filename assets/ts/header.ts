const header = document.querySelector("header");
const header_height : number = header.offsetHeight;

export default function setHeaderSize() : void {
    let scrollpos = window.scrollY;
    if (scrollpos >= header_height) {
        header.classList.remove("header-large");
    }
    else {
        header.classList.add("header-large");
    }
}
