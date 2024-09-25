$(function () {

    $('#supplier').click(function () {
        var id = $('#IdOPLAgreement').val();
        if (id != 0) {
            LoadSupplierData(id);
        }
    });
    
    //Preview text area
    var targetTextArea = "Preview";
    var sourceInputTextNames = ["TermDescFirst", "DefaultValue", "TermDescLast"];
    
    $.each(sourceInputTextNames, function (i, n) {
        $("input[name='" + n + "']").keyup(function () {
            showPreviewTextArea(targetTextArea, sourceInputTextNames);
        });
    });
    
    $('#addTerm').click(function () {
        AddTerm();
    });

    $('#saveTermList').click(function () {
        UpdateTermAndConditionList();
    });
    
    $('#addNewTerm').click(function () {
        AddNewTermConditionModal();
        $('#termCondition-list').empty();
    });

});

function LoadAgreementNumber(){
    //datatable
    var oTable = null;
    $('#agreement-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[4, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "PurchaseOrder/AgreementDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "AgreementNumber" },
                { "mData": "AgreementDate" },
                { "mData": "SortableAgreementDate", "bVisible": false }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#agreement-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        $('#IdOPLAgreement').val(data.IdOPLAgreement == null ? '' : data.IdOPLAgreement);
        $('#AgreementNumber').val(data.AgreementNumber == null ? '' : data.AgreementNumber);
        $('#IdCustomer').val(data.IdCustomer == null ? '' : data.IdCustomer);
        $('#DeliveryPlace').val(data.HandoverLocAddress == null ? '' : data.HandoverLocAddress);
        $('#DeliveryZipCode').val(data.HandoverLocZipCode == null ? '' : data.HandoverLocZipCode);
        $('#DeliveryCity').val(data.HandoverLocCity == null ? '' : data.HandoverLocCity);

        $('#agreementModal').modal('hide');
        $('#agreement-list tbody').undelegate("tr", "click");
        

        ClearPOItemList();
        ClearTermAndCondList();
        $('#supplierName').val("");
    });
}

function LoadSupplierData(idOPLAgreement) {
    //datatable
    var oTable = null;
    $('#supplier-list').removeAttr("style");
    $('#supplier-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "PurchaseOrder/SupplierDataTable/?idOPLAgreement=" + idOPLAgreement,
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "SupplierName" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#supplier-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        $('#supplierName').val(data.SupplierName == null ? '' : data.SupplierName);
        $('#IdSupplier').val(data.SupplierId == null ? '' : data.SupplierId);
        $('#IdOPLAgreement').val(data.IdOPLAgreement == null ? '' : data.IdOPLAgreement);

        var supplierId = data.SupplierId == null ? '' : data.SupplierId;
        var idOPLAgreement = data.IdOPLAgreement == null ? '' : data.IdOPLAgreement;

        //Load PO Item List and Term&Cond List
        LoadPOItemList(idOPLAgreement, supplierId);
        LoadTermCondList(idOPLAgreement, supplierId);

        $('#supplierModal').modal('hide');
        $('#supplier-list tbody').undelegate("tr", "click");

        //delete datatable and remove DOM element
        if (oTable != null) oTable.fnDestroy();
        $('#supplier-list').empty();

    });
};

function LoadPOItemList(idOPLAgreement, idSupplier) {
    $.ajax(
        {
            url: serverRoot + "PurchaseOrder/LoadPOItemList",
            type: "GET",
            data: "idOPLAgreement=" + idOPLAgreement + "&idSupplier=" + idSupplier,
            dataType: 'json',
            success: function (data) {
                    RenderPOItemListTableData(data);
            }
        });
}

function LoadTermCondList(idOPLAgreement, idSupplier) {
    $.ajax(
        {
            url: serverRoot + "PurchaseOrder/LoadTermCondList",
            type: "GET",
            data: "idOPLAgreement=" + idOPLAgreement + "&idSupplier=" + idSupplier,
            dataType: 'json',
            success: function (data) {
                RenderTermAndCondsListTableData(data);
            }
        });
}

