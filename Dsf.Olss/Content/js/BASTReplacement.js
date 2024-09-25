var newBASTRPCDtlId = -1;

$('.thousandSeparator').autoNumeric('init', { vMax: '999999.99' });

$(document).on('focus', ".thousandSeparator", function() { //bind to all instances of class "thousandSeparator".
    $(this).bind("paste", function(e) {
        e.preventDefault();
    });
});

function RenderUnitComponentList(BASTOutStatus, MGTBASTReplacementDetailList) {
    var html = '';

    switch(BASTOutStatus) {
        case draft:
        case revised:
            for (index = 0; index < MGTBASTReplacementDetailList.length; index++) {
                html +=
                '<tr rownumber="' + (index + 1) + '">' +
                    '<input type="hidden" name="MGTBASTReplacementDetailList[' + index + '].IdTb_MGT_BASTRPCDtl" value="' + MGTBASTReplacementDetailList[index].IdTb_MGT_BASTRPCDtl + '">' +
                    '<td>' + (index + 1) + '</td>' +
                    '<td>' +
                        '<div><input type="text" class="form-control" name="MGTBASTReplacementDetailList[' + index + '].Description" value="' + MGTBASTReplacementDetailList[index].Description + '" maxlength="50"></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 1 ? "checked" : "") + ' value="1"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 2 ? "checked" : "") + ' value="2"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 3 ? "checked" : "") + ' value="3"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 4 ? "checked" : "") + ' value="4"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<a onclick="DeleteRow(' + (index + 1) + ')" title="Delete" class="btn btn-danger btn-xs" id="12" style="margin-top: 6px;" href="#"><i class="fa fa-minus"></i></a>' +
                    '</td>' +
                '</tr>';
            }
            break;

        case submitted:
        case checked:
            for (index = 0; index < MGTBASTReplacementDetailList.length; index++) {
                html +=
                '<tr>' +
                    '<input type="hidden" name="MGTBASTReplacementDetailList[' + index + '].IdTb_MGT_BASTRPCDtl" value="' + MGTBASTReplacementDetailList[index].IdTb_MGT_BASTRPCDtl + '">' +
                    '<td>' + (index + 1) + '</td>' +
                    '<td>' +
                        '<div><input type="text" class="form-control" name="MGTBASTReplacementDetailList[' + index + '].Description" value="' + MGTBASTReplacementDetailList[index].Description + '" maxlength="50" readonly></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 1 ? "checked" : "disabled") + ' value="1"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 2 ? "checked" : "disabled") + ' value="2"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 3 ? "checked" : "disabled") + ' value="3"></label></div>' +
                    '</td>' +
                    '<td>' +
                        '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 4 ? "checked" : "disabled") + ' value="4"></label></div>' +
                    '</td>' +
                '</tr>';
            }
            break;

        case approved:
            for (index = 0; index < MGTBASTReplacementDetailList.length; index++) {
                html +=
                    '<tr>' +
                        '<input type="hidden" name="MGTBASTReplacementDetailList[' + index + '].IdTb_MGT_BASTRPCDtl" value="' + MGTBASTReplacementDetailList[index].IdTb_MGT_BASTRPCDtl + '">' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' +
                            '<div><input type="text" class="form-control" name="MGTBASTReplacementDetailList[' + index + '].Description" value="' + MGTBASTReplacementDetailList[index].Description + '" maxlength="50" readonly></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 1 ? "checked" : "onclick='javascript: return false;' style='cursor: not-allowed;'") + ' value="1"></label></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 2 ? "checked" : "onclick='javascript: return false;' style='cursor: not-allowed;'") + ' value="2"></label></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 3 ? "checked" : "onclick='javascript: return false;' style='cursor: not-allowed;'") + ' value="3"></label></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 4 ? "checked" : "onclick='javascript: return false;' style='cursor: not-allowed;'") + ' value="4"></label></div>' +
                        '</td>' +
                    '</tr>';
            }
            break;

        case firmed:
            for (index = 0; index < MGTBASTReplacementDetailList.length; index++) {
                html +=
                    '<tr>' +
                        '<input type="hidden" name="MGTBASTReplacementDetailList[' + index + '].IdTb_MGT_BASTRPCDtl" value="' + MGTBASTReplacementDetailList[index].IdTb_MGT_BASTRPCDtl + '">' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' +
                            '<div><input type="text" class="form-control" name="MGTBASTReplacementDetailList[' + index + '].Description" value="' + MGTBASTReplacementDetailList[index].Description + '" maxlength="50" readonly></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 1 ? "checked" : "") + ' value="1"></label></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 2 ? "checked" : "") + ' value="2"></label></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 3 ? "checked" : "") + ' value="3"></label></div>' +
                        '</td>' +
                        '<td>' +
                            '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 4 ? "checked" : "") + ' value="4"></label></div>' +
                        '</td>' +
                    '</tr>';
            }
            break;
    }

    $('#bast-tab-container').append(html);

}

