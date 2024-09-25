$('.datepicker-input').datepicker({
    format: 'mm/dd/yyyy'
});

function PromiseToPayConfirmationEvent() {
    var messageModal = $('#confirmationModal p').text().match('quit');
    if (messageModal == null) {
        var promiseToPayDate = $('#PTPDate').val();
        var idBILPayScheduleDetail = $('input[name="IdTb_BIL_PayScheduleDtl"]').val();

        var params = { idBILPayScheduleDetail: idBILPayScheduleDetail, promiseToPayDate: promiseToPayDate };
        var path = serverRoot + "BILSchedule/UpdatePromiseToPay";

        Post(path, params);
    } else {
        ResetUpdatePTPDatePopUpView();
        $('#confirmationModal, #promisetoPayModal').modal('hide');
    }
    $('#confirmModal').removeAttr('onclick');
}

function PostActionCloseAgreement() {
    var idAgreement = $('input[name="IdOPLAgreement"]').val();
    var idBilPaySchedule = $('input[name="IdTb_BIL_PaySchedule"]').val();

    var params = { idAgreement: idAgreement, idBilPaySchedule: idBilPaySchedule };
    var path = serverRoot + "BILSchedule/ActionCloseAgreement";

    Post(path, params);

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

function ResetUpdatePTPDatePopUpView() {
    //Remove old element/field value
    $('#PTPDate').val(null);
    if ($('span[data-valmsg-for="promiseToPayDate"]').length != 0) {
        $('span[data-valmsg-for="promiseToPayDate"]').remove();
    }
    var inputHidden = $('#promisetoPayModal input[type="hidden"]');
    if (inputHidden.length != 0) {
        $(inputHidden).each(function() {
            $(this).remove();
        });
    }
}

function ShowSendReminderEmailConfirmation() {
    var confirmationMessage = '';
    var isValid = true;
    var picEmail = $('#PICName').val();
    var email = $('#Email').val();

    if (picEmail == '') {
        //Show error mandatory message
        var errorElement = $('span[data-valmsg-for="picEmail"]');
        if (errorElement.length == 0) {
            var htmlError = '<span class="field-validation-error" data-valmsg-for="picEmail" data-valmsg-replace="true"></span>';
            $('#sendReminderEmailModal div[class="form-group"]:eq(0)').after(htmlError);
            $('span[data-valmsg-for="picEmail"]').text("The PIC Name field is required.");
        }
        isValid = false;
    }
    else {
        var errorElement = $('span[data-valmsg-for="picEmail"]');
        if (errorElement.length != 0) {
            $('span[data-valmsg-for="picEmail"]').remove();
        }
    }

    if (email == '') {
        //Show error mandatory message
        var errorElement = $('span[data-valmsg-for="email"]');
        if (errorElement.length == 0) {
            var htmlError = '<span class="field-validation-error" data-valmsg-for="email" data-valmsg-replace="true"></span>';
            $('#sendReminderEmailModal div[class="form-group"]:eq(1)').after(htmlError);
            $('span[data-valmsg-for="email"]').text("The Email field is required.");
        }
        isValid = false;
    }
    else {
        var errorElement = $('span[data-valmsg-for="email"]');
        if (errorElement.length != 0) {
            $('span[data-valmsg-for="email"]').remove();
        }
    }

    if (!isValid) {
        return false;
    }

    confirmationMessage = 'send reminder billing schedule to '.concat(email);
    $('.confirmationMessage').text(confirmationMessage);

    if (isValid) {
        $('#confirmationModal').modal('show');
    }
}

function ShowPromiseToPayPopUpView(IdTb_BIL_PayScheduleDtl, RowVersionPSD, AgreementNumber, CustomerName) {
    $('#PTPDate').removeAttr('readonly');
    $('#AgreementNumber').val(AgreementNumber);
    $('#CustomerName').val(CustomerName);
    var inputHidden = '<input type="hidden" name="IdTb_BIL_PayScheduleDtl" value="' + parseInt(IdTb_BIL_PayScheduleDtl) + '">' +
        '<input type="hidden" name="RowVersionPayScheduleDtl" value="' + RowVersionPSD + '">';
    $('#AgreementNumber').after(inputHidden);
    $('#confirmModal').attr('onclick', 'PromiseToPayConfirmationEvent()');
}

function ActionCloseAgreement(idAgreement, idPaySchedule, agreementNo) {
    var inputHidden = $('input[type="hidden"]');
    if (inputHidden.length != 0) {
        $(inputHidden).each(function() {
            $(this).remove();
        });
    }

    var elementHide = '<input type="hidden" name="IdOPLAgreement" value="' + parseInt(idAgreement) + '">' +
        '<input type="hidden" name="IdTb_BIL_PaySchedule" value="' + parseInt(idPaySchedule) + '">' +
        '<input type="hidden" name="AgreementNumber" value="' + agreementNo + '">';
    $('#confirmationModal').after(elementHide);
    $('.confirmationMessage').text('close contract with agreement number: ' + agreementNo + ' ');
    $('#confirmModal').attr('onclick', 'PostActionCloseAgreement()');
}

$('#sendReminderEmailModal .close, #sendReminderEmailModal .modal-footer button').click(function() {
    var inputHidden = $('#sendReminderEmailModal input[type="hidden"]');
    if (inputHidden.length != 0) {
        $(inputHidden).each(function() {
            $(this).remove();
        });
    }
    if ($('span[data-valmsg-for="picEmail"]').length != 0) {
        $('span[data-valmsg-for="picEmail"]').remove();
    }
    if ($('span[data-valmsg-for="email"]').length != 0) {
        $('span[data-valmsg-for="email"]').remove();
    }
});

function ShowSendReminderEmailPopUpView(IdTb_BIL_InvoiceEmail, IdTb_BIL_PayScheduleDtl, RowVersionIE, PICEmail, Email) {
    $('#PICName').val(PICEmail);
    $('#Email').val(Email);
    var inputHidden = '<input type="hidden" name="IdTb_BIL_InvoiceEmail" value="' + parseInt(IdTb_BIL_InvoiceEmail) + '">' +
        '<input type="hidden" name="IdTb_BIL_PayScheduleDtl" value="' + parseInt(IdTb_BIL_PayScheduleDtl) + '">' +
        '<input type="hidden" name="RowVersionInvoiceEmail" value="' + RowVersionIE + '">';
    $('#PICName').after(inputHidden);
    $('#confirmModal').attr('onclick', 'SendReminderEmailConfirmationEvent()');
}

function SendReminderEmailConfirmationEvent() {
    var idBILInvoiceEmail = $('input[name="IdTb_BIL_InvoiceEmail"]').val();
    var idBILPayScheduleDetail = $('input[name="IdTb_BIL_PayScheduleDtl"]').val();
    var picEmail = $('#PICName').val();
    var email = $('#Email').val();

    var params = { idBILInvoiceEmail: idBILInvoiceEmail, idBILPayScheduleDetail: idBILPayScheduleDetail, picName: picEmail, email: email };
    var path = serverRoot + "BILSchedule/SendReminderEmail";

    Post(path, params);

    $('#confirmModal').removeAttr('onclick');
}

function ShowPromiseToPayConfirmation(actionName) {
    var confirmationMessage = '';
    var promiseToPayDate = $('#PTPDate').val();

    if (actionName == 'Save') {
        if (promiseToPayDate == '') {
            //Show error mandatory message
            var errorElement = $('span[data-valmsg-for="promiseToPayDate"]');
            if (errorElement.length == 0) {
                var htmlError = '<span class="field-validation-error" data-valmsg-for="promiseToPayDate" data-valmsg-replace="true"></span>';
                $('#promisetoPayModal div[class="input-group date"]').after(htmlError);
                $('span[data-valmsg-for="promiseToPayDate"]').text("The Promise To Pay Date field is required.");
            }
            return false;
        }
        else {
            var errorElement = $('span[data-valmsg-for="promiseToPayDate"]');
            if (errorElement.length != 0) {
                $('span[data-valmsg-for="promiseToPayDate"]').remove();
            }
        }

        var agreementNumber = $('#AgreementNumber').val();
        confirmationMessage = 'input Promise to Pay Date for Agreement Number: '.concat(agreementNumber);
        $('.confirmationMessage').text(confirmationMessage);
    } else if (actionName == 'Close') {
        confirmationMessage = 'quit without saving data';
        $('.confirmationMessage').text(confirmationMessage);
    }

    if (promiseToPayDate != "") {
        $('#confirmationModal').modal('show');
    } else {
        ResetUpdatePTPDatePopUpView();
        $('#promisetoPayModal').modal('hide');
    }

}

function PopulateEndContract(ObjectName, TabId) {
    $("#" + TabId + "-list").each(function() {
        window[ObjectName] = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[4, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "BILSchedule/AjaxHandlerEndContract",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() }
                );
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
	            { "mData": "DsfOffice" },
                { "mData": "CustomerGroup" },
                { "mData": "CustomerName" },
                { "mData": "AgreementNumber" },
                { "mData": "AgreementDate" },
                { "mData": "InvoiceIssueDate" },
                { "mData": "EndPeriodDtl" },
                { "mData": "EndUsageUnitDate" },
                { "mData": "TotalBillingAmount" },
                { "mData": "BillingMaintenanceTotal" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var idTb_BIL_PayScheduleDtl = oObj.aData["IdTb_BIL_PayScheduleDtl"];
                        var maintenanceCount = oObj.aData["MaintenanceCount"];
                        var retElement = "<div style='width: 100%; text-align: center;'>";
                        if (maintenanceCount > 0)
                            retElement += "<button class='btn btn-primary btn-xs' data-toggle='modal' data-target='#Modal' type='button' onclick='BillDetail(" + idTb_BIL_PayScheduleDtl + ")'><i class='fa fa-book'></i></button>";
                        else
                            retElement += "<span class='btn btn-primary btn-xs disabled'><i class='fa fa-book'></i></span>";
                        retElement += "</div>";
                        return retElement;
                    }
                },
                { "mData": "TotalBreakdown" },
                { "mData": "LastModifiedBy" },
                { "mData": "LastModifiedDate" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var status = oObj.aData["InvoiceStatus"];
                        return RenderLabelStatus(status);
                    }
                },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": RenderAction
                }
            ],
            "aoColumnDefs": [
                { "sWidth": "50%", "aTargets": [0] },
                { "sClass": "center", "aTargets": [1] }
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "success": fnCallback,
                    "timeout": 0,
                    "error": handleAjaxError,
                    "global": false,
                    "complete": function(sReturn) {
                        var fakePagination = $("#" + TabId + "-list_wrapper > div:eq(1)");
                        if (typeof (fakePagination.html()) != "undefined") {
                            $("." + TabId + "_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                            fakePagination.appendTo($("." + TabId + "_responsive div[class='dataTables_wrapper row']"));
                        }
                    }
                });
            },
            "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                $('td:eq(7)', nRow).css("text-align", "right");
                $('td:eq(8)', nRow).css("text-align", "right");
                $('td:eq(10)', nRow).css("text-align", "right");
                return nRow;
            }
        });
    });
}