function RenderPOItemListTableData(data) {
        var itemList = data.POItemList == null ? '' : data.POItemList;
        var totalNetPO = data.TotalNetPO == null ? '' : data.TotalNetPO;
    var totalPrice = data.TotalPrice == null ? '' : data.TotalPrice;

        var tableSelector = "#poItemTable tbody";
        var tableContent = "";

        var formatRowItem = "<tr>" +
                                "<td><input class='form-control' type='text' value='{1}' readonly ='readonly'/></td>" +
                                "<td><input class='form-control' type='text' value='{2}' readonly='readonly' name = 'POItemList[{0}].Name'/></td>" +
                                "<td><input class='form-control' type='text' value='{3}' readonly='readonly' name = 'POItemList[{0}].Qty'/></td>" +
                                "<td><div class='input-group'><span class='input-group-addon'>Rp</span><input class='form-control text-right' type='text' value='{4}' readonly ='readonly' name = 'POItemList[{0}].OTRPrice'/></div></td>" +
                                "<td><div class='input-group'><span class='input-group-addon'>Rp</span><input class='form-control text-right' type='text' value='{5}' readonly ='readonly' name = 'POItemList[{0}].TotalPrice'/></div></td>" +
                                "<td style = 'display:none'><input class='form-control' value='{6}' readonly='readonly' name = 'POItemList[{0}].Type'/></td>" +
                                "<td style = 'display:none'><input class='form-control' value='{7}' readonly='readonly' name = 'POItemList[{0}].LeaseCategory'/></td>" +
                                "<td style = 'display:none'><input class='form-control' value='{8}' readonly='readonly' name = 'POItemList[{0}].IdProduct'/></td>" +
                                "<td style = 'display:none'><input class='form-control' value='{9}' readonly='readonly' name = 'POItemList[{0}].MaintenancePeriod'/></td>" +
                            "</tr>";

        var totalNetPORow = "<tr>" +
                                "<td colspan=3 class='text-center font-bold'>Total Net PO</td>" +
                            "<td colspan=1>" +
                                 "<div class='input-group'>" +
                                    "<span class='input-group-addon'>Rp</span>" +
                                    "<input class='form-control text-right' type='text' value='{0}' readonly ='readonly' name = 'TotalPrice' >" +
                                "</div>" +
                            "</td>" +
                                "<td>" +
                                    "<div class='input-group'>" +
                                        "<span class='input-group-addon'>Rp</span>" +
                                    "<input class='form-control text-right' type='text' value='{1}' readonly ='readonly' name = 'TotalNetPO' >" +
                                    "</div>" +
                                "</td>" +
                            "</tr>";
    
        //looping row item
        $.each(itemList, function (i, data) {
            tableContent += formatRowItem.format(i, (i + 1), data.Name, data.Qty, formatCurrency(parseFloat(data.OTRPrice)), formatCurrency(parseFloat(data.TotalPrice)), data.Type, data.LeaseCategory, data.IdProduct, data.MaintenancePeriod);
        });

    tableContent += totalNetPORow.format(formatCurrency(parseFloat(totalPrice)), formatCurrency(parseFloat(totalNetPO)));

        $(tableSelector).html(tableContent);
}

