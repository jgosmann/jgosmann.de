export default function enableCollapsibles() {
    const collapsibles = document.getElementsByClassName("collapsible");
    for (let i = 0; i < collapsibles.length; ++i) {
        const elem = collapsibles[i];
        if (elem instanceof HTMLElement) {
            const btn = elem.nextElementSibling;
            elem.classList.add("collapsed");
            btn.classList.add("collapsed");
            elem.style.maxHeight = "0px";
            btn.addEventListener("click", () => {
                if (elem.classList.contains("collapsed")) {
                    elem.style.maxHeight = elem.scrollHeight + "px";
                } else {
                    elem.style.maxHeight = "0px";
                }

                btn.classList.toggle("collapsed");
                elem.classList.toggle("collapsed");
            });
        }
    }
}
