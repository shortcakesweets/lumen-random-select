document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");

  // Load stored state
  const savedState = localStorage.getItem("sidebar-collapsed");
  if (savedState === "true") {
    toggle.checked = true;
  }

  // Save state on toggle
  toggle.addEventListener("change", function () {
    localStorage.setItem("sidebar-collapsed", toggle.checked ? "true" : "false");
  });
});

// Force sidebar to always be collapsed
toggle.checked = true;
localStorage.setItem("sidebar-collapsed", "true");

// Alternatively, to always expand the sidebar
// toggle.checked = false;
// localStorage.setItem("sidebar-collapsed", "false");