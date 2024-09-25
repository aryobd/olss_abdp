var complementDocumentInfo = [];
var complementDocumentInfoReport = [];
var isComplementDocumentExist = false;
var lastRowIndex = 0;

// This must be applied to a form (or an object inside a form).
jQuery.fn.addHidden = function(name, value) {
    return this.each(function() {
        var input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        $(this).append($(input));
    });
};

$('#addComplement button:eq(0), #addComplement button:eq(2)').click(function() {
    $('#btnSave').removeAttr("data-target");
});

$('#confirmModal').click(function(e) {
    var messageConfirmation = $('.msg-modal').text();
    if (messageConfirmation == 'Update') {
        var isValid = false;

        isValid = IsComDocValid();
        if (isValid == false) {
            $('#confirmationModal').modal('toggle');
            if ($('.alert').length != 0) {
                $('.alert').remove();
            }
            return isValid;
        }

        ComplementDocumentUpdate();

        var submitvalue = $('input[name="statusButton"]').val();
        $('form:first').addHidden('statusButton', submitvalue).trigger('submit');
    }
    else {
        $('span[data-valmsg-for="NewDocumentName"]').removeClass("field-validation-error").addClass("field-validation-valid");
        $('#addComplement, #confirmationModal').modal('hide');
        AddComplementDocumentList();
    }

    $(this).prop('disabled', true);
});

$('button#btnSave').click(function() {
    var documentName = $('#txtAddDocName').val().trim();
    $('button#btnSave').removeAttr("data-target");
    if (documentName != "") {
        var message = 'add this new complement document';
        $('.msg-modal').text(message);
        $('button#btnSave').attr("data-target", "#confirmationModal");
        $('#confirmModal').removeAttr("disabled");
    }
    else {
        $('button#btnSave').attr("data-dismiss", "");
        $('span[data-valmsg-for="NewDocumentName"]').removeClass("field-validation-valid").addClass("field-validation-error");
        $('span[data-valmsg-for="NewDocumentName"]').text("The Document Name field is required.");
    }
});

$('#btnUpdate').click(function() {
    var message = $(this).val();
    $('.msg-modal').text(message);
    $('#confirmModal').removeAttr("disabled");
});

$('.datepicker').datepicker({
    format: 'mm/dd/yyyy'
});

$(document).on('focus', ".dateappend", function() { //bind to all instances of class "dateappend".
    $(this).datepicker({
        format: 'mm/dd/yyyy'
    });
});

// Reset all fields on Add Complement Document List modal
$('input#buttonAdd').click(function() {
    $(".js-example-placeholder-single").select2("val", "");
    $('#txtAddDocCode, #txtAddDocName, #NewReceiveDate, #NewDueDate, #NewRemarks').val("");
    $('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').prop("checked", false);
    $('#NewDueDate, #NewReceiveDate, #NewRemarks').prop("disabled", true);
    $('span[data-valmsg-for="NewDocumentName"]').prop("class", "field-validation-valid");
    $("#rbAddRow").find("input").prop("disabled", true);
});

$(".js-example-placeholder-single").select2({
    placeholder: "",
    allowClear: true
});

$(".js-example-placeholder-single").on("change", function(e) {
    var selectedCategory = $(".js-example-placeholder-single").select2("val");

    if (selectedCategory != "") {
        $("#rbAddRow").find("input").prop("disabled", false);
    }
    else {
        $('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').prop("checked", false);
        $("#rbAddRow").find("input").prop("disabled", true);
        $('#NewDueDate, #NewReceiveDate, #NewRemarks').val("");
        $('#NewDueDate, #NewReceiveDate,#NewRemarks').prop("disabled", true);
    }
});

