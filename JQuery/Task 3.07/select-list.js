$(function () {

	// Create select-list
	$.fn.setList = function (arr) {
		if (!arr) {
			return this;
		}

		// get input
		var input = this;

		// create select-list
		var list = $("<ul />");
		for (var i = 0; i < arr.length; i++) {
			list.append("<li>" + arr[i] + "</li>");
		}

		// calculate position
		var width = input.width() + 2;
		var top = input.offset().top + input.height() + 5;
		var left = input.offset().left;

		// set style
		list.hide()
			.appendTo("body")
			.css({
				background: "white",
				border: "1px solid #999",
				position: "absolute",
				width: width,
				top: top,
				left: left
			});

		// initialize events for items
		var items = list.children("li");
		items.on("click", function () {
			input.val($(this).text());
		});

		// show/hide select-list
		input.on("focus", function () {
			list.show();
		});
		input.on("focusout", function () {
			list.hide(500);
		});

		return input;
	};

	// Test example
	var list = ["One", "Two", "Three"];
	$("#tbSelectList").setList(list);
});