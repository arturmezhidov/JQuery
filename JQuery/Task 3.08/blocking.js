$(function () {

	//NOTE: no need to update but commonly another behaviour should be implemented. should be something like that: http://malsup.com/jquery/block/#demos
	// create plugin blocking user interface
	$.blockUI = function (options) {

		var defaults = {
			message: "Unknow information",
			delay: 800
		}

		options = $.extend(defaults, options);

		// background
		var background = $("<div />")
			.addClass("blockUI-background")
			.width($(document).width())
			.height($(document).height())
			.appendTo("body");

		// alerter
		var alerter = $("<div />")
			.addClass("blockUI-alerter")
			.appendTo(background);

		// calculate position for alerter 
		var top = ($(window).height() / 2) - alerter.height();
		var left = ($(window).width() / 2) - (alerter.width() / 2);

		alerter.css({
			top: top + "px",
			left: left + "px"
		});

		// message of alerter
		$("<p />")
			.addClass("blockUI-message")
			.append(options.message)
			.appendTo(alerter);
	 
		// unblock
		setTimeout(function () {
			background.remove();
		}, options.delay);
	}

	// Test example
	$("#bBlock").on("click", function () {

		var message = $("#tbBlockingMessage").val();
		var delay = $("#tbBlockingDelay").val();

		if (!isNaN(delay)) {

			delay = parseInt(delay) * 1000;

			var option = {
				message: message,
				delay: delay
			}

			$.blockUI(option);
		}
	});
});