function AddComplementDocumentList() {
    var rowCategory = $('#Category').val();
    var htmlComDoc = '';
    lastRowIndex++;
    var docIdList = jQuery.map(complementDocumentInfo, function(n, i) {
        return n.DocId;
    });
    var lastDocId = Math.max.apply(Math, docIdList);
    lastDocId++;

    if (rowCategory != "") {
        //disabled delete button for all top parent
        //if ($('td[style="display: block;"]').val() != null) {
        //    $('td[style="display: block;"]').prev().attr("colspan", "10");
        //    $('td[style="display: block;"]').attr("style", "display: none;");
        //}

        var DocCode = 0;

        for (index = 0; index < complementDocumentInfo.length; index++) {
            if (complementDocumentInfo[index].DocId == rowCategory) {
                if (complementDocumentInfo[index].LastChild != 0) {
                    //Auto numbering for No column in complement document list table
                    for (indexComp = 0; indexComp < complementDocumentInfo.length; indexComp++) {
                        if (complementDocumentInfo[indexComp].DocId == complementDocumentInfo[index].LastChild) {
                            if (complementDocumentInfo[indexComp].DocCode != "") {
                                DocCode = parseInt(complementDocumentInfo[indexComp].DocCode) + 1;
                            }
                            else {
                                DocCode = 1;
                            }
                            break;
                        }
                    }
                }
                else {
                    DocCode = 1;
                }
                break;
            }
        }

        htmlComDoc +=
        '<tr rowComDoc="' + lastRowIndex + '">' +
            '<td>' +
                '<p class="form-control-static" id="DocCode-' + lastRowIndex + '">' + DocCode + '</p>' +
            '</td>' +
            '<td>' +
                '<p class="form-control-static" id="DocDesc-' + lastRowIndex + '">' + $('#txtAddDocName').val() + '</p>' +
            '</td>' +
            '<td>' +
                '<div class="radioPositionCenter">' +
                    '<label><input id="NotAvailable" type="radio" name="group_' + lastRowIndex + '" onclick="StatusDocumentSettingListView(' + lastRowIndex + ')"' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() == "Not Available" ? "checked" : "") + '></label>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="radioPositionCenter">' +
                    '<label><input id="Pending" type="radio" name="group_' + lastRowIndex + '" onclick="StatusDocumentSettingListView(' + lastRowIndex + ')"' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() == "Pending" ? "checked" : "") + '></label>' +
                '</div>' +
                '<span class="field-validation-valid" data-valmsg-for="group_' + lastRowIndex + '" data-valmsg-replace="true"></span>' +
            '</td>' +
            '<td>' +
                '<div class="radioPositionCenter">' +
                    '<label><input id="Available" type="radio" name="group_' + lastRowIndex + '" onclick="StatusDocumentSettingListView(' + lastRowIndex + ')"' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() == "Available" ? "checked" : "") + '></label>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group date">' +
                    '<input id="ReceiveDate-' + lastRowIndex + '" name="ReceiveDate[' + lastRowIndex + ']" data-date-format="mm/dd/yyyy" type="text" class="form-control dateappend" ' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() == "Available" ? "value='" + ($('#NewReceiveDate').val() != null ? $('#NewReceiveDate').val() : "") + "'" : "value='', disabled=true") + '/>' +
                    '<span class="input-group-addon">' +
                        '<i class="fa fa-calendar"></i>' +
                    '</span>' +
                '</div>' +
                '<span class="field-validation-valid" data-valmsg-for="ReceiveDate[' + lastRowIndex + ']" data-valmsg-replace="true"></span>' +
            '</td>' +
            '<td>' +
                '<div class="input-group date">' +
                    '<input id="DueDate-' + lastRowIndex + '" name="DueDate[' + lastRowIndex + ']" data-date-format="mm/dd/yyyy" type="text" class="form-control dateappend" ' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() == "Pending" ? "value='" + ($('#NewDueDate').val() != null ? $('#NewDueDate').val() : "") + "'" : "value='', disabled=true") + '/>' +
                    '<span class="input-group-addon">' +
                        '<i class="fa fa-calendar"></i>' +
                    '</span>' +
                '</div>' +
                '<span class="field-validation-valid" data-valmsg-for="DueDate[' + lastRowIndex + ']" data-valmsg-replace="true"></span>' +
            '</td>' +
            '<td>' +
                '<div>' +
                    '<textarea id="Remarks-' + lastRowIndex + '" name="Remarks[' + lastRowIndex + ']" class="form-control" rows="4" placeholder="" ' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').length != 0 ? ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() != "Available" ? "" : "disabled=true") : "disabled=true") + '>' + ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val() != "Available" ? $('#NewRemarks').val() != null ? $('#NewRemarks').val() : "" : "") + '</textarea>' +
                    '<span class="field-validation-valid" data-valmsg-for="Remarks[' + lastRowIndex + ']" data-valmsg-replace="true"></span>' +
                '</div>' +
            '</td>' +
            //'<td>' +
            //    '<span class="input-group-btn">' +
            //        '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + lastRowIndex + ')"></button>' +
            //    '</span>' +
            //'</td>' +
        '</tr>';

        for (index = 0; index < complementDocumentInfo.length; index++) {
            if (complementDocumentInfo[index].DocId == rowCategory) {
                if (complementDocumentInfo[index].LastChild != 0) {
                    $('tbody tr[rowComDoc="' + complementDocumentInfo[index].LastChild + '"]').after(htmlComDoc);
                }
                else {
                    $('tbody tr[rowComDoc="' + rowCategory + '"]').after(htmlComDoc);

                    //Set row view from child view to sub parent
                    if (complementDocumentInfo[index].ParentDocId != null) {
                        var tempDocCode = $('#DocCode-' + rowCategory + '').text();
                        var tempDocDesc = $('#DocDesc-' + rowCategory + '').text();

                        htmlComDoc = '';
                        htmlComDoc +=
                            '<tr rowComDoc="' + rowCategory + '">' +
                                '<td>' +
                                    '<p class="form-control-static" id="DocCode-' + rowCategory + '">' + tempDocCode + '</p>' +
                                '</td>' +
                                '<td colspan="10">' +
                                    '<p class="form-control-static" id="DocDesc-' + rowCategory + '">' + tempDocDesc + '</p>' +
                                '</td>' +
                            '</tr>';

                        $('tbody tr[rowComDoc="' + rowCategory + '"]').remove();
                        $('tbody tr[rowComDoc="' + lastRowIndex + '"]').before(htmlComDoc);
                    }

                    //Update parent complement document info from child to parent
                    complementDocumentInfo[index].HasChild = true;
                    complementDocumentInfo[index].DocStatus = 0;
                    complementDocumentInfo[index].ReceiveDate = null;
                    complementDocumentInfo[index].DueDate = null;
                    complementDocumentInfo[index].Remarks = null;
                }

                var docStatus = 0;
                switch ($('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val()) {
                    case 'Not Available': docStatus = 1;
                        break;

                    case 'Pending': docStatus = 2;
                        break;

                    case 'Available': docStatus = 3;
                        break;
                }
                complementDocumentInfo[index].LastChild = lastRowIndex;
                complementDocumentInfo.push({
                    IdTb_MKT_DocComplement: lastRowIndex,
                    DocId: lastDocId,
                    DocStatus: docStatus,
                    ReceiveDate: $('#NewReceiveDate').val(),
                    DueDate: $('#NewDueDate').val(),
                    Remarks: $('#NewRemarks').val(),
                    IdTb_MKT_DocComplementList: lastRowIndex,
                    //DocCode: $('#txtAddDocCode').val(),
                    DocCode: DocCode.toString(),
                    DocDescription: $('#txtAddDocName').val(),
                    ParentDocId: complementDocumentInfo[index].DocId,
                    HasChild: false,
                    LastChild: 0,
                    IsNewTemplate: true
                });
                break;
            }
        }

    }
    else {

        //Add new document name to category list on add complement document list modal
        var newOptionList = '';
        newOptionList += '<option value="' + lastRowIndex + '">' + $('#txtAddDocName').val() + '</option>';
        $('.js-example-placeholder-single.select2-offscreen').append(newOptionList);

        var isEmptyDatatable = false;
        //Check whether table has been created or not
        if ($('#complement-datatable > *').length == 0) {
            htmlComDoc +=
                        '<section class="panel">' +
                            '<table class="table table-striped table-input m-b-none text-sm" id="doc-com-list" align="center">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th rowspan="2" class="text-center" style="padding-bottom: 20px;" width="3%">No</th>' +
                                        '<th rowspan="2" class="text-center" style="padding-bottom: 20px;" width="28%">Document Name</th>' +
                                        '<th colspan="3" class="text-center" width="45%">Status Document</th>' +
                                        '<th rowspan="2" class="text-center" width="8%" style="padding-bottom: 20px;">Receiving Date</th>' +
                                        '<th rowspan="2" class="text-center" width="8%" style="padding-bottom: 20px;">Due Date</th>' +
                                        '<th rowspan="2" class="text-center" width="8%" style="padding-bottom: 20px;">Remarks</th>' +
                                        //'<th rowspan="2" class="text-center" width="1%" style="padding-bottom: 20px;"></th>' +
                                    '</tr>' +
                                    '<tr>' +
                                        '<th width="8%" class="text-center">Not Available</th>' +
                                        '<th width="8%" class="text-center">Pending</th>' +
                                        '<th width="8%" class="text-center">Available</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>';
            $('#complement-datatable').append(htmlComDoc);
            htmlComDoc = '';
            isEmptyDatatable = true;
        }

        //if (isParentAll()) {
        //    htmlComDoc += '<tr rowComDoc="' + lastRowIndex + '" class="newRow"><td colspan="8">';
        //}
        //else {
            htmlComDoc += '<tr rowComDoc="' + lastRowIndex + '" class="newRow"><td colspan="10">';
        //}

        //if ($('#txtAddDocCode').val().trim() == "") {
            htmlComDoc += '<label class="form-control">' + $('#txtAddDocName').val() + '</label></td>';
        //}
        //else {
        //    htmlComDoc += '<label class="form-control">' + $('#txtAddDocCode').val().trim() + '. ' + $('#txtAddDocName').val() + '</label></td>';
        //}

        //if (isEmptyDatatable || isParentAll()) {
        //    htmlComDoc +=
        //            '<td style="display: block;">' +
        //                '<span class="input-group-btn">' +
        //                    '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + lastRowIndex + ')"></button>' +
        //                '</span>' +
        //            '</td>' +
        //        '</tr></tbody></table></section>';
        //}
        //else {
            htmlComDoc +=
                    //'<td style="display: none;">' +
                    //    '<span class="input-group-btn">' +
                    //        '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + lastRowIndex + ')"></button>' +
                    //    '</span>' +
                    //'</td>' +
                '</tr></tbody></table></section>';
        //}

        $('#doc-com-list tbody').append(htmlComDoc);

        complementDocumentInfo.push({
            DocStatus: 0,
            ReceiveDate: null,
            DueDate: null,
            Remarks: null,
            IdTb_MKT_DocComplementList: lastRowIndex,
            DocId: lastDocId,
            //DocCode: $('#txtAddDocCode').val(),
            DocCode: "",
            DocDescription: $('#txtAddDocName').val(),
            ParentDocId: null,
            HasChild: false,
            LastChild: 0,
            IsNewTemplate: true
        });
    }

    //Add new document name to category list on add complement document list modal
    //var newOptionList = '';
    //newOptionList += '<option value="' + lastRowIndex + '">' + $('#txtAddDocName').val() + '</option>';
    //$('.js-example-placeholder-single.select2-offscreen').append(newOptionList);

    //Show submit button
    $('#submit-section').attr("style", "display: block;");
    if (isComplementDocumentExist) {
        $('#submit-section > a[value="Print"]').attr("style", "display: block;");
    }
    else {
        $('#submit-section > a[value="Print"]').attr("style", "display: none;");
    }

}

