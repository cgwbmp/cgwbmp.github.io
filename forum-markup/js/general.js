;(function () {

	// set min width for #page
	if (window.innerHeight) document.getElementById('page').style.minHeight = window.innerHeight +'px';

	$(function () {
		// menu: open action
		$('.e-open-menu').on('click', function () {
			$('#menu').addClass('f-opened');
			$('body').addClass('f-menu-opened');
		});
		// menu: close action
		$('.e-close-menu').on('click', function () {
			setTimeout(function () {
				$('#menu').removeClass('f-opened');
				$('body').removeClass('f-menu-opened');
			}, 50);
		});
		// swiper
		$('.e-swiper').each(function () {
			var item = $(this);
			var swiper = new Swiper(item.find('.swiper-container')[0], {
				loop: true,
				pagination: {
					el: item.find('.swiper-pagination')[0],
					type: 'fraction',
				},
				navigation: {
					nextEl: item.find('.swiper-button-next')[0],
					prevEl: item.find('.swiper-button-prev')[0],
				}
			});
		});
		// regular swiper
		var swipers = new Swiper('.e-regular-swiper', {
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
		});
		// image control
		$('.e-image-control').each(function () {
			var items = $(this).find('.e-image-control--item');
			var buttons = $(this).find('.e-image-control--button');
			var images = $();
			buttons.each(function () {
				images = images.add( $(this.getAttribute('data-image')) );
			});
			buttons.on('click', function () {
				items.removeClass('f-active');
				images.removeClass('f-active');
				$(this).closest('.e-image-control--item').addClass('f-active');
				$(this.getAttribute('data-image')).addClass('f-active');
			});
		});
		// image control: init
		$('.e-image-control--button').first().click();
	});

})();
