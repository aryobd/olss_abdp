var counterRow = 0; 
$(function () {
    $('#addBuyer').click(function () {

        var page = $('div.pull-in > p').text();
        //var lastIndex = $('#flagDeleteBuyerDtl > input#Name').length;
        if (getTotalRowProduct() != null) {
        //    if (page == "Create Memo Pengajuan - Direct Selling") {
            counterRow = getTotalRowProduct();
        //    } else if (page == "Create Memo Pengajuan - Direct Selling") {
        //        counterRow = lastIndex;
        //    }
        } else {
            counterRow += 1;
        }

        var winnerInput = '';
        var winnerTd = '';
        if (page == "Create Memo Pengajuan - Car Ownership Program") {
            var winnerInput = 'value="true" checked="checked"';
            var winnerTd = ' hidden';
            var items = $("#IdTb_DIS_Agreement_0 option").length
            if (items == counterRow) {
                return false;
            }
        }

            var mAsset = $('#mtable tr').find('.IdTb_DIS_Agreement')[0].options;
            //var mDate = $('#mtable tr').find('.OfferPriceDate')[0].value;
            //var dDate = document.getElementById('OfferPriceDate');
            
            var i = 0;
            var sAssetCode = '';
            $.each(mAsset, function(){
                sAssetCode += '<option value="'+mAsset[i].value+'">'+mAsset[i].text+'</option>';
                i += 1;
            });
            
            var newTr = $('<tr class="rowUnit" id="rUnit">' +
                '<td><div class="input-group">' +
                '<input class="form-control mandatory Name" id="Name" type="text" name="DISBuyers[' + counterRow + '].Name" value="">' +
                '<span class="input-group-btn"><button class="btn btn-danger font-bold add_item fa fa-minus" id="deleteRow" type="button"></button></span>' +
                '</div></td>' +
                '<span class="field-validation-valid" data-valmsg-for="DISBuyers[' + counterRow + '].Name" data-valmsg-replace="true"></span>' +
                '<td><input class="form-control mandatory Address" id="Address" type="text" name="DISBuyers[' + counterRow + '].Address" value=""></td>' +
                '<td><input class="form-control KTP" id="KTP" maxlength="16" type="text" name="DISBuyers[' + counterRow + '].KTP" value=""></td>' +
                '<td><input class="form-control npwp" id="NPWP" type="text" name="DISBuyers[' + counterRow + '].NPWP" value=""></td>' +
                '<td><select class="form-control IdTb_DIS_Agreement" id="IdTb_DIS_Agreement_' + counterRow + '" name="DISBuyers[' + counterRow + '].IdTb_DIS_Agreement" onchange = "checkWinner(0)" value="">' + sAssetCode + '</select></td>' +
                '<td><input class="form-control mandatory OfferPriceAmount text-right numeric currency" onkeyup="countAmountToBePaid(' + counterRow + ')" id="OfferPriceAmount_' + counterRow + '" name="DISBuyers[' + counterRow + '].OfferPriceAmount" value=""></td>' +
                '<td><input type="text" id="AmountToBePaid_' + counterRow + '" class="form-control text-right AmountToBePaid" name="" readonly="readonly" /></td>' +
                '<td hidden><input class="form-control mandatory OfferPriceAmount text-right numeric currency" id="MobilisationFee_' + counterRow + '" name="DISBuyers[' + counterRow + '].MobilisationFee" value="0"></td>' +
                '<td hidden><input class="form-control mandatory OfferPriceAmount text-right numeric currency" id="AuctionFee_' + counterRow + '" name="DISBuyers[' + counterRow + '].AuctionFee" value="0"></td>' +
                '<td hidden><input class="form-control mandatory OfferPriceAmount text-right numeric currency" id="Ppn_' + counterRow + '" name="DISBuyers[' + counterRow + '].Ppn" value="0"></td>' +
                '<td hidden><input class="form-control mandatory OfferPriceAmount text-right numeric currency" id="Pph_' + counterRow + '" name="DISBuyers[' + counterRow + '].Pph" value="0"></td>' +
                '<td'+winnerTd+'><input class="form-control Winner" type="checkbox" onchange="checkWinner(' + counterRow + ')" id="Winner_' + counterRow + '" name="DISBuyers[' + counterRow + '].Winner" value="true" '+winnerInput+' /></td>' +
                '</tr>');
        
            $("tr[class*='rowUnit']").last().after(newTr);
        
        return false;
    });

    $("#mtable").on('click', '#deleteRow', function () {

        $(this).parent().parent().parent().parent().remove();
    });

    //$(document).on('keyup', ".OfferPriceAmount", formatCurrency);

    $(document).on('keyup', ".currency", formatCurrency);

    $(document).on("focus", ".datepicker", function () {
        $(this).datepicker({ dateFormat: 'dd MMM yyyy' });
    });

    $(document).on("focus", ".npwp", function () {
        $('.npwp').mask("99-999-999-9-999-999");
    });
});

