$('.thousandSeparator').autoNumeric('init', { vMax: '999999.99' });

$(document).on('focus', ".thousandSeparator", function () { //bind to all instances of class "thousandSeparator".
	$(this).bind("paste", function (e) {
		e.preventDefault();
	});
});

//Disable resizable property of textarea
$('td > textarea').attr('style', 'resize: none; height: 34px;');
$('#Remarks').attr('style', 'resize: none;');

$('input[type="radio"][name="IsSTNK"]').click(function () {
	checkRadioOption();
});

$('input[type="radio"][name="IsKEUR"]').click(function () {
	checkRadioOption();
});

function checkRadioOption() {
	var isSTNK = $('#IsSTNK:checked').val();
	if (isSTNK != undefined) {
		if (isSTNK == 'True') {
			$('#IsSTNK2[value="False"], #StartSTNK, #EndSTNK, #RemarkSTNK').prop('disabled', false);
			$('#StartSTNK2, #EndSTNK2').css('cursor', '').removeClass('datepicker-input date-validation');
			$('input[type="radio"][name="IsSTNK2"][value="False"]').prop('checked', 'checked');
			$('#IsSTNK2[value="True"], #StartSTNK2, #EndSTNK2, #RemarkSTNK2').prop('disabled', 'disabled');
			$('#StartSTNK2, #EndSTNK2, #RemarkSTNK2').val('');
			$('#StartSTNK, #EndSTNK').addClass('datepicker-input date-validation');
		} else {
			$('#IsSTNK2[value="True"], #StartSTNK2, #EndSTNK2, #RemarkSTNK2').prop('disabled', false);
			$('#StartSTNK, #EndSTNK').css('cursor', '').removeClass('datepicker-input date-validation');
			$('input[type="radio"][name="IsSTNK2"][value="True"]').prop('checked', 'checked');
			$('input[type="radio"][name="IsSTNK2"][value="False"], #StartSTNK, #EndSTNK, #RemarkSTNK').prop('disabled', 'disabled');
			$('#StartSTNK, #EndSTNK, #RemarkSTNK').val('');
			$('#StartSTNK2, #EndSTNK2').addClass('datepicker-input date-validation');

			//for remove error message
			$("#StartSTNK").removeClass('input-validation-error');
			$("#EndSTNK").removeClass('input-validation-error');
			$("span[data-valmsg-for='StartSTNK']").html('');
			$("span[data-valmsg-for='EndSTNK']").html('');
		}
	}

	var isKEUR = $('#IsKEUR:checked').val();
	if (isKEUR == 'True') {
		$('#StartKEUR, #EndKEUR').addClass('datepicker-input date-validation');
		$('#StartKEUR, #EndKEUR').prop('disabled', false);
	} else {
		$('#StartKEUR, #EndKEUR').val('');
		$('#StartKEUR, #EndKEUR').css('cursor', '').removeClass('datepicker-input date-validation');
		$('#StartKEUR, #EndKEUR').prop('disabled', 'disabled');
	}
}

