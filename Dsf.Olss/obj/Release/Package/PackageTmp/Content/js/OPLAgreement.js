var counterRow = 1;
var countRowModel = $("tr[class*='rowModel']").length;

if (countRowModel > 0) {
    counterRow = countRowModel;
}

$(function() {

    $('#addModel').click(function () {
        var id = $('#IdTb_MKT_SKD').val();
        if (id.length > 0) {
            AddModel(id);
        }
    });
});

function AddModel(skdId) {
    var newTr = $('' +
        '<tr class="rowModel" id="row_' + counterRow + '">' +
            '<td>' +
                '<input data-val="true" data-val-number="The field IdTb_MKT_SKD_Dtl must be a number." id="Units_' + counterRow + '__IdTb_MKT_SKD_Dtl" name="Units[' + counterRow + '].IdTb_MKT_SKD_Dtl" type="hidden" value="">' +
                '<div class="input-group">' +
                    '<input class="form-control mandatory" id="Units_' + counterRow + '__Name" name="Units[' + counterRow + '].Name" readonly="true" type="text" value="">' +
                    '<span class="input-group-btn">' +
                        '<button class="btn btn-white" data-toggle="modal" data-target="#modelModal" type="button" onclick="loadModelData(' + counterRow + ', ' + skdId + ')">...</button>' +
                    '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<input class="form-control" data-val="true" data-val-number="The field ModelYear must be a number."  readonly="true" id="Units_' + counterRow + '__ModelYear" name="Units[' + counterRow + '].ModelYear" type="text" value="">' +
            '</td>' +
            '<td>' +
                '<input class="form-control" readonly="true" id="Units_' + counterRow + '__SupplierName" name="Units[' + counterRow + '].SupplierName" type="text" value="">' +
            '</td>' +
            '<td>' +
                '<input data-val="true" data-val-number="The field TotalQtyInAllAgreement must be a number." data-val-required="The TotalQtyInAllAgreement field is required." id="Units_' + counterRow + '__TotalQtyInAllAgreement" name="Units[' + counterRow + '].TotalQtyInAllAgreement" type="hidden" value="">' +
                '<input data-val="true" data-val-number="The field SkdDetailQty must be a number." data-val-required="The SkdDetailQty field is required." id="Units_' + counterRow + '__SkdDetailQty" name="Units[' + counterRow + '].SkdDetailQty" type="hidden" value="">' +
                '<input data-val="true" data-val-number="" data-val-required="The type field is required." id="Units_' + counterRow + '__Type" name="Units[' + counterRow + '].Type" type="hidden" value="">' +
                '<input class="form-control numeric" readonly data-val="true" data-val-number="The field Qty must be a number." data-val-required="The Qty field is required." id="Units_' + counterRow + '__Qty" name="Units[' + counterRow + '].Qty" type="text" value="0">' +
                '<span class="field-validation-valid" data-valmsg-for="Units[' + counterRow + '].Qty" data-valmsg-replace="true"></span>' +
            '</td>' +
            '<td class="text-center">' +
            '   <a title="" href="javascript:deleteRow(' + counterRow + ');" class="btn btn-danger btn-xs" data-original-title="Delete"><i class="fa fa-minus"></i> </a>' +
            '</td>' +
        '</tr>');

    countRowModel = $("tr[class*='rowModel']").length;
    if (countRowModel > 0) {
        var lastElement = $(".rowModel").last();
        $(newTr).insertAfter(lastElement);
    } else
        $(newTr).appendTo('#unit-table tbody');

    counterRow += 1;
    return false;
}

function deleteRow(rowId) {
    $("#row_" + rowId).remove();
    
    countRowModel = $("tr[class*='rowModel']").length;
    if (countRowModel === 0) {
        counterRow = 0;

        $("#addModel").trigger("click");
    }
}

