// Handle For Percentage Masking With 6 Decimal Digits
var ContainPoint = false;
var LastPoint = 0;
$(".percentage").bind('input propertychange', function() {
    if (isNaN($(this).val().replace(/,/gi, '')))
        $(this).val("");
    else
        AddDecimalSeperator($(this));
});
$(".percentage").keydown(function(event) {
    if (event.keyCode == 32)
        event.preventDefault();
    else if (!event.ctrlKey && ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222))
        event.preventDefault();
    else if (event.shiftKey && (event.keyCode >= 48 && event.keyCode <= 57))
        event.preventDefault();
    else if (!event.shiftKey) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 110 || event.keyCode == 190) {
            if (parseFloat($(this).val()) >= 100)
                event.preventDefault();
            if ($(this).val().split(".").length > 1) {
                if (event.keyCode == 110 || event.keyCode == 190)
                    event.preventDefault();
                if ($(this).val().split(".")[1].length >= 6)
                    event.preventDefault();
            }
            if (parseFloat($(this).val()) == 0 && !(event.keyCode == 110 || event.keyCode == 190) && $(this).val().indexOf(".") < 0)
                event.preventDefault();
        }
        else if (event.keyCode == 8 || event.keyCode == 46) {
            if ($(this).val().indexOf(".") >= 0) {
                ContainPoint = true;
                LastPoint = $(this).val().indexOf(".");
            }
            else {
                ContainPoint = false;
                LastPoint = 0;
            }
        }
    }
});
function AddDecimalSeperator(jInputControl) {
    var value = jInputControl.val();
    if (value.indexOf(".") == 0) {
        jInputControl.val(null);
    }

    if (value.indexOf(".") < 0 && parseFloat(value) > 100) {
        if (!ContainPoint) {
            var i = 0;
            while (parseFloat(value) > 100) {
                value = value.replace(".", "");
                value = value.substr(0, value.length - (1 + i)) + "." + value.substr(value.length - (1 + i), value.length);
                i++;
            }
            value = value.split(".")[0] + "." + value.split(".")[1].substr(0, 6);
            jInputControl.val(value);
        }
        else if (ContainPoint) {
            jInputControl.val(value.substr(0, LastPoint) + "." + value.substr(LastPoint, value.length));
        }
    }
    else if (value.indexOf(".") >= 0 && parseFloat(value) > 100) {
        if (!ContainPoint) {
            var i = 0;
            while (parseFloat(value) > 100) {
                value = value.replace(".", "");
                value = value.substr(0, value.length - (1 + i)) + "." + value.substr(value.length - (1 + i), value.length);
                i++;
            }
            value = value.split(".")[0] + "." + value.split(".")[1].substr(0, 6);
            jInputControl.val(value);
        }
        else if (ContainPoint) {
            jInputControl.val(value.substr(0, LastPoint) + "." + value.substr(LastPoint, value.length));
        }
    }
}
// End Handle For Percentage Masking With 6 Decimal Digits