function RenderUnitComponentListReadOnly(BASTOutStatus, MGTBASTReplacementDetailList) {
    var html = '';

    for (index = 0; index < MGTBASTReplacementDetailList.length; index++) {
        html +=
            '<tr rownumber="' + (index + 1) + '">' +
                '<input type="hidden" name="MGTBASTReplacementDetailList[' + index + '].IdTb_MGT_BASTRPCDtl" value="' + MGTBASTReplacementDetailList[index].IdTb_MGT_BASTRPCDtl + '">' +
                '<td>' + (index + 1) + '</td>' +
                '<td>' +
                    '<div><input type="text" class="form-control" name="MGTBASTReplacementDetailList[' + index + '].Description" value="' + MGTBASTReplacementDetailList[index].Description + '" maxlength="50" disabled></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 1 ? "checked" : "") + ' value="1" disabled></label></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input id="test" name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 2 ? "checked" : "") + ' value="2" disabled></label></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 3 ? "checked" : "") + ' value="3" disabled></label></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTOUTValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTOUTValue === 4 ? "checked" : "") + ' value="4" disabled></label></div>' +
                '</td>' +
            '</tr>';
    }

    $('#bast-tab-container-out').append(html);

    html = '';

    for (index = 0; index < MGTBASTReplacementDetailList.length; index++) {
        html +=
            '<tr rownumber="' + (index + 1) + '">' +
                '<input type="hidden" name="MGTBASTReplacementDetailList[' + index + '].IdTb_MGT_BASTRPCDtl" value="' + MGTBASTReplacementDetailList[index].IdTb_MGT_BASTRPCDtl + '">' +
                '<td>' + (index + 1) + '</td>' +
                '<td>' +
                    '<div><input type="text" class="form-control" name="MGTBASTReplacementDetailList[' + index + '].Description" value="' + MGTBASTReplacementDetailList[index].Description + '" maxlength="50" disabled></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 1 ? "checked" : "") + ' value="1" disabled></label></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input id="test" name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 2 ? "checked" : "") + ' value="2" disabled></label></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 3 ? "checked" : "") + ' value="3" disabled></label></div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter"><label><input name="MGTBASTReplacementDetailList[' + index + '].BASTINValue" type="radio"' + (MGTBASTReplacementDetailList[index].BASTINValue === 4 ? "checked" : "") + ' value="4" disabled></label></div>' +
                '</td>' +
            '</tr>';
    }

    $('#bast-tab-container-in').append(html);
}