function PopulateSchedule(ObjectName, TabId) {
    $("#" + TabId + "-list").each(function() {
        window[ObjectName] = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[4, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "BILSchedule/AjaxHandlerSchedule",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() },
                    { "name": "scheduleType", "value": iActiveTabIndex }
                );
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
                { "mData": "DsfOffice" },
                { "mData": "CustomerGroup" },
                { "mData": "CustomerName" },
                { "mData": "AgreementNumber" },
                { "mData": "AgreementDate" },
                { "mData": "InvoiceIssueDate" },
                { "mData": "EndPeriodDtl" },
                { "mData": "EndUsageUnitDate" },
                { "mData": "TotalBillingAmount" },
                { "mData": "BillingMaintenanceTotal" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var IdTb_BIL_PayScheduleDtl = oObj.aData["IdTb_BIL_PayScheduleDtl"];
                        var MaintenanceCount = oObj.aData["MaintenanceCount"];
                        var retElement = "<div style='width: 100%; text-align: center;'>";
                        if (MaintenanceCount > 0)
                            retElement += "<button class='btn btn-primary btn-xs' data-toggle='modal' data-target='#Modal' type='button' onclick='BillDetail(" + IdTb_BIL_PayScheduleDtl + ")'><i class='fa fa-book'></i></button>";
                        else
                            retElement += "<span class='btn btn-primary btn-xs disabled'><i class='fa fa-book'></i></span>";
                        retElement += "</div>";
                        return retElement;
                    }
                },
                { "mData": "TotalBreakdown" },
                { "mData": "PromisetoPayDatePrevious" },
                { "mData": "PromisetoPayDateCurrent" },
                { "mData": "LastModifiedBy" },
                { "mData": "LastModifiedDate" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var status = oObj.aData["MailStatus"];
                        return RenderLabelStatus(status);
                    }
                },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var status = oObj.aData["InvoiceStatus"];
                        return RenderLabelStatus(status);
                    }
                },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": RenderAction
                },
            ],
            "aoColumnDefs": [
                { "sWidth": "50%", "aTargets": [0] },
                { "sClass": "center", "aTargets": [1] }
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "success": fnCallback,
                    "timeout": 0,
                    "error": handleAjaxError,
                    "global": false,
                    "complete": function(sReturn) {
                        var fakePagination = $("#" + TabId + "-list_wrapper > div:eq(1)");
                        if (typeof (fakePagination.html()) != "undefined") {
                            $("." + TabId + "_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                            fakePagination.appendTo($("." + TabId + "_responsive div[class='dataTables_wrapper row']"));
                        }
                    }
                });
            },
            "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                $('td:eq(7)', nRow).css("text-align", "right");
                $('td:eq(8)', nRow).css("text-align", "right");
                $('td:eq(10)', nRow).css("text-align", "right");
                return nRow;
            }
        });
    });
}

