function LoadProduct() {

    // datatable
    var oTable = null;
    $('#product-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "desc"]],
            "sAjaxSource": serverRoot + "CustomerVisitSurvey/ProductDatatable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                 { "mData": "ProductCode" },
                 { "mData": "ProductCategory1" },
                 { "mData": "BrandName" },
                 { "mData": "ModelName" },
                 {
                     "mData": "ModelYear",
                     //"fnRender": function (aObj) {
                     //    var date = new Date(parseInt(aObj.aData["ModelYear"].substr(6)));
                     //    var modeldate = date.getFullYear() + "/" + date.getMonth();
                     //    return modeldate;
                     //}
                 },
                 {
                     "mData": "ModelCode",
                     "bVisible": false,
                 },
                 {
                     "mData": "BrandCode",
                     "bVisible": false,
                 },
                 {
                     "mData": "Transmission",
                     "bVisible": false,
                 },
                 {
                     "mData": "ProductType1",
                     "bVisible": false,
                 },
                 {
                     "mData": "DisPlacement",
                     "bVisible": false,
                 },
                 {
                     "mData": "FuelType",
                     "bVisible": false,
                 },
                 {
                     "mData": "ModelType",
                     "bVisible": false,
                 },
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });
    $("#product-list tbody").delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);

        $("#IdProduct").val(data.IdProduct == null ? "" : data.IdProduct);
        $("#ProductCode").val(data.ProductCode == null ? "" : data.ProductCode);
        $("#ProductType1").val(data.ProductType1 == null ? "" : data.ProductType1);
        $("#ProductCategory1").val(data.ProductCategory1 == null ? "" : data.ProductCategory1);
        $("#BrandCode").val(data.BrandCode == null ? "" : data.BrandCode);
        $("#BrandName").val(data.BrandName == null ? "" : data.BrandName);
        $("#ModelCode").val(data.ModelCode == null ? "" : data.ModelCode);
        $("#ModelName").val(data.ModelName == null ? "" : data.ModelName);
        $("#ModelType").val(data.ModelType == null ? "" : data.ModelType);
        $("#ModelYear").val(data.ModelYear == null ? "" : data.ModelYear);
        $("#Transmission").val(data.Transmission == null ? "" : data.Transmission);
        $("#FuelType").val(data.FuelType == null ? "" : data.FuelType);
        $("#DisPlacement").val(data.DisPlacement == null ? "" : data.DisPlacement);

        $('#productModal').modal('hide');
        $("#product-list tbody").undelegate("tr", "click");
    });
};

