let nav;
let minmenu_active = false;

export function showMinmenu() {
  nav.style.top = "0";
  minmenu_active = true;
}

export function hideMinmenu() {
  nav.style.top = "-100%";
  minmenu_active = false;
}

export function toggleMinmenu() {
  if (minmenu_active) {
    hideMinmenu();
  } else {
    showMinmenu();
  }
}

export default function enableMinmenu() {
  nav = document.getElementsByTagName("nav")[0];
  if (!nav) return;
  const minmenu = document.getElementById("minmenu");

  minmenu.addEventListener("click", event => {
    toggleMinmenu();
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (minmenu_active) {
      hideMinmenu();
    }
  });
}
