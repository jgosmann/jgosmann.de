const onLoad = (fn: () => void) => {
  if (document.readyState === "complete") {
    fn();
  } else {
    window.addEventListener("load", fn);
  }
};

export default onLoad;
