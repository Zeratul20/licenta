import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const bootstrap = require("bootstrap");

export const modalOperation = (name: string, operation: string) => {
  const modal = new bootstrap.Modal(document.getElementById(name), {
    backdrop: true,
    keyboard: true,
    focus: true,
  });
  if (operation === "hide") modal.hide();
  else modal.show();
};
