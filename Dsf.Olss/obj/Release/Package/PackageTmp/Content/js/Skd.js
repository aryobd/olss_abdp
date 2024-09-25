var counterRow = 0;
$(function () {

    $('#addUnit').click(function () {
        var page = $('div.pull-in > p').text();
        var lastIndex = $('#flagDeleteSKDDtl > input#IdSupplier').length;
        if (getTotalRowProduct() != null) {
            if (page == "Create SKD") {
                counterRow = lastIndex + 1;
            } else if (page == "Edit SKD") {
                counterRow = lastIndex;
            }
        } else {
            counterRow += 1;
        }

        var mName = $('#mtable tr').find('.modName')[0].value;
        var mYear = $('#mtable tr').find('.modYear')[0].value;
        var nUsed = $('#mtable tr').find('.newUsed')[0].value;
        var unitPrice = $('#mtable tr').find('.unitPrice')[0].value;
        var idProduct = $("#IdProduct").val();

        var newTr = $('<tr class="rowUnit" id="rUnit">' +
            '<input type="hidden" name="SkdDetailViewModels[' + counterRow + '].Type" value="Unit"/>' +
            '<input type="hidden" name="SkdDetailViewModels[' + counterRow + '].IdProduct" value="' + idProduct + '" />' +
	        '<input type="hidden" name="SkdDetailViewModels[' + counterRow + '].Name" value="-" />' +
            '<td><input class="form-control modName" type="text" readonly="readonly" value="' + mName + '" name="SkdDetailViewModels[' + counterRow + '].ModelName"></td> ' +
            '<td><input class="form-control modYear" type="text" readonly="readonly" value="' + mYear + '" name="SkdDetailViewModels[' + counterRow + '].ModelYear"></td>' +
            '<td><input class="form-control newUsed" type="text"  readonly="readonly" value="' + nUsed + '" name="SkdDetailViewModels[' + counterRow + '].NewUsed"></td>' +
            '<td>' +
            '<div class="input-group">' +
            '<input type="text" id="SupplierName" class="form-control mandatory supplierName_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].Suppliername">' +
            '<span class="input-group-btn">' +
            '<button class="btn btn-white font-bold" type="button" data-toggle="modal" data-target="#supplierModal" onclick="loadSupplier(' + counterRow + ')">. . .</button>' +
            '</span>' +
            '<span data-valmsg-for="SkdDetailViewModels[' + counterRow + '].IdSupplier" data-valmsg-replace="true"></span>' +
            '<span class="input-group-btn"><button class="btn btn-info font-bold add_item fa fa-minus" id="deleteRow" onclick="deleteData(' + counterRow + ')" type="button"></button>' +
            '</span>' +
            '</div>' +
            '</td>' +
            '<td><input type="text" id="SupplierAddress" class="form-control supplierAddress_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].SupplierAddress" readonly = "readonly"></td>' +
            '<td><input class="form-control mandatory qtyUnit qtyNum" type="text" value="0" onkeyup="countTotalPricePer(' + counterRow + ')" data-Qty-' + counterRow + ' name="SkdDetailViewModels[' + counterRow + '].Qty"></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input id="UnitPrice_' + counterRow + '" class="form-control text-right unitPrice" type="text" value="' + unitPrice + '" readonly="true" data-UnitPrice-' + counterRow + ' name="SkdDetailViewModels[' + counterRow + '].Price"></div></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right totalPricePerUnit" type="text" value="0" readonly="true" data-TotalPricePer-' + counterRow + ' name="SkdDetailViewModels[' + counterRow + '].TotalPrice"></div></td>' +
            '</tr>');

        createFlagStatusDeleteElement(counterRow);

        $("tr[class*='rowUnit']").last().after(newTr);

        return false;
    });

    $('#addAcc').click(function () {

        var page = $('div.pull-in > p').text();
        var lastIndex = $('#flagDeleteSKDDtl > input#IdSupplier').length;
        if (getTotalRowProduct() != null) {
            if (page == "Create SKD") {
                counterRow = lastIndex + 1;
            } else if (page == "Edit SKD") {
                counterRow = lastIndex;
            }
        } else {
            counterRow += 1;
        }

        var newTr = $('<tr class="rowAcc" id="rAcc">' +
            '<input type="hidden" name="SkdDetailViewModels[' + counterRow + '].Type" value="Accessories"/>' +
            '<td colspan="3"><input name="SkdDetailViewModels[' + counterRow + '].Name" class="form-control mandatory accessoriesName" type="text"/></td>' +
            '<td>' +
            '<div class="input-group">' +
            '<input type="text" id="SupplierName" class="form-control mandatory supplierName_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].Suppliername">' +
            '<span class="input-group-btn">' +
            '<button class="btn btn-white font-bold" type="button" data-toggle="modal" data-target="#supplierModal" onclick="loadSupplier(' + counterRow + ')">. . .</button>' +
            '</span>' +
            '<span class="input-group-btn"><button class="btn btn-success font-bold add_item fa fa-minus" id="deleteRow" onclick="deleteData(' + counterRow + ')" type="button"></button>' +
            '</span>' +
            '</div>' +
            '</td>' +
            '<td><input type="text" id="SupplierAddress" class="form-control supplierAddress_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].SupplierAddress" readonly = "readonly"></td>' +
            '<td>' +
            '<input name="SkdDetailViewModels[' + counterRow + '].Qty" class="form-control mandatory qtyNum" type="text" value="0" onkeyup="countTotalPricePer(' + counterRow + ');" data-Qty-' + counterRow + '></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span>' +
            '<input name="SkdDetailViewModels[' + counterRow + '].Price" class="form-control mandatory text-right thousandSeparator" type="text" value="0" onkeyup="countTotalPricePer(' + counterRow + ')"  data-UnitPrice-' + counterRow + '></div></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right dataTotalPricePer" type="text" value="0" readonly="true" data-TotalPricePer-' + counterRow + ' ></div></td>' +
            '</tr>');

        createFlagStatusDeleteElement(counterRow);

        var elementExists = document.getElementById("rAcc");

        var countRowUnit = $("tr[class*='rowUnit']").length;

        if (elementExists == null) {
            $($('#mtable tr')[countRowUnit]).after(newTr);
        } else {
            $("tr[class*='rowAcc']").last().after(newTr);
        }

        reCountCompensationVat();
        reCountOperatingLeaseIncome();
        reCountIncome();
        reCountCost();
        reCountOSNetInvestment(true, true, true);

        return false;
    });

    $('#addCarro').click(function () {

        var page = $('div.pull-in > p').text();
        var lastIndex = $('#flagDeleteSKDDtl > input#IdSupplier').length;
        if (getTotalRowProduct() != null) {
            if (page == "Create SKD") {
                counterRow = lastIndex + 1;
            } else if (page == "Edit SKD") {
                counterRow = lastIndex;
            }
        } else {
            counterRow += 1;
        }

        var newTr = $('<tr class="rowCarro" id="rCarro">' +
            '<input type="hidden" name="SkdDetailViewModels[' + counterRow + '].Type" value="Carroseries"/>' +
            '<td colspan="3"><input name="SkdDetailViewModels[' + counterRow + '].Name" class="form-control mandatory carroseriesName" type="text"/></td>' +
            '<td>' +
            '<div class="input-group">' +
            '<input type="text" id="SupplierName" class="form-control mandatory supplierName_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].Suppliername">' +
            '<span class="input-group-btn"><button class="btn btn-white font-bold" type="button" data-toggle="modal" data-target="#supplierModal" onclick="loadSupplier(' + counterRow + ')">. . .</button>' +
            '</span>' +
            '<span class="input-group-btn"><button class="btn btn-warning font-bold add_item fa fa-minus" id="deleteRow" onclick="deleteData(' + counterRow + ')" type="button"></button>' +
            '</span>' +
            '</div>' +
            '</td>' +
            '<td><input type="text" id="SupplierAddress" class="form-control supplierAddress_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].SupplierAddress" readonly = "readonly"></td>' +
            '<td><input name="SkdDetailViewModels[' + counterRow + '].Qty" class="form-control mandatory qtyNum" type="text" value="0" onkeyup="countTotalPricePer(' + counterRow + ');" data-Qty-' + counterRow + '></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span>' +
            '<input name="SkdDetailViewModels[' + counterRow + '].Price" class="form-control mandatory text-right thousandSeparator" type="text" value="0" onkeyup="countTotalPricePer(' + counterRow + ')"  data-UnitPrice-' + counterRow + '></div></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right dataTotalPricePer" type="text" value="0" readonly="true" data-TotalPricePer-' + counterRow + '></div></td>' +
            '</tr>');

        createFlagStatusDeleteElement(counterRow);

        var elementExists = document.getElementById("rCarro");

        var countRowUnit = $("tr[class*='rowUnit']").length;

        var countRowAcc = $("tr[class*='rowAcc']").length;

        if (elementExists == null) {
            $($('#mtable tr')[countRowUnit + countRowAcc]).after(newTr);
        } else {
            $("tr[class*='rowCarro']").last().after(newTr);
        }

        reCountCompensationVat();
        reCountOperatingLeaseIncome();
        reCountIncome();
        reCountCost();
        reCountOSNetInvestment(true, true, true);

        return false;
    });

    $('#addNet').click(function () {

        if (getTotalRowOSNetInvestment() != null) {
            counterRow = getTotalRowOSNetInvestment();
        } else {
            counterRow += 1;
        }

        var newTr = $('<tr class="netInvestment">' +
            '<td><input class="form-control" type="text" value="" name="SkdNetInvestmentViewModels[' + counterRow + '].Description"></td>' +
	        '<td><input class="form-control" readonly="true" name="SkdNetInvestmentViewModels[' + counterRow + '].StatusDescription"></td>' +
            '<td><input class="form-control" type="text" value="" name="SkdNetInvestmentViewModels[' + counterRow + '].CustomerName"></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right netInvestmentPrice thousandSeparator" type="text" value="" name="SkdNetInvestmentViewModels[' + counterRow + '].Price" onkeyup="countNetPer(' + counterRow + ');reCountOSNetInvestment(true,false,false);"></div></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right netInvestmentRv thousandSeparator" type="text" value="" name="SkdNetInvestmentViewModels[' + counterRow + '].Rv" onkeyup="countNetPer(' + counterRow + ');reCountOSNetInvestment(false,true,false);"></div></td>' +
            '<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right netInvestmentNet thousandSeparator" readonly="true" type="text" value="0"  name="SkdNetInvestmentViewModels[' + counterRow + '].Net" onkeyup="reCountOSNetInvestment(false,false,true);">' +
            '<span class="input-group-btn"><button class="btn btn-info font-bold add_item fa fa-minus" type="button" id="deleteRow" onclick="deleteDataNet(' + counterRow + ')"></button></span></div></td>' +
            '</tr>');

        createFlagNetStatusDeleteElement(counterRow);

        $($('#ntable tr')[counterRow]).after(newTr);

        return false;
    });

    $("#mtable").on('click', '#deleteRow', function () {

        $(this).parent().parent().parent().parent().remove();

        counTotalCostOfProduct();
        reCountCompensationVat();
        reCountOperatingLeaseIncome();
        reCountIncome();
        reCountCost();
        reCountOSNetInvestment(true, true, true);

        concatAccessories();
        concatCarroseries();
    });

    $("#ntable").on('click', '#deleteRow', function () {
        $(this).parent().parent().parent().parent().remove();
        counTotalCostOfProduct();
        reCountOSNetInvestment(true, true, true);
    });

    $(document).on('keyup', ".carroseriesName", concatCarroseries);

    $(document).on('keyup', ".accessoriesName", concatAccessories);

    $(document).on('keyup', ".thousandSeparator", thousandSeparator);

    $(document).on('keyup', ".qtyUnit", qtyNumericUnit);

    $(document).on('keyup', ".qtyNum", qtyNumeric);

    $(".numeric").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });
});

