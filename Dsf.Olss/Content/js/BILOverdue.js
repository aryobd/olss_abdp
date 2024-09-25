
function PopulateOverdue(objectName, tabId, overdueType) {
    $("#" + tabId).each(function() {
        window[objectName] = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "BILOverdue/AjaxHandler",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() },
                    { "name": "overdueType", "value": overdueType }
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
                { "mData": "EndUsageUnitDate" },
                { "mData": "TotalOverdue" },
                { "mData": "OverdueDays" },
                { "mData": "OverdueBucket" },
                { "mData": "PromisetoPayDatePrevious" },
                { "mData": "PromisetoPayDateCurrent" },
                { "mData": "LastModifiedBy" },
                { "mData": "LastModifiedDate" },
                {
                    "mData": "WarningLetterStatusName",
                    "fnRender": function(oObj) {
                        var status = oObj.aData["WarningLetterStatus"];
                        var statusName = oObj.aData["WarningLetterStatusName"];

                        if (status == window.srv_draft) {
                            return "<span class='label label-default'>" + statusName + "</span>";
                        }

                        if (status == window.srv_approved) {
                            return "<span class='label label-success'>" + statusName + "</span>";
                        }

                        if (status == window.srv_rejected) {
                            return "<span class='label label-danger'>" + statusName + "</span>";
                        }

                        if (status == window.srv_submitted) {
                            return "<span class='label label-primary'>" + statusName + "</span>";
                        }

                        if (status == window.srv_check) {
                            return "<span class='label label-success'>" + statusName + "</span>";
                        }

                        if (status == window.srv_revised) {
                            return "<span class='label label-revisioned'>" + statusName + "</span>";
                        }


                        return statusName;
                    }
                },
                {
                    "mData": "RalStatusName",
                    "fnRender": function(oObj) {
                        var status = oObj.aData["RalStatus"];
                        var statusName = oObj.aData["RalStatusName"];

                        if (status == window.srv_draft) {
                            return "<span class='label label-default'>" + statusName + "</span>";
                        }

                        if (status == window.srv_approved) {
                            return "<span class='label label-success'>" + statusName + "</span>";
                        }

                        if (status == window.srv_rejected) {
                            return "<span class='label label-danger'>" + statusName + "</span>";
                        }

                        if (status == window.srv_submitted) {
                            return "<span class='label label-primary'>" + statusName + "</span>";
                        }

                        if (status == window.srv_check) {
                            return "<span class='label label-success'>" + statusName + "</span>";
                        }
                        if (status == window.srv_revised) {
                            return "<span class='label label-revisioned'>" + statusName + "</span>";
                        }

                        return statusName;
                    }
                },
                {
                    "mData": "Action",
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var idPaymentSchedule = oObj.aData["IdTb_BIL_PaySchedule"];
                        var isCreateWarningLetterActive = oObj.aData["IsCreateWarningLetterActive"];
                        var jobTitle = oObj.aData["jobTitle"];
                        var createByAgreement = oObj.aData["CreateByAgreement"];
                        var currentUser = oObj.aData["CurrentUser"];
                        var idOplAgreement = oObj.aData["IdOPLAgreement"];
                        var agreementNumber = oObj.aData["AgreementNumber"];

                        CounterData++;
                        var html = "" +
                            "<div style='width: 150px;white-space: nowrap;'>" +
                                "<a href='#' class='btn btn-danger btn-xs' title='Create Reminder Memo' onclick='ShowReminderMemo(" + CounterData + ");return false;'><i class='fa fa-plus'></i></a>&nbsp;";

                        if (isCreateWarningLetterActive) {
                            html +=
                                "<a href='" + serverRoot + "BILWarningLetter/Create/" + idPaymentSchedule + "' class='btn btn-primary btn-xs' title='Create Warning Letter'><i class='fa fa-edit'></i></a>&nbsp;";
                        } else {
                            html +=
                                "<a href='#' class='btn btn-primary btn-xs disabled' title='Create Warning Letter'><i class='fa fa-edit'></i></a>&nbsp;";
                        }

                        html +=
                            "<a href='" + serverRoot + "BILRAL/Create/" + idPaymentSchedule + "' class='btn btn-warning btn-xs' title='Create RAL'><i class='fa fa-edit'></i></a>&nbsp;" +
                            "<a href='#' data-toggle='modal' data-target='#reminderMemoHistoryModal' class='btn btn-info btn-xs' title='Reminder Memo History' onclick='LoadreminderMemoHistory(" + CounterData + ");return false;'><i class='fa fa-bars'></i></a>&nbsp;" +
                            "<a title='Billing & Payment History Inquiry' href='" + serverRoot + "BILCreation/DetailBilling/" + idPaymentSchedule +"' class='btn btn-info btn-xs''><i class='fa fa-edit'></i></a>&nbsp;";

                        if (jobTitle == picTitleCode) {
                            if (createByAgreement == currentUser) {
                                html += "<a title='Close Agreement' name='closeAgreement' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#confirmationModal'  onclick='ActionCloseAgreement(\"" + idOplAgreement + "\",\"" + idPaymentSchedule + "\", \"" + agreementNumber + "\")'><b>X</b></a>";
                            } else {
                                html += "<a title='Close Agreement' name='closeAgreement' class='btn btn-danger btn-xs' disabled><b>X</b></a>";
                            }
                        } else {
                            html += "<a title='Close Agreement' name='closeAgreement' class='btn btn-danger btn-xs' disabled><b>X</b></a>";
                        }

                        html +=
                            "</div>";
                        return html;
                    }
                },
                { "mData": "SortableAgreementDate", "bVisible": false },
                { "mData": "SortableEndUsageUnitDate", "bVisible": false },
                { "mData": "SortablePromisetoPayDatePrevious", "bVisible": false },
                { "mData": "SortablePromisetoPayDateCurrent", "bVisible": false },
                { "mData": "SortableLastModifiedDate", "bVisible": false }
            ],
            "aoColumnDefs": [
                { "sClass": "text-center", "aTargets": [0, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
                { "sClass": "text-right", "aTargets": [6] },
                { "sClass": "text-left", "aTargets": [1, 2, 3] }
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
                    "complete": function() {
                        var fakePagination = $("#" + tabId + "_wrapper > div:eq(1)");
                        if (typeof (fakePagination.html()) != "undefined") {
                            $("." + tabId + "_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                            fakePagination.appendTo($("." + tabId + "_responsive div[class='dataTables_wrapper row']"));
                        }
                        CounterData = -1;
                    }
                });
            }
        });
    });

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