function RenderTermAndCondsListTableData(data) {
    var termAndConditionList = data.TermAndCondList == null ? '' : data.TermAndCondList;
    
    var tableSelector = "#term-table tbody";
    var DPBeforeBAST = "DPBeforeBAST";
    var validDays = "ValidDays";
    var tableContent = "";
    var formatRowTermAndConds = "";
    var parameter = "";

    var termDescFirst = "<tr class='rowTerm' id='row_{0}'>" +
                            "<td>" +
                               "<div class='input-group'><input class='form-control' readonly ='readonly' type='text' id='TermConditions_{0}__TermDescFirst' name='TermConditions[{0}].TermDescFirst' value='{2}'/><span class='input-group-btn'>" +
                                   "<button class='btn btn-white' data-toggle='modal' data-target='#termConditionModal' type='button' onclick='LoadTermAndCondition({0})'>...</button></span>" +
                               "</div>" +
                            "</td>";
    
    var termDescSecond = "<td style = 'display:none'><input class='form-control' type='text' id='TermConditions_{0}__IdTb_PRO_POTerm' name='TermConditions[{0}].IdTb_PRO_POTerm' value='{4}'/></td>" +
                         "<td style = 'display:none'><input class='form-control' type='text' id='TermConditions_{0}__RemarksSys' name='TermConditions[{0}].RemarksSys' value='{5}'/></td>" +
                          "<td class='text-center'><span class='input-group-btn'><button onclick='deleteRowTerm({0})' class='btn btn-danger font-bold fa fa-minus' type='button'></button></span></td>" +
                          "</tr>";
    
    
    $.each(termAndConditionList, function (i, data) {
        
        if (data.RemarksSys == DPBeforeBAST || data.RemarksSys == validDays) {
            parameter = "<td><input class='form-control' type='text' id='TermConditions_{0}__DefaultValue' name='TermConditions[{0}].DefaultValue' value='{3}' readonly = 'readonly' /></td>";
        } else {
            parameter = "<td><input class='form-control' type='text' id='TermConditions_{0}__DefaultValue' name='TermConditions[{0}].DefaultValue' value='{3}' /></td>";
        }
        
        formatRowTermAndConds = termDescFirst + parameter + termDescSecond;
        tableContent += formatRowTermAndConds.format(i, (i + 1), data.TermDescFirst, data.DefaultValue, data.IdTb_PRO_POTerm, data.RemarksSys);
    });
    
    $(tableSelector).html(tableContent);
}

function ClearPOItemList() {
    var tableSelector = "#poItemTable tbody";
    var emptyRow = "<tr>" +
                            "<td><input class='form-control' type='text' value='' readonly ='readonly'/></td>" +
                            "<td><input class='form-control' type='text' value='' readonly ='readonly'/></td>" +
                            "<td><input class='form-control' type='text' value='' readonly ='readonly'/></td>" +
                            "<td><div class='input-group'><span class='input-group-addon'>Rp</span><input class='form-control text-right' type='text' value='' readonly ='readonly'/></div></td>" +
                            "<td><div class='input-group'><span class='input-group-addon'>Rp</span><input class='form-control text-right' type='text' value='' readonly ='readonly'/></div></td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td colspan=3 class='text-center font-bold'>Total Net PO</td>" +
                            "<td colspan=1></td>" +
                            "<td>" +
                                "<div class='input-group'>" +
                                    "<span class='input-group-addon'>Rp</span>" +
                                    "<input class='form-control text-right' type='text' value='' readonly ='readonly'>" +
                                "</div>" +
                            "</td>" +
                        "</tr>";
    $(tableSelector).html(emptyRow);
}

function ClearTermAndCondList() {
    var tableSelector = "#term-table tbody";
    var emptyRow = "<tr class='rowTerm' id='row_0'>" +
                            "<td>" +
                                "<div class='input-group'><input class='form-control' readonly ='readonly' type='text' /><span class='input-group-btn'>" +
                                    "<button class='btn btn-white' data-toggle='modal' data-target='#termConditionModal' type='button' onclick='LoadTermAndCondition(0)'>...</button></span>" +
                                "</div>" +
                            "</td>" +
                            "<td><input class='form-control' type='text'/></td>" +
                            "<td class='text-center'><span class='input-group-btn'><button onclick='deleteRowTerm(0)' class='btn btn-danger font-bold add_item fa fa-minus' type='button'></button></span></td>" +
                    "</tr>";
    $(tableSelector).html(emptyRow);
}

$(".numeric").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

