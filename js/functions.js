$(function() {

  $('.nav-toggle').on('click', function() {
    $('.ul-flex').slideToggle(400, function() {
      $(this).toggleClass('nav-open').css('display', '');
    });
  })

});
