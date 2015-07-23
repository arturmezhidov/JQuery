$(function () {

	// create plugin blocking user interface
	$.fn.block = function (text, delay) {

		var userInterface = this;
		var msg = $("<p blocked='blocked-msg'></p>");

		setTimeout(function () {
			userInterface.find('*').prop('disabled', true);
			msg.text(text);
		}, delay);

		msg.text("Blocking...");

		this.append(msg);
	}

	// create plugin unblocking user interface
	$.fn.unblock = function () {
		$(this).find("*").prop("disabled", false);
		$(this).find("p[blocked='blocked-msg']").remove();
	}

	// Test example
	$("#bBlock").on("click", function () {
		$(".user-interface").block("Blocking message", 1000);
	});
	$("#bUnblock").on("click", function () {
		$(".user-interface").unblock();
	});
});