function AddItem() {
	var lastRow = $('.tab-content div[class="tab-pane active"] tbody tr').last();
	var rowNumberElement = $('.tab-content tr').not('thead tr');
	var activeTabId = $('.tab-content div[class="tab-pane active"]').attr('id');
	var componentTypeValue = '';
	var newElementHtml = '';

	switch (activeTabId) {
		case 'uve':
			componentTypeValue = 'Equipment';
			break;

		case 'uvc':
			componentTypeValue = 'Condition';
			break;

		case 'carrosserie':
			componentTypeValue = 'Carroserrie';
			break;

		case 'accessories':
			componentTypeValue = 'Accessorie';
			break;
	}

	if (rowNumberElement.length != 0) {
		var rowNumberList = [];

		for (index = 0; index < rowNumberElement.length; index++) {
			var rowNumber = $(rowNumberElement[index]).attr('rowNumber');
			rowNumberList.push(rowNumber);
		}

		var noNewRow = $('.tab-content div[class="tab-pane active"] tbody tr').last().text();
		var lastRowNumber = Math.max.apply(Math, rowNumberList);

		newElementHtml += '<tr rowNumber="' + (lastRowNumber + 1) + '">' +
                            '<td>' +
								'<div><input type="hidden" class="form-control Component" id="BASTEquipmentViewModelList[' + lastRowNumber + '].ComponentType" value="' + componentTypeValue + '"></div>' +
                                '<p class="form-control-static">' + (noNewRow.length != 0 ? (parseInt(noNewRow) + 1) : 1) + '</p>' +
                            '</td>' +
                            '<td>' +
                                '<div><input type="text" class="form-control Description" id="BASTEquipmentViewModelList[' + lastRowNumber + '].Description" maxlength="50"></div>' +
                            '</td>' +
                            '<td>' +
                                '<div class="radioPositionCenter">' +
                                    '<label><input type="radio" class="IsAvailable" name="IsAvailable[' + lastRowNumber + ']" id="YES" value="True"></label>' +
                                '</div>' +
                            '</td>' +
                            '<td>' +
                                '<div class="radioPositionCenter">' +
                                    '<label><input type="radio" class="IsAvailable" name="IsAvailable[' + lastRowNumber + ']" id="NO" value="False"></label>' +
                                '</div>' +
                            '</td>' +
                            '<td>' +
                                '<textarea class="form-control Remark" rows="1" style="height: 34px; resize: none;" id="BASTEquipmentViewModelList[' + lastRowNumber + '].Remark" maxlength="100"></textarea>' +
                            '</td>' +
                            '<td>' +
                                '<div><a href="javascript:void(0);" onclick="DeleteRow(' + (lastRowNumber + 1) + ')" title="delete" class="btn btn-danger btn-xs"><i class="fa fa-minus"></i></a></div>' +
                            '</td>' +
                        '</tr>';
	}
	else {
		newElementHtml += '<tr rowNumber="1">' +
                            '<td>' +
								'<div><input type="hidden" class="form-control Component" id="BASTEquipmentViewModelList[0].ComponentType" value="' + componentTypeValue + '"></div>' +
                                '<p class="form-control-static">1</p>' +
                            '</td>' +
                            '<td>' +
                                '<div><input type="text" class="form-control Description" id="BASTEquipmentViewModelList[0].Description" maxlength="50"></div>' +
                            '</td>' +
                            '<td>' +
                                '<div class="radioPositionCenter">' +
                                    '<label><input type="radio" class="IsAvailable" name="IsAvailable[0]" id="YES" value="True"></label>' +
                                '</div>' +
                            '</td>' +
                            '<td>' +
                                '<div class="radioPositionCenter">' +
                                    '<label><input type="radio" class="IsAvailable" name="IsAvailable[0]" id="NO" value="False"></label>' +
                                '</div>' +
                            '</td>' +
                            '<td>' +
                                '<textarea class="form-control Remark" rows="1" style="height: 34px; resize: none;" id="BASTEquipmentViewModelList[0].Remark" maxlength="100"></textarea>' +
                            '</td>' +
                            '<td>' +
                                '<div><a href="javascript:void(0);" onclick="DeleteRow(1)" title="delete" class="btn btn-danger btn-xs"><i class="fa fa-minus"></i></a></div>' +
                            '</td>' +
                        '</tr>';
	}

	if (lastRow.length != 0) {
		$(lastRow).after(newElementHtml);
	}
	else {
		$('.tab-content div[class="tab-pane active"] tbody').append(newElementHtml);
	}
}

function DeleteRow(rowNumber) {
	var rows = $('.tab-content div[class="tab-pane active"] tbody tr[rowNumber="' + rowNumber + '"]').nextAll();
	$('tr[rowNumber="' + rowNumber + '"]').remove();
	if (rows.length !== 0) {
		rows.each(function () {
			var columnNo = $(this).find('p');
			$(this).attr('rownumber', rowNumber);
			$(this).find('a').attr('onclick', 'DeleteRow(' + rowNumber + ')');
			$(columnNo).text(($(columnNo).text() - 1));
			rowNumber++;
		});
	}
}