function SetReadonlyFields(bastOutStatus) {
    var selectInputHidden = '<input type="hidden" name="ReplacementType" value="' + $('#dropdownReplacementType').val() + '">';
    var startDateInputHidden = '<input type="hidden" name="StartDate" value="' + $('#StartDate').val() + '">';
    var endDateEstimationInputHidden = '<input type="hidden" name="EndDateEstimation" value="' + $('#EndDateEstimation').val() + '">';

    $('#Note, #TelpNumber, #PIC').prop('readonly', 'readonly');
    $('#dropdownReplacementType, #StartDate, #EndDateEstimation').prop('disabled', 'disabled');
    $('#StartDate, #EndDateEstimation').removeAttr('readonly');

    $('#dropdownReplacementType').after(selectInputHidden);
    $('#StartDate').after(startDateInputHidden);
    $('#EndDateEstimation').after(endDateEstimationInputHidden);

    if (bastOutStatus === submitted || bastOutStatus === approved || bastOutStatus === checked)
    {
        if (bastOutStatus === approved) {
            var inputHidden = '<input type="hidden" name="BASTDate" value="' + $('#BASTDate').val() + '">';
            $('#BASTDate').after(inputHidden);
        }

        $('#BASTDate').removeAttr('readonly').attr('disabled', 'disabled');
        $('#KM, #Driver, #Observer, #Branch, #UsageLoc, #Remark, #Remark2').attr('readonly', 'readonly');
    }
}

function AddRow() {
    var rowTab = $('#TableTermsAndConditions tbody tr');
	var lastRow = rowTab.last();
	var newElementHtml = '';

	if (rowTab.length != 0) {
	    var noNewRow = lastRow.text();
    	var newIndexNumber = parseInt($(lastRow).find('input:eq(0)').attr('name').replace(/[^\d]/g, ''));
    	newIndexNumber++;
	    
    	newElementHtml += '<tr rowNumber="' + (parseInt(noNewRow) + 1) + '">'
            + '<input type="hidden" name="MGTBASTReplacementDetailList[' + newIndexNumber + '].IdTb_MGT_BASTRPCDtl" value="' + newBASTRPCDtlId + '">'
			+ '<td><p class="form-control-static">' + (noNewRow.length != 0 ? (parseInt(noNewRow) + 1) : 1) + '</p></td>'
			+ '<td><input type="text" class="form-control" maxlength="50" name="MGTBASTReplacementDetailList[' + newIndexNumber + '].Description"></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[' + newIndexNumber + '].BASTOUTValue" value="1"></label></div></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[' + newIndexNumber + '].BASTOUTValue" value="2"></label></div></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[' + newIndexNumber + '].BASTOUTValue" value="3"></label></div></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[' + newIndexNumber + '].BASTOUTValue" value="4"></label></div></td>'
            + '<td>'
				+ '<a href="javascript:void(0);" onclick="DeleteRow(' + (parseInt(noNewRow) + 1) + ')" title="delete" style="margin-top: 6px;" class="btn btn-danger btn-xs"><i class="fa fa-minus"></i></a>'
			+ '</td></tr>';
	} else {
        newElementHtml += '<tr rowNumber="1">'
            + '<input type="hidden" name="MGTBASTReplacementDetailList[0].IdTb_MGT_BASTRPCDtl" value="' + newBASTRPCDtlId + '">'
			+ '<td><p class="form-control-static">1</p></td>'
			+ '<td><input type="text" class="form-control" maxlength="50" name="MGTBASTReplacementDetailList[0].Description"></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[0].BASTOUTValue" value="1"></label></div></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[0].BASTOUTValue" value="2"></label></div></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[0].BASTOUTValue" value="3"></label></div></td>'
			+ '<td><div class="radioPositionCenter"><label><input type="radio" class="radioPositionCenter" name="MGTBASTReplacementDetailList[0].BASTOUTValue" value="4"></label></div></td>'
            +  '<td>'
                 + '<a href="javascript:void(0);" onclick="DeleteRow(1)" title="delete" style="margin-top: 6px;" class="btn btn-danger btn-xs"><i class="fa fa-minus"></i></a>'
            + '</td></tr>';
    }
	
	if (lastRow.length != 0) {
    	$(lastRow).after(newElementHtml);
    }
    else {
		$('.tab-content div[class="tab-pane fade in active"] tbody').append(newElementHtml);
	}

	newBASTRPCDtlId--;
}

