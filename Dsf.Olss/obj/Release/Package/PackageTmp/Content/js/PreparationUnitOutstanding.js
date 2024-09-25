// This must be applied to a form (or an object inside a form).
jQuery.fn.addHidden = function (name, value) {
    return this.each(function () {
        var input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        $(this).append($(input));
    });
};

//Confirmation Modal
$('input[name="statusButton"]').on('click', function (e) {
    var checkedRow = 0;
    $('.tab-content div[class="tab-pane fade active in"] tbody tr').each(function (index) {
        if ($(this).find("input[type = 'checkbox']").prop("checked") == true) {
            checkedRow++;
        }
    });
    if (checkedRow > 0) {
        if (JSVal()) {
            var submitvalue = $(this).val();
            var msg = submitvalue;
            $('#msgModal').text(msg);
            $('#submitButtonText').val(submitvalue);
        }
        else {
            e.preventDefault();
            goToTop();
            return false;
        }
    }
    else {
        e.preventDefault();
        goToTop();
        return false;
    }
    return true;
});

function goToTop() {
    $('section[class*="scrollable"]').animate({
        scrollTop: 0
    }, 700);
}

$('#confirmModal').click(function (e) {
    var submitvalue = $('#submitButtonText').val();
    if (MGTUnitPrepUpdate() >= 0)
        $('form:first').addHidden('statusButton', submitvalue).trigger('submit');
});

function JSVal() {
    var ObjectName = (iActiveTabIndex == 0) ? "oOutstanding45" : (iActiveTabIndex == 1) ? "oOutstanding20" : (iActiveTabIndex == 2) ? "oOutstanding3" : "oActual";
    var ret = true;
    $('.tab-content div[class="tab-pane fade active in"] tbody tr').each(function (index) {
        if ($(this).find("input[type = 'checkbox']").prop("checked") == true) {
            if ($(this).find(".remark-field").val() == "") {
                $(this).find(".remark-field").siblings(".field-validation-error").show();
                ret = false;
            }
            var data = window[ObjectName].fnGetData(this);
            if (data.UnitReadiness == "Complete" && $(this).find(".datepicker-bastactual").val() == "") {
                $(this).find(".datepicker-bastactual").parent().parent().find(".field-validation-error.blank").show();
                ret = false;
            }
            if ($(this).find(".datepicker-bastactual").val() != "") {
                if (new Date($(this).find(".datepicker-bastactual").val()) < new Date(data.POCreationDate)) {
                    $(this).find(".datepicker-bastactual").parent().parent().find(".field-validation-error.less").show();
                    ret = false;
                }
            }
        }
    });
    return ret;
}

$('input[name="statusButton"]').attr('type', 'button').attr('data-toggle', 'modal').attr('data-target', '#myModal');

function MGTUnitPrepUpdate() {
    var checkedRowIndex = 0;
    var rows = $('.tab-content div[class="tab-pane fade active in"] tbody tr');
    rows.each(function () {
        $(this).find(".idunitprep").attr('name', null);
        $(this).find("input[type = 'checkbox']").attr('name', null);
        $(this).find(".progress-status").attr('name', null);
        $(this).find(".progress-status-hidden").attr('name', null);
        $(this).find('textarea').attr('name', null);
        $(this).find(".unit-readiness").attr('name', null);
        $(this).find(".unit-readiness-hidden").attr('name', null);
        $(this).find(".datepicker-bastactual").attr('name', null);
        $(this).find(".isunit-hidden").attr('name', null);
        if ($(this).find("input[type = 'checkbox']").prop("checked")) {
            $(this).find(".idunitprep").attr('name', 'unitPreparation[' + checkedRowIndex + '].IdTb_MGT_UnitPrep');
            $(this).find("input[type = 'checkbox']").attr('name', 'unitPreparation[' + checkedRowIndex + '].IsChecked');
            if ($(this).find(".progress-status").attr("disabled") != "disabled")
                $(this).find(".progress-status").attr('name', 'unitPreparation[' + checkedRowIndex + '].ProgressStatus');
            else
                $(this).find(".progress-status-hidden").attr('name', 'unitPreparation[' + checkedRowIndex + '].ProgressStatus');
            $(this).find('textarea').attr('name', 'unitPreparation[' + checkedRowIndex + '].Remark');
            if ($(this).find(".unit-readiness").attr("disabled") != "disabled")
                $(this).find(".unit-readiness").attr('name', 'unitPreparation[' + checkedRowIndex + '].UnitReadiness');
            else
                $(this).find(".unit-readiness-hidden").attr('name', 'unitPreparation[' + checkedRowIndex + '].UnitReadiness');
            $(this).find(".datepicker-bastactual").attr('name', 'unitPreparation[' + checkedRowIndex + '].BASTActualDate');
            $(this).find(".isunit-hidden").attr('name', 'unitPreparation[' + checkedRowIndex + '].IsUnit');
            checkedRowIndex++;
        }
    });
    return checkedRowIndex;
}