function LoadCustomer() {
    // datatable
    var oTable = null;
    $('#customer-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "CustomerVisitSurvey/CustomerDatatable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "CustomerCode" },
                { "mData": "CustomerName" },
                { "mData": "Address" },
                { "mData": "Telephone" },
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });
    $("#customer-list tbody").delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);

        $("#IdCustomer").val(data.IdCustomer == null ? "" : data.IdCustomer);
        $("#CustomerName").val(data.CustomerName == null ? "" : data.CustomerName);
        $("#Address").val(data.Address == null ? "" : data.Address);
        $("#BusinessEconomySector").val(data.BusinessEconomySector == null ? "" : data.BusinessEconomySector);
        $("#BranchNumber").val(data.BranchNumber == null ? "" : data.BranchNumber);
        $("#Telephone").val(data.Telephone == null ? "" : data.Telephone);

        $("#MaxCreditLine").val(data.MaxCreditLine == null ? "" : data.MaxCreditLine);
        $("#MaxCreditLine_label").text(data.MaxCreditLine == null ? "" : (parseFloat(data.MaxCreditLine)).toLocaleString(undefined, { minimumFractionDigits: 2 }));
        $("#TCBalanceGroup").val(data.TCBalanceGroup == null ? "" : data.TCBalanceGroup);
        $("#TCBalanceGroup_label").text(data.TCBalanceGroup == null ? "" : data.TCBalanceGroup.toLocaleString(undefined, { minimumFractionDigits: 2 }));
        $("#OverdueAmount").val(data.OverdueAmount == null ? "" : data.OverdueAmount);
        $("#OverdueAmount_label").text(data.OverdueAmount == null ? "" : data.OverdueAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }));
        $("#TCBalanceSingle").val(data.TCBalanceSingle == null ? "" : data.TCBalanceSingle);
        $("#TCBalanceSingle_label").text(data.TCBalanceSingle == null ? "" : data.TCBalanceSingle.toLocaleString(undefined, { minimumFractionDigits: 2 }));
        $("#OverdueNumber").val(data.OverdueNumber == null ? "" : data.OverdueNumber);
        $("#OverdueNumber_label").text(data.OverdueNumber == null ? "" : data.OverdueNumber);
        $("#CustomerVehicleUnit").val(data.CustomerVehicleUnit == null ? "" : data.CustomerVehicleUnit);
        $("#CustomerVehicleUnit_label").text(data.CustomerVehicleUnit == null ? "" : data.CustomerVehicleUnit);
        $("#DSFVehicleUnit").val(data.DSFVehicleUnit == null ? "" : data.DSFVehicleUnit);
        $("#DSFVehicleUnit_label").text(data.DSFVehicleUnit == null ? "" : data.DSFVehicleUnit);
        $("#PotentialVehicleUnit").val(data.PotentialVehicleUnit == null ? "" : data.PotentialVehicleUnit);
        $("#PotentialVehicleUnit_label").text(data.PotentialVehicleUnit == null ? "" : data.PotentialVehicleUnit);
        $("#IADVehicleUnit").val(data.IADVehicleUnit == null ? "" : data.IADVehicleUnit);
        $("#IADVehicleUnit_label").text(data.IADVehicleUnit == null ? "" : data.IADVehicleUnit);
        $("#CustomerForkliftUnit").val(data.CustomerForkliftUnit == null ? "" : data.CustomerForkliftUnit);
        $("#CustomerForkliftUnit_label").text(data.CustomerForkliftUnit == null ? "" : data.CustomerForkliftUnit);
        $("#DSFForkliftUnit").val(data.DSFForkliftUnit == null ? "" : data.DSFForkliftUnit);
        $("#DSFForkliftUnit_label").text(data.DSFForkliftUnit == null ? "" : data.DSFForkliftUnit);
        $("#PotentialForkliftUnit").val(data.PotentialForkliftUnit == null ? "" : data.PotentialForkliftUnit);
        $("#PotentialForkliftUnit_label").text(data.PotentialForkliftUnit == null ? "" : data.PotentialForkliftUnit);
        $("#IADForkliftUnit").val(data.IADForkliftUnit == null ? "" : data.IADForkliftUnit);
        $("#IADForkliftUnit_label").text(data.IADForkliftUnit == null ? "" : data.IADForkliftUnit);
        $("#CustomerHEUnit").val(data.CustomerHEUnit == null ? "" : data.CustomerHEUnit);
        $("#CustomerHEUnit_label").text(data.CustomerHEUnit == null ? "" : data.CustomerHEUnit);
        $("#DSFHEUnit").val(data.DSFHEUnit == null ? "" : data.DSFHEUnit);
        $("#DSFHEUnit_label").text(data.DSFHEUnit == null ? "" : data.DSFHEUnit);
        $("#PotentialHEUnit").val(data.PotentialHEUnit == null ? "" : data.PotentialHEUnit);
        $("#PotentialHEUnit_label").text(data.PotentialHEUnit == null ? "" : data.PotentialHEUnit);
        $("#IADHEUnit").val(data.IADHEUnit == null ? "" : data.IADHEUnit);
        $("#IADHEUnit_label").text(data.IADHEUnit == null ? "" : data.IADHEUnit);
        $("#LCVNonMaintenance").val(data.LCVNonMaintenance == null ? "" : data.LCVNonMaintenance);
        $("#LCVNonMaintenance_label").text(data.LCVNonMaintenance == null ? "" : data.LCVNonMaintenance);
        $("#LCVMaintenance").val(data.LCVMaintenance == null ? "" : data.LCVMaintenance);
        $("#LCVMaintenance_label").text(data.LCVMaintenance == null ? "" : data.LCVMaintenance);
        $("#LCVCSD").val(data.LCVCSD == null ? "" : data.LCVCSD);
        $("#LCVCSD_label").text(data.LCVCSD == null ? "" : data.LCVCSD);
        $("#LCVFinanceLease").val(data.LCVFinanceLease == null ? "" : data.LCVFinanceLease);
        $("#LCVFinanceLease_label").text(data.LCVFinanceLease == null ? "" : data.LCVFinanceLease);
        $("#CVNonMaintenance").val(data.CVNonMaintenance == null ? "" : data.CVNonMaintenance);
        $("#CVNonMaintenance_label").text(data.CVNonMaintenance == null ? "" : data.CVNonMaintenance);
        $("#CVMaintenance").val(data.CVMaintenance == null ? "" : data.CVMaintenance);
        $("#CVMaintenance_label").text(data.CVMaintenance == null ? "" : data.CVMaintenance);
        $("#CVCSD").val(data.CVCSD == null ? "" : data.CVCSD);
        $("#CVCSD_label").text(data.CVCSD == null ? "" : data.CVCSD);
        $("#CVFinanceLease").val(data.CVFinanceLease == null ? "" : data.CVFinanceLease);
        $("#CVFinanceLease_label").text(data.CVFinanceLease == null ? "" : data.CVFinanceLease);
        $("#PCNonMaintenance").val(data.PCNonMaintenance == null ? "" : data.PCNonMaintenance);
        $("#PCNonMaintenance_label").text(data.PCNonMaintenance == null ? "" : data.PCNonMaintenance);
        $("#PCMaintenance").val(data.PCMaintenance == null ? "" : data.PCMaintenance);
        $("#PCMaintenance_label").text(data.PCMaintenance == null ? "" : data.PCMaintenance);
        $("#PCCSD").val(data.PCCSD == null ? "" : data.PCCSD);
        $("#PCCSD_label").text(data.PCCSD == null ? "" : data.PCCSD);
        $("#PCFinanceLease").val(data.PCFinanceLease == null ? "" : data.PCFinanceLease);
        $("#PCFinanceLease_label").text(data.PCFinanceLease == null ? "" : data.PCFinanceLease);
        $("#ForkliftNonMaintenance").val(data.ForkliftNonMaintenance == null ? "" : data.ForkliftNonMaintenance);
        $("#ForkliftNonMaintenance_label").text(data.ForkliftNonMaintenance == null ? "" : data.ForkliftNonMaintenance);
        $("#ForkliftMaintenance").val(data.ForkliftMaintenance == null ? "" : data.ForkliftMaintenance);
        $("#ForkliftMaintenance_label").text(data.ForkliftMaintenance == null ? "" : data.ForkliftMaintenance);
        $("#ForkliftCSD").val(data.ForkliftCSD == null ? "" : data.ForkliftCSD);
        $("#ForkliftCSD_label").text(data.ForkliftCSD == null ? "" : data.ForkliftCSD);
        $("#ForkliftFinanceLease").val(data.ForkliftFinanceLease == null ? "" : data.ForkliftFinanceLease);
        $("#ForkliftFinanceLease_label").text(data.ForkliftFinanceLease == null ? "" : data.ForkliftFinanceLease);
        $("#HENonMaintenance").val(data.HENonMaintenance == null ? "" : data.HENonMaintenance);
        $("#HENonMaintenance_label").text(data.HENonMaintenance == null ? "" : data.HENonMaintenance);
        $("#HEMaintenance").val(data.HEMaintenance == null ? "" : data.HEMaintenance);
        $("#HEMaintenance_label").text(data.HEMaintenance == null ? "" : data.HEMaintenance);
        $("#HECSD").val(data.HECSD == null ? "" : data.HECSD);
        $("#HECSD_label").text(data.HECSD == null ? "" : data.HECSD);
        $("#HEFinanceLease").val(data.HEFinanceLease == null ? "" : data.HEFinanceLease);
        $("#HEFinanceLease_label").text(data.HEFinanceLease == null ? "" : data.HEFinanceLease);

        $('#customerModal').modal('hide');
        $("#customer-list tbody").undelegate("tr", "click");
    });
};

