(function () {
  $(function () {
    var tables = $('.e-collapsed-table');
    tables.each(function () {
      presetTable(this);
    });
    $(document).on('click', '.b-adapted-table--header', function (event) {
      event.preventDefault();
      var item = $(this).closest('.b-adapted-table--item');
      if (item.hasClass('f-expanded')) {
        item.removeClass('f-expanded');
      } else {
        item.addClass('f-expanded');
      };
    });
  });

  function presetTable (node) {
    node.className = (node.className || '') + ' b-adapted-table';
    var rows = node.querySelectorAll('tbody > tr');
    if (rows) {
      rows.forEach(function (row) {
        row.className = (row.className || '') + ' b-adapted-table--item';
        var cols = row.querySelectorAll('td');
        if (cols) {
          cols.forEach(function (col, index) {
            if (index) {
              col.className = (col.className || '') + ' b-adapted-table--body';
            } else {
              col.className = (col.className || '') + ' b-adapted-table--header';
              var expandButton = document.createElement('button');
              expandButton.className = 'b-adapted-table--expand uk-button uk-button-small uk-button-ico uk-button-text';
              expandButton.innerHTML = '<span uk-icon="icon: plus"></span>';
              col.appendChild(expandButton);
              var collapseButton = document.createElement('button');
              collapseButton.className = 'b-adapted-table--collapse uk-button uk-button-small uk-button-ico uk-button-text';
              collapseButton.innerHTML = '<span uk-icon="icon: minus"></span>';
              col.appendChild(collapseButton);
            };
          });
        };
      });
    };
  };
})();
