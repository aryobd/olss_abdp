var allowedSpecialCharKeyCodes = [46, 8, 37, 39, 35, 36, 9];
var numberKeyCodes = [44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
var commaKeyCode = [188];
var decimalKeyCode = [190, 110];

function numbersOnly(e) {
    //var legalKeyCode =
    //    (!event.shiftKey && !event.ctrlKey && !event.altKey)
    //        &&
    //    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, numberKeyCodes) >= 0);

    //if (legalKeyCode === false)
    //    event.preventDefault();
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function numbersAndCommasOnly(e) {
    //var legalKeyCode =
    //    (!event.shiftKey && !event.ctrlKey && !event.altKey)
    //        &&
    //    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, commaKeyCode) >= 0);

    //if (legalKeyCode === false)
    //    event.preventDefault();
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode == commaKeyCode)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function percentOnly(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

function decimalsOnly(e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode == commaKeyCode)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    //var legalKeyCode =
    //    (!event.shiftKey && !event.ctrlKey && !event.altKey)
    //        &&
    //    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, commaKeyCode) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, decimalKeyCode) >= 0);

    ///*Allow -*/
    //if (!legalKeyCode && !event.shiftKey && event.keyCode == 189)
    //    legalKeyCode = true;

    //if (legalKeyCode === false)
    //    event.preventDefault();
}

function currenciesOnly(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
      ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode == commaKeyCode)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
    //var legalKeyCode =
    //    (!event.shiftKey && !event.ctrlKey && !event.altKey)
    //        &&
    //    (jQuery.inArray(event.keyCode, allowedSpecialCharKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, numberKeyCodes) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, commaKeyCode) >= 0
    //        ||
    //    jQuery.inArray(event.keyCode, decimalKeyCode) >= 0);
    ///*
    //// Allow for $
    ////if (!legalKeyCode && event.shiftKey && event.keyCode == 52)
    ////    legalKeyCode = true;
    //*/
    ///*Allow -*/
    //if (!legalKeyCode && !event.shiftKey && event.keyCode == 189)
    //    legalKeyCode = true;

    //if (legalKeyCode === false)
    //    event.preventDefault();
}

$(document).ready(function () {

 
    /*accept only numeric when element type = 'number'*/
    $(".allownumericonly").on("keypress keyup blur", function (event) {
        event = event || window.event;
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            return false;
        }
        return true;
    });

    /*accept only numeric when element type = 'number'*/
    $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
        //this.value = this.value.replace(/[^0-9\.]/g,'');
        event = event || window.event;
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            return false;
        }
        return true;
    });

 
    $('.datepicker-input').prop('readonly', true);
  
 
    /* When control is empty, remove a class */
    $('.form-control').on("change", function () {
        $(this).removeClass('input-validation-error');
        //$('.field-validation-error').html('');
    });

    // tooltip
    $('a').tooltip();
});

// Convert string to Date
function strToDate(date, format, delimiter) {
	var formatLowerCase = format.toLowerCase();
	var formatItems = formatLowerCase.split(delimiter);
	var dateItems = date.split(delimiter);
	var monthIndex = formatItems.indexOf("mm");
	var dayIndex = formatItems.indexOf("dd");
	var yearIndex = formatItems.indexOf("yyyy");
	var month = parseInt(dateItems[monthIndex]);
	month -= 1;
	var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);

	return formatedDate;
}

function parseJsonDate(jsonDateString) {
	var value = new Date(parseInt(jsonDateString.replace(/(^.*\()|([+-].*$)/g, '')));
	var dateResult = '';
	var date = value.getDate();
	var month = value.getMonth() + 1;
	var year = value.getFullYear();

	if ((date + "").length == 1) {
		if ((month + "").length == 1) {
			dateResult = "0" + month + "/0" + date + "/" + year;
		}
		else {
			dateResult = month + "/0" + date + "/" + year;
		}
	}
	else {
		if ((month + "").length == 1) {
			dateResult = "0" + month + "/" + date + "/" + year;
		}
		else {
			dateResult = month + "/" + date + "/" + year;
		}
	}

	return dateResult;
}

//Scroll automatic to section [class*="scrollable"]
function goToTop() {
	$('section[class*="scrollable"]').animate({
		scrollTop: 0
	}, 700);
}

$(".numeric").keypress(function (e) {
	//if the letter is not digit then display error and don't type anything
	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		//display error message
		$("#errmsg").html("Digits Only").show().fadeOut("slow");
		return false;
	}
});

//prevent paste from right click mouse
$(".numeric").bind("paste", function (e) {
	e.preventDefault();
});

