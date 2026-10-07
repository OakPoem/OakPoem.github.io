(function () {
  var app = document.getElementById("app");
  var dialog = document.getElementById("dialog");
  var panels = document.querySelectorAll(".panel");
  var navLinks = document.querySelectorAll("[data-view]");
  var toggle = document.getElementById("calm-toggle");

  var SHAPE_PATH = "M0 6 Q12 0 25 5 T50 4 T75 6 T100 3 L100 36 Q88 41 75 35 T50 37 T25 35 T0 38 Z";
  var jellySvg =
    '<svg class="jelly" viewBox="0 0 100 40" preserveAspectRatio="none" width="100%" height="100%">' +
    '<path d="' + SHAPE_PATH + '" fill="currentColor"/></svg>';
  var underlineSvg =
    '<svg viewBox="0 0 100 12" preserveAspectRatio="none"><path class="red" d="M0 7 L100 1 L98 9 L2 11 Z"/></svg>' +
    '<svg viewBox="0 0 100 12" preserveAspectRatio="none"><path class="blue" d="M0 7 L100 1 L98 9 L2 11 Z"/></svg>';

  // Builds the jelly hover markup around a link's text.
  function enhance(el) {
    var text = el.textContent.trim();
    el.innerHTML =
      '<span class="fallback" aria-hidden="true"></span>' +
      '<span class="shape-wrapper" aria-hidden="true">' +
      '<span class="shape cyan-fill">' + jellySvg + "</span>" +
      '<span class="shape red-fill">' + jellySvg + "</span></span>" +
      '<span class="img-wrapper"><span class="label normal"></span></span>' +
      (el.hasAttribute("data-underline") ? '<span class="p5-underline" aria-hidden="true">' + underlineSvg + "</span>" : "");
    setText(el, text);
  }
  function setText(el, text) {
    el.querySelector(".fallback").textContent = text;
    el.querySelector(".label").textContent = text;
  }
  document.querySelectorAll(".link-wrapper").forEach(enhance);

  // Dialog
  function openView(name) {
    panels.forEach(function (p) { p.hidden = p.id !== "panel-" + name; });
    navLinks.forEach(function (b) {
      var on = b.getAttribute("data-view") === name;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    dialog.setAttribute("aria-label", name);
    dialog.hidden = false;
  }
  function closeDialog() {
    dialog.hidden = true;
    navLinks.forEach(function (b) {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
  }
  navLinks.forEach(function (b) {
    b.addEventListener("click", function () { openView(b.getAttribute("data-view")); });
  });
  document.querySelectorAll("[data-close]").forEach(function (b) {
    b.addEventListener("click", closeDialog);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDialog();
  });

  // Cybersickness mode
  function setCalm(on) {
    app.classList.toggle("calm", on);
    toggle.setAttribute("aria-checked", String(on));
    setText(toggle, "Cybersickness: " + (on ? "ON" : "OFF"));
  }
  setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  toggle.addEventListener("click", function () {
    setCalm(!app.classList.contains("calm"));
  });
})();