function RenderAction(oObj) {
    var IdOPLAgreement = oObj.aData["IdOPLAgreement"];
    var IdTb_BIL_PaySchedule = oObj.aData["IdTb_BIL_PaySchedule"];
    var IdTb_BIL_PayScheduleDtl = oObj.aData["IdTb_BIL_PayScheduleDtl"];
    var RowVersionPSD = oObj.aData["Row_VersionPayScheduleDtl"];
    var AgreementNumber = oObj.aData["AgreementNumber"];
    var CustomerName = oObj.aData["CustomerName"];
    var IdTb_BIL_InvoiceEmail = oObj.aData["IdTb_BIL_InvoiceEmail"];
    var RowVersionIE = oObj.aData["Row_VersionInvoiceEmail"];
    var PICName = oObj.aData["PICEmail"] || "";
    var Email = oObj.aData["Email"] || "";
    var status = oObj.aData["InvoiceStatus"];
    var jobTitle = oObj.aData["jobTitle"];
    var createByAgreement = oObj.aData["CreateByAgreement"];
    var currentUser = oObj.aData["CurrentUser"];
    var AgreementStatus = oObj.aData["AgreementStatus"];
    var htmlButtonAction = "<div style='word-wrap: break-word; white-space: nowrap;'>";
    switch (iActiveTabIndex) {
        case 0: //tab7days
            if (AgreementStatus == StatusStopBilling) {
                htmlButtonAction += "<a title='Create Invoice' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-plus'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Edit Billing Payment' href='#' class='btn btn-warning btn-xs disabled'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Input Promise to Pay' href='#' class='btn btn-primary btn-xs disabled'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing Payment History Inquiry Invoice' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-book'></i></a>";
            }
            else {
                if (status == "" || status == null)
                    htmlButtonAction += "<a title='Create Invoice' href='" + serverRoot + "BILCreation/CreateInvoice/" + IdTb_BIL_PayScheduleDtl + "' class='btn btn-info disabled btn-xs'><i class='fa fa-plus'></i></a>&nbsp;";
                else
                    htmlButtonAction += "<a title='Create Invoice' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-plus'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Edit Billing Payment' href='" + serverRoot + "BILCreation/EditBilling/?id=" + IdTb_BIL_PayScheduleDtl + "&sender=0' class='btn btn-warning btn-xs'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Input Promise to Pay' href='#promisetoPayModal' class='btn btn-primary btn-xs' data-toggle='modal' onclick='ShowPromiseToPayPopUpView(\"" + IdTb_BIL_PayScheduleDtl + "\", \"" + RowVersionPSD + "\", \"" + AgreementNumber + "\", \"" + CustomerName + "\")'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing Payment History Inquiry Invoice' href='" + serverRoot + "BILCreation/ListInvoiceStatusApproval/" + IdTb_BIL_PayScheduleDtl + "' class='btn btn-info btn-xs'><i class='fa fa-book'></i></a>";
            }
            break;
        case 1: //tab5days
        case 2: //tab1days
            if (AgreementStatus == StatusStopBilling) {
                htmlButtonAction += "<a title='Send Reminder' href='#' class='btn btn-primary btn-xs disabled'><i class='fa fa-envelope'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Input Promise to Pay' href='#' class='btn btn-primary btn-xs disabled'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-edit'></i></a>";
            }
            else {
                htmlButtonAction += "<a title='Send Reminder' href='#sendReminderEmailModal' class='btn btn-primary btn-xs' data-toggle='modal' onclick='ShowSendReminderEmailPopUpView(\"" + IdTb_BIL_InvoiceEmail + "\", \"" + IdTb_BIL_PayScheduleDtl + "\", \"" + RowVersionIE + "\", \"" + PICName + "\", \"" + Email + "\")'><i class='fa fa-envelope'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Input Promise to Pay' href='#promisetoPayModal' class='btn btn-primary btn-xs' data-toggle='modal' onclick='ShowPromiseToPayPopUpView(\"" + IdTb_BIL_PayScheduleDtl + "\", \"" + RowVersionPSD + "\", \"" + AgreementNumber + "\", \"" + CustomerName + "\")'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='" + serverRoot + "BILCreation/DetailBilling/" + IdTb_BIL_PaySchedule +"' class='btn btn-info btn-xs'><i class='fa fa-edit'></i></a>";
            }
            break;
        case 3: //tabduedate
            if (AgreementStatus == StatusStopBilling)
                htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-edit'></i></a>";
            else
                htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='" + serverRoot + "BILCreation/DetailBilling/" + IdTb_BIL_PaySchedule +"' class='btn btn-info btn-xs' ><i class='fa fa-edit'></i></a>";
            break;
        case 4: //taball
            if (AgreementStatus == StatusStopBilling) {
                htmlButtonAction += "<a title='Create Invoice' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-plus'></i></a>&nbsp;"; // S0107780 - CR View Invoice (7 days)
                htmlButtonAction += "<a title='Edit Billing Payment' href='#' class='btn btn-warning btn-xs disabled'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Input Promise to Pay' href='#' class='btn btn-primary btn-xs disabled'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing Payment History Inquiry Invoice' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-book'></i></a>&nbsp;";
                //htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-edit'></i></a>&nbsp;"; //Remarked by fadilah S0200183 15-04-2020
                htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='" + serverRoot + "BILCreation/DetailBilling/" + IdTb_BIL_PaySchedule + "' class='btn btn-info btn-xs enabled' ><i class='fa fa-edit'></i></a>&nbsp;"; //Added by fadilah S0200183 15-04-2020
                htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' disabled><i class='fa fa-times'></i></a>";
            }
            else {
                if (status == "" || status == null) // S0107780 - CR View Invoice (7 days)
                    htmlButtonAction += "<a title='Create Invoice' href='" + serverRoot + "BILCreation/CreateInvoice/" + IdTb_BIL_PayScheduleDtl + "' class='btn btn-info btn-xs disabled'><i class='fa fa-plus'></i></a>&nbsp;";
                else
                    htmlButtonAction += "<a title='Create Invoice' href='#' class='btn btn-info btn-xs disabled'><i class='fa fa-plus'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Edit Billing Payment' href='" + serverRoot + "BILCreation/EditBilling/?id=" + IdTb_BIL_PayScheduleDtl + "&sender=0' class='btn btn-warning btn-xs'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Input Promise to Pay' href='#promisetoPayModal' class='btn btn-primary btn-xs' data-toggle='modal' onclick='ShowPromiseToPayPopUpView(\"" + IdTb_BIL_PayScheduleDtl + "\", \"" + RowVersionPSD + "\", \"" + AgreementNumber + "\", \"" + CustomerName + "\")'><i class='fa fa-edit'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing Payment History Inquiry Invoice' href='" + serverRoot + "BILCreation/ListInvoiceStatusApproval/" + IdTb_BIL_PayScheduleDtl + "' class='btn btn-info btn-xs'><i class='fa fa-book'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Billing & Payment History Inquiry' href='" + serverRoot + "BILCreation/DetailBilling/" + IdTb_BIL_PaySchedule +"' class='btn btn-info btn-xs' ><i class='fa fa-edit'></i></a>&nbsp;";
                if (jobTitle == picTitleCode) {
                    if (createByAgreement == currentUser) {
                        htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#confirmationModal'  onclick='ActionCloseAgreement(\"" + IdOPLAgreement + "\",\"" + IdTb_BIL_PaySchedule + "\", \"" + AgreementNumber + "\")'><i class='fa fa-times'></i></a>";
                    } else {
                        htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' disabled><i class='fa fa-times'></i></a>";
                    }
                } else {
                    htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' disabled><i class='fa fa-times'></i></a>";
                }
            }
            break;
        case 5: //tabendcontract
            if (AgreementStatus == StatusStopBilling) {
                htmlButtonAction += "<a title='Create RAL' href='#' class='btn btn-danger btn-xs disabled'><i class='fa fa-plus'></i></a>&nbsp;";
                htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs disabled'><i class='fa fa-times'></i></a>";
            }
            else {
                htmlButtonAction += "<a title='Create RAL' href='" + serverRoot + "BILRAL/Create/" + IdTb_BIL_PaySchedule + "' class='btn btn-danger btn-xs'><i class='fa fa-plus'></i></a>&nbsp;";
                if (jobTitle == picTitleCode) {
                    if (createByAgreement == currentUser) {
                        htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#confirmationModal'  onclick='ActionCloseAgreement(\"" + IdOPLAgreement + "\",\"" + IdTb_BIL_PaySchedule + "\", \"" + AgreementNumber + "\")'><i class='fa fa-times'></i></a>";
                    } else {
                        htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' disabled><i class='fa fa-times'></i></a>";
                    }
                } else {
                    htmlButtonAction += "<a title='Stop Billing' name='closeAgreement' class='btn btn-danger btn-xs' disabled><i class='fa fa-times'></i></a>";
                }
            }
            break;
    }
    return htmlButtonAction += "</div>";
}

//handling Error
function handleAjaxError(textStatus) {
    if (textStatus === 'timeout') {
        bootstrap_alert.error("Timeout", "The server took too long to send the data.");
    } else {
        bootstrap_alert.error("Connection problem", "An error occurred on the server. Please try again in a few minute or contact your administrator.");
    }
}

bootstrap_alert = function() { }
bootstrap_alert.success = function(header, message) {
    $('#alert_placeholder').html('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><b>' + header + '!</b> ' + message + '</div>');
}
bootstrap_alert.error = function(header, message) {
    $('#alert_placeholder').html('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><b>' + header + '!</b> ' + message + '</div>');
}

function BillDetail(a) {
    $("#MainTenanceBillModal").modal('show');
    $.post(serverRoot + "BILSchedule/GetDetailMaintenanceBill?idpayscheduledtl=" + a, function(data) {
        $("#lbagnumber").html(data.AgreementNumber);
        $("#lbcontperiod").html(data.AgreementPeriod);
        $("#maintenance-detail-list").html(data.DataDetail);
        $("#lblttlbillingdetail").html(data.TotalBilling);
    });
}