function AddTerm(){
    var countRowTerm = $("tr[class*='rowTerm']").length;
    var newTr = $(''+
        '<tr class="rowTerm" id="row_' + countRowTerm + '">' + 
            
            '<td>' +
                '<input data-val="true" id="TermConditions_' + countRowTerm + '__IdTb_PRO_POTerm" name="TermConditions[' + countRowTerm + '].IdTb_PRO_POTerm" type="hidden" value=""/>' +
                    '<div class="input-group">' +
                    '<input class="form-control" readonly="readonly" id="TermConditions_' + countRowTerm + '__TermDescFirst" name="TermConditions[' + countRowTerm + '].TermDescFirst" type="text" value="">' +
                    '<span class="input-group-btn">' +
                        '<button class="btn btn-white" data-toggle="modal" data-target="#termConditionModal" type="button" onclick="LoadTermAndCondition(' + countRowTerm + ')">...</button>' +
                    '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<input class="form-control" data-val="true" id="TermConditions_' + countRowTerm + '__DefaultValue" name="TermConditions[' + countRowTerm + '].DefaultValue" type="text" value="">' +
            '</td>' +
            '<td class="text-center">' +
                '<span class="input-group-btn">' +
                    '<button class="btn btn-danger font-bold fa fa-minus" type="button" onclick="deleteRowTerm(' + countRowTerm + ')"></button>' +
                '</span>' +
            '</td>' +
        '</tr>');

    $(newTr).appendTo('#term-table tbody');

    countRowTerm += 1;
    return false;
}

function deleteRowTerm(rowId){
    $("#row_" + rowId).remove();
    var data = TermAndCondsListTableToJson();
    
    //re-arrange index of term and condition list
    if (data.TermAndCondList.length > 0) {
        RenderTermAndCondsListTableData(data);
    }
}

function TermAndCondsListTableToJson() {
    var tableSelector = "#term-table tbody";
    var inputTermDescFirstList = $(tableSelector).find("input[name*='.TermDescFirst']");
    var inputDefaultValueList = $(tableSelector).find("input[name*='.DefaultValue']");
    var inputIdTbProPOTermList = $(tableSelector).find("input[name*='.IdTb_PRO_POTerm']");
    var inputRemarksSysList = $(tableSelector).find("input[name*='.RemarksSys']");
    var length = inputTermDescFirstList.length;
    var data = { TermAndCondList: [] };

    for (var i = 0; i < length; i++) {
        var obj = {};
        
        obj.TermDescFirst = $(inputTermDescFirstList[i]).val();
        obj.DefaultValue = $(inputDefaultValueList[i]).val();
        obj.IdTb_PRO_POTerm = $(inputIdTbProPOTermList[i]).val();
        obj.RemarksSys = $(inputRemarksSysList[i]).val();

        data.TermAndCondList.push(obj);
    }
    return data;
}

function LoadTermAndCondition(id) {
    //datatable
    var oTable = null;
    $('#termCondition-list').removeAttr("style");

    $('#termCondition-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "PurchaseOrder/TermAndConditionDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "TermDescFirst" },
                { "mData": "DefaultValue" },
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#termCondition-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);

        if (termAndConditionIsExist(data.IdTb_PRO_POTerm)) {
            $('#termConditionModal').modal('hide');
            $('#termCondition-list tbody').undelegate("tr", "click");

            return false;
        }

        $('#TermConditions_' + id + '__IdTb_PRO_POTerm').val(data.IdTb_PRO_POTerm == null ? '' : data.IdTb_PRO_POTerm);
        $('#TermConditions_' + id + '__TermDescFirst').val(data.TermDescFirst == null ? '' : data.TermDescFirst);
        $('#TermConditions_' + id + '__DefaultValue').val(data.DefaultValue == null ? '' : data.DefaultValue);

        $('#termConditionModal').modal('hide');
        $('#termCondition-list tbody').undelegate("tr", "click");

    });
}

//additional func for currency format
function formatCurrency(number) {
    var number = number.toFixed(2) + '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

//additional func format for string
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    };
}

function AddNewTermConditionModal() {
    $('#termConditionModal').modal('hide');
    
    //delete datatable and remove DOM element
    var oTable = $("#termCondition-list").dataTable();
    oTable.fnDestroy();
    $('#termCondition-list').empty();
    
    //show Add Term Conditional Modal
    $('#addNewTermCondModal').modal('toggle');
    $('#addNewTermCondModal').modal('show');
}

//Preview textArea
function showPreviewTextArea(targetTextArea, sourceInputTextNames) {
    var text = "";
    var limiter = " ";

    var filterText = function(text) {
        return text;
    };

    $.each(sourceInputTextNames, function (i, n) {
        var val = $("input[type='text'][name='" + n + "']").val();
        text += filterText(val) + limiter;
    });

    $("textarea[name='" + targetTextArea + "']").html(text);
}