$('.qtyUnit').bind("paste", function (e) {
    e.preventDefault();
});

$(document).on('focus', ".thousandSeparator", function () { //bind to all instances of class "thousandSeparator".
    $(this).bind("paste", function (e) {
        e.preventDefault();
    });
});

$(document).on('focus', ".qtyNum", function () { //bind to all instances of class "qtyNum".
    $(this).bind("paste", function (e) {
        e.preventDefault();
    });
});

function thousandSeparator() {
    $(".thousandSeparator").each(function () {
        $(this).autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
    });
}

function qtyNumericUnit() {
    $(".qtyUnit").autoNumeric('init', { lZero: 'deny', aSep: '', mDec: 0 });
}

function qtyNumeric() {
    $(".qtyNum").autoNumeric('init', { lZero: 'deny', aSep: '', mDec: 0 });
}

function concatAccessories() {
    var length = $(".accessoriesName").length;

    var carroseriesName = "";
    var counter = 1;
    $(".accessoriesName").each(function () {

        if (counter == length) {
            carroseriesName += $(this).val();
        }
        else {
            carroseriesName += $(this).val() + ", ";
        }

        counter++;
    });

    $("#accessoriesName").text(carroseriesName);
}

function concatCarroseries() {
    var length = $(".carroseriesName").length;

    var carroseriesName = "";
    var counter = 1;
    $(".carroseriesName").each(function () {

        if (counter == length) {
            carroseriesName += $(this).val();
        }
        else {
            carroseriesName += $(this).val() + ", ";
        }

        counter++;
    });

    $("#carroseriesName").text(carroseriesName);
}

