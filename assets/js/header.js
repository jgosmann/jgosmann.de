const enableHeader = () => {
  const header = document.querySelector("header");
  if (!header) return;
  const header_height = header.offsetHeight;

  const setHeaderSize = () => {
    let scrollpos = window.scrollY;
    if (scrollpos >= header_height) {
      header.classList.remove("header-large");
    } else {
      header.classList.add("header-large");
    }
  };

  const sections = document.getElementsByTagName("section");
  const default_section = document.getElementsByTagName("main")[0].id;
  const nav_links = document.querySelectorAll("header nav a");

  const highlightCurrentSection = () => {
    let active_id = null;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      active_id = sections[sections.length - 1].id;
    } else {
      for (let i = sections.length - 1; i >= 0; --i) {
        const elem = sections[i];
        if (elem.offsetTop <= window.scrollY) {
          active_id = elem.id;
          break;
        }
      }
    }

    if (!active_id) {
      active_id = default_section;
    }

    for (let i = 0; i < nav_links.length; ++i) {
      const elem = nav_links[i];
      if (elem.attributes["href"].value == "#" + active_id) {
        elem.classList.add("active");
      } else {
        elem.classList.remove("active");
      }
    }
  };

  window.addEventListener("scroll", setHeaderSize);
  setHeaderSize();
  window.setInterval(highlightCurrentSection, 200);
};

export default enableHeader;
