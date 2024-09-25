var isCancel = true;

$(".datepicker-input").datepicker({
    format: "MM/dd/yyyy"
});

$('div#invoiceReceiptModal').click(function () {
    if (isCancel) {
        var isTempInvoiceNoExist = $("#invoiceReceiptModal input[type='hidden']").length != 0;
        if (isTempInvoiceNoExist) {
            var invoiceNo = $("#invoiceReceiptModal input[type='hidden']").val();
            selectedInvoiceNo.push(invoiceNo);
            $("#invoiceReceiptModal input[type='hidden']").remove();
        }
    }
});

$('#invoiceReceiptModal button').click(function () {
    var isTempInvoiceNoExist = $("#invoiceReceiptModal input[type='hidden']").length != 0;
    if (isTempInvoiceNoExist) {
        var invoiceNo = $("#invoiceReceiptModal input[type='hidden']").val();
        selectedInvoiceNo.push(invoiceNo);
        $("#invoiceReceiptModal input[type='hidden']").remove();
    }
});

function AddItem(payScheduleId) {
    var lastRowNumber = parseInt($('#container tr:last').attr('rownumber'));
    var html = '';
    html = '<tr rownumber="' + (lastRowNumber + 1) + '">'
                + '<td>'
                    + '<div>'
                        + '<div class="input-group">'
                            + '<input id="InvoiceNo' + (lastRowNumber + 1) + '" class="form-control mandatory invoice-no' + (lastRowNumber + 1) + '" type="text">'
                                + '<span class="input-group-btn">'
                                + '<button id="btnLoadInvoice' + (lastRowNumber + 1) + '" class="btn btn-white ma" data-toggle="modal" data-target="#invoiceReceiptModal" type="button" onclick="LoadInvoiceReceipt(' + (lastRowNumber + 1) + ', ' + payScheduleId + ')">...</button>'
                            + '</span>'
                        + '</div>'
                        + '<span class="field-validation-valid" data-valmsg-for="InvoiceNo' + (lastRowNumber + 1) + '" data-valmsg-replace="true"></span>'
                    + '</div>'
                + '</td>'
                + '<td>'
                    + '<div>'
                        + '<input id="UsagePeriod' + (lastRowNumber + 1) + '" type="text" readonly="readonly" class="form-control">'
                        + '<input id="StartPeriod' + (lastRowNumber + 1) + '" type="hidden">'
                        + '<input id="EndPeriod' + (lastRowNumber + 1) + '" type="hidden">'
                    + '</div>'
                + '</td>'
                + '<td><div><input id="LeaseAmount' + (lastRowNumber + 1) + '" type="text" readonly="readonly" class="form-control" style="text-align: right;"></div></td>'
                + '<td><div><input id="PPN' + (lastRowNumber + 1) + '" type="text" readonly="readonly" class="form-control" style="text-align: right;"></div></td>'
                + '<td><div><input id="LeasePPN' + (lastRowNumber + 1) + '" type="text" readonly="readonly" class="form-control" style="text-align: right;"></div></td>'
                + '<td><div><input id="PenaltyAmount' + (lastRowNumber + 1) + '" type="text" readonly="readonly" class="form-control" style="text-align: right;"></div></td>'
                + '<td><div><input id="DueDate' + (lastRowNumber + 1) + '" type="text" readonly="readonly" class="form-control"></div></td>'
                + '<td style="text-align: center;">'
                    + '<button class="btn btn-danger remove_item" name="remove_btn" type="button" onclick="DeleteItem(' + (lastRowNumber + 1) + ')" style="height: 30px;">-</button>'
                + '</td>'
            + '</tr>';

    $('#container').append(html);
    var isEnable = $('#container tr:first td:last button').attr('disabled');
    if (isEnable == "disabled") {
        var rownumber = $('#container tr:first').attr('rownumber');
        $('#container tr:first td:last button').removeAttr('disabled').attr('onclick', 'DeleteItem(' + rownumber + ')');
    }

    var itemCount = $('#container tr').length;
    if (invoiceReceiptCount === itemCount) {
        $('button[name="add_btn"]').attr('disabled', 'disabled').removeAttr('onclick');
    }

}

function DeleteItem(rownumber) {
    var invoiceNo = $("#container tr[rownumber='" + rownumber + "'] input:eq(0)").val();
    var indexInvoiceNoList = selectedInvoiceNo.indexOf(invoiceNo);
    selectedInvoiceNo.splice(indexInvoiceNoList, 1);

    $('#container tr[rownumber="' + rownumber + '"]').remove();
    var rowTotal = $('#container tr').length;
    if (rowTotal == 1) {
        $('#container tr:first td:last button').attr('disabled', 'disabled').removeAttr('onclick');
    }

    var itemCount = $('#container tr').length;
    var isEnabledButton = $('button[name="add_btn"]').attr('disabled');
    if (isEnabledButton == "disabled" && invoiceReceiptCount !== itemCount) {
        $('button[name="add_btn"]').removeAttr('disabled').attr('onclick', 'AddItem()');
    }
}