function ComplementDocumentUpdate() {
    var htmlTemp = '';

    for (index = 0; index < complementDocumentInfo.length; index++) {
        //Update new value if user edit value of complement document that already exist
        if (complementDocumentInfo[index].HasChild == false && complementDocumentInfo[index].ParentDocId != null) {
            //Update document status value
            var DocStatus = $('input[type="radio"][name="group_' + complementDocumentInfo[index].DocId + '"]:checked').attr('id');
            switch (DocStatus) {
                case 'NotAvailable':
                    complementDocumentInfo[index].DocStatus = 1;
                    break;

                case 'Pending':
                    complementDocumentInfo[index].DocStatus = 2;
                    break;

                case 'Available':
                    complementDocumentInfo[index].DocStatus = 3;
                    break;
            }
            //Update receive date, due date, and remarks
            complementDocumentInfo[index].ReceiveDate = $('#ReceiveDate-' + complementDocumentInfo[index].DocId + '').val() == "" ? null : $('#ReceiveDate-' + complementDocumentInfo[index].DocId + '').val();
            complementDocumentInfo[index].DueDate = $('#DueDate-' + complementDocumentInfo[index].DocId + '').val() == "" ? null : $('#DueDate-' + complementDocumentInfo[index].DocId + '').val();
            complementDocumentInfo[index].Remarks = $('#Remarks-' + complementDocumentInfo[index].DocId + '').val();
        }

        var DocCode = complementDocumentInfo[index].DocCode.trim() == "" ? "Empty" : complementDocumentInfo[index].DocCode;
        var ParentDocId = complementDocumentInfo[index].ParentDocId == null ? 0 : complementDocumentInfo[index].ParentDocId;
        var IsNewTemplate = complementDocumentInfo[index].IsNewTemplate;

        DocStatus = complementDocumentInfo[index].DocStatus == null ? 0 : complementDocumentInfo[index].DocStatus;
        var DueDate, ReceiveDate;

        if (complementDocumentInfo[index].DueDate == null) {
            DueDate = fakeDateValue;
        }
        else {
            DueDate = complementDocumentInfo[index].DueDate;
        }

        if (complementDocumentInfo[index].ReceiveDate == null) {
            ReceiveDate = fakeDateValue;
        }
        else {
            ReceiveDate = complementDocumentInfo[index].ReceiveDate;
        }

        htmlTemp +=
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].IdOPLAgreement" value="' + $('#IdOPLAgreement').val() + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].IdTb_MKT_SKD" value="' + $('#IdTb_MKT_SKD').val() + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].DocId" value="' + complementDocumentInfo[index].DocId + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].DocStatus" value="' + DocStatus + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].ReceiveDate" value="' + ReceiveDate + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].DueDate" value="' + DueDate + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].Remarks" value="' + complementDocumentInfo[index].Remarks + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].IdTb_MKT_DocComplementList" value="' + complementDocumentInfo[index].IdTb_MKT_DocComplementList + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].LeaseCategory" value="' + $('#LeaseCategory').val() + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].DocCode" value="' + DocCode + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].DocDescription" value="' + complementDocumentInfo[index].DocDescription + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].ParentDocId" value="' + ParentDocId + '">' +
            '<input type="hidden" name="ComplementDocumentListViewModel[' + index + '].IsNewTemplate" value="' + IsNewTemplate + '">';

    }

    if (htmlTemp == "") {
        htmlTemp +=
                '<input type="hidden" name="ComplementDocumentListViewModel[0].IdOPLAgreement" value="' + $('#IdOPLAgreement').val() + '">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].IdTb_MKT_SKD" value="' + $('#IdTb_MKT_SKD').val() + '">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].DocId" value="0">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].DocStatus" value="0">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].ReceiveDate" value="' + fakeDateValue + '">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].DueDate" value="' + fakeDateValue + '">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].Remarks" value="">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].IdTb_MKT_DocComplementList" value="0">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].LeaseCategory" value="' + $('#LeaseCategory').val() + '">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].DocCode" value="Empty">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].DocDescription" value="NULL">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].ParentDocId" value="0">' +
                '<input type="hidden" name="ComplementDocumentListViewModel[0].IsNewTemplate" value="false">';
    }

    $('#complement-datatable').append(htmlTemp);
}

//Delete certain complement document data from complementDocumentInfo array of object based on IdTb_MKT_DocComplementList
function DeleteComplementDocumentInfo(idCompDocList) {
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].IdTb_MKT_DocComplementList == idCompDocList) {
            complementDocumentInfo.splice(index, 1);
            break;
        }
    }
}