function AddNewTermCondition() {
    var modalInput = "#addNewTermCondModal input[type='text'], [type='radio']:checked,[type='checkbox']:checked";
    var modalData = {};

    var inputElements = $(modalInput);

    $.each(inputElements, function(i, element) {
        var name = $(element).attr("name");
        var value = $(element).val();

        modalData[name] = value;
    });

    $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(modalData),
            url: serverRoot + "PurchaseOrder/AddNewTermCondition",
            success: function (response) {
                
                //hide addNewTermCondModal after insert successfully
                $('#addNewTermCondModal').modal('hide');
                                
                //reset form addNewTermCondModal after hidden
                ResetAddNewTermConditionForm();

                //show and reload termConditionModal
                var countRowTerm = $("tr[class*='rowTerm']").length - 1;
                LoadTermAndCondition(countRowTerm);
                
                $('#termConditionModal').modal('toggle');
                $('#termConditionModal').modal('show');
                
            }
        });
}

function termAndConditionIsExist(id) {
    var values = $("input[id*='__IdTb_PRO_POTerm']:not([id*=Original])").
        map(function () {
            return $(this).val();
        }).get();
    if (jQuery.inArray(id.toString(), values) != -1) {
        return true;
    }
    return false;
}

function ResetAddNewTermConditionForm() {
    var modalSelector = "#addNewTermCondModal";
    //Clear all texts
    $(modalSelector + " input[type='text']").val("");
    $(modalSelector + " input[type='text'],textarea").val(" ");
    $(modalSelector + " input[type='checkbox']").prop("checked", false);
    $(modalSelector + " input[type='radio'][name='IsDefault'][value='true']").prop("checked", true);
}

function LoadTermCondListByPOId(POId) {
    $.ajax(
        {
            url: serverRoot + "PurchaseOrder/LoadTermCondListByPOId",
            type: "GET",
            data: "POId=" + POId,
            dataType: 'json',
            success: function (data) {
                RenderTermAndCondsListTableData(data);
            }
        });
}

function UpdateTermAndConditionList() {
    //Remove success message
    $('#termCondSuccessUpdated').remove();
    
    var tableSelector = "#term-table tbody";
    var inputIdTbProPOTermList = $(tableSelector).find("input[name*='.IdTb_PRO_POTerm']");
    var inputDefaultValueList = $(tableSelector).find("input[name*='.DefaultValue']");
    var idPO = $("input[id='IdTb_PRO_PO']").val();

    var length = inputDefaultValueList.length;
    var data = { TermAndCondList: [], IdPO: idPO };

    for (var i = 0; i < length; i++) {
        var obj = {};
        obj.IdTb_PRO_POTerm = $(inputIdTbProPOTermList[i]).val();
        obj.DefaultValue = $(inputDefaultValueList[i]).val();

        data.TermAndCondList.push(obj);
    }

    $.ajax(
    {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        url: serverRoot + "PurchaseOrder/UpdateTermAndConditionList",
        success: function (response) {
                
            //Load term and condition list
            LoadTermCondListByPOId(idPO);
            goToTop();
            TermCondSuccessMsg();
        }
    });
}

function TermCondSuccessMsg() {
    var successMsg = "<div id = 'termCondSuccessUpdated' class='alert alert-success' role='alert'>" +
                                "<button type='button' class='close' data-dismiss='alert'>" +
                                    "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>" +
                                "</button><b>Success!</b> Term and Conditions have been updated" +
                            "</div>";
    $('form').before(successMsg);
    
    setTimeout(function () {
        $('#termCondSuccessUpdated').fadeOut('fast');
    }, 3000);
}

function goToTop() {
    $('section[class*="scrollable"]').animate({
        scrollTop: 0
    }, 700);
}

function poDateChange() {
    var tt = $('#PODate').val();

    var date = new Date(tt);
    var newdate = new Date(date);
    var addDay = parseInt($("#ValidDays").val(), 10);

    newdate.setDate(newdate.getDate() + 7);
    
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();

    dd = dd < 10 ? '0' + dd : '' + dd;
    mm = mm < 10 ? '0' + mm : '' + mm;    

    $('#ValidUntil').val(mm + '/' + dd + '/' + y);
}