function LoadSKDNumber() {
    //datatable
    var oTable = null;
    $('#skd-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[4, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "OPLAgreement/SkdDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "SKDNo" },
                { "mData": "OPLQuotationNumber" },
                { "mData": "CustomerName" },
                { "mData": "SKDDate" },
                { "mData": "SortableSkdDate", "bVisible": false }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#skd-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        if (data != null) {
            $('#IdTb_MKT_SKD').val(data.IdTb_MKT_SKD == null ? '' : data.IdTb_MKT_SKD);
            $('#SKDNo').val(data.SKDNo == null ? '' : data.SKDNo);
            $('#OPLCalculationNumber').val(data.OPLCalculationNumber == null ? '' : data.OPLCalculationNumber);
            $('#OPLQuotationNumber').val(data.OPLQuotationNumber == null ? '' : data.OPLQuotationNumber);
            $('#AgreementNumberReff').val(data.AgreementNumberReff == null ? '' : data.AgreementNumberReff);
            $('#CustomerCode').val(data.CustomerCode == null ? '' : data.CustomerCode);
            $('#CustomerName').val(data.CustomerName == null ? '' : data.CustomerName);
            $('#LesseeAddress1').val(data.CustomerAddress == null ? '' : data.CustomerAddress);
            $('#LeasePeriodPlan').val(data.LeasePeriodPlan == null ? '' : data.LeasePeriodPlan);
            $('#LeaseCategory').val(data.LeaseCategory == null ? '' : data.LeaseCategory);
            $('#LeaseCategoryName').val(data.LeaseCategoryName == null ? '' : data.LeaseCategoryName);
            $('#PurchaseAfterLease').val(data.PurchaseAfterLease == null ? '' : data.PurchaseAfterLease);
            $('#PurchaseAfterLeaseName').val(data.PurchaseAfterLease === true ? "Yes" : "No");
            $('#IsInsurance').val(data.IsInsurance == null ? '' : data.IsInsurance);
            $('#IsInsuranceName').val(data.IsInsurance === true ? "Yes" : "No");
            $('#TermOfPayment').val(data.TermOfPayment == null ? '' : data.TermOfPayment);
            $('#MonthlyInstallmentAmount').val(data.MonthlyInstallmentAmount == null ? '' : data.MonthlyInstallmentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }));
            $('#NumberOfPayments').val(data.NumberOfPayments == null ? '' : data.NumberOfPayments);
            $('#ProductCode').val(data.ProductCode == null ? '' : data.ProductCode);
            $('#ModelName').val(data.ModelName == null ? '' : data.ModelName);
            $('#BrandName').val(data.BrandName == null ? '' : data.BrandName);
            $('#ModelYear').val(data.ModelYear == null ? '' : data.ModelYear);
            $('#Usage').val(data.Usage == null ? '' : data.Usage);
            $('#UsageName').val(data.UsageName == null ? '' : data.UsageName);
            $('#MaintenanceType').val(data.MaintenanceType == null ? '' : data.MaintenanceType);
            $('#MaintenanceTypeName').val(data.MaintenanceTypeName == null ? '' : data.MaintenanceTypeName);
            $('#CarroserrieType').val(data.CarroserrieType == null ? '' : data.CarroserrieType);
            $('#AccessoriesType').val(data.AccessoriesType == null ? '' : data.AccessoriesType);
            $('#MonthlyMileageContract').val(data.MonthlyMileageContract == null ? '' : data.MonthlyMileageContract.toLocaleString());
            $('#OilExchangeMileage').val(data.OilExchangeMileage == null ? '' : data.OilExchangeMileage.toLocaleString());
            $('#RegularMaintenanceMileage').val(data.RegularMaintenanceMileage == null ? '' : data.RegularMaintenanceMileage.toLocaleString());
            $('#LubricantsFatMileage').val(data.LubricantsFatMileage == null ? '' : data.LubricantsFatMileage.toLocaleString());
            $('#BateryChangeMileage').val(data.BateryChangeMileage == null ? '' : data.BateryChangeMileage.toLocaleString());
            $('#TireChangeMileage').val(data.TireChangeMileage == null ? '' : data.TireChangeMileage.toLocaleString());
            $('#CSDMaintenance').val(data.CSDMaintenance == null ? '' : data.CSDMaintenance);
            $('#GeneralFailureMaintenance').val(data.GeneralFailureMaintenance == null ? '' : data.GeneralFailureMaintenance);
            $('#GeneralFailureMaintenanceName').val(data.GeneralFailureMaintenance === true ? "Yes" : "No");
            $('#STNKRenewal').val(data.STNKRenewal == null ? '' : data.STNKRenewal);
            $('#STNKRenewalName').val(data.STNKRenewal === true ? "Yes" : "No");
            $('#KEURRenewal').val(data.KEURRenewal == null ? '' : data.KEURRenewal);
            $('#KEURRenewalName').val(data.KEURRenewal === true ? "Yes" : "No");
            $('#BreakDawnContract').val(data.MaintenanceType == null ? 'false' : (data.MaintenanceType == FullMaintenance ? 'true' : 'false'));
            $('#BreakDawnContractText').val($('#BreakDawnContract').val().toLowerCase() == 'true' ? "Yes" : $('#BreakDawnContract').val().toLowerCase() == 'false' ? "No" : "");
            $('#ReplacementUnit').val(data.ReplacementUnit == null ? '' : data.ReplacementUnit);
            $('#ReplacementUnitName').val(data.ReplacementUnit === true ? "Yes" : "No");
            $('#EmployeeName').val(data.EmployeeData.EmployeeName == null ? '' : data.EmployeeData.EmployeeName);
            $('#TitleName').val(data.EmployeeData.PICPosition == null ? '' : data.EmployeeData.PICPosition);
            $('#Phone1').val(data.EmployeeData.PICTelephone == null ? '' : data.EmployeeData.PICTelephone);
            $('#Email').val(data.EmployeeData.PICEmail == null ? '' : data.EmployeeData.PICEmail);
            $('#IdTb_OPL_Employee').val(data.EmployeeData.IdTb_OPL_Employee == null ? '' : data.EmployeeData.IdTb_OPL_Employee);
            $('#IdTb_OPL_Branch').val(data.EmployeeData.IdTb_OPL_Branch == null ? '' : data.EmployeeData.IdTb_OPL_Branch);
            $("#PaymentTransactionTypeName").val(data.PaymentMode == null ? '' : data.PaymentMode);
            $('#SKDDate').val(data.SKDDate == null ? '' : data.SKDDate);
        }

        $('#skdModal').modal('hide');
        $('#skd-list tbody').undelegate("tr", "click");
        
        if (data != null) {
            $("#addModel").replaceWith('<a id="addModel" href="#" class="btn btn-primary pull-right">Add</a>');
            $('#addModel').click(function () {
                var id = $('#IdTb_MKT_SKD').val();
                AddModel(id);
            });
        }

        ClearUnitDetails();
    });
}

