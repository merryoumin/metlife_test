$(document).ready(function () {
  $floatingBtn = $("#floatingBtn");
  $fBtn = $("#iframeModal");
  $modalCloseBtn = $("#iframeModal .close");
  $fBtn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
});
