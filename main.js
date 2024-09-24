document.addEventListener("DOMContentLoaded", function () {
  const size = 8,
    width = 140 * size,
    height = 140 * size,
    canvas = document.getElementById("canvas");

  let previousCoords = [0, 0],
    popups = [];

  function drawImageFromJson(data) {
    for (const key in data) {
      const [x, y] = key.split("_").map(Number);
      const color = data[key];
      createDiv(x * size, y * size, size, size, color, [
        parseInt(x),
        parseInt(y),
      ]);
    }
  }

  function showPopup(e, text, x) {
    popups.forEach((popup) => popup.remove());
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.style.top = `${e.clientY - 140}px`;
    popup.style.left = `${e.clientX - (x > 70 ? 200 : 0)}px`;
    popup.innerHTML = text;
    document.body.appendChild(popup);
    popups.push(popup);
  }

  function createDiv(x, y, width, height, bgColor, coords) {
    const div = document.createElement("div");
    div.classList.add("square");
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.backgroundColor = bgColor;

    if (x == 46 * size || x == 94 * size) {
      div.style.borderLeft = "1px solid red";
    }

    if (y == 46 * size || y == 94 * size) {
      div.style.borderTop = "1px solid red";
    }

    div.onclick = function (e) {
      const v = Math.abs(previousCoords[1] - coords[1]);
      const h = Math.abs(previousCoords[0] - coords[0]);

      const startX = 200;
      const startY = 600;

      const link = `https://t.me/notpixel/app?startapp=coords${
        startX + coords[0]
      }-${startY + coords[1]}`;

      const innerHTML = `
                  Coords: ${startX + coords[0]}-${startY + coords[1]}<br/>
                  Distance to previous point:<br/>
                  Vertical - ${v > 0 ? v + 1 : 0}<br/>
                  Horizontal - ${h > 0 ? h + 1 : 0}<br/>
                  <a href="${link}" target="_blank" rel="noopener noreferrer">Open app</a>
              `;
      document.getElementById("text").innerHTML = innerHTML;
      previousCoords = coords;
      showPopup(e, innerHTML, coords[0]);
    };

    canvas.appendChild(div);
  }

  // Call the function with JSON data
  drawImageFromJson(jsonData);
});
