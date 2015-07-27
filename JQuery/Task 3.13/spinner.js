$(function () {

	// Spinner plugin
	$.fn.spinner = function (option) {

		var defaults = {
			value: 0,
			incStep: 1,
			decStep: 1,

			width: $(this).width(),
			height: 25,
			borderRadius: 5,
			borderColor: "#AAA",
			borderWidth: 1
		}

		option = $.extend(defaults, option);

		// calculate buttons size and position
		var padding = 4;
		var buttonHeight = option.height / 2;
		var arrowSize = buttonHeight - (padding * 2);
		var buttonWidth = (arrowSize * 2) + (padding * 2);

		// styles
		var spinnerStyle = {
			width: option.width + "px",
			height: option.height + "px",
			display: "inline-table",
			border: option.borderWidth + "px " + option.borderColor + " solid",
			"border-radius": option.borderRadius + "px",
			overflow: "hidden"
		}
		var inputStyle = {
			display: "table-cell",
			width: "100%",
			height: "100%",
			border: "none"
		}
		var buttonAreaStyle = {
			width: buttonWidth + "px",
			height: "100%",
			display: "table-cell",
			background: "#E9E9E9"
		}
		var buttonStyle = {
			width: "100%",
			height: "50%",
			cursor: "pointer",
			position: "relative"
		}
		var arrowStyle = {
			border: arrowSize + "px solid transparent",
			position: "absolute",
			right: padding + "px"
		}
		var arrowupStyle = {
			"border-bottom-color": "#888",
			"border-top": "0",
			bottom: padding + "px"
		}
		var arrowDownStyle = {
			"border-top-color": "#888",
			"border-bottom": "0",
			top: padding + "px"
		}

		// save input parent
		var inputParent = $(this).parent();

		// create spinner
		var spin = $("<div/>")
			.css(spinnerStyle)
			.appendTo(inputParent);

		// input (text box)
		var input = $(this)
			.css(inputStyle)
			.val(option.value)
			.appendTo(spin);

		// create buttons
		var buttonArea = $("<div/>")
			.css(buttonAreaStyle)
			.appendTo(spin);

		var buttonUp = $("<div/>")
			.css(buttonStyle)
			.appendTo(buttonArea);

		var buttonDown = $("<div/>")
			.css(buttonStyle)
			.appendTo(buttonArea);

		// create arrows
		$("<div/>")
			.css(arrowStyle)
			.css(arrowupStyle)
			.appendTo(buttonUp);

		$("<div/>")
			.css(arrowStyle)
			.css(arrowDownStyle)
			.appendTo(buttonDown);

		// events
		buttonUp.on("click", function () {
			var val = parseInt(input.val());
			if (isNaN(val)) {
				input.val("0");
			} else {
				input.val(val + option.incStep);
			}
		});
		buttonDown.on("click", function () {
			var val = parseInt(input.val());
			if (isNaN(val)) {
				input.val("0");
			} else {
				input.val(val - option.decStep);
			}
		});

		return $(this);
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