$(document).ready(function () {
    $(".datepicker").datepicker({ dateFormat: 'dd MMM yyyy' });
    $('.npwp').mask("99-999-999-9-999-999");
    $('.faktur').mask("999.99-999.99999999");
});

//only 1 winner for 1 asset 
function checkWinner(param) {
    
    var table = document.getElementById("mtable");
    var initCb = document.getElementById("Winner_" + param);
    for (var i = 0, row; row = table.rows[i]; i++) {
        if (initCb.checked && i != param && document.getElementById("IdTb_DIS_Agreement_" + i).value == document.getElementById("IdTb_DIS_Agreement_" + param).value) {
            document.getElementById("Winner_" + i).checked = false;
        }
    }
}

$(".currency").keyup(formatCurrency);
$('.currency').focusout(function () {
            if ($(this).val() == "") { $(this).val(0); }
        });

$(".chb").change(function () {
    var id = $(this).attr('id');
    var no = id.substring(id.indexOf('_') + 1);
    var cont = true;
    
    if ((id == 'IsPaid_' + no) && ($("#buyerName_" + no).val() == "" || $("#offerPrice_" + no).val() == "")) {
        alert('Please complete "Buyer Name" and "To be Paid" of this asset!');
        $("#IsPaid_" + no).prop('checked', false);
        cont = false;
    }

    if (cont == true)
    {
        if (id == 'IsPaid_' + no) {
            if (!$("#IsPaid_" + no).is(':checked')) {
                $("#NetReceived_" + no).attr("disabled", "disabled");
                $("#PaymentDate_" + no).attr("disabled", "disabled");
                $("#NetReceived_" + no).val(0);
            } else {
                $("#IsCanceled_" + no).prop('checked', false);
                $("#NetReceived_" + no).removeAttr("disabled");
                $("#PaymentDate_" + no).removeAttr("disabled");
                $("#CancelledReason_" + no).attr("disabled", "disabled");
                $("#CancelledReason_" + no).val('');
                $("#NetReceived_" + no).val($("#TotalOverdue_" + no).val());
            }
        } else if (id == 'IsCanceled_' + no) {
            if (!$("#IsCanceled_" + no).is(':checked')) {
                $("#CancelledReason_" + no).attr("disabled", "disabled");
                $("#CancelledReason_" + no).val('');
            } else {
                $("#IsPaid_" + no).prop('checked', false);
                $("#NetReceived_" + no).attr("disabled", "disabled");
                $("#PaymentDate_" + no).attr("disabled", "disabled");
                $("#NetReceived_" + no).val(0);
                $("#CancelledReason_" + no).removeAttr("disabled");
            }
        }
    }
    
});

//only 1 buyer for 1 asset 
function regenerateAsset(param) {

}

