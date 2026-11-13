// Compare page: tick providers to show/hide their columns.
// Checkboxes: <input type="checkbox" value="nvidia" checked>
// Cells:      <th data-col="nvidia">, <td data-col="nvidia">

(function () {
  const picker = document.querySelector(".col-picker");
  if (!picker) return;
  picker.addEventListener("change", (e) => {
    const box = e.target;
    if (box.type !== "checkbox") return;
    document.querySelectorAll(`[data-col="${box.value}"]`).forEach((cell) => {
      cell.classList.toggle("col-hidden", !box.checked);
    });
  });
})();
