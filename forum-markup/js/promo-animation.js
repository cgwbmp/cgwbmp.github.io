;(function () {

	var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
	var promoNode = $('#promo');
	var wrapperNode = $('#promo-wrapper');
	var boxesNode = $('#promo-box-2, #promo-box-3, #promo-box-4');
	var headerNode = $('#header');
	var footerNode = $('#footer');
	var targetElement;
	var leftPosition = 0;
	var topPosition = 0;
	var scrollLocked = false;
	var scrollLockPosition = 0;
	var scrollLockDelay = 1000;
	var controller;

	var isInit = false;
	var isAnimationEnabled = false;

	if (!isMobile && wrapperNode.size()) {
		run();
		$(window).on('resize', run);
	};

	function setPosition (position) {
		var top = topPosition;
		var left = leftPosition;
		switch (targetElement) {
			case 'header':
				var top = 0;
				var left = 56;
				break;
			case 'info-1':
				var top = getBlockTop($('#promo-box-2'));
				var left = 56;
				break;
			case 'info-2':
				var top = getBlockTop($('#promo-box-3'));
				var left = 100;
				break;
			case 'info-3':
				var top = getBlockTop($('#promo-box-4'));
				var left = 0;
				break;
			case 'footer':
				var top = 100;
				var left = 0;
				break;
		};
		wrapperNode.css({
			top: -getTopPosition(top),
			left: -getLeftPosition(left)
		});
		headerNode.css({
			top: -getTopPosition(top)
		});
		footerNode.css({
			top: -getTopPosition(top) + 2250
		});
	};

	function setScrollLocking (position) {
		scrollLockPosition = position;
		scrollLocked = true;
		controller.scrollTo(position);
		setTimeout(function () {
			scrollLocked = false;
		}, scrollLockDelay);
	};

	function getBlockTop (element) {
		return (element.position().top + element.outerHeight() / 2) / (2250 + footerNode.outerHeight()) * 100;
	};

	function getLeftPosition (position) {
		var width = window.innerWidth;
		return (4000 - width) * (position / 100);
	};

	function getTopPosition (position) {
		var height = window.innerHeight;
		return (2250 + footerNode.outerHeight() - height + 200) * (position / 100);
	};

	function setAnimation (position) {
		if (!isAnimationEnabled) {
			promoNode.addClass('f-animation-enabled');
			headerNode.addClass('f-animation-enabled');
			footerNode.addClass('f-animation-enabled');
			setTimeout(function () {
				promoNode.addClass('f-transition-enabled');
			}, 100);
		};
	};

	function resizeHandler () {
		setPosition();
	};

	function scrollHandler (event) {
		if (scrollLocked) {
			controller.scrollTo(scrollLockPosition);
		};
	};

	function run () {
		if (!isInit && (window.innerWidth > 1040)) {
			init();
		} else if (isInit && (window.innerWidth <= 1040)) {
			destroy();
		};
	};

	function init () {
		isInit = true;

		controller = new ScrollMagic.Controller();

		new ScrollMagic.Scene({
			duration: 200,
			offset: 0,
		})
		.on('enter', function (event) {
			leftPosition = 50;
			topPosition = 0;
			targetElement = 'header';
			setPosition();
			setScrollLocking(0);
			setAnimation();
		})
		.addTo(controller);

		new ScrollMagic.Scene({
			duration: 400,
			offset: 200,
		})
		.on('enter', function (event) {
			leftPosition = 50;
			topPosition = 90;
			targetElement = 'info-1';
			setPosition();
			setScrollLocking(400);
			boxesNode.removeClass('f-active').addClass('f-hidden');
			$('#promo-box-2').removeClass('f-hidden').addClass('f-active');
			setAnimation();
		})
		.addTo(controller);

		new ScrollMagic.Scene({
			duration: 400,
			offset: 600,
		})
		.on('enter', function (event) {
			leftPosition = 100;
			topPosition = 90;
			targetElement = 'info-2';
			setPosition();
			setScrollLocking(800);
			boxesNode.removeClass('f-active').addClass('f-hidden');
			$('#promo-box-3').removeClass('f-hidden').addClass('f-active');
			setAnimation();
		})
		.addTo(controller);

		new ScrollMagic.Scene({
			duration: 400,
			offset: 1000,
		})
		.on('enter', function (event) {
			leftPosition = 0;
			topPosition = 90;
			targetElement = 'info-3';
			setPosition();
			setScrollLocking(1200);
			boxesNode.removeClass('f-active').addClass('f-hidden');
			$('#promo-box-4').removeClass('f-hidden').addClass('f-active');
			setAnimation();
		})
		.addTo(controller);

		new ScrollMagic.Scene({
			duration: 400,
			offset: 1400,
		})
		.on('enter', function (event) {
			leftPosition = 0;
			topPosition = 100;
			targetElement = 'footer';
			setPosition();
			boxesNode.removeClass('f-active').addClass('f-hidden');
			setAnimation();
		})
		.addTo(controller);

		$(window).on('resize', resizeHandler);
		$(window).on('scroll', scrollHandler);
	};


	function destroy () {
		isInit = false;

		$(window).off('resize', resizeHandler);
		$(window).off('scroll', scrollHandler);

		controller.destroy();

		setTimeout(function () {
			promoNode.removeClass('f-animation-enabled');
			headerNode.removeClass('f-animation-enabled').removeAttr('style');
			footerNode.removeClass('f-animation-enabled').removeAttr('style');
		}, 100);
	};

})();