function DeleteComplementDocumentRow(compDocRow) {
    //Get previous deleted row/complement document
    var indexBeforeOldChild = $('tbody tr[rowComDoc="' + compDocRow + '"]').prev().attr("rowComDoc");

    //Get next deleted row/complement document
    var indexNextDeletedRow = $('tbody tr[rowComDoc="' + compDocRow + '"]').next().attr("rowComDoc");

    var compDocDeletedRow = GetComplementDocument(compDocRow);
    var compDocPrevDeletedRow = GetComplementDocument(indexBeforeOldChild) != null ? GetComplementDocument(indexBeforeOldChild) : null;
    var compDocNextDeletedRow = GetComplementDocument(indexNextDeletedRow) != null ? GetComplementDocument(indexNextDeletedRow) : null;
    var parentDocIdDeletedRow = compDocDeletedRow.ParentDocId;
    var parentDocIdNextDeletedRow = compDocNextDeletedRow != null ? compDocNextDeletedRow.ParentDocId : null;

    //Reorder DocCode or alphabet on description
    ReOrderDocCodeOrAlphabet(parentDocIdDeletedRow, compDocRow);

    if (!isParentAll()) {
        //Update documentComplementInfo value
        if (indexNextDeletedRow != null) {
            if (compDocNextDeletedRow.ParentDocId == compDocDeletedRow.ParentDocId) {
                DeleteComplementDocumentInfo(compDocDeletedRow.IdTb_MKT_DocComplementList);
            }
            else {
                if (compDocPrevDeletedRow.ParentDocId == compDocDeletedRow.ParentDocId) {
                    //Get parent complement document of compDocPrevDeletedRow from complementDocumentInfo array of object
                    var parentComDocPrevDeletedRow = GetComplementDocument(compDocPrevDeletedRow.ParentDocId);
                    UpdateParentComplementDocumentInfo(parentComDocPrevDeletedRow.IdTb_MKT_DocComplementList, compDocPrevDeletedRow.IdTb_MKT_DocComplementList);

                    if (parentComDocPrevDeletedRow.ParentDocId != null) {
                        UpdateSuperParentComplementDocumentInfoHasNextChild(parentComDocPrevDeletedRow.ParentDocId, parentComDocPrevDeletedRow.LastChild, compDocNextDeletedRow.ParentDocId);
                    }
                }
                else {
                    UpdateParentComplementDocumentInfo(compDocPrevDeletedRow.IdTb_MKT_DocComplementList, 0);

                    if (compDocPrevDeletedRow.ParentDocId != null) {
                        UpdateSuperParentComplementDocumentInfoHasNextChild(compDocPrevDeletedRow.ParentDocId, compDocPrevDeletedRow.IdTb_MKT_DocComplementList, compDocNextDeletedRow.ParentDocId);
                    }
                }
                DeleteComplementDocumentInfo(compDocDeletedRow.IdTb_MKT_DocComplementList);
            }
        }
        else {
            if (compDocPrevDeletedRow.ParentDocId == compDocDeletedRow.ParentDocId) {
                if (compDocDeletedRow.ParentDocId != null) {
                    //Get parent complement document of compDocPrevDeletedRow from complementDocumentInfo array of object
                    var parentComDocPrevDeletedRow = GetComplementDocument(compDocPrevDeletedRow.ParentDocId);
                    UpdateParentComplementDocumentInfo(parentComDocPrevDeletedRow.IdTb_MKT_DocComplementList, compDocPrevDeletedRow.IdTb_MKT_DocComplementList);
                    if (parentComDocPrevDeletedRow.ParentDocId != null) {
                        UpdateSuperParentComplementDocumentInfo(parentComDocPrevDeletedRow.ParentDocId, parentComDocPrevDeletedRow.LastChild);
                    }
                }
                DeleteComplementDocumentInfo(compDocDeletedRow.IdTb_MKT_DocComplementList);
            }
            else {
                //Get parent complement document of compDocDeletedRow from complementDocumentInfo array of object
                var parentComDocDeletedRow = GetComplementDocument(compDocDeletedRow.ParentDocId);
                //Get first child complement document of parentComDocDeletedRow from complementDocumentInfo array of object
                var idChildParentComDoc = $('tbody tr[rowComDoc="' + parentComDocDeletedRow.IdTb_MKT_DocComplementList + '"]').next().attr("rowComDoc");
                if (idChildParentComDoc != null && idChildParentComDoc != compDocDeletedRow.IdTb_MKT_DocComplementList) {
                    UpdateParentComplementDocumentInfo(parentComDocDeletedRow.IdTb_MKT_DocComplementList, compDocPrevDeletedRow.IdTb_MKT_DocComplementList);
                }
                else {
                    UpdateParentComplementDocumentInfo(parentComDocDeletedRow.IdTb_MKT_DocComplementList, 0);
                }

                DeleteComplementDocumentInfo(compDocDeletedRow.IdTb_MKT_DocComplementList);
                if (parentComDocDeletedRow.ParentDocId != null) {
                    if (parentComDocDeletedRow.LastChild == 0) {
                        UpdateSuperParentComplementDocumentInfo(parentComDocDeletedRow.ParentDocId, parentComDocDeletedRow.IdTb_MKT_DocComplementList);
                    }
                    else {
                        UpdateSuperParentComplementDocumentInfo(parentComDocDeletedRow.ParentDocId, parentComDocDeletedRow.LastChild);
                    }
                }
            }
        }

        //Remove complement document list row HTML
        $('tr[rowComDoc="' + compDocRow + '"]').remove();

        //Set view for previous deleted row
        var htmlComDoc = '';
        var addRowPosition = $('tbody tr[rowComDoc="' + indexBeforeOldChild + '"]').prev().attr("rowComDoc");
        var docStatus = $('tr[rowcomdoc=' + indexBeforeOldChild + ']').find('input[type="radio"]').length;

        if (compDocPrevDeletedRow.ParentDocId == null) {
            var isEmptyDatatable = $('#doc-com-list tbody tr').length == 0 ? true : false;

            if (isParentAll()) {
                htmlComDoc += '<tr rowComDoc="' + compDocPrevDeletedRow.IdTb_MKT_DocComplementList + '" class="newRow"><td colspan="8">';
            }
            else {
                htmlComDoc += '<tr rowComDoc="' + compDocPrevDeletedRow.IdTb_MKT_DocComplementList + '" class="newRow"><td colspan="10">';
            }

            if (compDocPrevDeletedRow.DocCode.trim() == "") {
                htmlComDoc += '<label class="form-control">' + compDocPrevDeletedRow.DocDescription + '</label></td>';
            }
            else {
                htmlComDoc += '<label class="form-control">' + compDocPrevDeletedRow.DocCode.trim() + '. ' + compDocPrevDeletedRow.DocDescription + '</label></td>';
            }

            if (isEmptyDatatable || isParentAll()) {
                htmlComDoc +=
                        '<td style="display: block;">' +
                            '<span class="input-group-btn">' +
                                '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + compDocPrevDeletedRow.IdTb_MKT_DocComplementList + ')"></button>' +
                            '</span>' +
                        '</td>' +
                    '</tr></tbody></table></section>';
            }
            else {
                htmlComDoc +=
                        '<td style="display: none;">' +
                            '<span class="input-group-btn">' +
                                '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + compDocPrevDeletedRow.IdTb_MKT_DocComplementList + ')"></button>' +
                            '</span>' +
                        '</td>' +
                    '</tr></tbody></table></section>';
            }

            $('tbody tr[rowComDoc="' + indexBeforeOldChild + '"]').remove();
            $('tbody tr[rowComDoc="' + addRowPosition + '"]').after(htmlComDoc);
        }
        else if (docStatus == 0 && parentDocIdDeletedRow != compDocPrevDeletedRow.ParentDocId && parentDocIdNextDeletedRow != parentDocIdDeletedRow) {
            var tempDocCode = $('#DocCode-' + indexBeforeOldChild + '').text();
            var tempDocDesc = $('#DocDesc-' + indexBeforeOldChild + '').text();

            htmlComDoc +=
            '<tr rowComDoc="' + indexBeforeOldChild + '">' +
                '<td>' +
                    '<p class="form-control-static" id="DocCode-' + indexBeforeOldChild + '">' + tempDocCode + '</p>' +
                '</td>' +
                '<td>' +
                    '<p class="form-control-static" id="DocDesc-' + indexBeforeOldChild + '">' + tempDocDesc + '</p>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter">' +
                        '<label><input id="NotAvailable" type="radio" name="group_' + indexBeforeOldChild + '" onclick="StatusDocumentSettingListView(' + indexBeforeOldChild + ')"></label>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter">' +
                        '<label><input id="Pending" type="radio" name="group_' + indexBeforeOldChild + '" onclick="StatusDocumentSettingListView(' + indexBeforeOldChild + ')"></label>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter">' +
                        '<label><input id="Available" type="radio" name="group_' + indexBeforeOldChild + '" onclick="StatusDocumentSettingListView(' + indexBeforeOldChild + ')"></label>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group date">' +
                        '<input id="ReceiveDate-' + indexBeforeOldChild + '" name="ReceiveDate[' + indexBeforeOldChild + ']" data-date-format="mm/dd/yyyy" type="text" class="form-control dateappend" disabled=true"/>' +
                        '<span class="input-group-addon">' +
                            '<i class="fa fa-calendar"></i>' +
                        '</span>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group date">' +
                        '<input id="DueDate-' + indexBeforeOldChild + '" name="DueDate[' + indexBeforeOldChild + ']" data-date-format="mm/dd/yyyy" type="text" class="form-control dateappend" disabled=true"/>' +
                        '<span class="input-group-addon">' +
                            '<i class="fa fa-calendar"></i>' +
                        '</span>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<textarea id="Remarks-' + indexBeforeOldChild + '" name="Remarks[' + indexBeforeOldChild + ']" class="form-control" rows="4" placeholder="" disabled="true"></textarea>' +
                '</td>' +
                '<td>' +
                    '<span class="input-group-btn">' +
                        '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + indexBeforeOldChild + ')"></button>' +
                    '</span>' +
                '</td>' +
            '</tr>';

            $('tbody tr[rowComDoc="' + indexBeforeOldChild + '"]').remove();
            $('tbody tr[rowComDoc="' + addRowPosition + '"]').after(htmlComDoc);
        }

        if (isParentAll()) {
            //enable delete button for all top parent
            $('td[style="display: none;"]').prev().attr("colspan", "8");
            $('td[style="display: none;"]').attr("style", "display: block;");
        }
    }
    else {
        DeleteComplementDocumentInfo(compDocRow);
        if (complementDocumentInfo.length != 0) {
            //Remove complement document list row HTML
            $('tr[rowComDoc="' + compDocRow + '"]').remove();
        }
        else {
            //Remove complement document list table HTML
            $('#complement-datatable > section.panel').remove();
        }
    }

    //Delete document name from category list on add complement document list modal
    $('#Category option[value="' + compDocRow + '"]').remove();
}

