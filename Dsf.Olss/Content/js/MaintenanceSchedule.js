function MaintenanceShedule(ObjectName, TabId) {
    iCount = -1;
    $("#" + TabId + "-list").each(function() {
        window[ObjectName] = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[4, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MaintenanceSchedule/AjaxHandlerMaintenanceSch",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                    { "name": "txtSearch", "value": $("#txtSearch").val() },
                    { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                    { "name": "txtEndDate", "value": $("#txtEndDate").val() },
                    { "name": "iActiveTabIndex", "value": iActiveTabIndex }
                );
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
               
                { "mData": "Branch" },
                { "mData": "UnitType" },
                { "mData": "AgreementNumber" },
                { "mData": "PoliceNumber" },
                { "mData": "MaintenanceType" },
                { "mData": "MaintenanceCategory" },
                { "mData": "EndContractDate" },
                { "mData": "LastServiceDate" },
                { "mData": "KM" },
                { "mData": "ActualKM" },
                { "mData": "ScheduleDate" },
                { "mData": "MaintenanceBudget" },
                { "mData": "IsOverdue" },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var IsConfirmation = oObj.aData["IsConfirmation"];
                        var retElement = "";
                        retElement += "<div style='width: 100%; text-align: center;'>";
                        if (IsConfirmation == false) {
                            retElement += "<input type='checkbox' disabled='disabled' class='form-control' style='width: 15px; height: 15px; padding: 0px;'>";
                        } else {
                            retElement += "<input checked='checked' disabled='disabled' type='checkbox' style='width:15px; border:none; padding:0px;'/>";
                        }
                        retElement += "</div>";
                        return retElement;
                    }
                },
                { "mData": "ChooseConfirmDate" },
                { "mData": "ScheduleReqDate" },
                {"mData": "Workshop"},
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var IsWorkshop = oObj.aData["IsWorkshop"];
                        var retElement = "";
                        retElement += "<div style='width: 100%; text-align: center;'>";
                        if (IsWorkshop == false) {
                            retElement += "<input type='checkbox' disabled='disabled' class='form-control' style='width: 15px; height: 15px; padding: 0px;'>";
                        } else {
                            retElement += "<input checked='checked' disabled='disabled' type='checkbox' style='width:15px; border:none; height: 15px; padding:0px;'/>";
                        }
                        retElement += "</div>";
                        return retElement;
                    }
                },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var StartDate = oObj.aData["StartDate"];
                        var retElement = "";
                        retElement = "<div class='input-group date'>";
                        retElement += "<input disabled='disabled' data-date-format='MM/dd/yyyy' style='width: 100px;' type='text' class='form-control datepicker-bastactual' value='" + StartDate + "'/>";
                        retElement += "<span class='input-group-addon'><i class='fa fa-calendar'></i></span>";
                        retElement += "</div>";
                        return retElement;
                    }
                },
               {
                   "mData": null,
                   "bSearchable": false,
                   "bSortable": false,
                   "fnRender": function(oObj) {
                       var EndDate = oObj.aData["EndDate"];
                       var retElement = "";
                       retElement = "<div class='input-group date'>";
                       retElement += "<input disabled='disabled' data-date-format='MM/dd/yyyy' style='width: 100px;' type='text' class='form-control datepicker-bastactual' value='" + EndDate + "'/>";
                       retElement += "<span class='input-group-addon'><i class='fa fa-calendar'></i></span>";
                       retElement += "</div>";
                       return retElement;
                   }
               },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var IdTb_MTN_Monschdl = oObj.aData["IdTb_MTN_Monschdl"];
                        var retElement = "";
                        retElement += "<div style='width: 120px;'>";
                        retElement += '<input type="hidden" value="' + IdTb_MTN_Monschdl + '" id="IdTb_MTN_Monschdl">';
                        retElement += "<a class='btn btn-primary btn-sm' id='updateMaintenance' role='button' onclick='UpdateRowMaintenance(" + IdTb_MTN_Monschdl + ")' data-toggle='modal' data-target='#updateMaintenanceModal'>Update</a>";
                        retElement += "</div>";
                        return retElement;
                    }
                },
                 {
                     "mData": null,
                     "bSearchable": false,
                     "bSortable": false,
                     "fnRender": function(oObj) {
                         var IdTb_MTN_Monschdl = oObj.aData["IdTb_MTN_Monschdl"];
                         var IdWorkOrder = oObj.aData["IdWorkOrder"];
                         var status = oObj.aData["Status"];
                         var createdBy = oObj.aData["CreateByWorkOrder"];
                         var startDate = oObj.aData["StartDate"];
                         var endDate = oObj.aData["EndDate"];
                         var endMaintenanceDate = new Date(oObj.aData["EndDate"]);
                         endMaintenanceDate.setHours(0,0,0,0);
                         var currentDate = new Date();
                         currentDate.setHours(0,0,0,0);

                         var htmlButtonAction = "<div style='word-wrap: break-word; white-space: nowrap;'>";
                         //if (startDate == "" || endDate == "" || currentDate > endMaintenanceDate) {
                         //    htmlButtonAction += "&nbsp;<a class='btn btn-danger btn-xs disabled' href= '" + serverRoot + "MTNWorkOrder/Add/" + IdTb_MTN_Monschdl + "'><i class='fa fa-plus'></i></a>";
                         //} else {
                         //    htmlButtonAction += "&nbsp;<a class='btn btn-danger btn-xs' href= '" + serverRoot + "MTNWorkOrder/Add/" + IdTb_MTN_Monschdl + "'><i class='fa fa-plus'></i></a>";
                         //}

                         //start temporary
                         htmlButtonAction += "&nbsp;<a class='btn btn-danger btn-xs' href= '" + serverRoot + "MTNWorkOrder/Add/" + IdTb_MTN_Monschdl + "'><i class='fa fa-plus'></i></a>";
                         //end temporary

                         if (status == window.srv_draft || status == window.srv_revised) {
                             if (createdBy == window.username) {
                                 htmlButtonAction += "&nbsp;<a title='Edit' href= '" + serverRoot + "MTNWorkOrder/Edit/" + IdWorkOrder + "' class='btn btn-primary btn-xs'><i class='fa fa-edit'></i></a>";
                             } else {
                                 htmlButtonAction += "&nbsp;<span class='btn btn-primary disabled btn-xs'><i class='fa fa-edit'></i></span>";
                             }
                         } else {
                             htmlButtonAction += "&nbsp;<span class='btn btn-primary disabled btn-xs'><i class='fa fa-edit'></i></span>";
                         }
                         htmlButtonAction += "&nbsp;<a class='btn btn-info btn-xs' href= '" + serverRoot + "MTNWorkOrder/Schedule/" + IdTb_MTN_Monschdl + "'><i class='fa fa-bars'></i></a>";
                         htmlButtonAction += "</div>";
                         return htmlButtonAction;
                     }
                 },
                 {
                     "mData": "StatusDescription",
                     "bSearchable": false,
                     "bSortable": false,
                     "fnRender": function(oObj) {
                         var statusDesc = oObj.aData["StatusDescription"];
                         var status = oObj.aData["Status"];

                         if (status == window.srv_draft) {
                             return "<span class='label label-default'>" + statusDesc + "</span>";
                         }
                         if (status == window.srv_submitted) {
                             return "<span class='label label-info'>" + statusDesc + "</span>";
                         }

                         if (status == window.srv_check) {
                             return "<span class='label label-success'>" + statusDesc + "</span>";
                         }

                         if (status == window.srv_approved) {
                             return "<span class='label label-primary'>" + statusDesc + "</span>";
                         }

                         if (status == window.srv_revised) {
                             return "<span class='label label-revise'>" + statusDesc + "</span>";
                         }

                         if (status == window.srv_rejected) {
                             return "<span class='label label-danger'>" + statusDesc + "</span>";
                         }

                         if (status == window.srv_completed) {
                             return "<span class='label label-success'>" + statusDesc + "</span>";
                         }

                         return "<span class='label label-default'>" + statusDesc + "</span>";
                     }
                 },
                {
                    "mData": null,
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function(oObj) {
                        var IdTb_MTN_Monschdl = oObj.aData["IdTb_MTN_Monschdl"];
                        var IdTb_OPL_Unit = oObj.aData["IdTb_OPL_Unit"];
                        var htmlButtonAction = "<div style='word-wrap: break-word; white-space: nowrap;'>";
                        htmlButtonAction += "&nbsp;<a class='btn btn-info btn-xs' href= '" + serverRoot + "MaintenanceSchedule/DetailHistoryUnit/" + IdTb_OPL_Unit + "'><i class='fa fa-bars'></i></a>";
                        htmlButtonAction += "</div>";
                        return htmlButtonAction;
                    }
                },
                { "mData": "IdTb_MTN_Monschdl", "bVisible": false },
                { "mData": "SortableCreationDate", "bVisible": false },
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
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError,// this sets up jQuery to give me errors
                    "global": false,
                    "complete": function() {
                        var fakePagination = $("#" + TabId + "-list_wrapper > div:eq(1)");
                        if (typeof (fakePagination.html()) != "undefined") {
                            $("." + TabId + "-list_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                            fakePagination.appendTo($("." + TabId + "-list_responsive div[class='dataTables_wrapper row']"));
                        }
                    }
                });
            },
            "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                $('td:eq(10)', nRow).css("text-align", "right");
               
                return nRow;
            }
        });
    });
}

