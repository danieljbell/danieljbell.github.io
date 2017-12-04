(function() {
  var baseFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");

  console.log(baseFontSize);

  if (document.body.classList.contains('home')) {
    var me = document.querySelector('.me');

    window.addEventListener('scroll', meMoving);

    function meMoving() {
      var scrollPos = this.scrollY;
      var aboutContainer = document.querySelector('.about');
      if (scrollPos > (aboutContainer.nextElementSibling.offsetTop - aboutContainer.offsetHeight)) {
        console.log('get moving');
      }
    }

  }
})();