function loadBASTNo() {
	$('div[class="alert alert-danger"]').remove();
	// datatable
	var oTable = null;
	$('#BastNo-list').each(function () {
		oTable = $(this).dataTable({
			"bServerSide": true,
			"bProcessing": true,
			"bRetrieve": true,
			"sAjaxSource": serverRoot + "MGTPreparationUnit/GetLookUpBASTNoList",
			"fnServerParams": function (aoData) {
				aoData.push(
					{ "name": "idUnitPreparation", "value": $('#IdTbMGTUnitPrep').val() }
				);
			},
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"sPaginationType": "full_numbers",
			"aoColumns": [
				{ "mData": "BASTSupplierNo" },
				{ "mData": "BASTCustomerNo" },
				{ "mData": "AgreementNumber" },
				{ "mData": "SupplierName" },
				{ "mData": "CustomerName" },
				{ "mData": "UnitDescription" },
				{
					"mData": "CreatedBy",
					"bSearchable": false,
					"bSortable": false,
				},
				{
					"mData": "DisplayCreateDate",
					"bSearchable": false,
					"bSortable": false,
				}
			],
			"fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				var data = aData;
				if (!data.AllowSelect) {
					$(nRow).attr("disabled", "disabled");
				}
			},
			"iDisplayLength": 5,
			"bLengthChange": false
		});
	});

	$("#BastNo-list tbody").delegate("tr", "click", function () {

		var data = oTable.fnGetData(this);

		$("#IdTbMGTBASTSupCust").val(data.IdBASTSuppCust);
		$("#BASTSPNo").val(data.BASTSupplierNo);
		$("#BASTCTNo").val(data.BASTCustomerNo);
		$("#AgreementNumber").val(data.AgreementNumber);
		$("#Lesse").val(data.CustomerName);
		$("#Supplier").val(data.SupplierName);
		$("#UnitDescription").val(data.UnitDescription);
		$("#Year").val(data.Year);
		$("#Colour").val(data.Colour);
		$("#PoliceNumber").val(data.PoliceNumber);
		$("#ChassisNumber").val(data.ChassisNumber);
		$("#EngineNumber").val(data.EngineNumber);
		if (data.KM != null) {
			$('#KM').autoNumeric('init', { vMax: '99999.99' });
			$("#KM").autoNumeric('set', data.KM);
		}
		$("#CompanyInsurance").val(data.CompanyInsurance);
		$("#InsuranceNumber").val(data.InsuranceNumber);
		$("#StartInsurance").val(data.StartInsurance != null ? parseJsonDate(data.StartInsurance) : "");
		$("#EndInsurance").val(data.EndInsurance != null ? parseJsonDate(data.EndInsurance) : "");
		$("#Remarks").val(data.Remarks);

		$("#StartSTNK").val(data.StartSTNK != null ? parseJsonDate(data.StartSTNK) : "");
		$("#EndSTNK").val(data.EndSTNK != null ? parseJsonDate(data.EndSTNK) : "");
		$("#RemarkSTNK").val(data.RemarkSTNK);
		$("#StartSTNK2").val(data.StartSTNK2 != null ? parseJsonDate(data.StartSTNK2) : "");
		$("#EndSTNK2").val(data.EndSTNK2 != null ? parseJsonDate(data.EndSTNK2) : "");
		$("#RemarkSTNK2").val(data.RemarkSTNK2);
		$("#StartKEUR").val(data.StartKEUR != null ? parseJsonDate(data.StartKEUR) : "");
		$("#EndKEUR").val(data.EndKEUR != null ? parseJsonDate(data.EndKEUR) : "");
		$("#RemarkKEUR").val(data.RemarkKEUR);

		$("#DisplayCreatedBy").text(data.CreatedBy);
		$("#DisplayCreatedDate").text(parseJsonDate(data.CreatedDate));
		$("#DisplayLastModifiedBy").text(data.LastModifiedBy != null ? data.LastModifiedBy : "");
		$("#DisplayLastModifiedDate").text(data.LastModifiedDate != null ? parseJsonDate(data.LastModifiedDate) : "");

		$("#RowVersion").val((data.RowVersion));
		$("#CreatedBy").val(data.CreatedBy);
		$("#CreatedDate").val(parseJsonDate(data.CreatedDate));
		$("#LastModifiedBy").val(data.LastModifiedBy != null ? data.LastModifiedBy : "");
		$("#LastModifiedDate").val(data.LastModifiedDate != null ? parseJsonDate(data.LastModifiedDate) : "");

		var isStnk = data.IsSTNK;
		if (isStnk !== null) {
			if (isStnk) {
				$("input[name='IsSTNK'][value='True']").prop("checked", true);
			} else {
				$("input[name='IsSTNK'][value='False']").prop("checked", true);
			}
		}

		var isStnk2 = data.IsSTNK2;
		if (isStnk2 != null) {
			if (isStnk2) {
				$("input[name='IsSTNK2'][value='True']").prop("checked", true);
			} else {
				$("input[name='IsSTNK2'][value='False']").prop("checked", true);
			}
		}

		var isKeur = data.IsKEUR;
		if (isKeur != null) {
			if (isKeur) {
				$("input[name='IsKEUR'][value='True']").prop("checked", true);
			} else {
				$("input[name='IsKEUR'][value='False']").prop("checked", true);
			}
		}
		checkRadioOption();

		loadBastEquipment(data.IdBASTSuppCust);
		loadBastRevisionHistory(data.IdBASTSuppCust);

		$('#bastNoModal').modal('hide');
	});
}