function UpdateRowMaintenance(IdTb_MTN_Monschdl)
{
    $.ajax(
        {
            url: serverRoot + "MaintenanceSchedule/LoadMaintenaceMonitoringSchedule/?IdTb_MTN_Monschdl=" + IdTb_MTN_Monschdl,
            cache: false,
            type: "GET",
            data: "IdTb_MTN_Monschdl=" + IdTb_MTN_Monschdl,
            dataType: 'json',
            success: function(data) {
                DisplayUpdateMaintenance(data);
            }

    });
}

function DisplayUpdateMaintenance(data) {
    var modalSelector = "#updateMaintenanceModal";
    $(modalSelector + " input[type='text'][id='MaintenanceBudget']").attr('disabled', false);
    var IdTb_MTN_Monschdl = data.MaintenanceList[0].IdTb_MTN_Monschdl == null ? '' : data.MaintenanceList[0].IdTb_MTN_Monschdl;
    var IdTb_MTN_WorkOrder = data.MaintenanceList[0].IdTb_MTN_WorkOrder == null ? '' : data.MaintenanceList[0].IdTb_MTN_WorkOrder;
    var ActualKM = data.MaintenanceList[0].ActualKM == null ? '' : data.MaintenanceList[0].ActualKM;
    var StartDate = data.MaintenanceList[0].StartDate == null ? '' : data.MaintenanceList[0].StartDate;
    var ScheduleDate = data.MaintenanceList[0].ScheduleDate == null ? '' : data.MaintenanceList[0].ScheduleDate;
    var ChooseConfirmDate = data.MaintenanceList[0].ChooseConfirmDate == null ? '' : data.MaintenanceList[0].ChooseConfirmDate;
    var WorkshopLocation = data.MaintenanceList[0].WorkshopLocation == null ? '' : data.MaintenanceList[0].WorkshopLocation;
    var Workshop = data.MaintenanceList[0].Workshop == null ? '' : data.MaintenanceList[0].Workshop;
    var IdSupplier = data.MaintenanceList[0].IdSupplier == null ? '' : data.MaintenanceList[0].IdSupplier;
    var EndDate = data.MaintenanceList[0].EndDate == null ? '' : data.MaintenanceList[0].EndDate;
    var IsWorkshop = data.MaintenanceList[0].IsWorkshop == null ? '' : data.MaintenanceList[0].IsWorkshop;
    var IsConfirmation = data.MaintenanceList[0].IsConfirmation == null ? '' : data.MaintenanceList[0].IsConfirmation;
    var MaintenanceType = data.MaintenanceList[0].MaintenanceType == null ? '' : data.MaintenanceList[0].MaintenanceType;
    var PoliceNumber = data.MaintenanceList[0].PoliceNumber == null ? '' : data.MaintenanceList[0].PoliceNumber;
    var AgreementNumber = data.MaintenanceList[0].AgreementNumber == null ? '' : data.MaintenanceList[0].AgreementNumber;
    var MaintenanceCategory = data.MaintenanceList[0].MaintenanceCategory == null ? '' : data.MaintenanceList[0].MaintenanceCategory;
    var ScheduleReqDate = data.MaintenanceList[0].ScheduleReqDate == null ? '' : data.MaintenanceList[0].ScheduleReqDate;
    var MaintenanceBudget = data.MaintenanceList[0].MaintenanceBudget == null ? '' : data.MaintenanceList[0].MaintenanceBudget;

    $(modalSelector + " input[type='text'][id='IdMaintenance']").val(IdTb_MTN_Monschdl);
    $(modalSelector + " input[type='text'][id='IdTb_MTN_WorkOrder']").val(IdTb_MTN_WorkOrder);
    $(modalSelector + " input[type='text'][id='MaintenanceType']").val(MaintenanceType);
    $(modalSelector + " input[type='text'][id='PoliceNumber']").val(PoliceNumber);
    $(modalSelector + " input[type='text'][id='AgreementNumber']").val(AgreementNumber);
    $(modalSelector + " input[type='text'][id='ActualKM']").val(ActualKM);
    $(modalSelector + " input[type='text'][id='StartDate']").val(StartDate);
    $(modalSelector + " input[type='text'][id='EndDate']").val(EndDate);
    $(modalSelector + " input[type='text'][id='ScheduleReqDate']").val(ScheduleReqDate);
    $(modalSelector + " input[type='text'][id='ChooseConfirmDate']").val(ChooseConfirmDate);
    $(modalSelector + " input[type='text'][id='WorkshopLocation']").val(WorkshopLocation);
    $(modalSelector + " input[type='text'][id='MaintenanceCategory']").val(MaintenanceCategory);
    $(modalSelector + " input[type='text'][id='Workshop']").val(Workshop);
    $(modalSelector + " input[type='checkbox'][id='IsWorkshop']").prop("checked", IsWorkshop).val(IsWorkshop);
    $(modalSelector + " input[type='checkbox'][id='IsConfirmation']").prop("checked", IsConfirmation).val(IsConfirmation);
    $(modalSelector + " input[type='text'][id='ScheduleDate']").val(ScheduleDate);
    $(modalSelector + " input[type='text'][id='MaintenanceBudget']").val(MaintenanceBudget);

    if (MaintenanceBudget != 0)
    {
        $(modalSelector + " input[type='text'][id='MaintenanceBudget']").attr('disabled', true);
    }

}

