//REVIEW: If click many times on sort button selected item is changed (READY)
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

	$.fn.selectSort = function (options) {

		var $this = $(this);

		// options
		var defaults = {
			criterion: Criterion.TEXT,
			direction: Direction.ASC,
			dataType: DataType.STRING
		}

		options = $.extend(defaults, options);

		// get elements
		var selectItems = this.children("option");

		// determine the direction
		options.direction = options.direction === Direction.DESC
			? -1
			: 1;

		// create comparator
		var comparator = function (firstItem, secondItem) {

			var firstValue;
			var secondValue;

			if (options.criterion === Criterion.VALUE) {
				firstValue = $(firstItem).val();
				secondValue = $(secondItem).val();
			} else {
				firstValue = $(firstItem).text();
				secondValue = $(secondItem).text();
			}

			if (options.dataType === DataType.NUMBER) {
				if (isNaN(firstValue) || isNaN(secondValue)) {
					console.error("Error: sorting data not a number.");
					return false;
				}
				firstValue = parseInt(firstValue);
				secondValue = parseInt(secondValue);
			} else {
				firstValue = firstValue.toLowerCase();
				secondValue = secondValue.toLowerCase();
			}

			var result = firstValue > secondValue
				? options.direction
				: -(options.direction);

			return result;
		};

		// sorting
		var sortedList = $(selectItems).sort(comparator);

		// save selected item
		var selectedItem = $this.val();

		// add new sorted items
		this.append(sortedList);

		// set the selected item
		$this.val(selectedItem);

		// chaining
		return $this;
	}

	// Test example
	$("#bSelectSort").on("click", function() {

		var criterion = util.isChecked("rbSortCriteriaValue")
			? Criterion.VALUE
			: Criterion.TEXT;

		var direction = util.isChecked("rbSortDirAsc")
			? Direction.ASC
			: Direction.DESC;

		var dataType = util.isChecked("rbSortDataTypeNumber")
			? DataType.NUMBER
			: DataType.STRING;

		$("#select").selectSort({
			criterion: criterion, 
			direction: direction, 
			dataType: dataType
		});
	});
});