function loadBastEquipment(idBastSupCust) {
	var param = JSON.stringify({ idBastSupCust: idBastSupCust });
	$.ajax({
		url: serverRoot + "MGTPreparationUnit/GetBASTEquipmentList",
		type: 'POST',
		data: param,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			var sequenceNoPerTab = 0;

			$('.tab-content div[id="uve"] tbody tr').remove();
			$('.tab-content div[id="uvc"] tbody tr').remove();
			$('.tab-content div[id="carrosserie"] tbody tr').remove();
			$('.tab-content div[id="accessories"] tbody tr').remove();

			for (var index = 0; index < data.length; index++) {
				var rowHtml = "";

				var tab = "";

				switch (data[index].ComponentType) {
					case 'Equipment':
						tab = 'uve';
						break;
					case 'Condition':
						tab = 'uvc';
						break;
					case 'Carroserrie':
						tab = 'carrosserie';
						break;
					case 'Accessorie':
						tab = 'accessories';
						break;
				}

				sequenceNoPerTab = $('.tab-content div[id="' + tab + '"] tbody tr').length;

				rowHtml = renderRowBastEquipment(data, index, sequenceNoPerTab);

				$('.tab-content div[id="' + tab + '"] tbody').append(rowHtml);
			}
		}
	});
}

function loadBastRevisionHistory(idBastSupCust) {
	var param = JSON.stringify({ idBastSupCust: idBastSupCust });
	$.ajax({
		url: serverRoot + "MGTPreparationUnit/GetRevisionHistory",
		type: 'POST',
		data: param,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {

			$('#RevisionHistory tbody tr').remove();

			for (var index = 0; index < data.length; index++) {
				var rowHtml = "";

				rowHtml = renderRowBastRevisionHistory(data, index);

				$('#RevisionHistory tbody').append(rowHtml);
			}
		}
	});
}

