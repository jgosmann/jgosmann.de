const handleFlyIn = (element: HTMLElement) => {
  element.classList.add("flyin-show");
  for (let i = 0; i < element.children.length; ++i) {
    const child = element.children[i];
    if (child instanceof HTMLElement) {
      child.style.transitionDelay = `${0.1 * i}s`;
    }
  }
};

const onUncovered: IntersectionObserverCallback = (entries, observer) => {
  for (let entry of entries) {
    if (entry.target instanceof HTMLElement) {
      entry.target.tagName;
      if (entry.intersectionRatio >= 0.2) {
        handleFlyIn(entry.target);
      }
    }
  }
};

export const enableFlyIn = () => {
  const observer = new IntersectionObserver(onUncovered, { threshold: 0.2 });
  const flyInElements = document.querySelectorAll(".flyin");
  flyInElements.forEach((element) => {
    observer.observe(element);
  });
};