function countNetPer(id) {
    var price = $("input[name*='SkdNetInvestmentViewModels[" + id + "].Price']").val();
    var rv = $("input[name*='SkdNetInvestmentViewModels[" + id + "].Rv']").val();

    if (price != null && rv != null) {
        price = price == "" ? 0 : parseFloat(price.replace(/,/g, ""));
        rv = rv == "" ? 0 : parseFloat(rv.replace(/,/g, ""));

        $("input[name*='SkdNetInvestmentViewModels[" + id + "].Net']").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMin: '-999999999999999999', vMax: '999999999999999999' });
        $("input[name*='SkdNetInvestmentViewModels[" + id + "].Net']").autoNumeric('set', (price - rv));

    }

    reCountOSNetInvestment(true, true, true);
}

function countTotalPricePer(id) {
    var x = $("[data-Qty-" + id + "]").val();
    var unitPrice = $("[data-UnitPrice-" + id + "]").val();
    if (unitPrice != null) {
        $("[data-TotalPricePer-" + id + "]").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
        $("[data-TotalPricePer-" + id + "]").autoNumeric('set', (x * unitPrice.replace(/,/g, "")));
    }

    //For Edit
    var xId = $(".qty_" + id).val();
    var unitPriceId = $(".uPrice_" + id).val();
    if (unitPriceId != null) {
        $(".totalPrice_" + id).autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
        $(".totalPrice_" + id).autoNumeric('set', (xId * unitPriceId.replace(/,/g, "")));
    }

    counTotalCostOfProduct();
    reCountCompensationVat();
    reCountOperatingLeaseIncome();
    reCountIncome();
    reCountCost();
    reCountOSNetInvestment(true, true, true);
}

function counTotalCostOfProduct() {
    var total = 0;
    var row = $("#TotalCostOfProduct").parent().parent().parent();

    var cRow = getTotalRowProduct();

    for (var i = 1; i <= cRow; i++) {
        row = row.prev();
        total += parseFloat(row.children("td:last").find("input").val().replace(/,/g, ""));
    }

    $("#TotalCostOfProduct").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
    $("#TotalCostOfProduct").autoNumeric('set', total);
}

function getTotalRowProduct() {
    var countRowUnit = $("tr[class*='rowUnit']").length;

    var countRowAcc = $("tr[class*='rowAcc']").length;

    var countRowCarro = $("tr[class*='rowCarro']").length;

    var cRow = countRowUnit + countRowAcc + countRowCarro;

    return cRow;
}

function getTotalRowOSNetInvestment() {
    var countRowNet = $("tr[class*='netInvestment']").length;

    var cRow = countRowNet;

    return cRow;
}

function reCountCompensationVat() {
    var total = 0;
    var qtyUnit = $("tr[class*='rowUnit']").each(function () {
        total += parseFloat($(this).find(".qtyUnit").val());
    });

    if (isNaN(total)) {
        total = 0;
    }

    //check if there is no Accessories or Carroserie then set Qty 0
    var countRowAcc = $("tr[class*='rowAcc']").length;
    var countRowCarro = $("tr[class*='rowCarro']").length;

    if (countRowAcc == 0) {
        $("#QtyUnitForCompensationAccessories").val(0);
    } else {
        $("#QtyUnitForCompensationAccessories").val(total);
    }

    if (countRowCarro == 0) {
        $("#QtyUnitForCompensationCarroseries").val(0);
    } else {
        $("#QtyUnitForCompensationCarroseries").val(total);
    }

    $("#QtyUnitForCompensationProduct").val(total);

    $("#TotalPriceVatInUnit").val(total * $("#VatInUnit").val().replace(/,/g, ""));
    $("#TotalPriceVatInAccessories").val($("#QtyUnitForCompensationAccessories").val() * $("#VatInAccessories").val().replace(/,/g, ""));
    $("#TotalPriceVatInCarroserries").val($("#QtyUnitForCompensationCarroseries").val() * $("#VatInCarroserries").val().replace(/,/g, ""));
    $("#TotalPriceVatInAccessories2").val($("#QtyUnitForCompensationAccessories").val() * $("#VatInAccessories").val().replace(/,/g, ""));
    $("#TotalPriceVatInCarroserries2").val($("#QtyUnitForCompensationCarroseries").val() * $("#VatInCarroserries").val().replace(/,/g, ""));
    $("#TotalCompensationVatInOfProduct").val(parseFloat($("#TotalPriceVatInUnit").val().replace(/,/g, "")) + parseFloat($("#TotalPriceVatInAccessories").val().replace(/,/g, "")) + parseFloat($("#TotalPriceVatInCarroserries").val().replace(/,/g, "")));

    $("#TotalNetInvestment").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
    $("#TotalNetInvestment").autoNumeric('set', parseFloat($("#TotalCostOfProduct").val().replace(/,/g, "")) - parseFloat($("#TotalCompensationVatInOfProduct").val().replace(/,/g, "")));
}

function reCountOperatingLeaseIncome() {
    var total = 0;
    var qtyUnit = $("tr[class*='rowUnit']").each(function () {
        total += parseFloat($(this).find(".qtyUnit").val());
    });

    if (isNaN(total)) {
        total = 0;
    }

    $("#NetInvestment").val($("#TotalNetInvestment").val());
    $("#ResidualValueUnit").val(($("#ResidualValueAmountHidden").val().replace(/,/g, "")) * total);

    if ($("#IsNewCalculation").val() != null && $("#IsNewCalculation").val()) {
        if (isNaN($("#ResidualValuePercentUnit").val())) {
            $("#ResidualValuePercentUnit").val((($("#ResidualValuePercent").val().replace(/,/g, "")).toFixed(6)));
        }
    } else {
        $("#ResidualValuePercentUnit").val((($("#ResidualValueUnit").val().replace(/,/g, "") / $("#NetInvestment").val().replace(/,/g, "")) * 100).toFixed(6));
    }

    if (isNaN($("#ResidualValuePercentUnit").val())) {
        $("#ResidualValuePercentUnit").val(0);
    }

    $("#MonthlyOperatingLease").val($("#MonthlyInstallmentAmountHidden").val().replace(/,/g, "") * total);
    $("#Vat").val((10 / 100) * $("#MonthlyOperatingLease").val());
    $("#Billing").val(parseFloat($("#MonthlyOperatingLease").val()) + parseFloat($("#Vat").val()));
    $("#WithholdingTaxArt23").val((2 / 100) * $("#MonthlyOperatingLease").val());
    $("#NetPayment").val($("#Billing").val() - $("#WithholdingTaxArt23").val());

    // Set thousand separator for disabled input text
    var thousandSeparatorField = $('span:contains("Rp")').next();
    ThousandSeparatorSetUp(thousandSeparatorField);
}

