// (function() {
//   var quickLinksContainer = document.querySelector('.quick-links');
//   var quickLinksOffset = quickLinksContainer.offsetTop;
//   var quickLinksHeight = quickLinksContainer.offsetHeight;
  
//   document.addEventListener('scroll', watchQuickLinks);

//   function watchQuickLinks() {
//     var scroll = window.scrollY;
//     var bodyClass = document.body.classList;
//     var articleContent = document.querySelector('.content-wrap');
//     if (scroll > quickLinksOffset) {
//       if (bodyClass.contains('quick-links-fixed')) {
//         return;
//       } else {
//         bodyClass.add('quick-links-fixed');
//         articleContent.style.paddingTop = quickLinksOffset + 'px';
//       }
//     } else {
//       bodyClass.remove('quick-links-fixed');
//       articleContent.style.paddingTop = 0;
//     }
//   }

// })();