document.addEventListener("DOMContentLoaded", () => {
  function feedbackForNonComputers() {
    document.body.innerHTML = "";
    const smallScreenDiv = document.createElement("div");
    smallScreenDiv.classList.add('small-screen');
    const h1 = document.createElement("h1");
    const text = document.createTextNode(
      "This application is only available on desktop devices. Please use a laptop or computer."
    );
    h1.appendChild(text);
    smallScreenDiv.appendChild(h1);
    document.body.appendChild(smallScreenDiv);
  }

  function showInfo(event) {
    if (window.innerWidth < 1000) {
      feedbackForNonComputers();
    } else {
      const keysToPrevent = [
        "Tab", "Meta", "Alt", "F1", "F3", "F5", "F6", "F7", "F10"
      ];

      if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
      }

      document.body.innerHTML = "";
      const mainContainer = document.createElement("main");
      mainContainer.classList.add("info");
      const div = document.createElement("div");

      const key = document.createElement("h1");
      key.classList.add("key");
      key.textContent = event.key === " " ? "Backspace" : event.key;

      mainContainer.appendChild(key);

      div.classList.add("codes");

      const codeArticle = document.createElement("article");
      const keycodeArticle = document.createElement("article");
      const locationArticle = document.createElement("article");

      codeArticle.appendChild(document.createElement("p")).textContent = "code";
      codeArticle.appendChild(document.createElement("span")).innerHTML = `<p>${event.code}</p>`;
      codeArticle.appendChild(document.createElement("span")).innerHTML = `<p>Physical key identifier.</p>`;

      keycodeArticle.appendChild(document.createElement("p")).textContent = "keycode";
      keycodeArticle.appendChild(document.createElement("span")).innerHTML = `<p>${event.keyCode}</p>`;
      keycodeArticle.appendChild(document.createElement("span")).innerHTML = `<p>Legacy key numeric code.</p>`;

      locationArticle.appendChild(document.createElement("p")).textContent = "location";
      locationArticle.appendChild(document.createElement("span")).innerHTML = `<p>${event.location}</p>`;
      locationArticle.appendChild(document.createElement("span")).innerHTML = `<p>Indicates key location (left, right).</p>`;

      div.appendChild(codeArticle);
      div.appendChild(keycodeArticle);
      div.appendChild(locationArticle);

      mainContainer.appendChild(div);
      document.body.appendChild(mainContainer);
    }
  }

  window.addEventListener("keydown", showInfo);

  if (window.innerWidth < 1000) {
    feedbackForNonComputers();
  }
});