function reCountIncome() {
    var total = 0;
    $("tr[class*='rowUnit']").each(function () {
        total += parseFloat($(this).find(".qtyUnit").val());
    });

    if (isNaN(total)) {
        total = 0;
    }

    $("#InstallmentIncome").val($("#TotalInstallmentAmountHidden").val() * total);
    $("#InsuranceIncome").val($("#InsuranceCommisionAmountHidden").val() * total);
    $("#KtbDiscDirectToDsf").val($("#ATPMDiscountHidden").val() * total);
    $("#ResidualValue").val(Math.round($("#ResidualValueAmountIncomeHidden").val() * total));
    $("#TotalLeaseIncome").val(
        parseFloat($("#InstallmentIncome").val().replace(/,/g, "")) +
        parseFloat($("#InsuranceIncome").val().replace(/,/g, "")) +
        parseFloat($("#KtbDiscDirectToDsf").val().replace(/,/g, "")) +
        parseFloat($("#ResidualValue").val().replace(/,/g, ""))
    );


    // Set thousand separator for disabled input text
    var thousandSeparatorField = $('span:contains("Rp")').next();
    ThousandSeparatorSetUp(thousandSeparatorField);
}

function reCountCost() {
    var total = 0;

    $("tr[class*='rowUnit']").each(function () {
        total += parseFloat($(this).find(".qtyUnit").val());
    });

    if (isNaN(total)) {
        total = 0;
    }

    //$("#ProductPrice").val(parseFloat($("#TotalCostOfProduct").val().replace(/,/g, ""))); //cr new calculation
    $("#ProductPrice").val(parseFloat($("#ProductPriceTotalCostHidden").val().replace(/,/g, "")));
    $("#Registration").val(Math.round($("#RegistrationValueAmountHidden").val() * total));

    if ($("#IsNewCalculation").val(true)) {
        $("#Maintenance").val(Math.round($("#SumMaintenanceCostAmountHidden").val() * total));
    } else {
        $("#Maintenance").val(Math.round($("#SumMaintenanceCostAmountHidden").val() * total * 1.1));
    }
    $("#Replacement").val(Math.round($("#ReplacementCarAmountHidden").val() * total));
    $("#InsuranceCost").val(Math.round($("#TotalGrossPremiumHidden").val() * total));

    $("#MediatorFee").val(Math.round($("#MediatorFeeAmountHidden").val() * total));
    $("#Mobilization").val(Math.round($("#TotalMobilizationFeeAmountHidden").val() * total));
    $("#DeMobilization").val(Math.round($("#TotalDemobilizationFeeAmountHidden").val() * total));
    $("#InterestCost").val(Math.round($("#InterestExpenseHidden").val() * total));
    $("#TermofPaymentCost").val(Math.round($("#InterestCostTopAmountHidden").val() * total));
    $("#InterestCostBeforeBAST").val(Math.round($("#InterestExpenseBASTHidden").val() * total));
    $("#TotalLeaseCost").val(
        parseFloat($("#ProductPrice").val().replace(/,/g, "")) +
        parseFloat($("#Registration").val().replace(/,/g, "")) +
        parseFloat($("#Maintenance").val().replace(/,/g, "")) +
        parseFloat($("#Replacement").val().replace(/,/g, "")) +
        parseFloat($("#InsuranceCost").val().replace(/,/g, "")) +
        parseFloat($("#MediatorFee").val().replace(/,/g, "")) +
        parseFloat($("#Mobilization").val().replace(/,/g, "")) +
        parseFloat($("#DeMobilization").val().replace(/,/g, "")) +
        parseFloat($("#InterestCost").val().replace(/,/g, "")) +
        parseFloat($("#TermofPaymentCost").val().replace(/,/g, "")) +
        parseFloat($("#InterestCostBeforeBAST").val().replace(/,/g, ""))
    ); 

    $("#IncomeCost").val(Math.round($("#TotalLeaseIncome").val().replace(/,/g, "") - $("#TotalLeaseCost").val().replace(/,/g, "")));
    $("#NetIncomeWithVatTaxPerYear").val(parseFloat($("#IncomeCost").val().replace(/,/g, "")) / $("#LeaseTerm").val().replace(/,/g, "") * 12);
    var prodPriceUnit = (parseFloat($("#ProductPrice").val().replace(/,/g, ""))) * total;
    var carrPriceUnit = (parseFloat($("#Carroserrie").val().replace(/,/g, ""))) * total;
    $("#AverageAsset").val((((prodPriceUnit + carrPriceUnit) - parseFloat($("#ResidualValueUnit").val().replace(/,/g, ""))) / 2) + parseFloat($("#ResidualValueUnit").val().replace(/,/g, "")));
    $("#ROA").val(((parseFloat($("#NetIncomeWithVatTaxPerYear").val()) / parseFloat($("#AverageAsset").val())) * 100).toFixed(1));

    //Vat In
    $("#TotalPriceVatInUnit").val(total * $("#VatInUnit").val().replace(/,/g, ""));
    $("#TotalPriceVatInAccessories").val($("#QtyUnitForCompensationAccessories").val() * $("#VatInAccessories").val().replace(/,/g, ""));
    $("#TotalPriceVatInCarroserries").val($("#QtyUnitForCompensationCarroseries").val() * $("#VatInCarroserries").val().replace(/,/g, ""));
    $("#TotalPriceVatInAccessories2").val($("#QtyUnitForCompensationAccessories").val() * $("#VatInAccessories").val().replace(/,/g, ""));
    $("#TotalPriceVatInCarroserries2").val($("#QtyUnitForCompensationCarroseries").val() * $("#VatInCarroserries").val().replace(/,/g, ""));


    $("#VatInUnitTwo").val($("#VatInUnit").val().replace(/,/g, "") * total);
    $("#VatInCarroserriesTwo").val($("#VatInAccessories").val().replace(/,/g, "") * total);
    $("#VatInAccessoriesTwo").val($("#VatInCarroserries").val().replace(/,/g, "") * total);
    $("#VatInMaintenanceTwo").val($("#VatInMaintenance").val().replace(/,/g, "") * total);
    $("#TotalCompensation").val(parseFloat($("#VatInUnitTwo").val().replace(/,/g, "")) + parseFloat($("#VatInCarroserriesTwo").val().replace(/,/g, "")) + parseFloat($("#VatInAccessoriesTwo").val().replace(/,/g, "")) + parseFloat($("#VatInMaintenanceTwo").val().replace(/,/g, "")));
    //

    $("#TotalProfitAfterCompensation").val(Math.round(parseFloat($("#IncomeCost").val().replace(/,/g, "")) + parseFloat($("#TotalCompensation").val().replace(/,/g, ""))));
    if (isNaN($("#TotalProfitAfterCompensation").val())) {
        $("#TotalProfitAfterCompensation").val(0);
    }
    //TODO WillConfirm
    //$("#TotalProfitAfterCompensation").val($("#TotalVatInCannotCompByVatOutHidden").val());

    // Set thousand separator for disabled input text
    var thousandSeparatorField = $('span:contains("Rp")').next();
    ThousandSeparatorSetUp(thousandSeparatorField);
}