$(".numeric").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$(".numeric").bind("paste", function (e) {
    e.preventDefault();
});

// Handle For Percentage Masking With 6 Decimal Digits
var ContainPoint = false;
var LastPoint = 0;
$(".percentage").bind('input propertychange', function () {
    if (isNaN($(this).val().replace(/,/gi, '')))
        $(this).val("");
    else
        AddDecimalSeperator($(this));
});
$(".percentage").keydown(function (event) {
    if (event.keyCode == 32)
        event.preventDefault();
    else if (!event.ctrlKey && ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode >= 186 && event.keyCode <= 189 || event.keyCode >= 191 && event.keyCode <= 192 || event.keyCode >= 219 && event.keyCode <= 222))
        event.preventDefault();
    else if (event.shiftKey && (event.keyCode >= 48 && event.keyCode <= 57))
        event.preventDefault();
    else if (!event.shiftKey) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 110 || event.keyCode == 190) {
            if (parseFloat($(this).val()) >= 100)
                event.preventDefault();
            if ($(this).val().split(".").length > 1) {
                if (event.keyCode == 110 || event.keyCode == 190)
                    event.preventDefault();
                if ($(this).val().split(".")[1].length >= 6)
                    event.preventDefault();
            }
            if (parseFloat($(this).val()) == 0 && !(event.keyCode == 110 || event.keyCode == 190) && $(this).val().indexOf(".") < 0)
                event.preventDefault();
        }
        else if (event.keyCode == 8 || event.keyCode == 46) {
            if ($(this).val().indexOf(".") >= 0) {
                ContainPoint = true;
                LastPoint = $(this).val().indexOf(".");
            }
            else {
                ContainPoint = false;
                LastPoint = 0;
            }
        }
    }
});
function AddDecimalSeperator(jInputControl) {
    var value = jInputControl.val();
    if (value.indexOf(".") == 0) {
        jInputControl.val(null);
    }

    if (value.indexOf(".") < 0 && parseFloat(value) > 100) {
        if (!ContainPoint) {
            var i = 0;
            while (parseFloat(value) > 100) {
                value = value.replace(".", "");
                value = value.substr(0, value.length - (1 + i)) + "." + value.substr(value.length - (1 + i), value.length);
                i++;
            }
            value = value.split(".")[0] + "." + value.split(".")[1].substr(0, 6);
            jInputControl.val(value);
        }
        else if (ContainPoint) {
            jInputControl.val(value.substr(0, LastPoint) + "." + value.substr(LastPoint, value.length));
        }
    }
    else if (value.indexOf(".") >= 0 && parseFloat(value) > 100) {
        if (!ContainPoint) {
            var i = 0;
            while (parseFloat(value) > 100) {
                value = value.replace(".", "");
                value = value.substr(0, value.length - (1 + i)) + "." + value.substr(value.length - (1 + i), value.length);
                i++;
            }
            value = value.split(".")[0] + "." + value.split(".")[1].substr(0, 6);
            jInputControl.val(value);
        }
        else if (ContainPoint) {
            jInputControl.val(value.substr(0, LastPoint) + "." + value.substr(LastPoint, value.length));
        }
    }
}
// End Handle For Percentage Masking With 6 Decimal Digits