//Get complement document data from complementDocumentInfo array of object based on IdTb_MKT_DocComplementList
function GetComplementDocument(idCompDocList) {
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].IdTb_MKT_DocComplementList == idCompDocList) {
            return complementDocumentInfo[index];
        }
    }
    return null;
}

//Get complement document data from complementDocumentInfo array of object based on ParentDocId
function GetComplementDocumentByParentDocId(parentDocId) {
    var comDocInfoResult = [];
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].ParentDocId == parentDocId) {
            comDocInfoResult.push(complementDocumentInfo[index]);
        }
    }
    return comDocInfoResult;
}

function GetDocComplementListUsingAjax(idAgreement, leaseCategory) {
    var param = JSON.stringify({ idAgreement: idAgreement, leaseCategory: leaseCategory });
    $.ajax({
        url: serverRoot + "ComplementDocument/GetComplementDocumentData",
        type: 'POST',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            //Reset category value, last row index, complement document temp, and revision history
            $('#Category').find('option:gt(0)').remove();
            $('#s2id_Category').addClass('select2-container-active').removeClass('select2-allowclear');
            complementDocumentInfo = [];
            $('#historyTable > table > tbody > tr').remove();

            if (data.length != 0) {
                lastRowIndex = data[0].LastRow;
                $("#IdTb_MKT_DocComplementMaster").val(data[0].IdTb_MKT_DocComplement);
                $("#RowVersion").val(data[0].Row_Version);
                LoadComplementDocumentTable(data);
                LoadRevisionHistory(data);

                var reportUrl = '&nbsp;&nbsp;&nbsp;<a href="' + serverRoot + 'ComplementDocument/Report/' + idAgreement + '" class="btn btn-info" onclick="return IsComDocValidPrint()">Print</a>';
                if ($('#submit-section > footer > div > a').text() != "Print") {
                    $('#submit-section > footer > div > input').after(reportUrl);
                }
                else {
                    $('#submit-section > footer > div > a').attr("href", "" + serverRoot + "ComplementDocument/Report/" + idAgreement + "");
                }
                $('#buttonAdd, #submit-section').attr("style", "display: block;");
                isComplementDocumentExist = true;
            }
            else {
                $('#submit-section').attr("style", "display: none;");
                isComplementDocumentExist = false;
            }
        }
    });
}

