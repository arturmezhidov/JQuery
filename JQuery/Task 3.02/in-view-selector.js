$(function () {

	// New selector "inView"
	$.expr[":"].inView = function (obj) {
		var $el = $(obj);
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		var offset = $el.offset();
		var visibility = scrollTop <= offset.top && ($el.height() + offset.top) < (scrollTop + windowHeight);
		return visibility;
	};

	// Test example
	$("#bSelectorInView").on("click", function () {
		var color = $("#selectorInViewColors").val();
		$("div:inView").css("color", color);
	});
});