function thousandSeparator(param) {
    param.each(function () {
        $(this).autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
    });
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


// For adding thousand separator into input text
// parameter: jquery input object
function AddThousandSeperator2(jInputControl) {
    var lastPos = jInputControl[0].selectionStart;
    var lastSep = jInputControl.val().split('.').length - 1;
    var num = jInputControl.val().replace(/,/gi, "").split("").reverse().join("");
    var arr = num.split(".");
    if (arr.length > 1) {
        var before = arr[1];
        var temp = RemoveRougeChar(before.replace(/(.{3})/g, "$1,").split("").reverse().join(""));
        var num2 = temp + '.' +arr[0];
    } else {
        var before = arr[0];
        var num2 = RemoveRougeChar(before.replace(/(.{3})/g, "$1,").split("").reverse().join(""));
    }
    
    
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

$('.calculate').keyup(function () {

    // initialize the sum (total price) to zero
    var sum = 0;

    // we use jQuery each() to loop through all the textbox with 'price' class
    // and compute the sum for each loop
    $('.price').each(function () {
        sum += Number($(this).val());
    });

    // set the computed value to 'totalPrice' textbox
    $('#totalPrice').val(sum);

});


//countTotalPricePer
function countAmountToBePaid(counterRow) {
    var offer = document.getElementById('OfferPriceAmount_' + counterRow).value;
    var ppn = (parseFloat(offer.replace(/,/g, ""))) * 0.1;
    var toBePaid = parseFloat(offer.replace(/,/g, "")) + ppn;
    var toBePaidFormat = toBePaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (offer == "") {
        document.getElementById('AmountToBePaid_' + counterRow).value = 0;
    } else {
        document.getElementById('AmountToBePaid_' + counterRow).value = toBePaidFormat
    }
}

function countAuctionFee(counterRow) {
    var mobilisationFee = document.getElementById('MobilisationFee_' + counterRow).value;
    var auctionFee = document.getElementById('AuctionFee_' + counterRow).value;
    if (mobilisationFee == '') { mobilisationFee = 0; }
    if (auctionFee == '') { auctionFee = 0; }
    
    var adminFee = ((parseFloat(mobilisationFee.replace(/,/g, ""))) + (parseFloat(auctionFee.replace(/,/g, "")))) * 0.06;
    var ppn = ((parseFloat(mobilisationFee.replace(/,/g, ""))) + (parseFloat(auctionFee.replace(/,/g, "")))) * 0.1;
    var pph = ((parseFloat(mobilisationFee.replace(/,/g, ""))) + (parseFloat(auctionFee.replace(/,/g, "")))) * 0.02;
    
    var nAdminFee = Math.round(adminFee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var nPpn = Math.round(ppn).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var nPph = Math.round(pph).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById('AdminFee_' + counterRow).value = nAdminFee;
    document.getElementById('Ppn_' + counterRow).value = nPpn;
    document.getElementById('Pph_' + counterRow).value = nPph;
}

function countOfferPrice(counterRow) {
    var paid = document.getElementById('AmountToBePaid_' + counterRow).value;
    var offerPrice = parseFloat(paid.replace(/,/g, "")) / 1.1;
    var offerPriceFormat = (Math.round(offerPrice * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    if (paid == ""){
        document.getElementById('OfferPriceAmount_' + counterRow).value = 0;
    } else {
        document.getElementById('OfferPriceAmount_' + counterRow).value = offerPriceFormat;
    }
}

function checkpayment(param) {
    var page = $('div.pull-in > p').text();

    var payment = parseFloat($('#NetReceived_' + param).val().replace(/\,/g, ''));
    var balance = parseFloat($('#TotalOverdue_' + param).val().replace(/\,/g, ''));

    if (page == "Detail Memo Pengajuan - Auction")
    {
        if (payment != balance) {
            alert('Payment should not less or more than total net received');
            $('#NetReceived_' + param).val($('#TotalOverdue_' + param).val());
        }
    }
    else
    {
        if (payment > balance) {
            alert('Payment should not more than total net received');
            $('#NetReceived_' + param).val($('#TotalOverdue_' + param).val());
        }
    }
}

function deleteData(index) {
    document.getElementById('DeleteFlag[' + index + ']').value = true;
}

function createFlagStatusDeleteElement(counterRow) {

    var delFlag = $('.deleteFlag_' + counterRow).val();

    if (delFlag != null) {
        removeElement(document.getElementById("DeleteFlag[" + counterRow + "]"));
    }

    var deleteFlag = $('<input type="hidden" id="IdTb_DIS_Agreement_[' + counterRow + ']" class = "IdTb_DIS_Agreement_' + counterRow + '" name="DISAgreementListBuyers[' + counterRow + '].IdTb_DIS_Agreement" value=0 />\n')

    deleteFlag.appendTo('#flagDeleteBuyerDtl');
}

function qtyNumeric() {
        $(".qtyNum").autoNumeric('init', { lZero: 'deny', aSep: '', mDec: 0 });
}

function formatCurrency(counterRow) {
    thousandSeparator2($(".currency"));
}

var loadAgreementCount = 0;

function LoadAgreementList() {
    //datatable 
    var oTable = null;
    $('#agreement-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "DISAssetSelling/DISAgreementList",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "Branch" },
                { "mData": "AgreementNumber" },
                { "mData": "CustomerName" },
                { "mData": "StatusDescription" }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#agreement-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        $('#Branch').val(data.Branch == null ? '' : data.Branch);
        $('#AgreementNumber').val(data.AgreementNumber == null ? '' : data.AgreementNumber);
        $('#CustomerName').val(data.CustomerName == null ? '' : data.CustomerName);
        $('#StatusDescription').val(data.StatusDescription == null ? '' : data.StatusDescription);

        $('#agreementModal').modal('hide');
        $('#agreement-list tbody').undelegate("tr", "click");
    });

    if (window.loadAgreementCount == 1) {
        oTable.fnFilter('');
    }

};

var loadDisposalCount = 0;

function LoadDisposalList() {
    // datatable
    var oTable = null;
    $('#disposal-list').each(function () {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "asc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "DISAgreement/DISAgreementListInfo",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "DisposalNumber" },
                { "mData": "CustomerName" },
                { "mData": "AgreementNumber" },
                { "mData": "ModelName" },
                { "mData": "EngineNumber" },
                { "mData": "Remarks" },
                { "mData": "CreatedBy" },
                { "mData": "CreatedDate" }

            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $('#disposal-list tbody').delegate("tr", "click", function () {

        var data = oTable.fnGetData(this);
        $('#DisposalNumber').val(data.DisposalNumber == null ? '' : data.DisposalNumber);
        $('#CustomerName').val(data.CustomerName == null ? '' : data.CustomerName);
        $('#AgreementNumber').val(data.AgreementNumber == null ? '' : data.AgreementNumber);
        $('#ModelName').val(data.ModelName == null ? '' : data.ModelName);
        $('#EngineNumber').val(data.EngineNumber == null ? '' : data.EngineNumber);
        $('#Remarks').val(data.Remarks == null ? '' : data.Remarks);
        $('#CreatedBy').val(data.CreatedBy == null ? '' : data.CreatedBy);
        $('#CreatedDate').val(data.CreatedDate == null ? '' : data.CreatedDate);
        
        $('#disposalModal').modal('hide');
        $('#disposal-list tbody').undelegate("tr", "click");
        
        if ($('#memotype').val() == 1) {
            document.getElementById('contBtn').href = "../../DISAssetSelling/AddDirectSelling/" + data.DisposalNumber;
        }
        else if ($('#memotype').val() == 2) {
            document.getElementById('contBtn').href = "../../DISAssetSelling/AddCarOwnershipProgram/" + data.DisposalNumber;
        }
        else if ($('#memotype').val() == 3) {
            document.getElementById('contBtn').href = "../../DISAssetSelling/AddAuction/" + data.DisposalNumber;

        } else if ($('#memotype').val() == 4) {
            document.getElementById('contBtn').href = "../../DISAssetSelling/AddWriteOff/" + data.DisposalNumber;

        } else {
            document.getElementById('contBtn').href = "#";
        }
        document.getElementById("alert").hidden = true;
    });

    if (window.loadDisposalCount == 1) {
        oTable.fnFilter('');
    }
};

function clearLink() {
    document.getElementById('contBtn').href = "#";
    $('#DisposalNumber').val(null);
    document.getElementById("alert").hidden = true;
}

$('#contBtn').click(function () {
    if (document.getElementById("memotype").value == '') {
        document.getElementById("alert").hidden = false;
    }
    if ($('#DisposalNumber').val() == '') {
        document.getElementById("alert").hidden = false;
    }
});


$(document).ready(function () {
    $('.readonly').find('input', 'button', 'checkbox').attr('disabled', true);
    var results = new RegExp('[\?&]' + 'tab' + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        var value = (decodeURI(results[1]) || 0);
        if (value == 'payment') {
            $("#payment").tab("show");
        }
    }
});

function getTotalRowProduct() {
    return countRowUnit = $("tr[class*='rowUnit']").length;
}

// This must be applied to a form (or an object inside a form).
jQuery.fn.addHidden = function (name, value) {
    return this.each(function () {
        var input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        $(this).append($(input));
    });
};

//Confirmation Modal
$('input[name="statusButton"]').on('click', function (e) {
    var submitvalue = $(this).val();
    var msg = '';
    if (submitvalue === 'Save as Draft') {
        msg = 'Save';
    } else if (submitvalue === 'Submit') {
        msg = 'Submit';
    } else if (submitvalue === 'Save and Generate') {
        msg = 'Generate';
    } else if (submitvalue === 'Approve') {
        msg = 'Approve';
    } else if (submitvalue === 'Reject') {
        msg = 'Reject';
    } else if (submitvalue === 'Revise') {
        msg = 'Revise';
    } else if (submitvalue === 'Sign') {
        msg = 'Sign';
    }

    $('#msgModal').text(msg);
    $('#submitButtonText').val(submitvalue);

    $('#msgModal').text(msg);
    $('#submitButtonText').val(submitvalue);
});
$('#confirmModal').click(function (e) {
    var submitvalue = $('#submitButtonText').val();
    $('form:first').addHidden('statusButton', submitvalue).trigger('submit');
    $(this).prop('disabled', true);
});
$(document).ready(function () {

    //change type submit to button to provide modal popup
    $('input[name="statusButton"]').attr('type', 'button').attr('data-toggle', 'modal').attr('data-target', '#confirmationModal');
});

function thousandSeparator2(param) {
    param.each(function () {
        let v = $(this).val();

        v = v.replace(/[^-\d]/g, '');
        v = v.replace(/(\d{3,3})$/g, ',$1');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        v = v ? v : '';
        //if (v = ',0') { v = 0 }
        $(this).val(v);

    });
}

function Done() {
    $('#auctionHistory').modal('show');
}
//Add by fadilah 26/11/2019
function popupJualBeli() {
    $('#updateJualBeli').modal('show');
}
//end by fadilah 26/11/2019

//Add by fadilah S0200996 29/04/2020
function popupDispEmp() {
    $('#updateDispEmp').modal('show');
    
}
//end by fadilah 29/04/2020

////////// Term and Condition /////////////

$(function () {
    //Preview text area
    var targetTextArea = "Preview";
    var sourceInputTextNames = ["TermDescFirst", "DefaultValue", "TermDescSecond"];
    
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

function LoadTermCondList(idOPLAgreement, idSupplier) {
    $.ajax(
        {
            url: serverRoot + "DISAssetSelling/LoadTermCondList",
            type: "GET",
            //data: "idOPLAgreement=" + idOPLAgreement + "&idSupplier=" + idSupplier,
            dataType: 'json',
            success: function (data) {
                RenderTermAndCondsListTableData(data);
            }
        });
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
                               "<div class='input-group'><input class='form-control' readonly ='readonly' type='text' id='MemoTermConditions_{0}__TermDescFirst' name='MemoTermConditions[{0}].TermDescFirst' value='{2}'/><span class='input-group-btn'>" +
                                   "<button class='btn btn-white' data-toggle='modal' data-target='#termConditionModal' type='button' onclick='LoadTermAndCondition({0})'>...</button></span>" +
                               "</div>" +
                            "</td>";

    var termDescSecond = "<td style = 'display:none'><input class='form-control' type='text' id='MemoTermConditions_{0}__IdTb_DIS_MemoTerm' name='MemoTermConditions[{0}].IdTb_DIS_MemoTerm' value='{4}'/></td>" +
                         "<td style = 'display:none'><input class='form-control' type='text' id='MemoTermConditions_{0}__RemarksSys' name='MemoTermConditions[{0}].RemarksSys' value='{5}'/></td>" +
                          "<td class='text-center'><span class='input-group-btn'><button onclick='deleteRowTerm({0})' class='btn btn-danger font-bold fa fa-minus' type='button'></button></span></td>" +
                          "</tr>";


    $.each(termAndConditionList, function (i, data) {

        parameter = "<td><input class='form-control' type='text' id='MemoTermConditions_{0}__DefaultValue' name='MemoTermConditions[{0}].DefaultValue' value='{3}' /></td>";
        formatRowTermAndConds = termDescFirst + parameter + termDescSecond;
        tableContent += formatRowTermAndConds.format(i, (i + 1), data.TermDescFirst, data.DefaultValue, data.IdTb_DIS_MemoTerm, data.RemarksSys);
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

function AddTerm() {
    var countRowTerm = $("tr[class*='rowTerm']").length;
    var newTr = $('' +
        '<tr class="rowTerm" id="row_' + countRowTerm + '">' +

            '<td>' +
                '<input data-val="true" id="MemoTermConditions_' + countRowTerm + '__IdTb_DIS_MemoTerm" name="MemoTermConditions[' + countRowTerm + '].IdTb_DIS_MemoTerm" type="hidden" value=""/>' +
                    '<div class="input-group">' +
                    '<input class="form-control" readonly="readonly" id="MemoTermConditions_' + countRowTerm + '__TermDescFirst" name="MemoTermConditions[' + countRowTerm + '].TermDescFirst" type="text" value="">' +
                    '<span class="input-group-btn">' +
                        '<button class="btn btn-white" data-toggle="modal" data-target="#termConditionModal" type="button" onclick="LoadTermAndCondition(' + countRowTerm + ')">...</button>' +
                    '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<input class="form-control" data-val="true" id="MemoTermConditions_' + countRowTerm + '__DefaultValue" name="MemoTermConditions[' + countRowTerm + '].DefaultValue" type="text" value="">' +
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

function deleteRowTerm(rowId) {
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
    var inputIdTbProPOTermList = $(tableSelector).find("input[name*='.IdTb_DIS_MemoTerm']");
    var inputRemarksSysList = $(tableSelector).find("input[name*='.RemarksSys']");
    var length = inputTermDescFirstList.length;
    var data = { TermAndCondList: [] };

    for (var i = 0; i < length; i++) {
        var obj = {};

        obj.TermDescFirst = $(inputTermDescFirstList[i]).val();
        obj.DefaultValue = $(inputDefaultValueList[i]).val();
        obj.IdTb_DIS_MemoTerm = $(inputIdTbProPOTermList[i]).val();
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
            "sAjaxSource": serverRoot + "DISAssetSelling/TermAndConditionDataTable",
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

        if (termAndConditionIsExist(data.IdTb_DIS_MemoTerm)) {
            $('#termConditionModal').modal('hide');
            $('#termCondition-list tbody').undelegate("tr", "click");

            return false;
        }

        $('#MemoTermConditions_' + id + '__IdTb_DIS_MemoTerm').val(data.IdTb_DIS_MemoTerm == null ? '' : data.IdTb_DIS_MemoTerm);
        $('#MemoTermConditions_' + id + '__TermDescFirst').val(data.TermDescFirst == null ? '' : data.TermDescFirst);
        $('#MemoTermConditions_' + id + '__DefaultValue').val(data.DefaultValue == null ? '' : data.DefaultValue);

        $('#termConditionModal').modal('hide');
        $('#termCondition-list tbody').undelegate("tr", "click");

    });
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

    var filterText = function (text) {
        return text;
    };

    $.each(sourceInputTextNames, function (i, n) {
        var val = $("input[type='text'][name='" + n + "']").val();
        text += filterText(val) + limiter;
    });

    $("textarea[name='" + targetTextArea + "']").html(text);
}

//Add by Fadilah 16/12/2019
function UpdateJualBeli() {
    var modalData = {};
    var RepresentativeName = $("#RepName").val();
    var RepresentativePosition = $("#RepPosition").val();
    var ReportType = $("#ReportType").val();
    var IdTb_DIS_AssetSelling = $("#IdTb_DIS_AssetSelling").val();
    var PJBNo = $("#PJBNo").val();
    var IdPJB = $("#IdPJB").val();
    var sbtMonth = $("#sbtMonth").val();
    var sbtYear = $("#sbtYear").val();
    var CreatedBy = $("#CreatedBy").val();
    var CreatedDate = $("#CreatedDate").val();
    var listBPKBName = [];
    var $table = $('.configuration-table');

    modalData["RepresentativeName"] = RepresentativeName;
    modalData["RepresentativePosition"] = RepresentativePosition;
    modalData["ReportType"] = ReportType;
    modalData["IdTb_DIS_AssetSelling"] = IdTb_DIS_AssetSelling;
    modalData["PJBNo"] = PJBNo;
    modalData["IdPJB"] = IdPJB;
    modalData["sbtMonth"] = sbtMonth;
    modalData["sbtYear"] = sbtYear;
    modalData["CreatedBy"] = CreatedBy;
    modalData["CreatedDate"] = CreatedDate;
    modalData["ListBPKBName"] = listBPKBName;

    $table.find('tbody tr').each(function () {
        var rowValues = {};
        $(this).find('td input').each(function (i) {
            if (i == 0) {
                rowValues["IdTb_OPL_Unit"] = $(this).val();
            } else if (i == 1) {
                rowValues["BPKBName"] = $(this).val();
            } else if (i == 2) {
                rowValues["CreatedBy"] = $(this).val();
            } else if (i == 3) {
                rowValues["CreatedDate"] = $(this).val();
            } else if (i == 4) {
                rowValues["IdPJB_BPKB"] = $(this).val();
            }
        });
        listBPKBName.push(rowValues);
    });

    $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(modalData),
            url: serverRoot + "DISAssetSelling/UpdateJualBeli",
            success: function (response) {
                $('#updateJualBeli').modal('hide');
            }
        });
}
//End by Fadilah 16/12/2019

//Add by Fadilah 16/12/2019
function UpdateDispEmp() {
    var modalData = {};
    var HeadOfBranch = $("#HeadOfBranch").val();
    var RegionalManager = $("#RegionalManager").val();
    var IdTb_DIS_AssetSellingDetail = $("#IdTb_DIS_AssetSellingDetail").val();
    var IdDispApprovalEmp = $("#IdDispApprovalEmp").val();
    var CreatedBy = $("#CreatedBy").val();
    var CreatedDate = $("#CreatedDate").val();

    modalData["HeadOfBranch"] = HeadOfBranch;
    modalData["RegionalManager"] = RegionalManager;
    modalData["IdTb_DIS_AssetSellingDetail"] = IdTb_DIS_AssetSellingDetail;
    modalData["IdDispApprovalEmp"] = IdDispApprovalEmp;
    modalData["CreatedBy"] = CreatedBy;
    modalData["CreatedDate"] = CreatedDate;

    $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(modalData),
            url: serverRoot + "DISAssetSelling/UpdateDispEmp",
            success: function (response) {
                $('#updateDispEmp').modal('hide');
            }
        });
}
//End by Fadilah 16/12/2019

function AddNewTermCondition() {
    var modalInput = "#addNewTermCondModal input[type='text'], [type='radio']:checked,[type='checkbox']:checked";
    var modalData = {};

    var inputElements = $(modalInput);

    $.each(inputElements, function (i, element) {
        var name = $(element).attr("name");
        var value = $(element).val();

        modalData[name] = value;
    });

    $.ajax(
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(modalData),
            url: serverRoot + "DISAssetSelling/AddNewTermCondition",
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
    var values = $("input[id*='__IdTb_DIS_MemoTerm']:not([id*=Original])").
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

function UpdateTermAndConditionList() {
    //Remove success message
    $('#termCondSuccessUpdated').remove();

    var tableSelector = "#term-table tbody";
    var inputIdTbProPOTermList = $(tableSelector).find("input[name*='.IdTb_DIS_MemoTerm']");
    var inputDefaultValueList = $(tableSelector).find("input[name*='.DefaultValue']");
    var idPO = $("input[id='IdTb_PRO_PO']").val();

    var length = inputDefaultValueList.length;
    var data = { TermAndCondList: [], IdPO: idPO };

    for (var i = 0; i < length; i++) {
        var obj = {};
        obj.IdTb_DIS_MemoTerm = $(inputIdTbProPOTermList[i]).val();
        obj.DefaultValue = $(inputDefaultValueList[i]).val();

        data.TermAndCondList.push(obj);
    }

    $.ajax(
    {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        url: serverRoot + "DISAssetSelling/UpdateTermAndConditionList",
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

//Update Firman 02122019 - S0147214
function counTotalNetReceive() {
    var total = 0;

    $('.netReceived').each(function () {
        var value = $(this).val().replace(/,/g, "");
        total += parseFloat(value);
    });

    $("#totalNetReceived").autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '999999999999999999.99' });
    $("#totalNetReceived").autoNumeric('set', total);
}
