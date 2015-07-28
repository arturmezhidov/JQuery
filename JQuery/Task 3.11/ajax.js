//REVIEW: BLOCKED: https://db.tt/1GEPKAsL
$(function () {

	// ajax process show plugin
	$.fn.AJAXProcess = function (options) {

		var defaults = {
			isGlobal: true,
			isLocal: true
		}

		var $log = $(this);

		$log.options = $.extend(defaults, options);

		if ($log.options.isGlobal) {
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
				.ajaxComplete(function (event) {
					$log.append("<p>ajaxComplete (global): " + JSON.stringify(event) + "</p>");
				})
				.ajaxSuccess(function (event) {
					$log.append("<p>ajaxSuccess (global): " + JSON.stringify(event) + "</p>");
				})
			;
		}

		if ($log.options.isLocal) {
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
	$("#ajaxLog").AJAXProcess();

	$("#example1").on("click", function () {
		$.ajax({
			url: "Task 3.11/ajax.txt",
			success: function (data) {
				alert(data);
			}
		});
	});
});