function DeleteRow(rowNumber) {
	var rows = $('.tab-content div[class="tab-pane fade in active"] tbody tr[rowNumber="' + rowNumber + '"]').nextAll();
	$('tr[rowNumber="' + rowNumber + '"]').remove();
	if (rows.length !== 0) {
		rows.each(function() {
			var columnNo = $(this).find('td:eq(0)');
			$(this).attr('rownumber', rowNumber);
			$(this).find('a').attr('onclick', 'DeleteRow(' + rowNumber + ')');
			$(columnNo).text(($(columnNo).text() - 1));
			rowNumber++;
		});
	}
}

function UpdateIndexRow(bastOutStatus) {
	//Update name attribute for each rows on the table that exists on Tab
	var rows = $('.tab-content div[class="tab-pane fade in active"] tbody tr');
	var index = 0;

	rows.each(function() {
	    $(this).find("input[name*='.IdTb_MGT_BASTRPCDtl']").attr("name", "MGTBASTReplacementDetailList[" + index + "].IdTb_MGT_BASTRPCDtl");
		$(this).find("input[name*='.Description']").attr("name", "MGTBASTReplacementDetailList[" + index + "].Description");

		if (bastOutStatus !== firmed) {
		    $(this).find("input[type='radio']").attr("name", "MGTBASTReplacementDetailList[" + index + "].BASTOUTValue");
		}
		else {
		    $(this).find("input[type='radio']").attr("name", "MGTBASTReplacementDetailList[" + index + "].BASTINValue");
		}

		index++;
	});
}

// Checking range date
function checkDate() {

	var errorMessage = '';
	var resultCheck = false;
	var startDate = $('#StartDate').val();
	var endDate = $('#EndDateEstimation').val();
	startDate = strToDate(startDate, 'mm/dd/yyyy', '/');
	endDate = strToDate(endDate, 'mm/dd/yyyy', '/');
	
	if (startDate >= endDate) {
		resultCheck = true;
		errorMessage += 'Start Date should be less than End Date Estimation';
	}

	if (errorMessage !== '') {
		$('div[class="alert alert-danger"]').remove();
		errorMessage += '..!</div>';
		var htmlAlert = '';
		htmlAlert +=
                        '<div class="alert alert-danger" role="alert">' +
                            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';

		htmlAlert = htmlAlert.concat(errorMessage);
		$('hr').after(htmlAlert);
	}

	if (!resultCheck && $('div[class="alert alert-danger"]').length !== 0) {
		$('div[class="alert alert-danger"]').remove();
	}

	return resultCheck;
}

function showDiv(typeBast, typeView) {
	var submit = $("input[name='statusButton'][value='Submit']");
	var printMemo = $("input[name='statusButton'][value='Print Memo']");
	
	if (typeView == "create") {
		var saveAsDraft = $("input[name='statusButton'][value='Save As Draft']");

		if (typeBast == replacementUnitType) {
			if ($("#dropdownReplacementType").val() == "Special Case") {
				$("#SpecialCase").show();
				saveAsDraft.prop("disabled", true);
				submit.prop("disabled", false);
				printMemo.prop("disabled", false);
			} else {
				$("#SpecialCase").hide();
				saveAsDraft.prop("disabled", false);
				submit.prop("disabled", true);
				printMemo.prop("disabled", true);
			}
		} else {
			submit.prop("disabled", true);
			printMemo.prop("disabled", true);
		}
	} else {
	    if ($("#dropdownReplacementType").val() === "Special Case") {
	        $("#SpecialCase").show();
	        submit.prop("disabled", false);
	        printMemo.prop("disabled", false);
	    } else {
	        $("#SpecialCase").hide();
	        submit.prop("disabled", true);
	        printMemo.prop("disabled", true);
	    }
	}
	
}