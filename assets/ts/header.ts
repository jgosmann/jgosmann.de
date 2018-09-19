const header = document.querySelector("header");
const header_height : number = header.offsetHeight;

export function setHeaderSize() : void {
    let scrollpos = window.scrollY;
    if (scrollpos >= header_height) {
        header.classList.remove("header-large");
    }
    else {
        header.classList.add("header-large");
    }
}


const sections = document.getElementsByTagName('section');
const default_section = document.getElementsByTagName('main')[0].id
const nav_links = document.querySelectorAll('header nav a');

export function highlightCurrentSection() {
    let active_id : string = null;
    for (let i = sections.length - 1; i >= 0; --i) {
        const elem = sections[i];
        if (elem.offsetTop <= window.scrollY) {
            active_id = elem.id;
            break;
        }
    }

    if (!active_id) {
        active_id = default_section;
    }

    for (let i = 0; i < nav_links.length; ++i) {
        const elem = nav_links[i];
        if (elem.attributes['href'].value == '#' + active_id) {
            elem.classList.add('active');
        } else {
            elem.classList.remove('active');
        }
    }
}
