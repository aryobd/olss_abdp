// Set thousand separator for input text
function ThousandSeparatorSetUp(object) {
    for (index = 0; index < object.length; index++) {
        var id = "#" + $(object[index]).attr('id');
        var value = $(object[index]).val().replace(/,/g, "");
        $(id).autoNumeric('init', { mDec: 0, vMax: '999999999999999' });
        $(id).autoNumeric('set', value);
    }
}

function LoadPaymentSchedule() {

}

$(document).on('focus', ".dateappend", function () { //bind to all instances of class "dateappend".
	$(this).datepicker({
		format: 'mm/dd/yyyy',
	});
});

function setDataDeliveryInvoice(idTbBilInvoiceReceipt, invoiceNumber, deliveryDate, courier, receiptNo, rowVersion) {
	if ($('span[data-valmsg-for="DeliveryDate"]').length != 0 || $('span[data-valmsg-for="ReceiptNumber"]').length != 0) {
		$('span[data-valmsg-for="DeliveryDate"]').remove();
		$('span[data-valmsg-for="ReceiptNumber"]').remove();
	}
	var inputHidden = $('#deliveryInvoice input[type="hidden"]');
	if (inputHidden.length != 0) {
		$(inputHidden).each(function () {
			$(this).remove();
		});
	}
	var inputHiddenEl = '<input type="hidden" name="IdTb_BIL_InvoiceReceipt" value="' + parseInt(idTbBilInvoiceReceipt) + '">' +
        '<input type="hidden" name="RowVersion" value="' + rowVersion + '">';
	$('#InvoiceNumber').after(inputHiddenEl);
	$('#InvoiceNumber').val(invoiceNumber);
	$('#DeliveryDate').datepicker('setDate', (deliveryDate != '' ? new Date(deliveryDate) : null));
	
	if (courier != null) {
		if (courier == 'Courier Agent') {
			$("#mydiv").show();
			$("option[value='Courier Agent']").attr("selected", "selected");
			$("#ReceiptNumber").val(receiptNo);
		} else {
			$("option[value='Internal Courier']").attr("selected", "selected");
			$("#ReceiptNumber").val('');
			$('#mydiv').hide();
		}
	} else {
		$('#mydiv').hide();
	}
}

function courierValidation() {
	if ($("#DropdownCourier").val() == "Courier Agent") {
		$("#mydiv").show();
	}
	else {
		$("#mydiv").hide();
	}
}

function inputValidation() {
	var errorElement, htmlAlert = "";
	if ($('#DeliveryDate').val() == "" || ($('#mydiv').attr('style') != 'display: none;' && $('#ReceiptNumber').val() == "")) {
		if ($('#DeliveryDate').val() == "") {
			errorElement = $('span[data-valmsg-for="DeliveryDate"]');
			if (errorElement.length == 0) {
				htmlAlert = '<span class="field-validation-error" data-valmsg-for="DeliveryDate" data-valmsg-replace="true"></span>';
				$('#deliveryInvoice div[class="input-group date"]').after(htmlAlert);
				$('span[data-valmsg-for="DeliveryDate"]').text("Delivery Date field is required.");
			}
		}

		if ($('#mydiv').attr('style') != 'display: none;' && $('#ReceiptNumber').val() == "") {
			errorElement = $('span[data-valmsg-for="ReceiptNumber"]');
			if (errorElement.length == 0) {
				htmlAlert = '<span class="field-validation-error" data-valmsg-for="ReceiptNumber" data-valmsg-replace="true"></span>';
				$('#deliveryInvoice div[id="mydiv"] > div[class="col-lg-6"] > div[class="form-group"]').after(htmlAlert);
				$('span[data-valmsg-for="ReceiptNumber"]').text("Receipt Number field is required.");
			}
		}
		return false;
	}
	return true;
}

function showConfirmationPopUp() {
	
	if (inputValidation()) {
		$('.confirmationMessage').text("Save Changes");
		$('#confirmationModal').modal('show');
		$('#confirmModal').attr('onclick', 'PostConfirmationEvent()');
	}
}

function PostConfirmationEvent() {
	var messageModal = $('#confirmationModal p').text().match('quit');
	if (messageModal == null) {
		var idInv = $('input[name="IdTb_BIL_InvoiceReceipt"]').val();
		var deliveryDate = $('#DeliveryDate').val();
		var deliveryBy = $('#DropdownCourier').val();
		var receiptNumber = $('#ReceiptNumber').val();

		var params = { idInv: idInv, deliveryDate: deliveryDate, deliveryBy: deliveryBy, receiptNo: receiptNumber };
		var path = serverRoot + "BILCreation/EditInvoice";

		Post(path, params);
	} else {
		$('#confirmationModal, #deliveryInvoice').modal('hide');
	}
	$('#confirmModal').removeAttr('onclick');
}

function Post(path, params, method) {
	method = method || "post"; // Set method to post by default if not specified.

	// The rest of this code assumes you are not using a library.
	// It can be made less wordy if you use one.
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", path);

	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);

			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}

function ValidationRemarks() {
    if ($('.alert-danger').length != 0) {
        $('.alert-danger').remove();
    }
    var htmlAlert = '';
    var remarks = $('#Remarks').val();
    var tempRemarks = $.trim(remarks);
    if (tempRemarks == "" || tempRemarks == null) {
        htmlAlert +=
                '<div class="alert alert-danger" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                    'Please fill Remarks' +
		'</div>';
        $('form').before(htmlAlert);
        return false;
    }
    return true;
}