function PostActionCloseAgreement() {
    var idAgreement = $('input[name="IdOPLAgreement"]').val();
    var idBilPaySchedule = $('input[name="IdTb_BIL_PaySchedule"]').val();

    var params = { idAgreement: idAgreement, idBilPaySchedule: idBilPaySchedule };
    var path = serverRoot + "BILOverdue/ActionCloseAgreement";

    Post(path, params);

    $('#confirmModal').removeAttr('onclick');
}


//handling Error
function handleAjaxError(textStatus) {
    if (textStatus === 'timeout') {
        bootstrap_alert.error("Timeout", "The server took too long to send the data.");
    }
    else {
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

var oReminderMemoHistory;
var actualIdTb_BIL_PayScheduleDtl = '';

function LoadreminderMemoHistory(index) {
    $("#valAgreementNumber,#valCustomerName,#valIdTb_BIL_PayScheduleDtl").val('');
    var dataParent = window[ObjectName].fnGetData(index);
    $("#valAgreementNumber").val(dataParent.AgreementNumber);
    $("#valCustomerName").val(dataParent.CustomerName);
    $("#valIdTb_BIL_PayScheduleDtl").val(dataParent.LatestIdTb_BIL_PayScheduleDtl);

    //datatable
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        //"aaSorting": [[0, "desc"]],
        "bRetrieve": true,
        "sAjaxSource": serverRoot + "BILOverdue/GetreminderMemoHistory/",
        "fnServerParams": function(aoData) {
            aoData.push(
                { "name": "IdBilPayScheduleDtl", "value": dataParent.LatestIdTb_BIL_PayScheduleDtl }
            );
        },
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            {
                "mData": "Id",
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    var id = oObj.aData["Id"];
                    return ++oObj.iDataRow + id;
                }
            },
                { "mData": "ReminderDate" },
                { "mData": "ReminderType" },
                { "mData": "CreatedBy" },
                { "mData": "Response" },
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
                "global": false
            });
        },
        "iDisplayLength": 5,
        "bLengthChange": false
    };

    if (typeof (oReminderMemoHistory) != "undefined" && actualIdTb_BIL_PayScheduleDtl != dataParent.IdTb_BIL_PayScheduleDtl) {
        oReminderMemoHistory.fnDestroy();
        oReminderMemoHistory = $('#reminderMemoHistory-list').dataTable(config);
    } else {
        oReminderMemoHistory = $('#reminderMemoHistory-list').dataTable(config);
    }
    actualIdTb_BIL_PayScheduleDtl = dataParent.IdTb_BIL_PayScheduleDtl;
}

