$(function () {

	//NOTE: here you use noun and this is great!
	// ToolTip
	$.fn.toolTip = function (text, options) {

		// style for tooltip
		var defaults = {
			background: "gray",
			color: "#f0f000",
			opacity: "0.7",
			align: "left",
			delay: 800
		}

		//REVIEW: I think better to save options in $this.options
		options = $.extend(defaults, options);

		// get text for tooltip
		//REVIEW: var $this = $(this)
		text = text || $(this).attr("title");

		// remove element title
		$(this).removeAttr("title");

		this.each(function () {

			// create tooltip
			var tooltip = $("<div class='tool-tip' />");

			// create event handlers
			var inHandler = function () {
				tooltip.hide()
					.appendTo('body')
					.html(text)
					.hide()
					.css({
						'background-color': options.background,
						'color': options.color,
						'opacity': options.opacity,
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

		//REVIEW: return $this
		return this;
	};

	// Test example
	var title = "Title of ToolTip<br />New line text";

	var options = {
		background: "#111",
		color: "green",
		align: "right",
		delay: 500
	};

	$("#tool-tip-element").toolTip(title, options);
});