function reCountOSNetInvestment(isPrice, isRv, isNet) {

    $("input[name*='SkdNetInvestmentViewModels[0].Price']").val($("#TotalNetInvestment").val());
    $("input[name*='SkdNetInvestmentViewModels[0].Rv']").val($("#ResidualValueUnit").val());
    $("input[name*='SkdNetInvestmentViewModels[0].Net']").val($("input[name*='SkdNetInvestmentViewModels[0].Price']").val().replace(/,/g, "") - $("input[name*='SkdNetInvestmentViewModels[0].Rv']").val().replace(/,/g, ""));

    if (isPrice) {
        var totalPrice = 0;
        var qtyUnit = $("tr[class*='netInvestment']").each(function () {
            var netInvestmentPrice = $(this).find(".netInvestmentPrice").length;
            if (netInvestmentPrice != 0) {
                totalPrice += parseFloat($(this).find(".netInvestmentPrice").val().replace(/,/g, "").replace("", 0));
            }
        });

        $("#NTotalPrice").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
        $("#NTotalPrice").autoNumeric('set', totalPrice);
    }

    if (isRv) {
        var totalRv = 0;
        var qtyUnit = $("tr[class*='netInvestment']").each(function () {
            var netInvestmentPrice = $(this).find(".netInvestmentPrice").length;
            if (netInvestmentPrice != 0) {
                totalRv += parseFloat($(this).find(".netInvestmentRv").val().replace(/,/g, "").replace("", 0));
            }
        });

        $("#NTotalRv").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
        $("#NTotalRv").autoNumeric('set', totalRv);
    }

    if (isNet) {
        var totalNet = 0;
        var qtyUnit = $("tr[class*='netInvestment']").each(function () {
            var netInvestmentPrice = $(this).find(".netInvestmentPrice").length;
            if (netInvestmentPrice != 0) {
                totalNet += parseFloat($(this).find(".netInvestmentNet").val().replace(/,/g, ""));
            }
        });

        $("#NTotalNet").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMin: '-99999999999999999999', vMax: '99999999999999999999' });
        $("#NTotalNet").autoNumeric('set', totalNet);
    }

    // Set thousand separator for disabled input text
    var thousandSeparatorField = $('span:contains("Rp")').next();
    ThousandSeparatorSetUp(thousandSeparatorField);
}