function UpdateMaintenanceSchedule() {
    $('#MTNSchdlUpdate').remove();

    var modalData = {};
    var IdTb_MTN_Monschdl = $("#IdMaintenance").val();
    var IdTb_MTN_WorkOrder = $("#IdTb_MTN_WorkOrder").val();
    var IsConfirmation = document.getElementById("IsConfirmation").checked;
    var ChooseConfirmDate = $("#ChooseConfirmDate").val();
    var IsWorkshop = document.getElementById("IsWorkshop").checked;
    var ScheduleReqDate = $("#ScheduleReqDate").val();
    var ScheduleDate = $("#ScheduleReqDate").val();
    var Workshop = $('#Workshop').val();
    var WorkshopLocation = $("#WorkshopLocation").val();
    var StartDate = $("#StartDate").val();
    var EndDate = $("#EndDate").val();
    var ActualKM = $("#ActualKM").val();
    var MaintenanceCategory = $("#MaintenanceCategory").val();
    var IdSupplier = $("#IdSupplier").val();
    var PoliceNumber = $("#PoliceNumber").val();
    var MaintenanceBudget = $("#MaintenanceBudget").val();
    TabId = (iActiveTabIndex == 0) ? "MaintenanceAgreement" : (iActiveTabIndex == 1) ? "MaintenanceAgreement14Days" : (iActiveTabIndex == 2) ? "MaintenanceAgreement1Days" : (iActiveTabIndex == 3) ? "MaintenanceAgreementOnDueDate" : "monitorUnderMaintanance";

    modalData["IdTb_MTN_Monschdl"] = IdTb_MTN_Monschdl;
    modalData["IdTb_MTN_WorkOrder"] = IdTb_MTN_WorkOrder;
    modalData["IsConfirmation"] = IsConfirmation;
    modalData["ChooseConfirmDate"] = ChooseConfirmDate;
    modalData["IsWorkshop"] = IsWorkshop;
    modalData["ScheduleReqDate"] = ScheduleReqDate;
    modalData["ScheduleDate"] = ScheduleDate;
    modalData["IdSupplier"] = IdSupplier;
    modalData["Workshop"] = Workshop;
    modalData["WorkshopLocation"] = WorkshopLocation;
    modalData["StartDate"] = StartDate;
    modalData["EndDate"] = EndDate;
    modalData["ActualKM"] = ActualKM;
    modalData["MaintenanceCategory"] = MaintenanceCategory;
    modalData["MaintenanceBudget"] = MaintenanceBudget;

    $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(modalData),
            url: serverRoot + "MaintenanceSchedule/UpdateMaintenanceSchedule",
            success: function(response) {
                //hide addNewTermCondModal after insert successfully
                $('#updateMaintenanceModal').modal('hide');
                $("#" + TabId + "-list").dataTable().fnDraw();
                DisplayMessageSuccess(PoliceNumber);
            }
        });

}

function UpdateRowHistoryUnitMaintenance(IDHistoryMT) {
    $.ajax(
        {
            url: serverRoot + "MaintenanceSchedule/LoadHistoryUnitMaintenace/?IDHistoryMT=" + IDHistoryMT,
            cache: false,
            type: "GET",
            data: "IDHistoryMT=" + IDHistoryMT,
            dataType: 'json',
            success: function(data) {
                RenderHistoryUnitMaintenance(data, IDHistoryMT);
            }

        });
}

function RenderHistoryUnitMaintenance(data, IDHistoryMT)
{
    var historyUnitMaintenanceList = data.HistoryUnitMaintenance == null ? '' : data.HistoryUnitMaintenance;
    var idHistoryMT = IDHistoryMT;
    $("#idHistory").val(idHistoryMT);
    
    if (data.IsBilledToCustomer) {
        $('#IsBilledToCustomer').prop("checked", true);
    } else {
        $('#IsBilledToCustomer').prop("checked", false);
    }

    $('#actServiceDate').val(data.actServiceDate);
    $('#actServiceKM').val(data.actServiceKm);
    thousandSeparator2($('#actServiceKM'));

    $('#PPNNowValue').val(data.PPNNowValue);
    $('#PPHNowValue').val(data.PPHNowValue);
    
    if (historyUnitMaintenanceList == '') {
        var historyList = $(".rowItem");
        historyList.remove();
        AddItem(idHistoryMT);
    } else {
        var tableSelector = "#item-table tbody";
        var tableContent = "";
        var formatRowMTNItem = "<tr class='rowItem' id='row_{0}'>" +
                                        "<td>" +
                                                "<div class='input-group'>" +                                                
                                                '<input class="form-control mandatory" id="MaintenanceItems_{0}__MaintenanceItemCode" name="MaintenanceItems[{0}].MaintenanceItemCode" type="text" value="{2}">' +
                                                '<span class="input-group-btn">' +
                                                    '<button class="btn btn-white" data-toggle="modal" data-target="#maintenanceItemModal" type="button" onclick="loadMaintenanceItem({0})">...</button>' +
                                                '</span>' +
                                            '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control" id="MaintenanceItems_{0}__MaintenanceItemName" name="MaintenanceItems[{0}].MaintenanceItemName" type="text" value="{3}" disabled>' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<span class="input-group-addon">Rp</span>' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_{0}__ItemCost" name="MaintenanceItems[{0}].ItemCost" onChange = "{16}" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="{4}">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control" id="MaintenanceItems_{0}__Quantity" name="MaintenanceItems[{0}].Quantity" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="{6}">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_{0}__Ppn" name="MaintenanceItems[{0}].Ppn" onChange ="thousandSeparator3(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="{7}">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_{0}__Pph" name="MaintenanceItems[{0}].Pph" onChange ="thousandSeparator3(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="{8}">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input id="MaintenanceItems_{0}__IsService" name="MaintenanceItems[{0}].IsService" type="checkbox" onChange = "{17}" value ="{9}" {10} >' +
                                                '</div>' +
                                        '</td>' +
                                        '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_{0}__IdTb_MTN_HistoryMT" name="MaintenanceItems[{0}].IdTb_MTN_HistoryMT" value="{11}"/></td>' +
                                        '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_{0}__IdMaintenanceItem" name="MaintenanceItems[{0}].IdMaintenanceItem" value="{12}"/></td>' +
                                        '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_{0}__IdTb_MTN_HistoryMTDtl" name="MaintenanceItems[{0}].IdTb_MTN_HistoryMTDtl" value="{13}"/></td>' +
                                        '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_{0}__PPNValue" name="MaintenanceItems[{0}].PPNValue" value="{14}"/></td>' +
                                        '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_{0}__PPHValue" name="MaintenanceItems[{0}].PPHValue" value="{15}"/></td>' +
                                        '<td class="text-center">' +
                                                '<button class="btn btn-danger font-bold fa fa-minus" type="button" onclick="deleteRowItem({0})"></button>' +
                                                '<input type="hidden" id="IdTb_MTN_HistoryMT" value="{11}"/>' +
                                        '</td>' +
                                    '</tr>';
        
        $.each(historyUnitMaintenanceList, function(i, data) {
            var checked = "";
            if (data.IsService) {
                checked = "checked";
            } else {
                checked = "";
            }

            tableContent += formatRowMTNItem.format(i, (i + 1), data.MaintenanceItemCode, data.MaintenanceItemName, data.ItemCost, data.ActualAmount, data.Quantity, data.Ppn, data.Pph, data.IsService, checked, data.IdTb_MTN_HistoryMT, data.IdMaintenanceItem, data.IdTb_MTN_HistoryMTDtl,
                data.PPNValue, data.PPHValue, "calculatePPNPPH(" + i + ")", "calculatePPNPPHIsService(" + i + ",this)");
        });
        $(tableSelector).html(tableContent);
        
    }
}

    function deleteRowItem(rowId) {
        //$("#row_" + rowId).remove();
        $("#row_" + rowId).hide();
    }

