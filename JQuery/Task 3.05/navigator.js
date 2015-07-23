$(function () {

	// navigator function
	$.fn.initNavigator = function () {

		// find text inputs
		var inputs = this.find("input[type='text']");
		var i = 0;

		inputs.each(function () {

			// set index
			var index = i++;

			$(this).on("keydown ", function (e) {

				if (e.keyCode === 37 || e.keyCode === 38) {

					// calculate prev index of input
					var prevIndex = index > 0
						? index - 1
						: inputs.length - 1;

					// set focus
					inputs.eq(prevIndex).focus();

				} else if (e.keyCode === 39 || e.keyCode === 40) {

					// calculate next index of input
					var nextIndex = index < (inputs.length - 1)
						? index + 1
						: 0;

					// set focus
					inputs.eq(nextIndex).focus();
				}
			});
		});

		return this;
	};

	// Test example
	$(".table").initNavigator();
});