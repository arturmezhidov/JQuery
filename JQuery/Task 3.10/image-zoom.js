$(function () {
	$.fn.magnifier = function (options) {

		// options
		var defaults = {
			size: 100,
			borderSize: 3,
			borderColor: "#ABCDEF"
		};

		options = $.extend(defaults, options);

		// styles
		var style = {
			display: "none",
			position: "absolute",
			"float": "left",

			width: String(options.size) + "px",
			height: String(options.size) + "px",

			"border-radius": String(options.size / 2 + options.borderSize) + "px",
			border: String(options.borderSize) + "px solid " + options.borderColor,

			"background-position": "0px 0px",
			"background-repeat": "no-repeat"
		};

		return this.each(function () {

			// parent size
			var width = $(this).width();
			var height = $(this).height();
			var top = $(this).offset().top;
			var left = $(this).offset().left;

			// source image
			var src = options.src
				? options.src
				: $(this).attr("src");

			// create magnifier
			var magni = $("<div/>").appendTo($("body"));
			magni.css(style);
			magni.css("background-image", "url('" + src + "')");

			// calculate ratio
			var widthRatio = 0;
			var heightRatio = 0;

			$("<img />").attr("src", src)
						.load(function () {
							widthRatio = $(this).width() / width;
							heightRatio = $(this).height() / height;
						})
						.hide()
						.appendTo($(this).parent());

			function setPosition(e) {

				var leftPos = parseInt(e.pageX - left);
				var topPos = parseInt(e.pageY - top);

				if (leftPos < 0 || topPos < 0 || leftPos > width || topPos > height) {
					magni.hide();
				}
				else {
					leftPos = String(((e.pageX - left) * widthRatio - magni.width() / 2) * (-1));
					topPos = String(((e.pageY - top) * heightRatio - magni.height() / 2) * (-1));

					magni.css({
						backgroundPosition: leftPos + "px " + topPos + "px"
					});

					leftPos = String(e.pageX - magni.width() / 2);
					topPos = String(e.pageY - magni.height() / 2);

					magni.css({
						left: leftPos + "px",
						top: topPos + "px"
					});

					magni.show();
				}
			}

			magni.mousemove(setPosition);
			$(this).mousemove(setPosition);
		});
	};

	// Test example
	$("#img-zoom").magnifier({ size: 200 });
});