function goToTop() {
    $('section[class*="scrollable"]').animate({
        scrollTop: 0
    }, 700);
}

//Added by Sonny (2 Feb 2018) -- Show Edit Invoice No & Kwitansi 
function LoadEditInvoiceReceipt(Id) {
    //alert("Popup dibuka dan siap diload");
    TeamDetailPostBackURL = serverRoot + "BILCreation/EditInvoiceReceipt/?Id=" + Id;
    $("#myModalContent1").load(TeamDetailPostBackURL, function () {
        $("#myModalEdit").modal("show");

        $('#myModalEdit').modal({
            backdrop: 'static'
        });

       // $('#InvoiceIssueDate').datepicker('setDate', (deliveryDate != '' ? new Date(deliveryDate) : null));
        $('#InvoiceIssueDate').datepicker({ autoclose: true, format: 'mm/dd/yyyy' });
    })

    //$.ajax(
    //    {
    //        url: serverRoot + "BILCreation/EditInvoiceReceipt/?Id=" + Id,
    //        cache: false,
    //        type: "GET",
    //        dataType: 'json',
    //        success: function (data) {
    //            alert(data);
    //            $('#updateBILInvoiceReceiptModal').modal('show');
    //            DisplayEditInvoiceReceipt(data);
    //        }

    //    });
}


function UpdateInvoiceReceiptValidation()
{
    //Added by Sonny (2 Feb 2018) -- Aksi update invoice receipt
    var InvoiceNoInstalment = $("#InvoiceNoInstalment").val();
    var ReceiptNoInstalment = $("#ReceiptNoInstalment").val();
    
    var strInvoiceDate = $('#InvoiceIssueDate').val().trim();
    var IdTb_BIL_InvoiceReceipt = $("#IdTb_BIL_InvoiceReceipt").val();
    var isFormValid = true;
    var PayScheduleDetailId = $("#PayScheduleDetailId").val();
    var DetailBillingId = $("#DetailBillingId").val();

    //alert("Invoice date string:" + strInvoiceDate);

    if (InvoiceNoInstalment == null || InvoiceNoInstalment == '')
    {
        //alert("Please fill in Invoice No!");
        $("#spval_InvoiceNoInstalment").show();
        isFormValid = false;
    }
    else
    {
        $("#spval_InvoiceNoInstalment").hide();
    }

    if (ReceiptNoInstalment == null || ReceiptNoInstalment == '') {
        //alert("Please fill in Kwitansi No!");
        $("#spval_ReceiptNoInstalment").show();
        isFormValid = false;
    }
    else
    {
        $("#spval_ReceiptNoInstalment").hide();
    }

    if (strInvoiceDate == '') {
        $("#spval_InvoiceIssueDate").show();
        isFormValid = false;
    }
    else {
        var InvoiceIssueDate = $('#InvoiceIssueDate').datepicker('getDate');//$("#InvoiceIssueDate").val();
        if (InvoiceIssueDate == null || InvoiceIssueDate == 'Invalid Date') {
            //alert("Please fill in Invoice Date!");
            $("#spval_InvoiceIssueDate").show();
            isFormValid = false;
        }
        else {
            $("#spval_InvoiceIssueDate").hide();
        }
    }

    //isFormValid = false;
    if (isFormValid)
    {
        $("#InvoiceReceiptSaveConfirm").modal("show");
    }


}

function saveConfirmInvoiceReceipt()
{
    var InvoiceNoInstalment = $("#InvoiceNoInstalment").val();
    var ReceiptNoInstalment = $("#ReceiptNoInstalment").val();
    var InvoiceIssueDate = $('#InvoiceIssueDate').datepicker('getDate');//$("#InvoiceIssueDate").val();
    var IdTb_BIL_InvoiceReceipt = $("#IdTb_BIL_InvoiceReceipt").val();
    var isFormValid = true;
    var PayScheduleDetailId = $("#PayScheduleDetailId").val();
    var DetailBillingId = $("#DetailBillingId").val();

    //added by Sonny (6 Feb 2018) -- hanya save saja, akan dipanggil ketika validasi OK dan confirm YES
    var getUrlSimpan = serverRoot + "BILCreation/EditInvoiceReceipt";

    $.ajax({
        type: "POST",
        url: getUrlSimpan,
        cache: false,
        data: {
            IdTb_BIL_InvoiceReceipt: IdTb_BIL_InvoiceReceipt,
            InvoiceNoInstalment: InvoiceNoInstalment,
            InvoiceIssueDate: InvoiceIssueDate.toISOString(),
            ReceiptNoInstalment: ReceiptNoInstalment,
            PayScheduleDetailId: PayScheduleDetailId,
            DetailBillingId: DetailBillingId
        },
        success: function (data) {


        }
    }).done(function (response, textStatus, jqXHR) {
        if (response == '') {
            //alert("Invoice Receipt has been updated");
            //$("#payScheduleTable-list").dataTable().fnDraw();
            var urlparent = serverRoot + "BILCreation/DetailBilling/" + DetailBillingId;
            // alert("Akan redirect ke " + urlparent);
            window.location.href = urlparent;
            //bootstrap_alert.success("The data has been successfully deleted");
            $('#myModalEdit').modal('hide');
        }
        else {
            alert("Error: " + response);
        }
    });
}