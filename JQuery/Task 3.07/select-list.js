$(function () {

	//REVIEW: noun
	//REVIEW: it would be nice if mouse pointer changed over list of elements
	//REVIEW: it would be great if elements change when mouse pointer over them
	// Create select-list
	$.fn.setList = function (arr) {
		if (!arr) {
			return this;
		}

		//NOTE: It would be great if styles be placed in *.css file like previously
		var style = {
			background: "white",
			border: "1px solid #999",
			position: "absolute"
		}

		// get input
		var input = this;

		// create select-list
		var list = $("<ul />");
		for (var i = 0; i < arr.length; i++) {
			list.append("<li>" + arr[i] + "</li>");
		}

		// set style
		list.hide()
			.appendTo("body")
			.css(style);

		// calculate position and show
		var show = function () {
			var width = input.width() + 2;
			var top = input.offset().top + input.height() + 5;
			var left = input.offset().left;
			list.css({
				width: width,
				top: top,
				left: left
			});
			list.show();
		}

		// initialize events for items
		var items = list.children("li");
		items.on("click", function () {
			input.val($(this).text());
		});

		// show/hide select-list
		input.on("focus", function () {
			show();
		});
		input.on("click", function () {
			show();
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