function loadQuotationData() {
    // datatable
    var oTable = null;
    $('#quotation-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "Skd/OPLCalculationDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "QuotationNumber" },
                { "mData": "CustomerName" },
                { "mData": "Group" },
                { "mData": "ModelName" },
                {
                    "mData": "Qty",
                    "bSearchable": false,
                    "bSortable": false,
                },
				{
				    "mData": "MonthlyInstallment",
				    "bSearchable": false,
				    "bSortable": false,
				},
				{
				    "mData": "LeaseTerm",
				    "bSearchable": false,
				    "bSortable": false,
				},
                { "mData": "Address", "bVisible": false },
                { "mData": "SkdDate", "bVisible": false },
            ],
            "aoColumnDefs": [
                    { "sWidth": "15%", "aTargets": [1, 3] },
					{ "sClass": "text-right", "aTargets": [5, 6] }
            ],
            "bAutoWidth": false,
            "iDisplayLength": 8,
            "bLengthChange": false
        });
    });

    $("#quotation-list tbody").delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);

        $("#QuotationNumber").val(data.QuotationNumber);
        $("#CustomerName").val(data.CustomerName);
        $("#Group").val(data.Group);
        $("#Address").val(data.Address);
        $("#SkdDate").val(data.SkdDate);
        $("#PrevAgreementNumber").val(data.PrevAgreementNumber);
        $("#MaintenanceType").val(data.MaintenanceType);

        if ($("#MaintenanceType").val() === optNonMtn) {
            $("#SupplierName").val("");
            $("#IdSupplier").val("");
            $("#SupplierName").prop("readonly", true);
            $("button[data-target='#supplierMaintenanceModal']").prop("disabled", true);
        } else {
            $("#SupplierName").prop("readonly", false);
            $("button[data-target='#supplierMaintenanceModal']").prop("disabled", false);
        }

        $("#IdProduct").val(data.IdProduct);

        $("#IdOPLQuotation").val(data.IdOPLQuotation);

        $(".modName").val(data.ModelName);
        $(".modYear").val(data.ModelYear);
        $(".newUsed").val(data.NewUsed);
        $("[data-Qty-0]").val(data.Qty);
        $(".unitPrice").val(data.ProductPriceTotal);
        $("[data-TotalPricePer-0]").val(data.Qty * data.ProductPriceTotal);

        $("#productName").text(data.ModelName);

        counTotalCostOfProduct();

        //COMPENSATION VAT
        $("#QtyUnitForCompensationProduct").val(data.Qty);
        $("#VatInUnit").val(data.VatInUnit);
        $("#VatInAccessories").val(data.VatInAccessories);
        $("#VatInCarroserries").val(data.VatInCarroserries);
        $("#VatInMaintenance").val(data.CRVATInMaintenance);
        $("#TotalPriceVatInUnit").val(data.Qty * data.VatInUnit);
        $("#TotalPriceVatInAccessories").val(data.Qty * data.VatInAccessories);
        $("#TotalPriceVatInCarroserries").val(data.Qty * data.VatInCarroserries);
        $("#TotalPriceVatInAccessories2").val(data.Qty * data.VatInAccessories);
        $("#TotalPriceVatInCarroserries2").val(data.Qty * data.VatInCarroserries);
        $("#TotalCompensationVatInOfProduct").val(parseFloat($("#TotalPriceVatInUnit").val()) + parseFloat($("#TotalPriceVatInAccessories").val()) + parseFloat($("#TotalPriceVatInCarroserries").val()));
        $("#TotalNetInvestment").val(parseFloat($("#TotalCostOfProduct").val().replace(/,/g, "")) - parseFloat($("#TotalCompensationVatInOfProduct").val().replace(/,/g, "")));
        //End of COMPENSATION VAT

        //Operating Lease Income (For n Unit)
        //store data in hidden to be used on recalculation
        $("#ResidualValueAmountHidden").val(data.ResidualValueAmount);
        $("#LeaseTermHidden").val(data.LeaseTerm);
        $("#MonthlyInstallmentAmountHidden").val(data.MonthlyInstallmentAmount);
		
		$("#ProductPriceWithVAT").val(data.ProductPriceWithVAT);
        $("#NetInvestment").val($("#TotalNetInvestment").val());
        $("#ResidualValueUnit").val((data.ResidualValueAmount) * data.Qty);

        if (data.IsNewCalculation != null && data.IsNewCalculation) {
            $("#RVWithoutVat").html("Residual Value Without VAT");
            $("#ResidualValuePercentUnit").val((data.ResidualValuePercent).toFixed(6));
        } else {
            $("#RVWithoutVat").html("Residual Value With VAT");
            $("#ResidualValuePercentUnit").val((($("#ResidualValueUnit").val() / $("#NetInvestment").val()) * 100).toFixed(6));
        }

        if (isNaN($("#ResidualValuePercentUnit").val())) {
            $("#ResidualValuePercentUnit").val(0);
        }

        $("#LeaseTerm").val(data.LeaseTerm);
        $("#MonthlyOperatingLease").val(data.MonthlyInstallmentAmount * data.Qty);
        $("#Vat").val((10 / 100) * $("#MonthlyOperatingLease").val());
        $("#Billing").val(parseFloat($("#MonthlyOperatingLease").val()) + parseFloat($("#Vat").val()));
        $("#WithholdingTaxArt23").val((2 / 100) * $("#MonthlyOperatingLease").val());
        $("#NetPayment").val($("#Billing").val() - $("#WithholdingTaxArt23").val());
        //End of Operating Lease Income (For n Unit)

        if (data.IsNewCalculation) {
            $("#TextNewCalculation").removeAttr('hidden');
            $("#RVWithVat").html('Residual Value With VAT');
            $("#RVWithoutVat").html('Residual Value Without VAT');
        }

        // Income
        //store data in hidden to be used on recalculation
        $("#InsuranceCommisionAmountHidden").val(data.InsuranceCommisionAmount);
        $("#TotalInstallmentAmountHidden").val(data.TotalInstallment);
        $("#ATPMDiscountHidden").val(data.ATPMDiscount);
        $("#ResidualValueAmountHidden").val(data.ResidualValueAmount);
        $("#ResidualValueAmountIncomeHidden").val(data.ResidualValueAmountIncome);
        $("#TotalIncomeAmountHidden").val(data.TotalIncome);

        $("#InstallmentIncome").val(data.TotalInstallment * data.Qty);
        $("#InsuranceIncome").val(data.InsuranceCommisionAmount * data.Qty);
        $("#KtbDiscDirectToDsf").val(data.ATPMDiscount * data.Qty);
        $("#ResidualValue").val(data.ResidualValueAmountIncome * data.Qty);
        $("#TotalLeaseIncome").val(
            parseFloat($("#InstallmentIncome").val().replace(/,/g, "")) +
            parseFloat($("#InsuranceIncome").val().replace(/,/g, "")) +
            parseFloat($("#KtbDiscDirectToDsf").val().replace(/,/g, "")) +
            parseFloat($("#ResidualValue").val().replace(/,/g, ""))
        );
        // End of Income

        // Cost
        //store data in hidden to be used on recalculation
        $("#ProductPurchasePriceAmountHidden").val(data.ProductPurchasePrice);
        $("#RegistrationValueAmountHidden").val(data.RegistrationValueAmount);
        $("#SumMaintenanceCostAmountHidden").val(data.SumMaintenanceCost);
        $("#ReplacementCarAmountHidden").val(data.ReplacementCarAmount);
        $("#TotalGrossPremiumHidden").val(data.TotalGrossPremium);
        $("#MediatorFeeAmountHidden").val(data.MediatorFeeAmount);
        $("#TotalMobilizationFeeAmountHidden").val(data.TotalMobilizationFeeAmount);
        $("#TotalDemobilizationFeeAmountHidden").val(data.TotalDemobilizationFeeAmount);
        $("#InterestExpenseHidden").val(data.InterestExpense);
        $("#ProductPriceTotalHidden").val(data.ProductPriceTotal);
        $("#AccesoriesPriceTotalHidden").val(data.AccesoriesPriceTotal);
        $("#CarroserriePriceTotalHidden").val(data.CarroserriePriceTotal);
        $("#TermPaymentDaysHidden").val(data.TermPaymentDays);
        $("#BorrowingFlatPercentHidden").val(data.BorrowingFlatPercent);
        $("#InterestExpenseBASTHidden").val(data.InterestExpenseBAST);
        $("#InterestCostTopAmountHidden").val(data.InterestCostTop);
        $("#TotalCostAmountHidden").val(data.TotalCost);
        $("#VehicleListPrice").val(data.VehicleListPrice);
        $("#ProductPriceTotalCostHidden").val(data.ProductPriceTotalCost);

        $("#ProductPrice").val(parseFloat($("#TotalNetInvestment").val().replace(/,/g, "")));
        $("#Registration").val(data.RegistrationValueAmount * data.Qty);
        $("#IsNewCalculation").val(data.IsNewCalculation);
        if (data.MaintenanceConditionType == 172 || data.IsNewCalculation == true) {
            $("#Maintenance").val(data.SumMaintenanceCost * data.Qty);
        }
        else {
            $("#Maintenance").val(data.SumMaintenanceCost * data.Qty * 1.1);
        }

        $("#Replacement").val(data.ReplacementCarAmount * data.Qty);
        $("#InsuranceCost").val(data.TotalGrossPremium * data.Qty);
        $("#MediatorFee").val(data.TotalMobilizationFeeAmount * data.Qty);
        $("#Mobilization").val(data.MobilizationFeeAmount * data.Qty);
        $("#DeMobilization").val(data.TotalDemobilizationFeeAmount * data.Qty);
        $("#InterestCost").val(Math.floor(data.InterestExpense) * data.Qty);

        $("#TermofPaymentCost").val(data.InterestCostTop * data.Qty);
        $("#InterestCostBeforeBAST").val(data.InterestExpenseBAST * data.Qty);
        $("#TotalLeaseCost").val(
            parseFloat($("#ProductPrice").val().replace(/,/g, "")) +
            parseFloat($("#Registration").val().replace(/,/g, "")) +
            parseFloat($("#Maintenance").val().replace(/,/g, "")) +
            parseFloat($("#Replacement").val().replace(/,/g, "")) +
            parseFloat($("#InsuranceCost").val().replace(/,/g, "")) +
            parseFloat($("#MediatorFee").val().replace(/,/g, "")) +
            parseFloat($("#Mobilization").val().replace(/,/g, "")) +
            parseFloat($("#DeMobilization").val().replace(/,/g, "")) +
            parseFloat($("#InterestCost").val().replace(/,/g, "")) +
            parseFloat($("#TermofPaymentCost").val().replace(/,/g, "")) +
            parseFloat($("#InterestCostBeforeBAST").val().replace(/,/g, ""))
        );
        // End of Cost

        // Income Cost
        $("#IncomeCost").val(parseFloat($("#TotalLeaseIncome").val()) - parseFloat($("#TotalLeaseCost").val()));
        $("#NetIncomeWithVatTaxPerYear").val(parseFloat($("#IncomeCost").val().replace(/,/g, "")) / $("#LeaseTerm").val().replace(/,/g, "") * 12);
        $("#AverageAsset").val((((parseFloat($("#VehicleListPrice").val().replace(/,/g, ""))) - parseFloat($("#ResidualValueUnit").val().replace(/,/g, ""))) / 2) + parseFloat($("#ResidualValueUnit").val().replace(/,/g, "")));
        $("#ROA").val(((parseFloat($("#NetIncomeWithVatTaxPerYear").val()) / parseFloat($("#AverageAsset").val())) * 100).toFixed(1));
        // End of Income Cost

        $("#VatInUnitTwo").val($("#TotalPriceVatInUnit").val());
        $("#VatInCarroserriesTwo").val($("#TotalPriceVatInCarroserries").val());
        $("#VatInAccessoriesTwo").val($("#TotalPriceVatInAccessories").val());
        $("#VatInMaintenanceTwo").val(data.CRVATInMaintenance * data.Qty);
        $("#TotalCompensation").val(parseFloat(data.VatInUnit * data.Qty) + parseFloat(data.VatInCarroserries * data.Qty) + parseFloat(data.VatInAccessories * data.Qty) + parseFloat(data.CRVATInMaintenance * data.Qty));

        $("#TotalProfitAfterCompensation").val(parseFloat($("#IncomeCost").val().replace(/,/g, "")) + parseFloat($("#TotalCompensation").val().replace(/,/g, "")));

        //TODO Will confirm
        $("#TotalVatInCannotCompByVatOutHidden").val(data.TotalVatInCannotCompByVatOut);

        //$("#TotalProfitAfterCompensation").val(data.TotalVatInCannotCompByVatOut);
        // End of Compensation VAT IN with VAT OUT

        //
        $("#LandingRate").val(data.PrimeEffectivePercent.toFixed(6));
        $("#BorrowingRate").val(data.BorrowingEffectivePercent.toFixed(6));
        $("#SpreadRate").val(data.SpreadEffectivePercent.toFixed(6));
        $("#IRRWithoutCompensationVat").val(data.CRIRRWithoutCompVATIn);
        $("#IRRWithCompensationVat").val(data.CRIRRWithCompVATIn);
        //

        $("#PaymentMode").val(data.PaymentMode);

        // O/S Net Investment
        $("#SkdNetInvestmentCustomerName").val(data.CustomerName);
        $("#SkdNetInvestmentPrice_0").val($("#TotalNetInvestment").val());
        $("#SkdNetInvestmentRv_0").val($("#ResidualValueUnit").val());
        $("#SkdNetInvestmentNet_0").val($("#SkdNetInvestmentPrice_0").val() - $("#SkdNetInvestmentRv_0").val());
        // End of O/S Net Investment

        // hidden input for Accessories and Carrosseries      
        $('#Accessories').attr("value", data.Accessories);
        $('#Carroserrie').attr("value", data.Carroserrie);

        // Set thousand separator for accessories
        var accessories = $('#Accessories');
        ThousandSeparatorSetUp(accessories);
        // Set thousand separator for carroserrie
        var carroserrie = $('#Carroserrie');
        ThousandSeparatorSetUp(carroserrie);

        var countRowUnit = $("tr[class*='rowUnit']").length;

        var countRowAcc = $("tr[class*='rowAcc']").length;

        var countRowCarro = $("tr[class*='rowCarro']").length;

        var countSupplier = $('#flagDeleteSKDDtl > input#IdSupplier').length;

        //The data in Object lease should be reset and cleared for the second time and later.
        if ((countRowUnit > 1)) {
            for (index = countRowUnit - 1; index > 0; index--) {
                if (index != 0) {
                    $($("#mtable > tbody > .rowUnit")[index]).remove();
                }
            }
        }
        if (countRowAcc > 0) {
            $("#mtable > tbody > .rowAcc").remove();
        }
        if (countRowCarro > 0) {
            $("#mtable > tbody > .rowCarro").remove();
        }
        if (countSupplier > 0) {
            $('#flagDeleteSKDDtl > input').remove();
            createElementInputAfterChangeQuotation();
        }

        getOsNetInvestment(data.CustomerName);

        $('#quotationModal').modal('hide');
        $("#quotation-list tbody").undelegate("tr", "click");
    });
};

