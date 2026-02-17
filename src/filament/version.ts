const version = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "";

document.querySelectorAll("[data-app-version]").forEach((node) => {
  node.textContent = version ? `v${version}` : "";
});
