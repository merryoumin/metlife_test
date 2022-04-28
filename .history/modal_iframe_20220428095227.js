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

  $floatingBtn = $("#floatingBtn");
  $iframeModal = $("#iframeModal");
  $modalCloseBtn = $("#iframeModal .close");
  $floatingBtn.on("click", function (e) {
    // alert("123");
    $iframeModal.show();
  });

  // When the user clicks on <span> (x), close the modal
  $modalCloseBtn.on("click", function (e) {
    // alert("456");
    $iframeModal.hide();
  });
  $("a[href='/customer-service/contact-us/request-consultation/']").on(
    "click",
    function (e) {
      e.stopPropagation();
      e.preventDefault();
      $("#iframeModal").show();
    }
  );
});
