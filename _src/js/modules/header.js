(function() {
  var menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', openMenu);

  function openMenu() {
    document.body.classList.toggle('menu-open');
  }
})();