//--MULTIPLE SELECT
// Must Declare Id as global variable first
function RecommendationEvent() {
    var itemVal = $('#Recommendation').val();

    if (itemVal != null && itemVal.indexOf(window.recommendationOthersId) > -1) {
        $('#RecommendationOthers').prop('readonly', false);
    } else {
        $('#RecommendationOthers').prop('readonly', true).val('');
    }
}

function DisposMethodEvent() {
    var itemVal = $('#DisposMethod').val();

    if (itemVal != null && itemVal.indexOf(window.DisposMethodOthersId) > -1) {
        $('#DisposMethodOthers').prop('readonly', false);
    } else {
        $('#DisposMethodOthers').prop('readonly', true).val('');
    }
}

function FreqMaintenanceEvent() {
    var itemVal = $('#FreqMaintenance').val();

    if (itemVal != null && itemVal.indexOf(window.FreqMaintenanceOthersId) > -1) {
        $('#FreqMaintenanceOthers').prop('readonly', false);
    } else {
        $('#FreqMaintenanceOthers').prop('readonly', true).val('');
    }
}

function UsagePurposeEvent() {
    var itemVal = $('#UsagePurpose').val();

    if (itemVal != null && itemVal.indexOf(window.UsagePurposeOthersId) > -1) {
        $('#UsagePurposeOthers').prop('readonly', false);
    } else {
        $('#UsagePurposeOthers').prop('readonly', true).val('');
    }
}

