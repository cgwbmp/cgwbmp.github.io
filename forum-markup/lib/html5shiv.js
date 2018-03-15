//HTML5 support
(function () {
	if (window.HTMLCanvasElement) return;
	var e = 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video'.split(' ');
	var i = e.length;
	while (i--) {
		document.createElement(e[i]);
	};
})();
