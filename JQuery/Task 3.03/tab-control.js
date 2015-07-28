$(function () {

	// Create TabControl function
	$.fn.tabControl = function (pages, selectIndex) {

		var $this = $(this);

		$this.pages = pages || [];

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
		tab.addClass("tab-control");
		headContainer.addClass("tab-head-container");

		headContainer.children("li").addClass("tab-head");
		pageContainer.children("div").addClass("tab-page");

		// select
		headContainer.children("li").eq(selectIndex || 0).addClass("head-current");
		pageContainer.children("div").eq(selectIndex || 0).addClass("page-current");

		// initialize events
		tab.delegate(".tab-head:not(.head-current)", "click", function () {
			$(this).addClass("head-current")
				.siblings()
				.removeClass("head-current")
				.parents(".tab-control")
				.find(".tab-page")
				.eq($(this).index())
				.fadeIn(0)
				.siblings(".tab-page")
				.hide();
		});

		// clear childs
		$this.empty();

		// append to parent
		tab.appendTo(this);

		// Set/Get page text function
		$this.pageText = function (index, text) {

			var page = $this.find(".page-item__").eq(index);

			if (arguments.length === 1) {
				return page.text();
			}

			page.text(text);

			return $this;
		}

		return $this;
	}

	// Test example
	$("#bTabControl").on("click", function () {
		var strPages = $("#tbTabControl").val();
		var pagesName = strPages.match(/[\S]+/g);
		var selectIndex = parseInt($("#tbTabControlSelect").val()) - 1;

		// create TabControl
		var tab = $("#tab-control").tabControl(pagesName, selectIndex);

		// set text
		for (var i = 0; i < pagesName.length; i++) {
			tab.pageText(i, "Here the text of the page: " + pagesName[i]);
		}
	});
});