//printButton
function printBilOverdueReport() {
    var ddlSearchCriteria = $("#ddlSearchCriteria").val();
    var txtStartDate = $("#txtStartDate").val();
    var txtEndDate = $("#txtEndDate").val();
    var txtSearch = $("#txtSearch").val();

    // Ajax start animation progress
    $('#loadingmessage').show();
    $('#btnPrintAll').hide();

    $.ajax({
        type: 'POST',
        url: serverRoot + "BILOverdue/PrintBilOverdueReport/",
        data: JSON.stringify({ 'ddlSearchCriteria': ddlSearchCriteria, 'txtSearch': txtSearch, 'txtStartDate': txtStartDate, 'txtEndDate': txtEndDate, 'iActiveTabIndex': iActiveTabIndex }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'text',
        global: false,
        success: function(response, status, xhr) {
            // check for a filename
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                    response = filename;
                }
            }
            if (response !== "") {
                window.location = "./Base/Download?fileName=" + response + "&rptType=" + 19;
            }
            // Ajax stop animation progress
            $('#loadingmessage').hide();
            $('#btnPrintAll').show();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Cannot download file..! Error is occurs');
            // Ajax stop animation progress
            $('#loadingmessage').hide();
            $('#btnPrintAll').show();
        }
    });
}

function printReminderHistoryMemo() {
    var txtSearch = $("#txtSearch").val();
    var agrNumber = $("#valAgreementNumber").val();
    var custName = $("#valCustomerName").val();
    var txtStartDate = $("#txtStartDate").val();
    var txtEndDate = $("#txtEndDate").val();
    var idBilPayScheduleDtl = $("#valIdTb_BIL_PayScheduleDtl").val();

    // Ajax start animation progress
    $('#loadingmessage').show();
    $('#btnPrintReminderHistoryMemo').hide();

    $.ajax({
        type: 'POST',
        url: serverRoot + "BILOverdue/PrintReminderMemo/",
        data: JSON.stringify({ 'txtSearch': txtSearch, 'txtStartDate': txtStartDate, 'txtEndDate': txtEndDate, 'agrNumber': agrNumber, 'custName': custName, 'id': idBilPayScheduleDtl }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'text',
        global: false,
        success: function(response, status, xhr) {
            // check for a filename
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                    response = filename;
                }
            }
            if (response !== "") {
                window.location = "./Base/Download?fileName=" + response + "&rptType=" + 15;
            }
            // Ajax stop animation progress
            $('#loadingmessage').hide();
            $('#btnPrintReminderHistoryMemo').show();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert('Cannot download file..! Error is occurs');
            // Ajax stop animation progress
            $('#loadingmessage').hide();
            $('#btnPrintReminderHistoryMemo').show();
        }
    });
}

function ShowReminderMemo(index) {
    ClearReminderMemo();
    var ObjectName = (iActiveTabIndex == 1) ? "oOverdue30days" : (iActiveTabIndex == 2) ? "oOverdue60days" : (iActiveTabIndex == 3) ? "oOverdue90days" : "oOverdue91days";
    var TabId = (iActiveTabIndex == 1) ? "billingOverdue30days" : (iActiveTabIndex == 2) ? "billingOverdue60days" : (iActiveTabIndex == 3) ? "billingOverdue90days" : "billingOverdue91days";
    if (typeof (window[ObjectName]) != "undefined") {
        var dataParent = window[ObjectName].fnGetData(index);
        $("#t_AgreementNumber").val(dataParent.AgreementNumber);
        $("#t_CustomerName").val(dataParent.CustomerName);
        $("#IdTb_BIL_PayScheduleDtl").val(dataParent.LatestIdTb_BIL_PayScheduleDtl);
        $("#lbagreement").html(dataParent.AgreementNumber);
    }
    $("#ReminderMemo").modal('show');
}

function validateMemo() {
    if ($("#t_ReminderDate").val().length == 0) {
        $("#er_ReminderDate").show();
    }
    else {
        $("#er_ReminderDate").hide();
    }

    if ($("#t_ReminderType").val().length == 0) {
        $("#er_ReminderType").show();
    }
    else {
        $("#er_ReminderType").hide();
    }

    if ($("#t_Response").val().length == 0) {
        $("#er_ReminderResponse").show();
    }
    else {
        $("#er_ReminderResponse").hide();
    }

    if ($("#t_ReminderDate").val().length > 0 && $("#t_ReminderType").val().length > 0 && $("#t_Response").val().length > 0) {
        $("#ReminderMemoSaveConfirm").modal("show");
        return true;
    }
    return false;
}

function saveMemo() {
    var params = { IdTb_BIL_PayScheduleDtl: $('#IdTb_BIL_PayScheduleDtl').val(), ReminderDate: $("#t_ReminderDate").val(), ReminderType: $("#t_ReminderType").val(), Response: $("#t_Response").val(), agreementNumber: $("#t_AgreementNumber").val() };
    var path = serverRoot + "BILOverdue/SaveMemo";
    Post(path, params);
    ClearReminderMemo();
    $("#ReminderMemo").modal("hide");
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

function ClearReminderMemo() {
    $("#t_AgreementNumber,#t_CustomerName,#t_ReminderDate,#t_Response").val('');
    $("#t_ReminderDate").datepicker("setDate", null);
    $("#er_ReminderDate,#er_ReminderType,#er_ReminderResponse").hide();
}
