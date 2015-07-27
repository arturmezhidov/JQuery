$(function () {

	// ajax process show plugin
	$.fn.showAJAX = function (options) {

		var defaults = {
			isGlobal: true,
			isLocal: true
		}

		options = $.extend(defaults, options);

		var $log = $(this);

		if (options.isGlobal) {
			// global
			$(document)
				.ajaxStart(function () {
					$log.append("<p>ajaxStart (global).</p>");
				})
				.ajaxSend(function (event, jqxhr, settings) {
					$log.append("<p>ajaxSend (global): " + JSON.stringify(event) + ", " + JSON.stringify(jqxhr) + ", " + JSON.stringify(settings) + "</p>");
				})
				.ajaxStop(function () {
					$log.append("<p>ajaxStop (global).</p>");
				})
				.ajaxError(function (event, jqxhr, settings) {
					$log.append("<p>ajaxError (global): " + JSON.stringify(event) + ", " + JSON.stringify(jqxhr) + ", " + JSON.stringify(settings) + "</p>");
				})
				.ajaxComplete(function (event, jqxhr, settings) {
					$log.append("<p>ajaxComplete (global): " + JSON.stringify(event) + ", " + JSON.stringify(jqxhr) + ", " + JSON.stringify(settings) + "</p>");
				})
				.ajaxSuccess(function (event, jqxhr, settings) {
					$log.append("<p>ajaxSuccess (global): " + JSON.stringify(event) + ", " + JSON.stringify(jqxhr) + ", " + JSON.stringify(settings) + "</p>");
				});
		}

		if (options.isLocal) {
			// local
			$.ajax({
				beforeSend: function () {
					$log.append("<p>beforeSend (local).</p>");
				},
				complete: function () {
					$log.append("<p>complete (local).</p>");
				},
				success: function () {
					$log.append("<p>success (local).</p>");
				},
				error: function () {
					$log.append("<p>error (local).</p>");
				}
			});
		}

		return $log;
	}

	// Test example
	$("#ajaxLog").showAJAX();

	$("#example1").on("click", function () {
		$.ajax({
			url: "Task 3.11/ajax.txt",
			success: function (data) {
				alert(data);
			}
		});
	});
});
