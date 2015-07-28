$(function () {

	var keys = {
		KEY_LEFT: 37,
		KEY_UP: 38,
		KEY_RIGHT: 39,
		KEY_DOWN: 40
	}

	$.fn.navigator = function () {

		var $this = $(this);

		// find text inputs
		var inputs = this.find("input[type='text']");
		var i = 0;

		inputs.each(function () {

			// set index
			var index = i++;

			$(this).on("keydown", function (e) {

				//REVIEW: It would be great if you define enum for key codes
				if (e.keyCode === keys.KEY_LEFT || e.keyCode === keys.KEY_UP) {

					// calculate prev index of input
					var prevIndex = index > 0
						? index - 1
						: inputs.length - 1;

					// set focus
					inputs.eq(prevIndex).focus();

				} else if (e.keyCode === keys.KEY_DOWN || e.keyCode === keys.KEY_RIGHT) {

					// calculate next index of input
					var nextIndex = index < (inputs.length - 1)
						? index + 1
						: 0;

					// set focus
					inputs.eq(nextIndex).focus();
				}
			});
		});

		return $this;
	};

	// Test example
	$(".table").navigator();
});