function renderRowBastEquipment(data, index, sequenceNoPerTab) {
	var rowHtml = "<tr rowNumber='" + (index + 1) + "'>" +
									"<td>" +
										"<input type='hidden' class='form-control Component' id='BASTEquipmentViewModelList[" + index + "].ComponentType' value='" + data[index].ComponentType + "'>" +
										"<input type='hidden' class='form-control IdNo' id='BASTEquipmentViewModelList[" + index + "].IdTbMGTBASTEquipment' value='" + data[index].IdTbMGTBASTEquipment + "'>" +
										"<p class='form-control-static'>" + (parseInt(sequenceNoPerTab) + 1) + "</p>" +
									"</td>" +
									"<td>" +
										"<div><input type='text' class='form-control Description' id='BASTEquipmentViewModelList[" + index + "].Description' value='" + (data[index].Description != null ? data[index].Description : '') + "'></div>" +
									"</td>" +
									"<td>" +
										"<div class='radioPositionCenter'>" +
											"<label><input type='radio' class='IsAvailable' value='True' name='IsAvailable[" + index + "]' id='YES' " + (data[index].IsAvailable == true ? 'checked' : '') + "></label>" +
										"</div>" +
									"</td>" +
									"<td>" +
										"<div class='radioPositionCenter'>" +
											"<label><input type='radio' class='IsAvailable' value='False' name='IsAvailable[" + index + "]' id='NO' " + (data[index].IsAvailable == false ? 'checked' : '') + "></label>" +
										"</div>" +
									"</td>" +
									"<td>" +
										"<textarea class='form-control Remark' rows='1' id='BASTEquipmentViewModelList[" + index + "].Remark' style='resize: none; height: 34px;'>" + (data[index].Remark != null ? data[index].Remark : '') + "</textarea>" +
									"</td>" +
									"<td>" +
										"<div><a href='javascript:void(0);' onclick='DeleteRow(" + (index + 1) + ")' title='delete' class='btn btn-danger btn-xs'><i class='fa fa-minus'></i></a></div>" +
									"</td>" +
								"</tr>";

	return rowHtml;
}

function renderRowBastRevisionHistory(data, index) {
	var rowHtml = '<tr>' +
					'<td width="20">' +
						'<input type="hidden" name="RevHistories[' + index + '].CreateBy" value="' + data[index].CreateBy + '">' +
						'<label class="form-control">' + data[index].CreateBy + '</label>' +
					'</td>' +
					'<td width="20">' +
						'<input type="hidden" name="RevHistories[' + index + '].CreateDate" value="' + data[index].CreateDate + '">' +
						'<label class="form-control">' + data[index].CreateDate + '</label>' +
					'</td>' +
					'<td width="20">' +
						'<input type="hidden" name="RevHistories[' + index + '].Action" value="' + data[index].Action + '">' +
						'<label class="form-control">' + data[index].Action + '</label>' +
					'</td>' +
				'</tr>';

	return rowHtml;
}

