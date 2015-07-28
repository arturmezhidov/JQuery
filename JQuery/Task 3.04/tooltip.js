$(function () {

	//NOTE: here you use noun and this is great!
	// ToolTip
	$.fn.toolTip = function (text, options) {

		// style for tooltip
		var defaults = {
			color: "#f0f000",
			align: "left",
			delay: 800
		}

		var $this = $(this);

		// options
		$this.options = $.extend(defaults, options);

		// get text for tooltip
		text = text || $this.attr("title");

		// remove element title
		$this.removeAttr("title");

		$this.each(function () {

			// create tooltip
			var tooltip = $("<div class='tool-tip' />");

			// create event handlers
			var inHandler = function () {
				tooltip.hide()
					.appendTo('body')
					.html(text)
					.hide()
					.css({
						'color': options.color,
						"text-align": options.align
					})
					.fadeIn(options.delay);
			};
			var outHandler = function () {
				tooltip.remove();
			};
			var moveHandler = function (e) {
				tooltip.css({
					top: e.pageY + 10,
					left: e.pageX + 10
				});
			};

			// set event handlers
			$(this).hover(inHandler, outHandler);
			$(this).mousemove(moveHandler);
		});

		return $this;
	};

	// Test example
	var title = "Title of ToolTip<br />New line text";

	var options = {
		color: "green",
		align: "right",
		delay: 500
	};

	$("#tool-tip-element").toolTip(title, options);
});