function BreakDawnContractOnChange() {
    $('#BreakDawnContractText').val($('#BreakDawnContract').val().toLowerCase() == 'true' ? "Yes" : $('#BreakDawnContract').val().toLowerCase() == 'false' ? "No" : "");
}

function ClearUnitDetails() {
    $("#unit-table > tbody").html("");

    counterRow = 0;

    $("#addModel").trigger("click");
    $('#model-list').dataTable().fnDestroy();
}

function LoadEmployeeData() {
    //datatable
    var oTable = null;
    $('#employee-list').each(function() {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "OPLAgreement/OPLEmployeeDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "EmployeeNo" },
                { "mData": "EmployeeName" },
                { "mData": "PICPosition" },
                { "mData": "BranchShortName" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#employee-list tbody').delegate("tr", "click", function() {

        var data = oTable.fnGetData(this);
        $('#EmployeeName').val(data.EmployeeName == null ? '':data.EmployeeName);
        $('#TitleName').val(data.PICPosition == null ? '': data.PICPosition);
        $('#Phone1').val(data.PICTelephone == null ? '' : data.PICTelephone);
        $('#Email').val(data.PICEmail == null ? '' : data.PICEmail);
        $('#IdTb_OPL_Employee').val(data.IdTb_OPL_Employee == null ? '' : data.IdTb_OPL_Employee);
        $('#IdTb_OPL_Branch').val(data.IdTb_OPL_Branch == null ? '' : data.IdTb_OPL_Branch);

        $('#employeeModal').modal('hide');
        $('#employee-list tbody').undelegate("tr", "click");
    });
};

function LoadRepresentativeData() {
    //datatable
    var oTable = null;
    $('#representative-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "asc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "OPLAgreement/OPLRepresentativeDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "EmployeeName" },
                { "mData": "Position" },
                { "mData": "BranchShortName" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#representative-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        $('#DsfRprName').val(data.EmployeeName == null ? '' : data.EmployeeName);
        $('#DsfRprPosition').val(data.Position == null ? '' : data.Position);

        $('#representativeModal').modal('hide');
        $('#representative-list tbody').undelegate("tr", "click");
    });
};

function loadModelData(id, skdId) {
    //datatable
    var oTable = null;
    $('#model-list').removeAttr("style");

    $('#model-list').each(function () {
        
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "OPLAgreement/ModelDataTable/?skdId=" + skdId,
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "ModelName" },
                { "mData": "Type" },
                { "mData": "Suppliername" },
                { "mData": "Qty" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#model-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);

        if (data == undefined || modelDataIsExist(data.IdTb_MKT_SKD_Dtl)) {
            $('#modelModal').modal('hide');
            $('#model-list tbody').undelegate("tr", "click");

            return false;
        }

        $('#Units_' + id + '__Name').val(data.ModelName == null ? '' : data.ModelName);
        $('#Units_' + id + '__ModelYear').val(data.Year == null ? '' : data.Year);
        $('#Units_' + id + '__SupplierName').val(data.Suppliername == null ? '' : data.Suppliername);
        $('#Units_' + id + '__Qty').val(data.Qty == null ? '' : data.Qty);
        $('#Units_' + id + '__Qty').prop("readOnly", false);

        $('#Units_' + id + '__IdTb_MKT_SKD_Dtl').val(data.IdTb_MKT_SKD_Dtl == null ? '' : data.IdTb_MKT_SKD_Dtl);
        $('#Units_' + id + '__Type').val(data.Type == null ? '' : data.Type);
        $('#Units_' + id + '__TotalQtyInAllAgreement').val(data.TotalQtyInAllAgreement == null ? '' : data.TotalQtyInAllAgreement);
        $('#Units_' + id + '__SkdDetailQty').val(data.SkdDetailQty == null ? '' : data.SkdDetailQty);


        $('#modelModal').modal('hide');
        $('#model-list tbody').undelegate("tr", "click");
    });
};

function modelDataIsExist(id) {
    var values = $("input[id*='__IdTb_MKT_SKD_Dtl']:not([id*='Original'])")
              .map(function () { return $(this).val(); }).get();

    if (jQuery.inArray(id.toString(), values) !== -1) {
        return true;
    }

    return false;
}

$(".numeric").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$(".numericPhone").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 32) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$(".numeric").bind("paste", function (e) {
    e.preventDefault();
});

