$(function() {
  $('.nav-menu').on('click', function() {
    var $this = $(this)

    // When Menu icon is clicked, display the menu
    $this.next().slideToggle();
  })
});