function getOsNetInvestment(customerName) {
    var param = JSON.stringify({ customerName: customerName });
    $.ajax({
        url: serverRoot + "Skd/GetOsNetInvestmentByCustomerName",
        type: 'POST',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#ntable tbody tr[class*="sameCustomer"]').remove();

            if (data.length != 0) {
                for (var index = 0; index < data.length; index++) {
                    var counterRow = getTotalRowOSNetInvestment();
                    var newTr = $('<tr class="netInvestment sameCustomer">' +
					'<td><input class="form-control" readonly="true" type="text" value="' + data[index].Description + '" name="SkdNetInvestmentViewModels[' + counterRow + '].Description"><input type="hidden" value="' + data[index].IdTb_MKT_SKDNetInvestment + '" name="SkdNetInvestmentViewModels[' + counterRow + '].IdTb_MKT_SKDNetInvestment"></td>' +
					'<td><input class="form-control" readonly="true" type="text" value="' + data[index].StatusDescription + '" name="SkdNetInvestmentViewModels[' + counterRow + '].StatusDescription"></td>' +
					'<td><input class="form-control" readonly="true" type="text" value="' + data[index].CustomerName + '" name="SkdNetInvestmentViewModels[' + counterRow + '].CustomerName"></td>' +
					'<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right netInvestmentPrice thousandSeparator" readonly="true" type="text" value="' + data[index].Price + '" name="SkdNetInvestmentViewModels[' + counterRow + '].Price" id="SkdNetInvestmentPrice_' + counterRow + '"></div></td>' +
					'<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right netInvestmentRv thousandSeparator" readonly="true" type="text" value="' + data[index].Rv + '" name="SkdNetInvestmentViewModels[' + counterRow + '].Rv" id="SkdNetInvestmentRv_' + counterRow + '"></div></td>' +
					'<td><div class="input-group"><span class="input-group-addon">Rp</span><input class="form-control text-right netInvestmentNet thousandSeparator" readonly="true" type="text" value="' + data[index].Net + '"  name="SkdNetInvestmentViewModels[' + counterRow + '].Net" id="SkdNetInvestmentNet_' + counterRow + '">' +
					'<span class="input-group-btn"><button disabled class="btn btn-info font-bold add_item fa fa-minus" type="button" id="deleteRow" onclick="deleteDataNet(' + index + ')"></button></span></div></td>' +
					'</tr>');

                    $($('#ntable tr')[counterRow]).after(newTr);
                }

                reCountOSNetInvestment(true, true, true);
            }

            // Set thousand separator for disabled input text
            var thousandSeparatorField = $('span:contains("Rp")').next();
            ThousandSeparatorSetUp(thousandSeparatorField);
        }
    });
}