function IsComDocValid() {
    var invalidRowExist = false;
    var docStatus = 0;
    var receiveDate = "";
    var dueDate = "";
    var remarks = "";

    for (index = 0; index < complementDocumentInfo.length; index++) {

        if (complementDocumentInfo[index].HasChild == false && complementDocumentInfo[index].ParentDocId != null) {
            docStatus = $('input[type="radio"][name="group_' + complementDocumentInfo[index].DocId + '"]:checked').length;
            receiveDate = $('#ReceiveDate-' + complementDocumentInfo[index].DocId + '').val();
            dueDate = $('#DueDate-' + complementDocumentInfo[index].DocId + '').val();
            remarks = $('#Remarks-' + complementDocumentInfo[index].DocId + '').val();

            if (docStatus == 0) {
                $('span[data-valmsg-for="group_' + complementDocumentInfo[index].DocId + '"').attr('class', 'field-validation-error');
                $('span[data-valmsg-for="group_' + complementDocumentInfo[index].DocId + '"').text("The Document Status field is required.");
                invalidRowExist = true;
            }
            else {
                //Reset validation message
                $('span[data-valmsg-for="group_' + complementDocumentInfo[index].DocId + '"').attr('class', 'field-validation-valid');
                $('span[data-valmsg-for="group_' + complementDocumentInfo[index].DocId + '"').text("");

                $('span[data-valmsg-for="DueDate[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-valid');
                $('span[data-valmsg-for="DueDate[' + complementDocumentInfo[index].DocId + ']"').text("");

                $('span[data-valmsg-for="ReceiveDate[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-valid');
                $('span[data-valmsg-for="ReceiveDate[' + complementDocumentInfo[index].DocId + ']"').text("");

                $('span[data-valmsg-for="Remarks[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-valid');
                $('span[data-valmsg-for="Remarks[' + complementDocumentInfo[index].DocId + ']"').text("");

                var docStatusName = $('input[type="radio"][name="group_' + complementDocumentInfo[index].DocId + '"]:checked').attr('id');

                switch (docStatusName) {
                    case 'NotAvailable':
                        if (remarks == "") {
                            $('span[data-valmsg-for="Remarks[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-error');
                            $('span[data-valmsg-for="Remarks[' + complementDocumentInfo[index].DocId + ']"').text("The Remarks field is required.");

                            invalidRowExist = true;
                        }
                        break;

                    case 'Pending':
                        if (dueDate == "") {
                            $('span[data-valmsg-for="DueDate[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-error');
                            $('span[data-valmsg-for="DueDate[' + complementDocumentInfo[index].DocId + ']"').text("The Due Date field is required.");

                            invalidRowExist = true;
                        }

                        if (remarks == "") {
                            $('span[data-valmsg-for="Remarks[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-error');
                            $('span[data-valmsg-for="Remarks[' + complementDocumentInfo[index].DocId + ']"').text("The Remarks field is required.");

                            invalidRowExist = true;
                        }
                        break;

                    case 'Available':
                        if (receiveDate == "") {
                            $('span[data-valmsg-for="ReceiveDate[' + complementDocumentInfo[index].DocId + ']"').attr('class', 'field-validation-error');
                            $('span[data-valmsg-for="ReceiveDate[' + complementDocumentInfo[index].DocId + ']"').text("The Receive Date field is required.");

                            invalidRowExist = true;
                        }
                        break;
                }
            }
        }
    }

    if (invalidRowExist == true) {
        return false;
    }

    return true;
}

//Valid Print
function IsComDocValidPrint() {
    for (index = 0; index < complementDocumentInfoReport.length; index++) {

        if (complementDocumentInfoReport[index].HasChild == false && complementDocumentInfoReport[index].ParentDocId != null) {
            
            if (complementDocumentInfoReport[index].DocStatus == 0) {
                var htmlAlert = '';
                htmlAlert +=
                    '<div class="alert alert-danger" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                        '<b>Warning!</b> Your data must be updated' +
                    '</div>';
                $('form').before(htmlAlert);
                return false;
            }
        }
    }
    return true;
}

//Check all complement document info whether ParentDocId of complement document info with null value is exist or not
function isParentAll() {
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].ParentDocId != null) {
            return false;
        }
    }
    return true;
}