function DisplayHistoryUnitMaintenance(data) {
    var IDHistoryMT = data.HistoryUnitMaintenance[0].IDHistoryMT == null ? '' : data.HistoryUnitMaintenance[0].IDHistoryMT;
    var MaintenanceItemName = data.HistoryUnitMaintenance[0].MaintenanceItemName == null ? '' : data.HistoryUnitMaintenance[0].MaintenanceItemName;
    var ActualCost = data.HistoryUnitMaintenance[0].ActualCost == null ? '' : data.HistoryUnitMaintenance[0].ActualCost;

    var modalSelector = "#updateHistoryUnitModal";
    $(modalSelector + " input[type='text'][id='IDHistoryMT']").val(IDHistoryMT);
    $(modalSelector + " input[type='text'][id='MaintenanceItemName']").val(MaintenanceItemName);
    $(modalSelector + " input[type='text'][id='ActualCost']").val(ActualCost);
}

function UpdateRowUnderMaintenance(IdTb_MTN_UnderMT) {
    $.ajax(
        {
            url: serverRoot + "MaintenanceSchedule/LoadUnderMaintenanceConfirmation/?IdTb_MTN_UnderMT=" + IdTb_MTN_UnderMT,
            type: "GET",
            data: "IdTb_MTN_UnderMT=" + IdTb_MTN_UnderMT,
            dataType: 'json',
            success: function(data) {
                DisplayUpdateUnderMaintenance(data);
            }

        });
}

function DisplayUpdateUnderMaintenance(data)
{
    var IdTb_MTN_UnderMT = data.UnderMaintenanceList[0].IdTb_MTN_UnderMT == null ? '' : data.UnderMaintenanceList[0].IdTb_MTN_UnderMT;
    var PoliceNumber = data.UnderMaintenanceList[0].PoliceNumber == null ? '' : data.UnderMaintenanceList[0].PoliceNumber;
    var MTStatus = data.UnderMaintenanceList[0].Status == null ? '' : data.UnderMaintenanceList[0].Status;
    var IsReplacement = data.UnderMaintenanceList[0].NeedReplacement ? '' : data.UnderMaintenanceList[0].NeedReplacement;
    var IsCustConfirmation = data.UnderMaintenanceList[0].IsCustConfirmation == null ? '' : data.UnderMaintenanceList[0].IsCustConfirmation;
    var IsConfirmationReplacementCar = data.UnderMaintenanceList[0].IsConfirmationReplacementCar == null ? '' : data.UnderMaintenanceList[0].IsConfirmationReplacementCar;
    var Remarks = data.UnderMaintenanceList[0].Remarks == null ? '' : data.UnderMaintenanceList[0].Remarks;

    var modalSelector = "#MaintenanceConfirmation";
    $(modalSelector + " input[type='text'][id='IdTb_MTN_UnderMT']").val(IdTb_MTN_UnderMT);
    $(modalSelector + " input[type='text'][id='PoliceNumberUnderMT']").val(PoliceNumber);
    $(modalSelector + " input[type='text'][id='MTStatus']").val(MTStatus);
    $(modalSelector + " input[type='text'][id='IsReplacement']").val(IsReplacement);
    $(modalSelector + " textarea[type='text'][id='Remarks']").val(Remarks);
    $(modalSelector + " input[type='checkbox'][id='IsCustConfirmation']").prop("checked", IsCustConfirmation).val(IsCustConfirmation);
    $(modalSelector + " input[type='checkbox'][id='IsConfirmationReplacementCar']").prop("checked", IsConfirmationReplacementCar).val(IsConfirmationReplacementCar);
}

