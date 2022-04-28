$(document).ready(function () {
  $floatingBtn = $("#floatingBtn");
  $iframeModal = $("#iframeModal");
  $modalCloseBtn = $("#iframeModal .close");
  $floatingBtn.on("click", function (e) {
    $iframeModal.show();
  });

  // When the user clicks on <span> (x), close the modal
  $modalCloseBtn.on("click", function (e) {
    $iframeModal.hide();
  });
});