function LoadComplementDocumentTable(data) {
    complementDocumentInfo = data;
    complementDocumentInfoReport = data;
    var categoryData = [];

    var htmlComDoc = '';
    htmlComDoc +=
        '<section class="panel">' +
            '<table class="table table-striped table-input m-b-none text-sm" id="doc-com-list" align="center">' +
                '<thead>' +
                    '<tr>' +
                        '<th rowspan="2" class="text-center" style="padding-bottom: 20px;" width="3%">No</th>' +
                        '<th rowspan="2" class="text-center" style="padding-bottom: 20px;" width="28%">Document Name</th>' +
                        '<th colspan="3" class="text-center" width="45%">Status Document</th>' +
                        '<th rowspan="2" class="text-center" width="8%" style="padding-bottom: 20px;">Receiving Date</th>' +
                        '<th rowspan="2" class="text-center" width="8%" style="padding-bottom: 20px;">Due Date</th>' +
                        '<th rowspan="2" class="text-center" width="8%" style="padding-bottom: 20px;">Remarks</th>' +
                        //'<th rowspan="2" class="text-center" width="1%" style="padding-bottom: 20px;"></th>' +
                    '</tr>' +
                    '<tr>' +
                        '<th width="8%" class="text-center">Not Available</th>' +
                        '<th width="8%" class="text-center">Pending</th>' +
                        '<th width="8%" class="text-center">Available</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>';

    var rows = data;
    for (index = 0; index < rows.length; index++) {
        //categoryData.push({
        //    text: rows[index].DocDescription,
        //    value: rows[index].IdTb_MKT_DocComplementList
        //});

        if (rows[index].ParentDocId == null) {
            categoryData.push({
                text: rows[index].DocDescription,
                //value: rows[index].IdTb_MKT_DocComplementList
                value: rows[index].DocId
            });

            if (rows[index].DocCode.trim() == "") {
                htmlComDoc +=
                '<tr rowComDoc="' + rows[index].DocId + '">' +
                    '<td colspan="10">' +
                        '<label class="form-control">' + rows[index].DocDescription + '</label>' +
                    '</td>';
            }
            else {
                htmlComDoc +=
                '<tr rowComDoc="' + rows[index].DocId + '">' +
                    '<td colspan="10">' +
                        '<label class="form-control">' + rows[index].DocCode + '. ' + rows[index].DocDescription + '</label>' +
                    '</td>';
            }

            htmlComDoc +=
                    //'<td style="display: none;">' +
                    //    '<span class="input-group-btn">' +
                    //        '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + rows[index].IdTb_MKT_DocComplementList + ')"></button>' +
                    //    '</span>' +
                    //'</td>' +
                '</tr>';
        }
        else {
            htmlComDoc +=
            '<tr rowComDoc="' + rows[index].DocId + '">' +
                '<td>' +
                    '<p class="form-control-static" id="DocCode-' + rows[index].DocId + '">' + rows[index].DocCode.trim() + '</p>' +
                '</td>';

            if (!rows[index].HasChild) {

                //Convert Date from JSON format to mm/dd/yyyy
                if (rows[index].DueDate != null) {
                    rows[index].DueDate = parseJsonDate(rows[index].DueDate);
                }
                if (rows[index].ReceiveDate != null) {
                    rows[index].ReceiveDate = parseJsonDate(rows[index].ReceiveDate);
                }

                htmlComDoc +=
                '<td>' +
                    '<p class="form-control-static" id="DocDesc-' + rows[index].DocId + '">' + rows[index].DocDescription + '</p>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter">' +
                        '<label><input id="NotAvailable" type="radio" name="group_' + rows[index].DocId + '" onclick="' + (rows[index].DocStatus === 2 || rows[index].DocStatus === 0 ? 'StatusDocumentSettingListView(' + rows[index].DocId + ')"' : 'return false;"') + (rows[index].DocStatus === 1 ? "checked" : "") + (rows[index].DocStatus === 3 ? "disabled" : "") + '></label>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter">' +
                        '<label><input id="Pending" type="radio" name="group_' + rows[index].DocId + '" onclick="StatusDocumentSettingListView(' + rows[index].DocId + ')"' + (rows[index].DocStatus === 2 ? "checked" : rows[index].DocStatus === 0 ? "" : "disabled") + '></label>' +
                    '</div>' +
                    '<span class="field-validation-valid" data-valmsg-for="group_' + rows[index].DocId + '" data-valmsg-replace="true"></span>' +
                '</td>' +
                '<td>' +
                    '<div class="radioPositionCenter">' +
                        '<label><input id="Available" type="radio" name="group_' + rows[index].DocId + '" onclick="' + (rows[index].DocStatus === 2 || rows[index].DocStatus === 0 ? 'StatusDocumentSettingListView(' + rows[index].DocId + ')"' : 'return false;"') + (rows[index].DocStatus === 3 ? "checked" : "") + (rows[index].DocStatus === 1 ? "disabled" : "") + '></label>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group date">' +
                        '<input id="ReceiveDate-' + rows[index].DocId + '" name="ReceiveDate[' + rows[index].DocId + ']" data-date-format="mm/dd/yyyy" type="text" class="form-control dateappend" ' + (rows[index].DocStatus === 3 ? "value='" + (rows[index].ReceiveDate != null ? rows[index].ReceiveDate : "") + "'" : "value=''") + ' disabled=true/>' +
                        '<span class="input-group-addon">' +
                            '<i class="fa fa-calendar"></i>' +
                        '</span>' +
                    '</div>' +
                    '<span class="field-validation-valid" data-valmsg-for="ReceiveDate[' + rows[index].DocId + ']" data-valmsg-replace="true"></span>' +
                '</td>' +
                '<td>' +
                    '<div class="input-group date">' +
                        '<input id="DueDate-' + rows[index].DocId + '" name="DueDate[' + rows[index].DocId + ']" data-date-format="mm/dd/yyyy" type="text" class="form-control dateappend" ' + (rows[index].DocStatus === 2 ? "value='" + (rows[index].DueDate != null ? rows[index].DueDate : "") + "'" : "value='', disabled=true") + '/>' +
                        '<span class="input-group-addon">' +
                            '<i class="fa fa-calendar"></i>' +
                        '</span>' +
                    '</div>' +
                    '<span class="field-validation-valid" data-valmsg-for="DueDate[' + rows[index].DocId + ']" data-valmsg-replace="true"></span>' +
                '</td>' +
                '<td>' +
                    '<div>' +
                        '<textarea id="Remarks-' + rows[index].DocId + '" name="Remarks[' + rows[index].DocId + ']" class="form-control" rows="4" placeholder="" ' + (rows[index].DocStatus === 2 ? "" : "disabled=true") + '>' + (rows[index].DocStatus !== 3 ? rows[index].Remarks != null ? rows[index].Remarks : "" : "") + '</textarea>' +
                        '<span class="field-validation-valid" data-valmsg-for="Remarks[' + rows[index].DocId + ']" data-valmsg-replace="true"></span>' +
                    '</div>' +
                '</td>';
                //'<td>';
                //if (rows[index].DocStatus === 2 || rows[index].DocStatus === 0) {
                //    htmlComDoc +=
                //    '<span class="input-group-btn">' +
                //        '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + rows[index].DocId + ')"></button>' +
                //    '</span>';
                //}
                //htmlComDoc += '</td>';
            }
            else {
                htmlComDoc +=
                '<td colspan="8">' +
                    '<p class="form-control-static" id="DocDesc-' + rows[index].DocId + '">' + rows[index].DocDescription + '</p>' +
                '</td>';
                //'<td style="display: none;">' +
                //    '<span class="input-group-btn">' +
                //        '<button class="btn btn-info font-bold add_item fa fa-minus" type="button" onclick="DeleteComplementDocumentRow(' + rows[index].DocId + ')"></button>' +
                //    '</span>' +
                //'</td>';
            }
            htmlComDoc += '</tr>';
        }
    }

    htmlComDoc += '</tbody></table></section>';
    $('#complement-datatable').append(htmlComDoc);

    //if (isParentAll()) {
    //    //enable delete button for all top parent
    //    $('td[style="display: none;"]').prev().attr("colspan", "8");
    //    $('td[style="display: none;"]').attr("style", "display: block;");
    //}

    $('#historyView').attr("style", "display: block;");

    if (categoryData != null) {
        var optionList = '';
        optionList += '<option value=""></option>';
        for (index = 0; index < categoryData.length; index++) {
            optionList += '<option value="' + categoryData[index].value + '">' + categoryData[index].text + '</option>';
        }
        $('.js-example-placeholder-single.select2-offscreen').append(optionList);
        $('#s2id_Category').removeClass('select2-container-active').addClass('select2-allowclear');
    }
}

function LoadRevisionHistory(data) {
    var htmlRev = '';
    for (indexRev = 0; indexRev < data[0].RevHistories.length; indexRev++) {
        htmlRev +=
            '<tr>' +
                '<td width="20">' +
                    '<label class="form-control">' + data[0].RevHistories[indexRev].CreateBy + '</label>' +
                '</td>' +
                '<td width="20">' +
                    '<label class="form-control">' + data[0].RevHistories[indexRev].CreateDate + '</label>' +
                '</td>' +
                '<td width="20">' +
                    '<label class="form-control">' + data[0].RevHistories[indexRev].Action + '</label>' +
                '</td>' +
            '</tr>';
    }
    $('#historyTable > table > tbody').append(htmlRev);
}

function LoadAgreement() {
    // datatable
    var oTable = null;
    $('#agreement-list').each(function() {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "ComplementDocument/ComplementAgreementDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "AgreementNumber" },
                { "mData": "SKDNo" },
                { "mData": "CustomerName" },
                { "mData": "OPLType" },
                {
                    "mData": "IdOPLAgreement",
                    "bVisible": false
                },
                {
                    "mData": "IdTb_MKT_SKD",
                    "bVisible": false
                }
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });
    $("#agreement-list tbody").delegate("tr", "click", function() {

        var data = oTable.fnGetData(this);

        $('#complement-datatable > section.panel').remove();
        GetDocComplementListUsingAjax(data.IdOPLAgreement, data.OPLType);

        $("#IdTb_MKT_SKD").val(data.IdTb_MKT_SKD == null ? "" : data.IdTb_MKT_SKD);
        $("#SKDDate").val(data.SKDDate == null ? "" : parseJsonDate(data.SKDDate));
        $("#SKDNo").val(data.SKDNo == null ? "" : data.SKDNo);
        $("#IdOPLAgreement").val(data.IdOPLAgreement == null ? "" : data.IdOPLAgreement);
        $("#AgreementNumber").val(data.AgreementNumber == null ? "" : data.AgreementNumber);
        $("#CustomerName").val(data.CustomerName == null ? "" : data.CustomerName);
        $("#LeaseCategory").val(data.LeaseCategory == null ? "" : data.LeaseCategory);
        $("#OPLType").val(data.OPLType == null ? "" : data.OPLType);

        $('#agreementModal').modal('hide');
        $("#agreement-list tbody").undelegate("tr", "click");
    });
    oTable.fnFilter('');
}

