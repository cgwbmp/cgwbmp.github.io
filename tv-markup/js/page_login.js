//functions
(function () {

	var inputlabel = function (ar) {
		var fn_check = function (label, input) {
			if (input.val().length) {
				label.removeClass('f-empty');
				input.removeClass('f-empty');
			} else {
				label.addClass('f-empty');
				input.addClass('f-empty');
			};
		};

		ar.each(function () {
			if (this.pi_inputlabel) return;

			var label = $(this),
				input = (this.hasAttribute('for')) ? $('#'+ this.getAttribute('for')) : label.find('input');

			input
				.bind('focus', function () {
					label.removeClass('f-empty');
					input.removeClass('f-empty');
				}).bind('blur', function () {
					fn_check(label, input);
				});

			fn_check(label, input);

			setTimeout(function () {
				label.addClass('f-animateempty');
				input.addClass('f-animateempty');
			}, 20);

			this.pi_inputlabel = true;
		});
	};

	window.pi_fn_inputlabel = inputlabel;

})();



//init
(function () {

	$(function () {

		pi_fn_inputlabel( $('.e-inputlabel') );

	});

})();
