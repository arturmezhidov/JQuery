//NOTE: https://db.tt/arylKc8k incorrect color. This is not an issue but influence on impression :)

$(function () {

	// New selector "inView"
	$.expr[":"].inView = function (obj) {
		//NOTE: better to use $element than $el
		var $el = $(obj);
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		var offset = $el.offset();
		var visibility = scrollTop <= offset.top && ($el.outerHeight() + offset.top) < (scrollTop + windowHeight);
		return visibility;
	};

	// Test example
	$("#bSelectorInView").on("click", function () {
		var color = $("#selectorInViewColors").val();
		$("div:inView").css("color", color);
	});
});