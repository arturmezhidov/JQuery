$(function () {

	//NOTE: great
	// Accordion plugin
	$.fn.accordion = function () {

		//Better to use $this not accord. And in global better to use full noun - accordion than accord
		var accord = $(this);

		accord.children(".accordion-body").hide();

		accord.children(".accordion-head").on("click", function () {

			var body = $(this).next();

			if (body.is(":visible")) {
				body.slideUp();
			} else {
				accord.children(".accordion-body:visible").slideUp();
				body.slideDown();
			}
		});

		return accord;
	};

	// Test example
	$(".accordion").accordion();
});