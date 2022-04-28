$(document).ready(function () {
  $floatingBtn = $("#floatingBtn");
  $iframeModal = $("#iframeModal");
  $modalCloseBtn = $("#iframeModal .close");
  $fBtn.on("click", function (e) {
    $iframeModal.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  $modalCloseBtn.on("click", function (e) {
    $iframeModal.style.display = "none";
  });
});