function LoadInvoiceReceipt(rowNumber, payScheduleId) {
    var invoiceNo = $("#container tr[rownumber='" + rowNumber + "'] input:eq(0)").val();
    var isEmpty = invoiceNo == "" || invoiceNo == null;
    if (!isEmpty) {
        var tempInvoiceNo = '<input type="hidden" value="' + invoiceNo + '">';
        $('#invoiceReceiptModal .modal-content').append(tempInvoiceNo);
    }
    var isInvoiceNoExist = selectedInvoiceNo.indexOf(invoiceNo) != -1;
    if (isInvoiceNoExist) {
        var indexInvoiceNoList = selectedInvoiceNo.indexOf(invoiceNo);
        selectedInvoiceNo.splice(indexInvoiceNoList, 1);
    }

    isCancel = true;

    $("#invoice-receipt-list tbody").attr("rownumberlookup", rowNumber);

    // datatable
    var oTable = null;
    $('#invoice-receipt-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "BILWarningLetter/InvoiceReceiptDataTable",
            "fnServerParams": function (aoData) {
                aoData.push(
                    { "name": "payScheduleId", "value": payScheduleId }
                );

                if (selectedInvoiceNo.length != 0) {
                    for (index = 0; index < selectedInvoiceNo.length; index++) {
                        aoData.push({ "name": "selectedInvoiceNo[" + index + "]", "value": selectedInvoiceNo[index] });
                    }
                }
                else {
                    aoData.push({ "name": "selectedInvoiceNo", "value": selectedInvoiceNo });
                }
            },
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "InvoiceNoInstalment" },
                { "mData": "UsagePeriod" },
                { "mData": "Amount" }
            ],
            "aoColumnDefs": [
                    { "sWidth": "30%", "aTargets": [0] },
                    { "sWidth": "35%", "aTargets": [1] },
					{ "sClass": "text-right", "aTargets": [2] }
            ],
            "bAutoWidth": false,
            "iDisplayLength": 5,
            "bLengthChange": false,
        });
    });

    $("#invoice-receipt-list tbody").delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        var rowIndex = $("#invoice-receipt-list tbody").attr("rownumberlookup");

        $("#container tr[rownumber='" + rowIndex + "'] input:eq(0)").val(data.InvoiceNoInstalment);
        $("#container tr[rownumber='" + rowIndex + "'] input:eq(1)").val(data.UsagePeriod);
        $("input[id*='StartPeriod" + rowIndex + "']").val(data.StartPeriod);
        $("input[id*='EndPeriod" + rowIndex + "']").val(data.EndPeriod);
        $("#container tr[rownumber='" + rowIndex + "'] input:eq(4)").val(data.Amount);
        $("#container tr[rownumber='" + rowIndex + "'] input:eq(5)").val(data.PPN);
        $("#container tr[rownumber='" + rowIndex + "'] input:eq(6)").val(data.LeasePPN);
        $("#container tr[rownumber='" + rowIndex + "'] input:eq(7)").val(data.PenaltyAmount);
        $("#container tr[rownumber='" + rowIndex + "'] input:eq(8)").val(data.DueDate);

        var isNewInvoiceNo = selectedInvoiceNo.indexOf(data.InvoiceNoInstalment) == -1;
        if (isNewInvoiceNo) {
            selectedInvoiceNo.push(data.InvoiceNoInstalment);
        }

        var isTempInvoiceNoExist = $("#invoiceReceiptModal input[type='hidden']").length != 0;
        if (isTempInvoiceNoExist) {
            $("#invoiceReceiptModal input[type='hidden']").remove();
        }

        isCancel = false;

        $('#invoiceReceiptModal').modal('hide');
        $("#invoice-receipt-list tbody").undelegate("tr", "click");
    });
    oTable.fnFilter('');
}

function UpdateNames() {
    //Update name attribute for each rows on the invoice number list
    var rows = $('#container tr');
    var index = 0;

    rows.each(function () {
        $(this).find('input[id*="InvoiceNo"]').attr('name', 'WarningLetterDtl[' + index + '].InvoiceNo');
        $(this).find('input[id*="UsagePeriod"]').attr('name', 'WarningLetterDtl[' + index + '].UsagePeriod');
        $(this).find('input[id*="StartPeriod"]').attr('name', 'WarningLetterDtl[' + index + '].StartPeriod');
        $(this).find('input[id*="EndPeriod"]').attr('name', 'WarningLetterDtl[' + index + '].EndPeriod');
        $(this).find('input[id*="LeaseAmount"]').attr('name', 'WarningLetterDtl[' + index + '].LeaseAmount');
        $(this).find('input[id*="PPN"]').attr('name', 'WarningLetterDtl[' + index + '].PPN');
        $(this).find('input[id*="LeasePPN"]').attr('name', 'WarningLetterDtl[' + index + '].LeasePPN');
        $(this).find('input[id*="PenaltyAmount"]').attr('name', 'WarningLetterDtl[' + index + '].PenaltyAmount');
        $(this).find('input[id*="DueDate"]').attr('name', 'WarningLetterDtl[' + index + '].DueDate');

        index++;
    });
}