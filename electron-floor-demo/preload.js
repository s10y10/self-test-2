const { ipcRenderer, BrowserWindow } = require("electron");
window.addEventListener("load", () => {
  let toolbarEl = document.querySelector(".drag");
  let startX;
  let startY;
  let difX;
  let difY;
  let hasMove = false;

  const getEventPoint = function (e) {
    if (e.toString().includes("TouchEvent")) {
      let pointer = e.touches[0];
      return { x: pointer.clientX, y: pointer.clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  };

  const onDragMove = (e) => {
    const p = getEventPoint(e);
    difX = p.x - startX;
    difY = p.y - startY;
    console.log(difX, difY);
    if (Math.abs(difX) > 5 || Math.abs(difY) > 5) {
      hasMove = true;
      ipcRenderer.send("change-window-size", { difX, difY });
    }
  };
  const onDragEnd = () => {
    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchmove", onDragMove);
    window.removeEventListener("touchend", onDragEnd);
  };

  const onDragStart = (e) => {
    hasMove = false;
    const p = getEventPoint(e);
    startX = p.x;
    startY = p.y;
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchmove", onDragMove);
    window.addEventListener("touchend", onDragEnd);
  };

  toolbarEl.addEventListener("mousedown", onDragStart);
  toolbarEl.addEventListener("touchstart", onDragStart);

  const listEl = document.querySelector(".list");
  const listRect = listEl.getBoundingClientRect();
  ipcRenderer.send("change-window-size", {
    winWidth: listRect.width,
    winHeight: listRect.height,
  });
});