// Checking range date
function checkDate() {

	var resultCheck = false;
	var datepickerInput = $('.date-validation');
	var errorMessage = '';
	for (index = 0; index < datepickerInput.length; index += 2) {
		var startDate = $(datepickerInput[index]).val();
		var endDate = $(datepickerInput[index + 1]).val();
		startDate = strToDate(startDate, 'mm/dd/yyyy', '/');
		endDate = strToDate(endDate, 'mm/dd/yyyy', '/');

		if (startDate >= endDate) {
			resultCheck = true;

			if (errorMessage !== '') {
				errorMessage += ', ';
			}

			switch ($(datepickerInput[index]).prop('id')) {
				case "StartInsurance":
					errorMessage += 'Start Insurance Date should be less than End Insurance Date';
					break;

				case "StartSTNK":
					errorMessage += 'Start STNK Date should be less than End STNK Date';
					break;

				case "StartSTNK2":
					errorMessage += 'Start STNK Sementara Date should be less than End STNK Sementara Date';
					break;

				case "StartKEUR":
					errorMessage += 'Start KEUR Date should be less than End KEUR Date';
					break;

				default:
					break;
			}
		}
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

function goToTop() {
	$('section[class*="scrollable"]').animate({
		scrollTop: 0
	}, 700);
}

function UpdateNames() {
	//Update name attribute for each rows on the table that exists on Unit/Vehicle Equipment Tab, Unit/Vehicle Condition Tab, Carrosserie Tab, and Accessories Tab
	var rows = $('.tab-content tbody tr');
	var index = 0;

	rows.each(function () {

	    var isIdNoExist = $(this).find(".IdNo").length != 0;
	    if (isIdNoExist) {
	        $(this).find(".IdNo").attr("name", "BASTEquipmentViewModelList[" + index + "].IdTbMGTBASTEquipment");
	    }
		$(this).find(".Component").attr("name", "BASTEquipmentViewModelList[" + index + "].ComponentType");
		$(this).find(".Description").attr("name", "BASTEquipmentViewModelList[" + index + "].Description");
		$(this).find(".IsAvailable").attr("name", "BASTEquipmentViewModelList[" + index + "].IsAvailable");
		$(this).find(".Remark").attr("name", "BASTEquipmentViewModelList[" + index + "].Remark");
		
		index++;
	});
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

function loadBastEquipmentForViewAction(idBastSupCust) {
	var param = JSON.stringify({ idBastSupCust: idBastSupCust });
	$.ajax({
		url: serverRoot + "MGTPreparationUnit/GetBASTEquipmentList",
		type: 'POST',
		data: param,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			for (var index = 0; index < data.length; index++) {
				var rowHtml = "";
				var sequenceNoPerTab = "";
				if (data[index].ComponentType === "Equipment") {
					sequenceNoPerTab = $('.tab-content div[id="uve"] tbody tr').length;

					rowHtml = renderRowBastEquipmentForViewAction(data, index, sequenceNoPerTab);

					$('.tab-content div[id="uve"] tbody').append(rowHtml);
				}

				if (data[index].ComponentType === "Condition") {
					sequenceNoPerTab = $('.tab-content div[id="uvc"] tbody tr').length;

					rowHtml = renderRowBastEquipmentForViewAction(data, index, sequenceNoPerTab);

					$('.tab-content div[id="uvc"] tbody').append(rowHtml);
				}

				if (data[index].ComponentType === "Carroserrie") {
					sequenceNoPerTab = $('.tab-content div[id="carrosserie"] tbody tr').length;

					rowHtml = renderRowBastEquipmentForViewAction(data, index, sequenceNoPerTab);

					$('.tab-content div[id="carrosserie"] tbody').append(rowHtml);
				}

				if (data[index].ComponentType === "Accessorie") {
					sequenceNoPerTab = $('.tab-content div[id="accessories"] tbody tr').length;

					rowHtml = renderRowBastEquipmentForViewAction(data, index, sequenceNoPerTab);

					$('.tab-content div[id="accessories"] tbody').append(rowHtml);
				}
			}
		}
	});
}

function renderRowBastEquipmentForViewAction(data, index, sequenceNoPerTab) {
	var rowHtml = "<tr rowNumber='" + (index + 1) + "'>" +
				"<td>" +
					"<input type='hidden' class='form-control' name='BASTEquipmentViewModel[" + index + "].ComponentType' value='" + data[index].ComponentType + "'>" +
					"<input type='hidden' class='form-control' name='BASTEquipmentViewModel[" + index + "].IdTbMGTBASTEquipment' value='" + data[index].IdTbMGTBASTEquipment + "'>" +
					"<p class='form-control-static'>" + (parseInt(sequenceNoPerTab) + 1) + "</p>" +
				"</td>" +
				"<td>" +
					"<div><input type='text' class='form-control 'readonly name='BASTEquipmentViewModel[" + index + "].Description' value='" + (data[index].Description != null ? data[index].Description : '') + "'></div>" +
				"</td>" +
				"<td>" +
					"<div class='radioPositionCenter'>" +
						"<label><input type='radio' value='True' disabled name='BASTEquipmentViewModel[" + index + "].IsAvailable' " + (data[index].IsAvailable == true ? 'checked' : '') + "></label>" +
					"</div>" +
				"</td>" +
				"<td>" +
					"<div class='radioPositionCenter'>" +
						"<label><input type='radio' value='False' disabled name='BASTEquipmentViewModel[" + index + "].IsAvailable' " + (data[index].IsAvailable == false ? 'checked' : '') + "></label>" +
					"</div>" +
				"</td>" +
				"<td>" +
                    "<textarea class='form-control' readonly rows='1' name='BASTEquipmentViewModelList[" + index + "].Remark' style='resize: none; height: 34px;'>" + (data[index].Remark != null ? data[index].Remark : '') + "</textarea>" +
				"</td>" +
			"</tr>";

	return rowHtml;
}