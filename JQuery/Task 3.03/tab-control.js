﻿$(function () {

	// Create TabControl function
	$.fn.createTabControl = function (params, pages) {

		// create elements
		var tab = $("<div/>");
		var headContainer = $("<ul/>");
		var pageContainer = $("<div/>");

		headContainer.appendTo(tab);
		pageContainer.appendTo(tab);

		for (var i = 0; i < pages.length; i++) {
			headContainer.append("<li class='head-item__'>" + pages[i] + "</li>");
			pageContainer.append("<div class='page-item__'></div>");
		}

		// add classes
		tab.addClass(params.tab);
		headContainer.addClass(params.headContainer);

		headContainer.children("li").addClass(params.head);
		pageContainer.children("div").addClass(params.page);

		// select
		headContainer.children("li").eq(params.select || 0).addClass(params.headSelected);
		pageContainer.children("div").eq(params.select || 0).addClass(params.pageSelected);

		// initialize events
		tab.delegate("." + params.head + ":not(." + params.headSelected + ")", 'click', function () {
			$(this).addClass(params.headSelected)
				.siblings()
				.removeClass(params.headSelected)
				.parents("." + params.tab)
				.find("." + params.page)
				.eq($(this).index())
				.fadeIn(0)
				.siblings("." + params.page)
				.hide();
		});

		// append to parent
		tab.appendTo(this);
	}

	// Set/Get page text function
	$.fn.pageText = function (index, text) {

		var page = this.find(".page-item__").eq(index);

		if (arguments.length === 1) {
			return page.text();
		}

		page.text(text);

		return this;
	}

	// Test example
	$("#bTabControl").on("click", function () {
		var strPages = $("#tbTabControl").val();
		var pagesName = strPages.match(/[\S]+/g);
		var selectindex = parseInt($("#tbTabControlSelect").val()) - 1;

		var classes = {
			tab: "tab-control",
			headContainer: "tab-head-container",
			head: "tab-head",
			headSelected: "head-current",
			page: "tab-page",
			pageSelected: "page-current",
			select: selectindex
		};

		// clear childs
		$("#tab-control").empty();

		// create TabControl
		$("#tab-control").createTabControl(classes, pagesName);

		// set text
		for (var i = 0; i < pagesName.length; i++) {
			$("#tab-control").pageText(i, "Here the text of the page: " + pagesName[i]);
		}
	});
});