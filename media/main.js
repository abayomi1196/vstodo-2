// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
  const vscode = acquireVsCodeApi();

  const buttonEL = /** @type {HTMLElement} */ (
    document.getElementById("button")
  );
  buttonEL.innerText = "Hello from JS";

  console.log("hello from JS");
})();
