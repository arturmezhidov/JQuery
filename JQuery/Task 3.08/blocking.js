$(function () {

	//NOTE: no need to update but commonly another behaviour should be implemented. should be something like that: http://malsup.com/jquery/block/#demos
	// create plugin blocking user interface
	$.fn.block = function (options) {

		var defaults = {
			text: "Unknow information",
			delay: 800
		}

		options = $.extend(defaults, options);

		var userInterface = this;
		var msg = $("<p blocked='blocked-msg'></p>");

		// blocked
		userInterface.find('*').prop('disabled', true);
		msg.text(options.text);

		// unblock
		setTimeout(function () {
			userInterface.find("*").prop("disabled", false);
			msg.remove();
		}, options.delay);

		this.append(msg);

		return $(this);
	}

	// Test example
	$("#bBlock").on("click", function () {

		var delay = $("#tbBlockingDelay").val();

		if (!isNaN(delay)) {

			delay = parseInt(delay) * 1000;

			var option = {
				text: "Blocking message",
				delay: delay
			}

			$(".user-interface").block(option);
		}
	});
});