//Selecting the Vehicle Maintenance with “Own Workshop” value will activate the Number of Mechanics
//and Number of Workshops field
function VhcMaintenanceEvent() {
    var itemVal = $('#VhcMaintenance').val();

    if (itemVal != null && itemVal.indexOf(window.OwnWorkshopId) > -1) {
        $('#NumMechanics').prop('readonly', false);
        $('#NumWorkshops').prop('readonly', false);
    } else {
        $('#NumMechanics').prop('readonly', true).val('');
        $('#NumWorkshops').prop('readonly', true).val('');;
    }
}

//Selecting 'Yes' in Replacement car will activate field Maximum Breakdown
function ReplacementCarEvent() {
    var itemVal = $('#ReplacementCar').val();

    if (itemVal != null && itemVal == 'true') {
        $('#MaximumBreakdown').prop('readonly', false);
    } else {
        $('#MaximumBreakdown').prop('readonly', true).val('');
    }
}

//Selecting 'Yes' in Replacement car will activate field Maximum Breakdown
function UsageLocationEvent() {
    var itemVal = $('#UsageLocation').val();
    if (itemVal != null && itemVal == window.UsageLocatonOtherId) {
        $('#UsageLocationOthers').prop('readonly', false);
    } else {
        $('#UsageLocationOthers').prop('readonly', true).val('');
    }
}

//Selecting the Vehicle Supervision with “Branch Office” value will activate the Number of Branch Office field
function SupervisionVhcEvent() {
    var itemVal = $('#VhcSupervision').val();

    if (itemVal != null && itemVal == window.BranchOfficeId) {
        $('#NumBranchOffice').prop('readonly', false);
    } else {
        $('#NumBranchOffice').prop('readonly', true).val('');
    }
}

//1. Selecting At the end of period with “Will be purchased” value will activate the Residual Value field
//2. Selecting At the end of period with “Will be extended” value will activate the for (month(s)) field
function AfterEndOfPeriodEvent() {
    var itemVal = $('#AfterEndOfPeriod').val();

    if (itemVal != null && itemVal == window.UnitWillBePurchasedId) {
        $('#ResidualValue').prop('readonly', false);
        $('#ExtendedMonths').prop('readonly', true).val('');
    } else if (itemVal != null && itemVal == window.UnitWillBeExtendedId) {
        $('#ExtendedMonths').prop('readonly', false);
        $('#ResidualValue').prop('readonly', true).val('');
    } else {
        $('#ExtendedMonths').prop('readonly', true).val('');
        $('#ResidualValue').prop('readonly', true).val('');
    }
}

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
