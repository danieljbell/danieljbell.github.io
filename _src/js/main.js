(function() {
  var baseFontSize = window.getComputedStyle(document.body).getPropertyValue("font-size");

  if (document.body.classList.contains('home')) {
    var me = document.querySelector('.me');

    window.addEventListener('scroll', meMoving);

    function meMoving() {
      var scrollPos = this.scrollY;
      var aboutContainer = document.querySelector('.about');
      var workContainer = document.querySelector('.work');
      if (scrollPos > (aboutContainer.nextElementSibling.offsetTop - aboutContainer.offsetHeight)) {
        var offset = (aboutContainer.nextElementSibling.offsetTop - aboutContainer.offsetHeight) - scrollPos;
        me.style.transform = 'translateY(' + offset + 'px)';
      }
    }

  }
})();