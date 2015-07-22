$(function () {

	var Criterion = {
		VALUE: 0,
		TEXT: 1
	};

	var Direction = {
		ASC: 0,
		DESC: 1
	};

	var DataType = {
		NUMBER: 0,
		STRING: 1
	};

	$.fn.selectSort = function (criterion, direction, dataType) {

		// get elements
		var selectItems = this.children();

		// determine the direction
		direction = direction === Direction.DESC
			? -1
			: 1;

		// create comparator
		var comparator = function (firstItem, secondItem) {

			var firstValue;
			var secondValue;

			if (criterion === Criterion.VALUE) {
				firstValue = $(firstItem).val();
				secondValue = $(secondItem).val();
			} else {
				firstValue = $(firstItem).text();
				secondValue = $(secondItem).text();
			}

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
		var sortedList = $(selectItems).sort(comparator);

		// add new sorted items
		this.append(sortedList);

		// chaining
		return this;
	}

	// Test example
	$("#bSelectSort").on("click", function () {

		var criterion = util.isChecked("rbSortCriteriaValue")
			? Criterion.VALUE
			: Criterion.TEXT;

		var direction = util.isChecked("rbSortDirAsc")
			? Direction.ASC
			: Direction.DESC;

		var dataType = util.isChecked("rbSortDataTypeNumber")
			? DataType.NUMBER
			: DataType.STRING;

		$("#select").selectSort(criterion, direction, dataType);
	});
});