function UpdateMaintenanceConfirmation() {
    var modalData = {};
    var IdTb_MTN_UnderMT = $('#IdTb_MTN_UnderMT').val();
    var PoliceNumber = $('#PoliceNumberUnderMT').val();
    var MTStatus = $('#MTStatus').val();
    var IsReplacement = $('#IsReplacement').val();
    var IsCustConfirmation = document.getElementById("IsCustConfirmation").checked;
    var IsConfirmationReplacementCar = document.getElementById("IsConfirmationReplacementCar").checked;
    var Remarks = $('#Remarks').val();
    TabId = (iActiveTabIndex == 0) ? "MaintenanceAgreement" : (iActiveTabIndex == 1) ? "MaintenanceAgreement14Days" : (iActiveTabIndex == 2) ? "MaintenanceAgreement1Days" : (iActiveTabIndex == 3) ? "MaintenanceAgreementOnDueDate" : "monitorUnderMaintanance";

    modalData["IdTb_MTN_UnderMT"] = IdTb_MTN_UnderMT;
    modalData["MTStatus"] = MTStatus;
    modalData["IsReplacement"] = IsReplacement;
    modalData["IsCustConfirmation"] = IsCustConfirmation;
    modalData["IsConfirmationReplacementCar"] = IsConfirmationReplacementCar;
    modalData["Remarks"] = Remarks;

    $.ajax(
    {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(modalData),
        url: serverRoot + "MaintenanceSchedule/UpdateMaintenanceConfirmation",
        success: function(response) {
            //hide addNewTermCondModal after insert successfully
            $('#MaintenanceConfirmation').modal('hide');
            $("#" + TabId + "-list").dataTable().fnDraw();
            DisplayMessageSuccess(PoliceNumber);
        }
    });
}

    function UnderMaintenanceShedule(ObjectName, TabId)
    {
        iCount = -1;
        //var oTable;
        $("#" + TabId + "-list").each(function() {
            window[ObjectName] = $(this).dataTable({
                "bServerSide": true,
                "bProcessing": true,
                "aaSorting": [[4, "desc"]],
                "sScrollXInner": "200%",
                "sAjaxSource": serverRoot + "MaintenanceSchedule/AjaxHandlerUnderMaintenanceSch",
                "fnServerParams": function(aoData) {
                    aoData.push(
                        { "name": "ddlSearchCriteria", "value": $("#ddlSearchCriteria").val() },
                        { "name": "txtSearch", "value": $("#txtSearch").val() },
                        { "name": "txtStartDate", "value": $("#txtStartDate").val() },
                        { "name": "txtEndDate", "value": $("#txtEndDate").val() },
                        { "name": "iActiveTabIndex", "value": iActiveTabIndex }
                    );
                },
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "bAutoWidth": false,
                "aoColumns": [
                    { "mData": "BranchShortName" },
                    { "mData": "WorkOrderNumber" },
                    { "mData": "PoliceNumber" },
                    { "mData": "ServiceDate" },
                    { "mData": "UnitType" },
                    { "mData": "MaintenanceCategory" },
                    { "mData": "NeedReplacement" },
                    { "mData": "StartDate" },
                    { "mData": "EndDate" },
                    {
                        "mData": "StatusDesc",
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function(oObj) {
                            var statusDesc = oObj.aData["StatusDesc"];
                            var status = oObj.aData["Status"];

                            if (status == window.srv_draft) {
                                return "<span class='label label-default'>" + statusDesc + "</span>";
                            }
                            if (status == window.srv_submitted) {
                                return "<span class='label label-info'>" + statusDesc + "</span>";
                            }

                            if (status == window.srv_check) {
                                return "<span class='label label-success'>" + statusDesc + "</span>";
                            }

                            if (status == window.srv_approved) {
                                return "<span class='label label-primary'>" + statusDesc + "</span>";
                            }

                            if (status == window.srv_revised) {
                                return "<span class='label label-revise'>" + statusDesc + "</span>";
                            }

                            if (status == window.srv_rejected) {
                                return "<span class='label label-danger'>" + statusDesc + "</span>";
                            }

                            if (status == window.srv_completed) {
                                return "<span class='label label-success'>" + statusDesc + "</span>";
                            }

                            return "<span class='label label-default'>" + statusDesc + "</span>";
                        }
                    },
                    {
                        "mData": null,
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function(oObj) {
                            var IsConfirmation = oObj.aData["IsCustConfirmation"];
                            var retElement = "";
                            retElement += "<div style='width: 100%; text-align: center;'>";
                            if (IsConfirmation == false) {
                                retElement += "<input type='checkbox' disabled='disabled' class='form-control' style='width: 15px; height: 15px; padding: 0px;'>";
                            } else {
                                retElement += "<input checked='checked' disabled='disabled' type='checkbox' style='width:15px; height: 15px; border:none; padding:0px;'/>";
                            }
                            retElement += "</div>";
                            return retElement;
                        }
                    },
                    {
                        "mData": null,
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function(oObj) {
                            var IsConfirmationReplacementCar = oObj.aData["IsConfirmationReplacementCar"];
                            var retElement = "";
                            retElement += "<div style='width: 100%; text-align: center;'>";
                            if (IsConfirmationReplacementCar == false) {
                                retElement += "<input type='checkbox' disabled='disabled' class='form-control' style='width: 15px; height: 15px; padding: 0px;'>";
                            } else {
                                retElement += "<input checked='checked' disabled='disabled' type='checkbox' style='width:15px; height: 15px; border:none; padding:0px;'/>";
                            }
                            retElement += "</div>";
                            return retElement;
                        }
                    },
                    { "mData": "Remarks" },
                    {
                        "mData": null,
                        "bSearchable": false,
                        "bSortable": false,
                        "fnRender": function(oObj) {
                            var IdTb_MTN_UnderMT = oObj.aData["IdTb_MTN_UnderMT"];
                            var status = oObj.aData["Status"];
                            var IdOplAgreement = oObj.aData["IdOplAgreement"];
                            var IdTb_OPL_Unit = oObj.aData["IdTb_OPL_Unit"];
                            var retElement = "";
                            retElement += "<div style='width: 100px; 'word-wrap: break-word; white-space: nowrap;'>";
                            if (status == window.srv_completed) {
                                retElement += "<a class='btn btn-primary btn-xs' disabled='disabled' id='maintenanceConfirmation' role='button' onclick='UpdateRowUnderMaintenance(" + IdTb_MTN_UnderMT + ")' data-toggle='modal' data-target='#MaintenanceConfirmation'>Update</a>";

                            } else {
                                retElement += "<a class='btn btn-primary btn-xs' id='maintenanceConfirmation' role='button' onclick='UpdateRowUnderMaintenance(" + IdTb_MTN_UnderMT + ")' data-toggle='modal' data-target='#MaintenanceConfirmation'>Update</a>";

                            }
                            if (IdOplAgreement != null)
                            {
                                retElement += "&nbsp;<a class='btn btn-info btn-sm fa fa-book' role='button' href='" + serverRoot + "MaintenanceSchedule/DetailHistoryUnit/" + IdTb_OPL_Unit + "'></a>";
                            }
                            else
                            {
                                retElement += "&nbsp;<a class='btn btn-info btn-sm fa fa-book' role='button' href='" + serverRoot + "MaintenanceSchedule'></a>";
                            }
                            retElement += "</div>";
                            return retElement;
                        }
                    },
                ],
                "aoColumnDefs": [
                    { "sWidth": "5%", "aTargets": [0] },
                    { "sClass": "center", "aTargets": [1] }
                ],
                "fnServerData": function(sSource, aoData, fnCallback) {
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": fnCallback,
                        "timeout": 0, // optional if you want to handle timeouts (which you should)
                        "error": handleAjaxError,// this sets up jQuery to give me errors
                        "global": false,
                        "complete": function() {

                            if (window.iActiveTabIndex == 0) {
                                window[ObjectName].fnSetColumnVis(15, false);
                                window[ObjectName].fnSetColumnVis(23, false);
                            } else if (window.iActiveTabIndex == 1 || window.iActiveTabIndex == 2) {
                                window[ObjectName].fnSetColumnVis(23, false);
                            }

                            var fakePagination = $("#" + TabId + "-list_wrapper > div:eq(1)");
                            if (typeof (fakePagination.html()) != "undefined") {
                                $("." + TabId + "-list_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                                fakePagination.appendTo($("." + TabId + "-list_responsive div[class='dataTables_wrapper row']"));
                            }
                        }
                    });
                },
                "fnRowCallback": function(nRow, aData, iDisplayIndex) {
                    $('td:eq(10)', nRow).css("text-align", "right");

                    return nRow;
                }
            });
        });
    }

    function loadSupplierMaintenance() {
        
        $('#updateMaintenanceModal').modal('hide');

        // datatable
        var oTable = null;
        $('#supplierMaintenanceWorkshop-lookup').each(function() {
            oTable = $(this).dataTable({
                "bServerSide": true,
                "bProcessing": true,
                "bRetrieve": true,
                "sAjaxSource": serverRoot + "OPLServiceHistory/SupplierListLookUp",
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "aoColumns": [
                    { "mData": "SupplierCode" },
                    { "mData": "SupplierName" },
                    { "mData": "Telephone" },
					{ "mData": "Address"},					  
                    { "mData": "BusinessEconomySector" }
                ],
                "iDisplayLength": 5,
                "bLengthChange": false
            });
        });

        $("#supplierMaintenanceWorkshop-lookup tbody").delegate("tr", "click", function() {
            var data = oTable.fnGetData(this);

            $("#Workshop").val(data.SupplierName);
            $("#IdSupplier").val(data.IdSupplier);

            $('#supplierMaintenanceWorkshopModal').modal('hide');
            $('#supplierMaintenanceWorkshop-lookup tbody').undelegate("tr", "click");
            $('#updateMaintenanceModal').modal('show');
        });
    };

    function loadMaintenanceItem(id)
    {
        $('#updateHistoryUnitModal').modal('hide');

        // datatable
        var oTable = null;
        $('#maintenanceItem-lookup').each(function() {
            oTable = $(this).dataTable({
                "bServerSide": true,
                "bProcessing": true,
                "bRetrieve": true,
                "sAjaxSource": serverRoot + "MaintenanceSchedule/MaintenanceItemListLookUp",
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "sPaginationType": "full_numbers",
                "aoColumns": [
                    { "mData": "MaintenanceItemCode" },
                    { "mData": "MaintenanceItemName" }
                ],
                "iDisplayLength": 5,
                "bLengthChange": false
            });
        });

        $("#maintenanceItem-lookup tbody").delegate("tr", "click", function() {
            var data = oTable.fnGetData(this);

            $('#MaintenanceItems_' + id + '__IdMaintenanceItem').val(data.IdMaintenanceItem == null ? '' : data.IdMaintenanceItem);
            $('#MaintenanceItems_' + id + '__MaintenanceItemCode').val(data.MaintenanceItemCode == null ? '' : data.MaintenanceItemCode);
            $('#MaintenanceItems_' + id + '__MaintenanceItemName').val(data.MaintenanceItemName == null ? '' : data.MaintenanceItemName);
            $('#maintenanceItemModal').modal('hide');
            $('#maintenanceItem-lookup tbody').undelegate("tr", "click");
            $('#updateHistoryUnitModal').modal('show');
        });
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

    function DisplayMessageSuccess(policeNumber) {
        var htmlAlert = '';
        htmlAlert +=
                '<div id="MTNSchdlUpdate" class="alert alert-success" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                    '<b>Success ! </b> Police Number : ' + policeNumber + ' has been updated';
            '</div>';
            $('form').before(htmlAlert);
        
            setTimeout(function() {
                $('#MTNSchdlUpdate').fadeOut('fast');
            }, 3000);
    }

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

    $(function() {
        //Add New Item
        $('#addItem').click(function() {
            InsertNextItem();
        });
    });

    function calculatePPNPPH(i) {
        var actualResidualValue = Number($('#MaintenanceItems_' + i + '__ItemCost').val().replace(/,/g, ''));
        var actualResidualValue2 = $('#MaintenanceItems_' + i + '__IsService').prop("checked");
        var PPNValue = $('#MaintenanceItems_' + i + '__PPNValue').val();
        var PPHValue = $('#MaintenanceItems_' + i + '__PPHValue').val();

        if (isNaN(actualResidualValue)) actualResidualValue = 0;

        if (actualResidualValue >= 0) {
            $('#MaintenanceItems_' + i + '__Ppn').val((PPNValue / 100) * (parseFloat(actualResidualValue))).formatCurrency();

            if (actualResidualValue2 == true) {
                $('#MaintenanceItems_' + i + '__Pph').val((PPHValue / 100) * parseFloat(actualResidualValue)).formatCurrency();
            }
            else {
                $('#MaintenanceItems_' + i + '__Pph').val(0).formatCurrency();
            }
        }
        else {
            $('#MaintenanceItems_' + i + '__Ppn').val(0).formatCurrency();
            $('#MaintenanceItems_' + i + '__Pph').val(0).formatCurrency();
        }

        thousandSeparator2($('#MaintenanceItems_' + i + '__ItemCost'));
    };

    function calculatePPNPPHIsService(i,cb) {
        var actualResidualValue = Number($('#MaintenanceItems_' + i + '__ItemCost').val().replace(/,/g, ''));
        var actualResidualValue2 = cb.checked;

        var PPNValue = $('#MaintenanceItems_' + i + '__PPNValue').val();
        var PPHValue = $('#MaintenanceItems_' + i + '__PPHValue').val();

        if (isNaN(actualResidualValue)) actualResidualValue = 0;

        if (actualResidualValue >= 0) {
            $('#MaintenanceItems_' + i + '__Ppn').val((PPNValue / 100) * (parseFloat(actualResidualValue))).formatCurrency();

            if (actualResidualValue2 == true) {
                $('#MaintenanceItems_' + i + '__Pph').val((PPHValue / 100) * parseFloat(actualResidualValue)).formatCurrency();
            }
            else {
                $('#MaintenanceItems_' + i + '__Pph').val(0).formatCurrency();
            }
        }
        else {
            $('#MaintenanceItems_' + i + '__Ppn').val(0).formatCurrency();
            $('#MaintenanceItems_' + i + '__Pph').val(0).formatCurrency();
        }

        thousandSeparator2($('#MaintenanceItems_' + i + '__ItemCost'));
    };
    
    function AddItem(idHistoryMT) {
        var countRowItem = $("tr[class*='rowItem']").length;
        var newTr = $('' +
            '<tr class="rowItem" id="row_' + countRowItem + '">' +

                '<td>' +
                    '<input data-val="true" id="MaintenanceItems_' + countRowItem + '__IdMaintenanceItem" name="MaintenanceItems[' + countRowItem + '].IdMaintenanceItem" type="hidden" value=""/>' +
                        '<div class="input-group">' +
                        '<input class="form-control mandatory" id="MaintenanceItems_' + countRowItem + '__MaintenanceItemCode" name="MaintenanceItems[' + countRowItem + '].MaintenanceItemCode" type="text" value="">' +
                        '<span class="input-group-btn">' +
                            '<button class="btn btn-white" data-toggle="modal" data-target="#maintenanceItemModal" type="button" onclick="loadMaintenanceItem(' + countRowItem + ')">...</button>' +
                        '</span>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group">' +
                        '<input class="form-control" id="MaintenanceItems_' + countRowItem + '__MaintenanceItemName" name="MaintenanceItems[' + countRowItem + '].MaintenanceItemName" type="text" value="" disabled>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group">' +
                        '<span class="input-group-addon">Rp</span>' +
                        '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_' + countRowItem + '__ItemCost" name="MaintenanceItems[' + countRowItem + '].ItemCost" onChange = "calculatePPNPPH(' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                    '</div>' +
                '</td>' +
                '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control" id="MaintenanceItems_' + countRowItem + '__Quantity" name="MaintenanceItems[' + countRowItem + '].Quantity" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_' + countRowItem + '__Ppn" name="MaintenanceItems[' + countRowItem + '].Ppn" onChange ="thousandSeparator3(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_' + countRowItem + '__Pph" name="MaintenanceItems[' + countRowItem + '].Pph" onChange ="thousandSeparator3(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input id="MaintenanceItems_' + countRowItem + '__IsService" name="MaintenanceItems[' + countRowItem + '].IsService" type="checkbox" onChange = "calculatePPNPPHIsService(' + countRowItem + ',this)" value="">' +
                                                '</div>' +
                                        '</td>' +
                '<td class="text-center">' +
                        '<button class="btn btn-danger font-bold fa fa-minus" type="button" onclick="deleteRowItem(' + countRowItem + ')"></button>' +
                '</td>' +
                '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_' + countRowItem + '__IdTb_MTN_HistoryMT" name="MaintenanceItems[' + countRowItem + '].IdTb_MTN_HistoryMT" value="' + idHistoryMT + '"/></td>' +
                '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_' + countRowItem + '__PPNValue" value="' + $('#PPNNowValue').val() + '"/></td>' +
                '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_' + countRowItem + '__PPHValue" value="' + $('#PPHNowValue').val() + '"/></td>' +
            '</tr>');

        $(newTr).appendTo('#item-table tbody');

        countRowItem += 1;
        //$('.thousandSeparator').autoNumeric('init', { vMax: '999999999999' });        
        return false;
    }

    function InsertNextItem() {
        var countRowItem = $("tr[class*='rowItem']").length;
        var newTr = $('' +
            '<tr class="rowItem" id="row_' + countRowItem + '">' +

                '<td>' +
                    '<input data-val="true" id="MaintenanceItems_' + countRowItem + '__IdMaintenanceItem" name="MaintenanceItems[' + countRowItem + '].IdMaintenanceItem" type="hidden" value=""/>' +
                        '<div class="input-group">' +
                        '<input class="form-control mandatory" id="MaintenanceItems_' + countRowItem + '__MaintenanceItemCode" name="MaintenanceItems[' + countRowItem + '].MaintenanceItemCode" type="text" value="">' +
                        '<span class="input-group-btn">' +
                            '<button class="btn btn-white" data-toggle="modal" data-target="#maintenanceItemModal" type="button" onclick="loadMaintenanceItem(' + countRowItem + ')">...</button>' +
                        '</span>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group">' +
                        '<input class="form-control" id="MaintenanceItems_' + countRowItem + '__MaintenanceItemName" name="MaintenanceItems[' + countRowItem + '].MaintenanceItemName" type="text" value="" disabled>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group">' +
                        '<span class="input-group-addon">Rp</span>' +
                        '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_' + countRowItem + '__ItemCost" name="MaintenanceItems[' + countRowItem + '].ItemCost" onChange = "calculatePPNPPH(' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                    '</div>' +
                '</td>' +
                '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control" id="MaintenanceItems_' + countRowItem + '__Quantity" name="MaintenanceItems[' + countRowItem + '].Quantity" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_' + countRowItem + '__Ppn" name="MaintenanceItems[' + countRowItem + '].Ppn" onChange ="thousandSeparator3(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input class="form-control text-right numeric currency thousandSeparator" id="MaintenanceItems_' + countRowItem + '__Pph" name="MaintenanceItems[' + countRowItem + '].Pph" onChange ="thousandSeparator3(this)" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="">' +
                                                '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="input-group">' +
                                                '<input id="MaintenanceItems_' + countRowItem + '__IsService" name="MaintenanceItems[' + countRowItem + '].IsService" type="checkbox" onChange = "calculatePPNPPHIsService(' + countRowItem + ',this)" value="">' +
                                                '</div>' +
                                        '</td>' +
                '<td class="text-center">' +
                        '<button class="btn btn-danger font-bold fa fa-minus" type="button" onclick="deleteRowItem(' + countRowItem + ')"></button>' +
                '</td>' +
                '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_' + countRowItem + '__IdTb_MTN_HistoryMT" name="MaintenanceItems[' + countRowItem + '].IdTb_MTN_HistoryMT" value="' + $("#idHistory").val() + '"/></td>' +
                '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_' + countRowItem + '__PPNValue" value="' + $('#PPNNowValue').val() + '"/></td>' +
                '<td style = "display:none"><input class="form-control" type="text" id="MaintenanceItems_' + countRowItem + '__PPHValue" value="' + $('#PPHNowValue').val() + '"/></td>' +
            '</tr>');

        $(newTr).appendTo('#item-table tbody');
        countRowItem += 1;
        //$('.thousandSeparator').autoNumeric('init', { vMax: '999999999999' });
        return false;
    }

    $("*.thousandSeparator").change(function() {
        thousandSeparator2($("*.thousandSeparator"));
    });

    function thousandSeparator2(param) {
        param.each(function() {
            let v = $(this).val();

            v = v.replace(/[^-\d]/g, '');
            v = v.replace(/(\d{3,3})$/g, ',$1');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

            v = v ? v : '';

            $(this).val(v);

        });
    }

    function thousandSeparator3(param) {
        var v = $(param).val();

        v = v.replace(/[^-\d]/g, '');

        if (v.length > 3) {
            v = v.replace(/(\d{3,3})$/g, ',$1');
            v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        v = v ? v : '';

        $(param).val(v);
    }

    //additional func format for string
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                ;
            });
        };
    }

    function UpdateMTNItemList(statusHistory) {
        
        //Remove success message
        $('#MTNItemListSuccessUpdated').remove();

        var tableSelector = "#item-table tbody";
        var inputIdMaintenanceItemList = $(tableSelector).find("input[name*='.IdMaintenanceItem']");
        var inputItemCostList = $(tableSelector).find("input[name*='.ItemCost']");
        var inputQuantityList = $(tableSelector).find("input[name*='.Quantity']");
        var inputPpnList = $(tableSelector).find("input[name*='.Ppn']");
        var inputPphList = $(tableSelector).find("input[name*='.Pph']");
        var inputIsServiceList = $(tableSelector).find("input[name*='.IsService']");
        var idMtnHistory = $("input[id='IdTb_MTN_HistoryMT']").val();
        var inputHistoryMTDtlList = $(tableSelector).find("input[name*='.IdTb_MTN_HistoryMTDtl']");
        if (idMtnHistory == null) {
            idMtnHistory = $("#idHistory").val();
        }
        var trList = $(tableSelector).find("*.rowItem");

        var length = inputIdMaintenanceItemList.length;
        var actServiceDate = $('#actServiceDate').val();
        var actServiceKM = $('#actServiceKM').val().replace(/,/g, "");

        var isBilled;
                if ($('#IsBilledToCustomer').is(":checked")) {
                        isBilled = true;
                    } else {
                    isBilled = false;
                }
        
                var data = 
                    { 
                        MTNItemList: [], 
                        IdMTNHistory: idMtnHistory, 
                        Status: statusHistory, 
                        IsBilledToCustomer: isBilled, 
                        ActServiceDate: actServiceDate,
                        ActServiceKM: actServiceKM
                    };

        for (var i = 0; i < length; i++) {
            if ($(trList[i]).is(":visible")) {
                var obj = {};
                obj.IdMaintenanceItem = $(inputIdMaintenanceItemList[i]).val();
                obj.ItemCost = $(inputItemCostList[i]).val();
                obj.Quantity = $(inputQuantityList[i]).val();
                obj.Ppn = $(inputPpnList[i]).val();
                obj.Pph = $(inputPphList[i]).val();
                obj.IsService = $(inputIsServiceList[i]).val();
                if ($(inputIsServiceList[i]).is(":checked")) {
                    obj.IsService = true;
                } else {
                    obj.IsService = false;
                }
                obj.IdTb_MTN_HistoryMTDtl = $(inputHistoryMTDtlList[i]).val();
                data.MTNItemList.push(obj);
            }            
        }
        
        $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            url: serverRoot + "MaintenanceSchedule/UpdateMTNItemList",
            success: function(response) {

                $('body').on('hidden.bs.modal', '.modal', function() {
                    $(this).removeData('bs.modal');
                });

                //hide updateHistoryUnitModal after insert successfully
                $('#updateHistoryUnitModal').modal('hide');
                
                $("#table-list").dataTable().fnDraw();
                //display success message
                UpdateMTNHistorySuccessMsg();
            }
        });
    }
    
    function UpdateMTNHistorySuccessMsg() {
        var successMsg = "<div id = 'MTNItemListSuccessUpdated' class='alert alert-success' role='alert'>" +
                                    "<button type='button' class='close' data-dismiss='alert'>" +
                                        "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>" +
                                    "</button><b>Success!</b> Maintenance Items have been updated" +
                                "</div>";
        $('#datatable').before(successMsg);

        setTimeout(function() {
            $('#MTNItemListSuccessUpdated').fadeOut('fast');
        }, 3000);
    }

    $(".yesPrintReport").click(function(e) {

        switch ($('#printTypeReport').val()) {
            case "liBtnReportHistoricalMtn":

                $('#hisMtnRptParmodal').modal('hide');

                $.ajax({
                    type: 'POST',
                    url: serverRoot + 'MaintenanceSchedule/PrintReportHistoricalMaintenanceDetailByUnit',
                    data: JSON.stringify({
                        'PoliceNumber': $('#policeNumberHisMtn').val(),
                        'EngineNumber': $('#engineNumberHisMtn').val()
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'text',
                    global: false,
                    success: function(response, status, xhr) {

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
                            window.location = serverRoot + "Base/Download?fileName=" + response + "&rptType=" + 24;
                        }
                        
                        $('#loadingmessageSch').hide();
                        $('#btnPrintAll').show();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert('Cannot download file..! Error is occurs');
                        
                        $('#loadingmessageSch').hide();
                        $('#btnPrintAll').show();
                    }
                });

                break;
            case "liBtnReportBudgetMtn":

                $('#mtnBgtRptParmodal').modal('hide');

                var idMtnType = $("input[name='mtnType']:checked").val();
                var idConStat = $("input[name='contractStatus']:checked").val();

                var txMtnType = $("input[name='mtnType']:checked").parent('label').text();
                var txConStat = $("input[name='contractStatus']:checked").parent('label').text();

                $.ajax({
                    type: 'POST',
                    url: serverRoot + 'MaintenanceSchedule/PrintReportMTNBudgetControlUnit',
                    data: JSON.stringify({
                        'mtnType': txMtnType == '' || txMtnType == undefined ? 'All Maintenance Type' : txMtnType,
                        'conSts': txConStat == '' || txConStat == undefined ? 'Active & End Contract' : txConStat
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'text',
                    global: false,
                    success: function(response, status, xhr) {

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
                            window.location = serverRoot + "Base/Download?fileName=" + response + "&rptType=" + 25;
                        }

                        $('#loadingmessageSch').hide();
                        $('#btnPrintAll').show();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert('Cannot download file..! Error is occurs');

                        $('#loadingmessageSch').hide();
                        $('#btnPrintAll').show();
                    }
                });

                break;
            case "liBtnReportActCostMtn":

                $('#actCostRptParmodal').modal('hide');

                $.ajax({
                    type: 'POST',
                    url: serverRoot + 'MaintenanceSchedule/PrintReportMTNActCost',
                    data: JSON.stringify({
                        'sCriteria1': $("#ddlSearchCriteriaActCostRpt option:selected").text(),
                        'vCriteria1': $('#txtSearchActCostRpt').val(),
                        'startDate': $('#txtStartDateActCostRpt').val() == '' || $('#txtStartDateActCostRpt').val() == undefined ? null : $('#txtStartDateActCostRpt').val(),
                        'endDate': $('#txtEndDateActCostRpt').val() == '' || $('#txtEndDateActCostRpt').val() == undefined ? null : $('#txtEndDateActCostRpt').val()
                    }),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'text',
                    global: false,
                    success: function(response, status, xhr) {

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
                            window.location = serverRoot + "Base/Download?fileName=" + response + "&rptType=" + 26;
                        }

                        $('#loadingmessageSch').hide();
                        $('#btnPrintAll').show();
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert('Cannot download file..! Error is occurs');

                        $('#loadingmessageSch').hide();
                        $('#btnPrintAll').show();
                    }
                });

                break;
            default:
                break;
        }

    });

    $(".noPrintReport").click(function(e) {

        switch ($('#printTypeReport').val()) {
            case "liBtnReportHistoricalMtn":

                $('#hisMtnRptParmodal').modal('hide');

                $('#loadingmessageSch').hide();
                $('#btnPrintAll').show();

                break;
            case "liBtnReportBudgetMtn":

                $('#mtnBgtRptParmodal').modal('hide');

                $('#loadingmessageSch').hide();
                $('#btnPrintAll').show();

                break;
            case "liBtnReportActCostMtn":

                $('#actCostRptParmodal').modal('hide');

                $('#loadingmessageSch').hide();
                $('#btnPrintAll').show();

                break;
            default:
                break;
        }
        
    });

    $(".parRptMtnBgt").change(function() {
        var mtnType = $("input[name='mtnType']:checked").val();
        var conStat = $("input[name='contractStatus']:checked").val();

        if ((mtnType != '' && mtnType != undefined)
                && (conStat != '' && conStat != undefined)) {
            $('.yesPrintReport').prop('disabled', false);
        } else {
            $('.yesPrintReport').prop('disabled', true);
        }
    });

    $(".parRptActCost").change(function() {
        var vCriteria1 = $('#txtSearchActCostRpt').val();
        var sDate = $('#txtStartDateActCostRpt').val();
        var eDate = $('#txtEndDateActCostRpt').val();

        if ((vCriteria1 != '' && vCriteria1 != undefined)
                || ((sDate != '' && sDate != undefined) || (eDate != '' && eDate != undefined))) {
            $('.yesPrintReport').prop('disabled', false);
        } else {
            $('.yesPrintReport').prop('disabled', true);
        }
    });

    function loadHisMtnUnit() {
        $(".parRptHisMtn").val('');
        $('.yesPrintReport').prop('disabled', true);

        var config = {
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "sScrollY": 200,
            "aaSorting": [[5, "desc"]],
            "iDisplayLength": 5,
            "bLengthChange": false,
            "sAjaxSource": serverRoot + "MaintenanceSchedule/MtnUnitDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "bAutoWidth": false,
            "aoColumns": [
                   { "mData": "AgreementNumber" },
                   { "mData": "PoliceNumber" },
                   { "mData": "AllocationUnit" }
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
            }
        };
        if ($.fn.dataTable.fnIsDataTable(document.getElementById("hisMtnAsset-list"))) {
            $("#hisMtnAsset-list").dataTable().fnClearTable();
            $("#hisMtnAsset-list").dataTable().fnDestroy();
            $('#hisMtnAsset-list').dataTable(config).fnDraw();
        } else {
            $('#hisMtnAsset-list').dataTable(config).fnDraw();
        }

        $('#hisMtnAsset-list tbody').delegate("tr", "click", function() {
            var table = $('#hisMtnAsset-list').dataTable();
            var data = table.fnGetData(this);
            if (data != null) {
                $('#policeNumberHisMtn').val(data.PoliceNumber == null ? '' : data.PoliceNumber);
                $('#idOPLAgreementHisMtn').val(data.IdOPlAgreement == null ? 0 : data.IdOPlAgreement);
                $('#idOPLUnitHisMtn').val(data.IdOPLUnit == null ? 0 : data.IdOPLUnit);
                $('#engineNumberHisMtn').val(data.EngineNumber == null ? '' : data.EngineNumber);
                $('#oplAgreementHisMtn').val(data.AgreementNumber == null ? '' : data.AgreementNumber);

                if ($('#policeNumberHisMtn').val() != '') {
                    $('.yesPrintReport').prop('disabled', false);
                } else {
                    $('.yesPrintReport').prop('disabled', true);
                }
            }

            $('#hisMtnUnitmodal').modal('hide');
            $('#hisMtnAsset-list tbody').undelegate("tr", "click");
        });
    }