function parseJsonDate(jsonDateString) {
    var value = jsonDateString == null ? new Date() : new Date(parseInt(jsonDateString.replace(/(^.*\()|([+-].*$)/g, '')));
    var dateResult = '';
    var date = value.getDate();
    var month = value.getMonth() + 1;
    var year = value.getFullYear();

    if ((date + "").length == 1) {
        if ((month + "").length == 1) {
            dateResult = "0" + month + "/0" + date + "/" + year;
        }
        else {
            dateResult = month + "/0" + date + "/" + year;
        }
    }
    else {
        if ((month + "").length == 1) {
            dateResult = "0" + month + "/" + date + "/" + year;
        }
        else {
            dateResult = month + "/" + date + "/" + year;
        }
    }

    return dateResult;
}

function ReOrderDocCodeOrAlphabet(parentDocId, rowNumber) {
    var tempComDocInfo = GetComplementDocumentByParentDocId(parentDocId);
    var docCode = $('#DocCode-' + rowNumber).text() != '' ? parseInt($('#DocCode-' + rowNumber).text()) : -1;
    var alphabet = docCode == -1 ? $('#DocDesc-' + rowNumber).text().split('.')[0].charCodeAt() : null;

    for (index = 0; index < tempComDocInfo.length; index++) {
        if (docCode != -1 && docCode < tempComDocInfo[index].DocCode) {
            for (indexComDoc = 0; indexComDoc < complementDocumentInfo.length; indexComDoc++) {
                if (complementDocumentInfo[indexComDoc].IdTb_MKT_DocComplementList == tempComDocInfo[index].IdTb_MKT_DocComplementList) {
                    complementDocumentInfo[indexComDoc].DocCode = docCode.toString();
                    $('#DocCode-' + tempComDocInfo[index].IdTb_MKT_DocComplementList).text(complementDocumentInfo[indexComDoc].DocCode);
                    break;
                }
            }
            docCode++;
        }
        else if (alphabet != null) {
            for (indexComDoc = 0; indexComDoc < complementDocumentInfo.length; indexComDoc++) {
                if (complementDocumentInfo[indexComDoc].IdTb_MKT_DocComplementList == tempComDocInfo[index].IdTb_MKT_DocComplementList) {
                    var alphabetCompare = complementDocumentInfo[indexComDoc].DocDescription.substring(0, complementDocumentInfo[indexComDoc].DocDescription.indexOf(".")).length == 1 ? complementDocumentInfo[indexComDoc].DocDescription.substring(0, complementDocumentInfo[indexComDoc].DocDescription.indexOf(".")).charCodeAt() : -1;
                    if (alphabet < alphabetCompare) {
                        complementDocumentInfo[indexComDoc].DocDescription = String.fromCharCode(alphabet).concat(complementDocumentInfo[indexComDoc].DocDescription.substring(complementDocumentInfo[indexComDoc].DocDescription.indexOf(".")));
                        $('#DocDesc-' + tempComDocInfo[index].IdTb_MKT_DocComplementList).text(complementDocumentInfo[indexComDoc].DocDescription);
                        alphabet++;
                        break;
                    }
                }
            }
        }
    }
}

function StatusDocumentSettingListView(index) {
    var docStatus = $('input[type="radio"][name="group_' + index + '"]:checked').attr('id');

    if (docStatus == "NotAvailable") {
        $('#ReceiveDate-' + index + ', #DueDate-' + index + '').val("");

        $('#DueDate-' + index + ', #ReceiveDate-' + index + '').prop("disabled", true);
        $('#Remarks-' + index + '').prop("disabled", false);
    }
    if (docStatus == "Pending") {
        $('#ReceiveDate-' + index + '').val("");

        $('#ReceiveDate-' + index + '').prop("disabled", true);
        $('#DueDate-' + index + ', #Remarks-' + index + '').prop("disabled", false);
        $('#DueDate-' + index + '').datepicker("setDate", null);
    }
    if (docStatus == "Available") {
        var today = parseJsonDate(null);

        $('#DueDate-' + index + ', #Remarks-' + index + '').val("");

        $('#ReceiveDate-' + index + '').prop("disabled", false);
        $('#ReceiveDate-' + index + '').val(today);
        $('#DueDate-' + index + ', #Remarks-' + index + '').prop("disabled", true);
    }
}

function StatusDocumentSettingModalView() {
    var docStatus = $('#rbAddRow > input[type="radio"][name="statusDocument"]:checked').val();

    if (docStatus == "Not Available") {
        $('#NewReceiveDate, #NewDueDate').val("");

        $('#NewDueDate, #NewReceiveDate').prop("disabled", true);
        $('#NewRemarks').prop("disabled", false);
    }
    if (docStatus == "Pending") {
        $('#NewReceiveDate').val("");

        $('#NewReceiveDate').prop("disabled", true);
        $('#NewDueDate, #NewRemarks').prop("disabled", false);
        $('#NewDueDate').datepicker("setDate", null);
    }
    if (docStatus == "Available") {
        var today = parseJsonDate(null);
        $('#NewDueDate, #NewRemarks').val("");

        $('#NewReceiveDate').prop("disabled", false);
        $('#NewReceiveDate').val(today);
        $('#NewDueDate, #NewRemarks').prop("disabled", true);
    }
}

//Update LastChild and HasValue property on parent of deleted child/row from complementDocumentInfo array of object
function UpdateParentComplementDocumentInfo(idParentCompDocList, idChildCompDocList) {
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].IdTb_MKT_DocComplementList == idParentCompDocList) {
            if (idChildCompDocList == 0) {
                complementDocumentInfo[index].HasChild = false;
            }
            complementDocumentInfo[index].LastChild = idChildCompDocList;
            break;
        }
    }
}

//Update LastChild property on parent of parent of deleted child/row from complementDocumentInfo array of object
function UpdateSuperParentComplementDocumentInfo(idParentCompDocList, lastChildParentCompDocList) {
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].IdTb_MKT_DocComplementList == idParentCompDocList) {
            complementDocumentInfo[index].LastChild = lastChildParentCompDocList;
            if (complementDocumentInfo[index].ParentDocId != null) {
                UpdateSuperParentComplementDocumentInfo(complementDocumentInfo[index].ParentDocId, complementDocumentInfo[index].LastChild);
            }
            break;
        }
    }
}

//Update LastChild property on parent of parent of deleted child/row from complementDocumentInfo array of object
function UpdateSuperParentComplementDocumentInfoHasNextChild(idParentCompDocList, lastChildParentCompDocList, idParentNextDeletedCompDocList) {
    for (index = 0; index < complementDocumentInfo.length; index++) {
        if (complementDocumentInfo[index].IdTb_MKT_DocComplementList == idParentCompDocList) {
            if (idParentCompDocList != idParentNextDeletedCompDocList) {
                complementDocumentInfo[index].LastChild = lastChildParentCompDocList;
                if (complementDocumentInfo[index].ParentDocId != null) {
                    UpdateSuperParentComplementDocumentInfoHasNextChild(complementDocumentInfo[index].ParentDocId, complementDocumentInfo[index].LastChild, idParentNextDeletedCompDocList);
                }
            }
            break;
        }
    }
}