function IsActual(bVal) {
    PopulateAndClearSerchCriteria();
    if (!bVal) {
        $("#btnSave").show();
        $("#lblStartDate").html("Start BAST Plan Date");
        $("#lblEndDate").html("End BAST Plan Date");
    }
    else {
        $("#btnSave").hide();
        $("#lblStartDate").html("Start BAST Actual Date");
        $("#lblEndDate").html("End BAST Actual Date");
    }
}

function PopulateOutstanding(ObjectName, TabId) {
    iCount = -1;
    $("#" + TabId + "-list").each(function () {
        window[ObjectName] = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[4, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTPreparationUnit/AjaxHandlerOutstandingUnit",
            "fnServerParams": function (aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() },
                    { "name": "outstandingType", "value": iActiveTabIndex }
                );
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
                {
                    "mData": "DsfOffice",
                    "fnRender": function (oObj) {
                        iCount++;
                        var IdTb_MGT_UnitPrep = oObj.aData["IdTb_MGT_UnitPrep"];
                        var result = oObj.aData["DsfOffice"] + '<input type="hidden" class="idunitprep" value="' + IdTb_MGT_UnitPrep + '">';
                        return result;
                    }
                },
                { "mData": "AgreementNumber" },
                { "mData": "CustomerName" },
                { "mData": "PONumber" },
                { "mData": "POCreationDate" },
                { "mData": "POApprovedDate" },
                { "mData": "SupplierName" },
                { "mData": "UnitDescription" },
                { "mData": "UnitStatus" },
                { "mData": "Qty" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function (oObj) {
                        var IdTb_MGT_UnitPrep = oObj.aData["ViewHistory"];
                        var retElement = "";
                        retElement += "<div style='width: 100%; text-align: center;'>";
                        retElement += "<button class='btn btn-danger btn-xs' data-toggle='modal' data-target='#PrepHistoryModal' type='button' onclick='LoadProgressHistory(" + iCount + ")'><i class='fa fa-book'></i></button>";
                        retElement += "</div>";
                        return retElement;
                    }
                },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    var IdTb_MGT_UnitPrep = oObj.aData["IdTb_MGT_UnitPrep"];
                    var AllowEdit = oObj.aData["AllowEdit"];
                    var BASTActual = oObj.aData["BASTActual"];
                    var IsUnit = oObj.aData["IsUnit"];
                    var UnitReadinessValue = oObj.aData["UnitReadinessValue"];
                    var retElement = "";
                    if (!IsUnit) {
                        if (UnitReadinessValue != sComplete) {
                            retElement += "<div style='width: 100%; text-align: center;'>";
                            retElement += "<input type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;'" + (!AllowEdit ? "disabled" : "") + ">";
                            retElement += "</div>";
                        }
                    }
                    else {
                        if (!(BASTActual != null && BASTActual != "")) {
                            retElement += "<div style='width: 100%; text-align: center;'>";
                            retElement += "<input type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;'" + (UnitReadinessValue != sComplete ? (!AllowEdit ? "disabled" : "") : "") + ">";
                            retElement += "</div>";
                        }
                    }
                    return retElement;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    var ProgressStatus = oObj.aData["ProgressStatus"];
                    var ProgressStatusValue = oObj.aData["ProgressStatusValue"];
                    var UnitReadinessValue = oObj.aData["UnitReadinessValue"];
                    var AllowEdit = oObj.aData["AllowEdit"];
                    var BASTActual = oObj.aData["BASTActual"];
                    var IsUnit = oObj.aData["IsUnit"];
                    var retElement = "";
                    if (!IsUnit) {
                        if (UnitReadinessValue != sComplete) {
                            retElement = "<select class='form-control progress-status' style='width: 170px;' value='" + ProgressStatusValue + "' " + (!AllowEdit ? "disabled" : "") + "></select>";
                            retElement += "<input type='hidden' class='progress-status-hidden' value='" + ProgressStatusValue + "'>";
                        }
                        else
                            retElement += oObj.aData["ProgressStatus"];
                    }
                    else {
                        if (BASTActual != null && BASTActual != "")
                            retElement = (ProgressStatus != null && ProgressStatus != "" ? ProgressStatus : retElement);
                        else {
                            retElement = "<select class='form-control progress-status' style='width: 170px;' value='" + ProgressStatusValue + "' " + (UnitReadinessValue == sComplete ? "disabled" : (!AllowEdit ? "disabled" : "")) + "></select>";
                            if (UnitReadinessValue == sComplete || (UnitReadinessValue != sComplete && !AllowEdit))
                                retElement += "<input type='hidden' class='progress-status-hidden' value='" + ProgressStatusValue + "'>";
                        }
                    }
                    return retElement;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    var Remark = oObj.aData["Remark"];
                    var AllowEdit = oObj.aData["AllowEdit"];
                    var UnitReadinessValue = oObj.aData["UnitReadinessValue"];
                    var BASTActual = oObj.aData["BASTActual"];
                    var IsUnit = oObj.aData["IsUnit"];
                    var retElement = "";
                    if (!IsUnit) {
                        if (UnitReadinessValue != sComplete) {
                            retElement = "<textarea class='form-control remark-field " + (!AllowEdit ? "readonly" : "") + "' rows='2' style='width: 200px;' maxlength='100' " + (!AllowEdit ? "readonly" : "") + ">" + (Remark != null ? (!AllowEdit ? Remark : "") : "") + "</textarea>";
                            retElement += "<span class='field-validation-error' style='display: none;'>The Remark field is required.</span>";
                        }
                        else
                            retElement += oObj.aData["Remark"];
                    }
                    else {
                        if (BASTActual != null && BASTActual != "")
                            retElement = (Remark != null && Remark != "" ? Remark : retElement);
                        else {
                            retElement = "<textarea class='form-control remark-field " + (UnitReadinessValue == sComplete ? "readonly" : (!AllowEdit ? "readonly" : "")) + "' rows='2' style='width: 200px;' maxlength='100' " + (UnitReadinessValue == sComplete ? "readonly" : (!AllowEdit ? "readonly" : "")) + ">" + (Remark != null ? (!AllowEdit ? Remark : "") : "") + "</textarea>";
                            retElement += "<span class='field-validation-error' style='display: none;'>The Remark field is required.</span>";
                        }
                    }
                    return retElement;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    var UnitReadiness = oObj.aData["UnitReadiness"];
                    var UnitReadinessValue = oObj.aData["UnitReadinessValue"];
                    var AllowEdit = oObj.aData["AllowEdit"];
                    var BASTActual = oObj.aData["BASTActual"];
                    var IsUnit = oObj.aData["IsUnit"];
                    var retElement = "";
                    if (!IsUnit) {
                        if (UnitReadinessValue != sComplete) {
                            retElement = "<select class='form-control unit-readiness' style='width: 120px;' value='" + UnitReadinessValue + "' " + (!AllowEdit ? "disabled" : "") + "></select>";
                            retElement += "<input type='hidden' class='unit-readiness-hidden' value='" + UnitReadinessValue + "'>";
                        }
                        else
                            retElement += oObj.aData["UnitReadiness"];
                    }
                    else {
                        if (BASTActual != null && BASTActual != "")
                            retElement = (UnitReadiness != null && UnitReadiness != "" ? UnitReadiness : retElement);
                        else {
                            retElement = "<select class='form-control unit-readiness' style='width: 120px;' value='" + UnitReadinessValue + "' " + (UnitReadinessValue == sComplete ? "disabled" : (!AllowEdit ? "disabled" : "")) + "></select>";
                            if (UnitReadinessValue == sComplete || (UnitReadinessValue != sComplete && !AllowEdit))
                                retElement += "<input type='hidden' class='unit-readiness-hidden' value='" + UnitReadinessValue + "'>";
                        }
                    }
                    return retElement;
                }
            },
            { "mData": "UpdateDate" },
            { "mData": "BASTPlan" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    var BASTActual = oObj.aData["BASTActual"];
                    var IsUnit = oObj.aData["IsUnit"];
                    var UnitReadinessValue = oObj.aData["UnitReadinessValue"];
                    var retElement = "";
                    if (BASTActual != null && BASTActual != "")
                        retElement = (BASTActual != null && BASTActual != "" ? BASTActual : retElement);
                    else {
                        retElement = "<div class='input-group date'>";
                        if (IsUnit) {
                            retElement += "<input data-date-format='MM/dd/yyyy' style='width: 100px;' type='text' class='form-control datepicker-bastactual' value='" + BASTActual + "' " + (UnitReadinessValue != sComplete ? "readonly" : "") + "/>";
                            retElement += "<span class='input-group-addon'><i class='fa fa-calendar'></i></span>";
                            retElement += "</div>";
                            retElement += "<span class='field-validation-error blank' style='display: none;'>BAST Actual field is required.</span>";
                            retElement += "<span class='field-validation-error less' style='display: none;'>BAST Actual cannot be less than Creation Date.</span>";
                        }
                        else {
                            retElement = "Based on Parent Date";
                        }
                        retElement += "<input type='hidden' class='isunit-hidden' value='" + IsUnit + "'>";
                    }
                    return retElement;
                }

            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    var IdTb_MGT_UnitPrep = oObj.aData["IdTb_MGT_UnitPrep"];
                    var idParsial = oObj.aData["BastParsial"];
                    var UnitReadiness = oObj.aData["UnitReadiness"];
                    var BASTActual = oObj.aData["BASTActual"];
                    var RemainingBAST = oObj.aData["RemainingBAST"];
                    var BASTCount = oObj.aData["BASTCount"];
                    var IsUnit = oObj.aData["IsUnit"];
                    var UnitStatus = oObj.aData["UnitStatus"];
                    var htmlButtonAction = "<div style='word-wrap: break-word; white-space: nowrap;'>";
                    if (IsUnit) {
                        if (UnitReadiness == "Complete" && BASTActual != null && BASTActual != "" && RemainingBAST > 0)
                            htmlButtonAction += "<a title='Create BAST' href='" + serverRoot + "MGTPreparationUnit/Create/" + IdTb_MGT_UnitPrep + "' class='btn btn-danger btn-xs'><i class='fa fa-plus'></i></a>";
                        else
                            htmlButtonAction += "<span class='btn btn-white disabled btn-xs'><i class='fa fa-plus'></i></span>";
                        if (UnitReadiness == "Complete" && BASTActual != null && BASTActual != "" && BASTCount > 0) {
                            htmlButtonAction += "&nbsp;<a title='Edit BAST' href='" + serverRoot + "MGTPreparationUnit/Edit/" + IdTb_MGT_UnitPrep + "' class='btn btn-primary btn-xs'><i class='fa fa-edit'></i></a>";
                            if (UnitStatus != "Refinance")
                                htmlButtonAction += "&nbsp;<a title='Print BAST Supplier' href='" + serverRoot + "MGTPreparationUnit/BASTSupplierReport/" + IdTb_MGT_UnitPrep + "/" + idParsial + "' class='btn btn-white btn-xs'><i class='fa fa-print'></i></a>";
                            else
                                htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-print'></i></span>";
                            htmlButtonAction += "&nbsp;<a title='Print BAST Customer' href='" + serverRoot + "MGTPreparationUnit/BASTCustomerReport/" + IdTb_MGT_UnitPrep + "/" + idParsial + "' class='btn btn-white btn-xs'><i class='fa fa-print'></i></a>";
                        }
                        else {
                            htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-edit'></i></span>";
                            htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-print'></i></span>";
                            htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-print'></i></span>";
                        }
                    }
                    else {
                        htmlButtonAction += "<span class='btn btn-white disabled btn-xs'><i class='fa fa-plus'></i></span>";
                        htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-edit'></i></span>";
                        htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-print'></i></span>";
                        htmlButtonAction += "&nbsp;<span class='btn btn-white disabled btn-xs'><i class='fa fa-print'></i></span>";
                    }
                    htmlButtonAction += "</div>";
                    return htmlButtonAction;
                }
            }
            ],
            "aoColumnDefs": [
                { "sWidth": "50%", "aTargets": [0] },
                { "sClass": "center", "aTargets": [1] }
            ],
            "fnServerData": function (sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "success": fnCallback,
                    "timeout": 0,
                    "error": handleAjaxError,
                    "global": false,
                    "complete": function (sReturn) {
                        $(".progress-status").each(function () {
                            var valCom = $(this).attr("value");
                            var comboBox = $(this);
                            var ind = -1;
                            $.each(sReturn.responseJSON.aaProgressStatus, function (key, value) {
                                ind++;
                                comboBox.append("<option value='" + value.Keys + "' " + (value.Keys == valCom ? "selected" : "") + ">" + value.Values + "</option>");
                            });
                            if (valCom == null || valCom == -1)
                                $(this).val($(this).find("option").first().val());
                        });
                        $(".unit-readiness").each(function () {
                            var valCom = $(this).attr("value");
                            var comboBox = $(this);
                            $.each(sReturn.responseJSON.aaUnitReadiness, function (key, value) {
                                comboBox.append("<option value='" + value.Keys + "' " + (value.Keys == valCom ? "selected" : "") + ">" + value.Values + "</option>");
                            });
                            if (valCom == null || valCom == -1)
                                $(this).val($(this).find("option").last().val());
                        });
                        iCount = -1;
                        var fakePagination = $("#" + TabId + "-list_wrapper > div:eq(1)");
                        if (typeof (fakePagination.html()) != "undefined") {
                            $("." + TabId + "_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                            fakePagination.appendTo($("." + TabId + "_responsive div[class='dataTables_wrapper row']"));
                        }
                        $(".form-control.datepicker-bastactual").each(function () {
                            if (typeof ($(this).attr("readonly")) == "undefined")
                                $(this).datepicker({
                                    format: "mm/dd/yyyy"
                                });
                        });
                        $(".form-control.datepicker-bastactual .input-group-addon").each(function () {
                            if (typeof ($(this).attr("readonly")) == "undefined")
                                $(this).on("click", function () {
                                    $(this).closest(".form-control.datepicker-bastactual").datepicker('show');
                                });
                        });
                    }
                });
            }
        });
    });
}
