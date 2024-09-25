
$(".numeric").keypress(function(e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$(".numeric").bind("paste", function(e) {
    e.preventDefault();
});


// For adding thousand separator into input text
// parameter: jquery input object
function AddThousandSeperator(jInputControl) {
    var lastPos = jInputControl[0].selectionStart;
    var lastSep = jInputControl.val().split(',').length - 1;
    var num = jInputControl.val().replace(/,/gi, "").split("").reverse().join("");
    var num2 = RemoveRougeChar(num.replace(/(.{3})/g, "$1,").split("").reverse().join(""));
    jInputControl.val(num2);
    var newSep = jInputControl.val().split(',').length - 1;
    if (lastSep !== newSep)
        lastPos += (newSep - lastSep);
    jInputControl[0].selectionStart = lastPos;
    jInputControl[0].selectionEnd = lastPos;
}

// for removing rouge char
// parameter: string to remove rouge char
function RemoveRougeChar(convertString) {
    if (convertString.substring(0, 1) === ",")
        return convertString.substring(1, convertString.length);
    return convertString;
}

$(".currency").bind('input propertychange', function() {
    if (isNaN($(this).val().replace(/,/gi, '')))
        $(this).val("");
    else
        AddThousandSeperator($(this));
});

$(".currency").keydown(function(event) {
    if (!event.ctrlKey && ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222))
        event.preventDefault();
    else if (event.shiftKey && (event.keyCode >= 48 && event.keyCode <= 57))
        event.preventDefault();
});

// Set thousand separator for input text
function ThousandSeparatorSetUp(object) {
    for (index = 0; index < object.length; index++) {
        var id = "#" + $(object[index]).attr('id');
        var value = $(object[index]).val().replace(/,/g, "");
        $(id).autoNumeric('init', { vMin: '-9999999999999999999', vMax: '9999999999999999999' });
        $(id).autoNumeric('set', value);
    }
}

function ClearIntegerThousandSeparator(object) {
    var localeSeparator = GetLocaleGroupingSeparator();

    for (index = 0; index < object.length; index++) {
        $(object[index]).val(object[index].value.replace(localeSeparator, ""));
    }
}

function GetLocaleGroupingSeparator() {
    var number = 1777;

    var sp = number.toLocaleString();
    if (sp.length > 4) {
        var idx = sp.indexOf("777");
        return sp.substring(1, idx);
    }
    return '';
}

$(".numericPhone").keypress(function(e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 32) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});



//$('.thousandSeparator').autoNumeric('init', { vMax: '999999.99' });

//$(document).on('focus', ".thousandSeparator", function() { //bind to all instances of class "thousandSeparator".
//    $(this).bind("paste", function(e) {
//        e.preventDefault();
//    });
//});

$(document).ready(function() {
    //if ($('#LatestKm').val() !== "") {
    //    $('#LatestKm').autoNumeric('init', { vMax: '99999.99' });
    //    $("#LatestKm").autoNumeric('set', data.KM);
    //}
});

