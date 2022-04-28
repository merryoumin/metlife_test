$(document).ready(function () {
  $floatingBtn = $("#floatingBtn");
  $iframeModal = $("#iframeModal");
  $modalCloseBtn = $("#iframeModal .close");
  $fBtn.onclick = function () {
    $iframeModal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  $modalCloseBtn.onclick = function () {
    $iframeModal.style.display = "none";
  };
});