$(".numericPhone").bind("paste", function (e) {
    e.preventDefault();
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

$(".currency").bind('input propertychange', function () {
    if (isNaN($(this).val().replace(/,/gi, '')))
        $(this).val("");
    else
        AddThousandSeperator($(this));
});

$(".currency").keydown(function (event) {
    if (!event.ctrlKey && ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode >= 186 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222))
        event.preventDefault();
    else if (event.shiftKey && (event.keyCode >= 48 && event.keyCode <= 57))
        event.preventDefault();
});

function UpdateNames(table) {

    var rows = $("tr", table).not('thead tr');
    var index = 0;

    rows.each(function () {
        var inputFields = $(this).find("input");
        inputFields.each(function () {
            var currentName = $(this).attr("name");
            $(this).attr("name", currentName.replace(/\[(.*?)\]/, '[' + index + ']'));

        });
        index++;
    });
}

$('#DownloadAttachment').on('click', function (e) {
    e.preventDefault();

    var idAgreement = $('#IdOPLAgreement').val();
    var agreementNumber = $('#AgreementNumber').val();

    window.location = "/OPLAgreement/DownloadAttachmentFile?id=" + idAgreement + "&agrNum=" + agreementNumber;
});

function IsAttachmentValid() {
    var obj = $('#Attachment');
    var files = obj.prop('files')[0];
    
    if (typeof (files) == "undefined" || files == null) {
        return true;
    }

    var ext = files.name.substr((files.name.lastIndexOf('.') + 1)).toLowerCase();
    if ($.inArray(ext, ['pdf', 'xlsx', 'doc', 'docx', 'zip', 'rar']) == -1) {
        $('#attachmentValidateMsg').text("File allowed only *.pdf, *.xlsx, *.doc, *.docx, *.zip, *.rar");

        return false;
    }

    if (files.size > 1048576) {
        $('#attachmentValidateMsg').text("File Attachment couldn't exceed 1 MB.");

        return false;
    }

    return true;
}

function ClearIntegerThousandSeparator(object) {
    var localeSeparator = GetLocaleGroupingSeparator();

    for (index = 0; index < object.length; index++) {
        $(object[index]).val(object[index].value.replace(localeSeparator, ""));
    }
}

function GetLocaleGroupingSeparator() {
    var number = 1777;

    var sp = number.toLocaleString();
    if (sp.length > 4) {
        var idx = sp.indexOf("777");
        return sp.substring(1, idx);
    }
    return '';
}

// Set thousand separator for input text
function ThousandSeparatorSetUp(object) {
    for (index = 0; index < object.length; index++) {
        var id = "#" + $(object[index]).attr('id');
        var value = $(object[index]).val().replace(/,/g, "");
        $(id).autoNumeric('init', { vMin: '-9999999999999999999', vMax: '9999999999999999999' });
        $(id).autoNumeric('set', value);
    }
}