//File for populate Actual Tab

function PopulateActualTable() {
    iCount = -1;
    $('#actual-list').each(function () {
        oActual = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[16, "desc"]],
            "sScrollXInner": "200%",
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "MGTPreparationUnit/AjaxHandlerActualUnit",
            "fnServerParams": function (aoData) {
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
                {
                    "mData": "DsfOffice",
                    "fnRender": function (oObj) {
                        iCount++;
                        return oObj.aData["DsfOffice"];
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
                    "mData": "ViewHistory",
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function (oObj) {
                        var id = oObj.aData["IdTb_MGT_UnitPrep"];
                        return "<button class='btn btn-danger btn-xs' data-toggle='modal' data-target='#PrepHistoryModal' type='button' onclick='LoadProgressHistory(" + iCount + ")'><i class='fa fa-book'></i></button>";
                    }
                },
                { "mData": "ProgressStatus" },
                { "mData": "Remark" },
                { "mData": "UnitReadiness" },
                { "mData": "UpdateDate" },
                { "mData": "BASTPlan" },
                { "mData": "BASTActual" },
                {
                    "mData": "GenerateBAST",
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function (oObj) {
                        var id = oObj.aData["IdTb_MGT_UnitPrep"];

                        return "<button class='btn btn-info btn-xs' data-toggle='modal' data-target='#BASTActualListModal' type='button' onclick='LoadBASTActualList(" + id + ")'><i class='fa fa-bars'></i>" +
                            "</button>";
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
                    "complete": function () {
                        iCount = -1;
                        var fakePagination = $("#actual-list_wrapper > div:eq(1)");
                        if (typeof (fakePagination.html()) != "undefined") {
                            $(".actual_responsive").append("<div class='dataTables_wrapper row' style='padding-left: 15px; padding-right: 15px;'><div>");
                            fakePagination.appendTo($(".actual_responsive div[class='dataTables_wrapper row']"));
                        }
                    }
                });
            }
        });
    });
}

var oLookUpBAST;
var bastActualId = '';
function LoadBASTActualList(id) {
    var config = {
        "bServerSide": true,
        "bProcessing": true,
        "aaSorting": [[0, "desc"]],
        "bRetrieve": true,
        "sAjaxSource": serverRoot + "MGTPreparationUnit/BASTActualListDataTable/?id=" + id,
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "bAutoWidth": false,
        "aoColumns": [
            { "mData": "BASTSupplierNo" },
            { "mData": "BASTCustomerNo" },
            { "mData": "AgreementNo" },
            { "mData": "SupplierName" },
            { "mData": "CustomerName" },
            { "mData": "UnitDescription" }
        ],
        "iDisplayLength": 5,
        "bLengthChange": false
    };

    if (typeof (oLookUpBAST) != "undefined" && bastActualId != id) {
        oLookUpBAST.fnDestroy();
        oLookUpBAST = $('#BastActual-list').dataTable(config);
    } else {
        oLookUpBAST = $('#BastActual-list').dataTable(config);
    }
 
    bastActualId = id;

    $('#BastActual-list tbody').delegate("tr", "click", function () {

        var data = oLookUpBAST.fnGetData(this);
        if (data != null && data.IdTb_MGT_BASTSupCust != null) {
            window.location.replace(serverRoot + 'MGTPreparationUnit/Detail/' + data.IdTb_MGT_BASTSupCust);

            return false;
        }
        
        $('#BASTActualListModal').modal('hide');
        $('#BastActual-list tbody').undelegate("tr", "click");

        return false;
    });
}