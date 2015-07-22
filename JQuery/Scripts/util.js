var util = {

	parseArray: function (stringArray) {
		if (!stringArray) {
			return undefined;
		}

		var regExNumber = /(-)?[0-9]+(\.[0-9])?/g; /* Integer and float numbers */

		var regExResult = stringArray.match(regExNumber);

		if (!regExResult) {
			return undefined;
		}

		var arr = [];
		regExResult.forEach(function (item) {
			arr.push(parseFloat(item));
		});

		return arr;
	},

	getValue: function (id) {
		var control = document.getElementById(id);
		if (control) {
			return control.value;
		}
		return undefined;
	},

	setValue: function (id, value) {
		var control = document.getElementById(id);
		if (control) {
			if (control.style.visibility !== "visible") {
				control.style.visibility = "visible";
			}
			control.innerHTML = value;
		}
	},

	setError: function (id, message) {
		var control = document.getElementById(id);
		if (control) {
			if (control.style.visibility !== "visible") {
				control.style.visibility = "visible";
			}
			control.innerHTML = "<span class='error'>" + message + "</span>";
		}
	},

	isChecked: function (id) {
		var control = document.getElementById(id);
		if (control) {
			return control.checked;
		}
		return undefined;
	}
};