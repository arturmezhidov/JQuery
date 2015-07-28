//REVIEW: BLOCKED: couldn't be tested https://db.tt/5aYcXe6s
$(function () {

	// Spinner plugin
	$.fn.spinner = function (option) {

		var $this = $(this);

		var defaults = {
			value: 0,
			incStep: 1,
			decStep: 1,

			width: $this.width(),
			height: 25,
			borderRadius: 5,
			borderColor: "#AAA",
			borderWidth: 1
		}

		$this.option = $.extend(defaults, option);

		// calculate buttons size and position
		var padding = 4;
		var buttonHeight = $this.option.height / 2;
		var arrowSize = buttonHeight - (padding * 2);
		var buttonWidth = (arrowSize * 2) + (padding * 2);

		// create spinner
		var spin = $("<div/>")
			.addClass("spinner")
			.css({
				width: $this.option.width + "px",
				height: $this.option.height + "px",
				border: $this.option.borderWidth + "px " + $this.option.borderColor + " solid",
				"border-radius": $this.option.borderRadius + "px"
			})
			.appendTo($this.parent());

		// input (text box)
		var input = $this
			.addClass("spinner-input")
			.val($this.option.value)
			.appendTo(spin);

		// create buttons
		var buttonArea = $("<div/>")
			.addClass("spinner-button-area")
			.css("width", buttonWidth)
			.appendTo(spin);

		var buttonUp = $("<div/>")
			.addClass("spinner-button")
			.appendTo(buttonArea);

		var buttonDown = $("<div/>")
			.addClass("spinner-button")
			.appendTo(buttonArea);

		// create arrows
		$("<div/>")
			.addClass("spinner-arrow")
			.addClass("spinner-arrow-up")
			.css({
				right: padding + "px",
				"border-width": arrowSize + "px",
				bottom: padding + "px"
			})
			.appendTo(buttonUp);

		$("<div/>")
			.addClass("spinner-arrow")
			.addClass("spinner-arrow-down")
			.css({
				right: padding + "px",
				"border-width": arrowSize + "px",
				top: padding + "px"
			})
			.appendTo(buttonDown);

		// events
		buttonUp.on("click", function () {
			var val = parseInt(input.val());
			if (isNaN(val)) {
				input.val("0");
			} else {
				input.val(val + $this.option.incStep);
			}
		});
		buttonDown.on("click", function () {
			var val = parseInt(input.val());
			if (isNaN(val)) {
				input.val("0");
			} else {
				input.val(val - $this.option.decStep);
			}
		});

		return $this;
	};

	// Test example
	// without options
	$("#spinner1").spinner();
	// with options
	var options = {
		value: 10,
		incStep: 5,
		decStep: 3,

		width: 500,
		height: 40,
		borderRadius: 7,
		borderColor: "#BA0",
		borderWidth: 2
	}
	$("#spinner2").spinner(options);
});