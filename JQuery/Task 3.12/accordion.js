$(function () {

	// Accordion plugin
	$.fn.accordion = function () {

		var accord = $(this);

		accord.children(".accordion-body").hide();

		accord.children(".accordion-head").click(function () {

			var body = $(this).next();

			if (body.is(":visible")) {
				body.slideUp();
			} else {
				accord.children(".accordion-body:visible").slideUp();
				body.slideDown();
			}
		});
	};

	// Test example
	$(".accordion").accordion();
});