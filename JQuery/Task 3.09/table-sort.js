$(function () {

	// ReSharper disable once InconsistentNaming
	var Direction = {
		ASC: 0,
		DESC: 1
	};

	// ReSharper disable once InconsistentNaming
	var DataType = {
		NUMBER: 0,
		STRING: 1
	};

	// Sorter plugin for table
	$.fn.tableSort = function (columnIndex, direction, dataType) {

		// get rows
		var rows = this.find("tr").slice(1);

		// determine the direction
		direction = direction === Direction.DESC
			? -1
			: 1;

		// create comparator
		var comparator = function (firstItem, secondItem) {

			var firstValue = $(firstItem).children().eq(columnIndex).text();
			var secondValue = $(secondItem).children().eq(columnIndex).text();

			if (dataType === DataType.NUMBER) {
				firstValue = parseInt(firstValue);
				secondValue = parseInt(secondValue);
			} else {
				firstValue = firstValue.toLowerCase();
				secondValue = secondValue.toLowerCase();
			}

			var result = firstValue > secondValue
				? direction
				: -direction;

			return result;
		};

		// sorting
		var sortedRows = rows.sort(comparator);

		// add new sorted rows
		rows.parent().append(sortedRows);

		// chaining
		return this;
	};

	// Test example
	$("#bTableSort").on("click", function () {

		var columnIndex = parseInt($("#tbTableColumnIndex").val());

		var direction = util.isChecked("rbTableSortDirAsc")
			? Direction.ASC
			: Direction.DESC;

		var dataType = util.isChecked("rbTableSortDataTypeNumber")
			? DataType.NUMBER
			: DataType.STRING;

		$("#table-sort").tableSort(columnIndex, direction, dataType);
	});
});