function loadSupplier(rowNo) {
    // datatable
    var oTable = null;
    $('#supplier-lookup').each(function () {
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
                { "mData": "Address" },
                { "mData": "BusinessEconomySector" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });


    $("#supplier-lookup tbody").delegate("tr", "click", function () {
        var data = oTable.fnGetData(this);

        $(".supplierName_" + rowNo).val(data.SupplierName);
        $(".idSupplier_" + rowNo).val(data.IdSupplier);
        $(".supplierAddress_" + rowNo).val(data.Address);

        rowNo = "";

        $('#supplierModal').modal('hide');
    });
};

function loadSupplierMaintenance() {
    // datatable
    var oTable = null;
    $('#supplierMaintenance-lookup').each(function () {
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
                { "mData": "Address" },
                { "mData": "BusinessEconomySector" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });


    $("#supplierMaintenance-lookup tbody").delegate("tr", "click", function () {
        var data = oTable.fnGetData(this);

        $("#SupplierName").val(data.SupplierName);
        $("#IdSupplier").val(data.IdSupplier);

        $('#supplierMaintenanceModal').modal('hide');
    });
};

function deleteData(index) {
    document.getElementById('DeleteFlag[' + index + ']').value = true;
    //fill id supplier for don't catch exception validation 99999
    $('.idSupplier_' + index).val(99999);
    $('.QtyHidden_' + index).val(99999);
    $('.NameHidden_' + index).val("-");
}

function deleteDataNet(index) {
    document.getElementById('DeleteFlagNet[' + index + ']').value = true;
}

function createFlagStatusDeleteElement(counterRow) {

    var delFlag = $('.deleteFlag_' + counterRow).val();

    if (delFlag != null) {
        removeElement(document.getElementById("DeleteFlag[" + counterRow + "]"));
    }

    var deleteFlag = $('<input type="hidden" id="IdSKDDtl[' + counterRow + ']" class = "IdSKDDtl_' + counterRow + '" name="SkdDetailViewModels[' + counterRow + '].IdTb_MKT_SKD_Dtl" value=0 />\n' +
                       '<input id = "DeleteFlag[' + counterRow + ']" class = "deleteFlag_' + counterRow + '" type="hidden" name="SkdDetailViewModels[' + counterRow + '].IsDelete" value="False"/>\n' +
                        '<input name="SkdDetailViewModels[' + counterRow + '].IdSupplier" id="IdSupplier" class="idSupplier_' + counterRow + '" type="hidden" value="" />\n' +
						'<input name="SkdDetailViewModels[' + counterRow + '].Qty" id="QtyHidden_' + counterRow + '" class="QtyHidden_' + counterRow + '" type="hidden" value="0" />\n' +
						'<input name="SkdDetailViewModels[' + counterRow + '].Name" id="NameHidden_' + counterRow + '" class="NameHidden_' + counterRow + '" type="hidden" value="-" />\n');

    deleteFlag.appendTo('#flagDeleteSKDDtl');
}

function createFlagNetStatusDeleteElement(counterRow) {

    var delFlag = $('.deleteFlagNet_' + counterRow).val();

    if (delFlag != null) {
        removeElement(document.getElementById("DeleteFlagNet[" + counterRow + "]"));
    }

    var deleteFlag = $('<input type="hidden" id="IdSKDNet[' + counterRow + ']" name="SkdNetInvestmentViewModels[' + counterRow + '].IdTb_MKT_SKDNetInvestment" value=0 />' +
                       '<input id = "DeleteFlagNet[' + counterRow + ']" class = "deleteFlagNet_' + counterRow + '" type="hidden" name="SkdNetInvestmentViewModels[' + counterRow + '].IsDelete" value="False"/>');

    deleteFlag.appendTo('#flagDeleteSKDNet');
}

function createElementInputAfterChangeQuotation() {
    var deleteFlag = $('<input type="hidden" id="IdSKDDtl[0]" name="SkdDetailViewModels[0].IdTb_MKT_SKD_Dtl" value=0 />\n' +
                       '<input id="DeleteFlag[0]" type="hidden" name="SkdDetailViewModels[0].IsDelete" value="False" />\n');

    deleteFlag.appendTo('#flagDeleteSKDNet');
}

function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
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

function goToTop() {
    $('section[class*="scrollable"]').animate({
        scrollTop: 0
    }, 700);
}

function ShowNotification() {
    debugger
    if ($('.alert-danger').length != 0) {
        $('.alert-danger').remove();
    }
    var htmlAlert = '';
    var rowAccessories = $('tr[id="rAcc"]');
    var isCountAccessoriesValid = false;
    ThousandSeparatorSetUp($('#AccesoriesPriceTotalHidden'));
    var countLimitAccessories = $('#AccesoriesPriceTotalHidden').val();
    if (rowAccessories.length > 0) {
        var countAccessories = 0;
        for (index = 0; index < rowAccessories.length; index++) {
            var value = $(rowAccessories[index]).find('td:eq(4)').find('input').val().replace(/,/g, "");
            countAccessories += parseInt(value);
            if (countLimitAccessories != null && countAccessories > parseInt(countLimitAccessories.replace(/,/g, ""))) {
                break;
            }
        }

        if (countLimitAccessories != null && countAccessories != countLimitAccessories.replace(/,/g, "")) {
            isCountAccessoriesValid = false;
        } else {
            isCountAccessoriesValid = true;
        }
    } else {
        if (countLimitAccessories.replace(/,/g, "") > 0) {
            isCountAccessoriesValid = false;
        } else {
            isCountAccessoriesValid = true;
        }
    }

    var rowCarrosseries = $('tr[id="rCarro"]');
    var isCountCarrosseriesValid = false;
    ThousandSeparatorSetUp($('#CarroserriePriceTotalHidden'));
    var countLimitCarrosseries = $('#CarroserriePriceTotalHidden').val();
    if (rowCarrosseries.length > 0) {
        var countCarrosseries = 0;
        for (index = 0; index < rowCarrosseries.length; index++) {
            var value = $(rowCarrosseries[index]).find('td:eq(4)').find('input').val().replace(/,/g, "");
            countCarrosseries += parseInt(value);
            if (countLimitCarrosseries != null && countCarrosseries > parseInt(countLimitCarrosseries.replace(/,/g, ""))) {
                break;
            }
        }

        if (countLimitCarrosseries != null && countCarrosseries != countLimitCarrosseries.replace(/,/g, "")) {
            isCountCarrosseriesValid = false;
        } else {
            isCountCarrosseriesValid = true;
        }
    } else {
        if (countLimitCarrosseries.replace(/,/g, "") > 0) {
            isCountCarrosseriesValid = false;
        } else {
            isCountCarrosseriesValid = true;
        }
    }

    if (!isCountAccessoriesValid && !isCountCarrosseriesValid) {
        htmlAlert +=
                '<div class="alert alert-danger" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                    'The Unit Price of all Accessories should be equal Rp.' + countLimitAccessories + ' and The Unit Price of all Carrosserie should be equal Rp.' + countLimitCarrosseries +
				'</div>';
        $('form').before(htmlAlert);
        return false;
    }
    else {
        if (!isCountAccessoriesValid) {
            htmlAlert +=
                '<div class="alert alert-danger" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                    'The Unit Price of all Accessories should be equal Rp.' + countLimitAccessories +
			'</div>';
            $('form').before(htmlAlert);
            return false;
        }
        if (!isCountCarrosseriesValid) {
            htmlAlert +=
                '<div class="alert alert-danger" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                    'The Unit Price of all Carrosserie should be equal Rp.' + countLimitCarrosseries +
			'</div>';
            $('form').before(htmlAlert);
            return false;
        }
    }
    return true;
}

function ValidationRemarks() {
    if ($('.alert-danger').length != 0) {
        $('.alert-danger').remove();
    }
    var htmlAlert = '';
    var remarks = $('#Remarks').val();

    if (remarks == "" || remarks == null) {
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