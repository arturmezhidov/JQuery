//REVIEW: If click many times on sort button selected item is changed
//NOTE: code looks good

$(function () {

	// ReSharper disable once InconsistentNaming
	var Criterion = {
		VALUE: 0,
		TEXT: 1
	};

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

	$.fn.selectSort = function (criterion, direction, dataType) {

		// get elements
		var selectItems = this.children("option");

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
				//REVIEW: Possibly need to add console error when value not a number
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
		return $(this);
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

		//NOTE: Better to pass as one parameter: options {criterion: criterion, direction: direction, ...}
		$("#select").selectSort(criterion, direction, dataType);
	});
});