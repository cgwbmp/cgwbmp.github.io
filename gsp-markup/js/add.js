if (window.innerHeight) {
  setTimeout(setWindowHeight, 200);

  if (window.addEventListener) {
    window.addEventListener('resize', setWindowHeight, false);
  };

  function setWindowHeight () {
    var page = document.getElementById('page');
    var content = document.getElementById('content');
    var pageHeight = page && page.clientHeight || 0;
    var contentHeight = content && content.clientHeight || 0;
    var windowHeight = window.innerHeight || 0;
    content.style.minHeight = (windowHeight - pageHeight + contentHeight) +'px';
  };
};

(function () {
  $(function () {
    $(document).on('click', '.e-spoiler--button', function (event) {
      event.preventDefault();
      var item = $(this).closest('.e-spoiler');
      if (item.hasClass('f-expanded')) {
        item.removeClass('f-expanded');
      } else {
        item.addClass('f-expanded');
        UIkit.update(event = 'update');
      };
    });
  });
})();
