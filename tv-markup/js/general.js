//mobile detect
/**
 * window.isMobile (http://detectmobilebrowser.com/)
 **/
(function (a) {
	window.isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
})(navigator.userAgent||navigator.vendor||window.opera);

//page set
(function () {
	document.body.className += (isMobile) ? ' f-mobile' : ' f-desktop';
	if (window.innerHeight && isMobile) document.getElementById('page').style.height = window.innerHeight +'px';
})();



//functions
(function () {

	var hassvg = function (ar) {
		if (!Modernizr.svg) return false;

		ar.each(function () {
			if (this.pi_hassvg) return;

			this.src = this.src.replace(/\.(png|jpg|jpeg)/i, '.svg');

			this.pi_hassvg = true;
		});
	};

	window.pi_fn_hassvg = hassvg;

	var autoheight = function (ar) {
		ar.each(function () {
			var el = $(this),
				prev = el.prevAll(),
				next = el.nextAll(),
				top = 0,
				bottom = 0,
				font = (window.getComputedStyle) ? parseInt(window.getComputedStyle(document.body, null).fontSize) : 1;

			prev.each(function () {
				top += $(this).outerHeight(true);
			});
			next.each(function () {
				bottom += $(this).outerHeight(true);
			});

			if (window.getComputedStyle) {
				el.css('top', top/font + 'em').css('bottom', bottom/font + 'em');
			} else {
				el.css('top', top + 'px').css('bottom', bottom + 'px');
			};

		});
	};

	window.pi_fn_autoheight = autoheight;

	var autoratio = function (ar) {
		ar.each(function () {
			if (this.pi_autoratio) return;

			var el = $(this),
				child = el.children(),
				k = el.children().length-1,
				s_ar = [],
				s_total = 0,
				min = 12;

			child.each(function (i) {
				s_ar[i] = parseInt($(this).text());
				s_total += s_ar[i];
			});

			child.each(function (i) {
				var width = (s_ar[i]/s_total)*100;
				width = (width < min) ? min : (width > 100-min) ? 100-min : width;
				$(this).css('width', width +'%');
			});

			this.pi_autoratio = true;
		});
	};

	window.pi_fn_autoratio = autoratio;

	var autocolorgrade = function (ar) {
		ar.each(function () {
			if (this.pi_autocolorgrade) return;

			var el = $(this),
				child = el.find(this.getAttribute('data-autocolorgrade-el')),
				color = this.getAttribute('data-autocolorgrade').split(','),
				step1,
				step2;

			for (var i=0, l=color.length; i<l; i++) {
				color[i] = parseInt(color[i]);
			};

			step1 = Math.floor(color[0]/2/child.length);
			step2 = Math.floor(color[2]/3/child.length);

			child.each(function () {
				var new_color = color;
				new_color[0] -= step1;
				new_color[2] += step2;

				$(this).css('background-color', 'rgb('+ new_color.join(',') +')');
			});

			this.pi_autocolorgrade = true;
		});
	};

	window.pi_fn_autocolorgrade = autocolorgrade;

	var openmenu = function (ar) {
		ar.each(function () {
			if (this.pi_openmenu) return;

			var el = $(this),
				h = $(this.getAttribute('data-openmenu')),
				is_open = false,
				is_blocked = false,
				fn_open = function () {
					is_open = true;

					el.addClass('f-active');
					h.addClass('f-active');

					setTimeout(function () {
						$(document).bind('click', fn_clickcencel);
					}, 20);
				},
				fn_close = function () {
					is_open = false;

					el.removeClass('f-active');
					h.removeClass('f-active').addClass('f-hidemenu');
					
					setTimeout(function () {
						h.removeClass('f-hidemenu')
					}, 200);

					$(document).unbind('click', fn_clickcencel);
				},
				fn_clickcencel = function () {
					if (!is_open) return;

					if (!is_blocked) {
						fn_close();
					};

					is_blocked = false;
				};

			el.bind('click', function () {
				if (is_open) {
					fn_close();
				} else {
					fn_open();
				};
			});

			h.bind('click', function (event) {
				is_blocked = true;
			});

			this.pi_openmenu = true;
		});
	};

	window.pi_fn_openmenu = openmenu;

	var scrollblock = function (ar) {
		ar.each(function () {
			if (this.pi_scrollblock) return;

			var event_start = (Modernizr.touch) ? 'touchstart' : 'mousedown',
				event_move = (Modernizr.touch) ? 'touchmove' : 'mousemove',
				event_end = (Modernizr.touch) ? 'touchend' : 'mouseup';

			var el = $(this),
				x = 0,
				y = 0,
				x_start = 0,
				y_start = 0,
				x_cur = 0,
				y_cur = 0,
				x_max = 0,
				y_max = 0,
				tr_start = false,
				tr_move = false,
				tr_block = false,
				fn_start = function (event) {
					tr_start = true;

					if (event.originalEvent.touches) {
						event.pageX = event.originalEvent.touches[0].pageX;
						event.pageY = event.originalEvent.touches[0].pageY;
					};

					x = el.scrollLeft();
					y = el.scrollTop();
					x_max = el[0].scrollWidth - el[0].clientWidth;
					y_max = el[0].scrollHeight - el[0].clientHeight;

					x_start = event.pageX;
					y_start = event.pageY;

					$(document).bind(event_move, fn_move);
				},
				fn_move = function (event) {
					tr_move = true;

					if (event.originalEvent.touches) {
						event.pageX = event.originalEvent.touches[0].pageX;
						event.pageY = event.originalEvent.touches[0].pageY;
					};

					if (x_max) x_cur = x - (event.pageX - x_start);
					if (y_max) y_cur = y - (event.pageY - y_start);

					if (x_max && x_cur > 0 && x_cur < x_max) el.scrollLeft(x_cur);
					if (y_max && y_cur > 0 && y_cur < y_max) el.scrollTop(y_cur);

					event.preventDefault();
				},
				fn_end = function (event) {
					tr_start = false;
					tr_move = false;
					tr_block = false;

					$(document).unbind(event_move, fn_move);

					tr_block = (Math.abs(x-x_cur) > 10);
				};

			el.bind(event_start, fn_start);
			$(document).bind(event_end, fn_end);

			el.bind('click', function () {
				if (tr_block) return false;
			});

			this.pi_scrollblock = true;
		});
	};

	window.pi_fn_scrollblock = scrollblock;

	var oneheight = function (ar) {
		ar.each(function () {
			var el = $(this),
				child = el.find('.e-oneheight-item');

			if (!child.length) return;

			var max = 0,
				height = 0;

			child.css('min-height', '');

			child.each(function (i) {
				height = $(this).height();
				max = (height > max) ? height : max;
			});

			child.css('min-height', max);
		});
	};

	window.pi_fn_oneheight = oneheight;

})();



//init
(function () {

	//ready
	$(function () {

		pi_fn_hassvg( $('.e-hassvg') );
		pi_fn_oneheight( $('.e-oneheight') );
		pi_fn_autoheight( $('.e-autoheight') );
		pi_fn_autoratio( $('.e-autoratio') );
		pi_fn_autocolorgrade( $('.e-autocolorgrade') );
		pi_fn_openmenu( $('.e-openmenu') );
		pi_fn_scrollblock( $('.e-scrollblock') );

	});

	//load
	$(window).bind('load', function () {

		pi_fn_oneheight( $('.e-oneheight') );
		pi_fn_autoheight( $('.e-autoheight') );

	});

	//resize
	$(window).bind('resize', function () {

		pi_fn_oneheight( $('.e-oneheight') );
		pi_fn_autoheight( $('.e-autoheight') );

	});

})();
