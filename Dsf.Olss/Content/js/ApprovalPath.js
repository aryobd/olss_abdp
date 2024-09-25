function loadBranchOfficeData() {
    //datatable
    var oTable = null;
    $('#branchOffice-list').each(function() {
        oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "bRetrieve": true,
            "sAjaxSource": serverRoot + "ApprovalPath/BranchOfficeDataTable",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "BranchName" },
                { "mData": "BranchShortName" },
            ],
            "iDisplayLength": 5,
            "bLengthChange": false
        });
    });

    $("#branchOffice-list tbody").delegate("tr", "click", function() {
        var data = oTable.fnGetData(this);

        $("#BranchName").val(data.BranchName);
        $("#BranchShortName").val(data.BranchShortName);
        $("#IdTb_OPL_Branch").val(data.IdTb_OPL_Branch == null ? "" : data.IdTb_OPL_Branch);

        $('#branchOfficeModal').modal('hide');
        $("#branchOffice-list tbody").undelegate("tr", "click");
    });

};


function numericOnly(id) {
    $(id).autoNumeric('init', { lZero: 'deny', aSep: ',', mDec: 0, vMax: '99999999999999.999' });
    $(id).autoNumeric('set', $(id).val());
}

$(function() {
    $('#addUnit').click(function() {
        //idUnit = $('.approvalCode').attr("id");
        var jobCodeList = [];
        var jobCodeVal = $('.jobTitle option:selected');
        for (var j = 0; j < jobCodeVal.length; j++) {
            jobCodeList.push(jobCodeVal[j].value);
        }
        var jobTitleCodeList = jobCodeList.join(',');

        var prop = [];
        var prposed = $('.rowAmountRange').closest('tr').find('input[id*=proposedId]'); //$('.rowAmountRange').closest('tr').find('.proposed');
        if (prposed !== 0) {
            for (var e = 0; e < prposed.length; e++) {
                prop.push(prposed[e].value);
            }
            var propTitle = prop.join(',');
        }
        var rowRange = $('.rowAmountRange').length;
        var rowTotal = $('select[id*=ApprovalLevelCode]').last(); //$('tr[id*=rUnit]').length;
        if (rowTotal.length != 0) {
            var countRow = rowTotal.attr("id").replace('ApprovalLevelCode', '');
        } else {
            countRow = 0;
        }

        if (jobCodeVal.length == jobTitleNameInfo.length) {
            return false;
        }
        var newTr =
            '<tr class="rowUnit" id="rUnit">' +
            '<td><select class="form-control mandatory approvalCode" id="ApprovalLevelCode' + (parseInt(countRow) + 1) + '">';
        for (proveIndex = 0; proveIndex < approveLevelInfo.length; proveIndex++) {

            if (countRow === 0 && rowRange === 0) {
                if (approveLevelInfo[proveIndex] == "Proposed") {
                    newTr += '<option value="' + approveLevelInfo[proveIndex] + '" id="levelinfo' + (parseInt(countRow) + 1) + '">' + approveLevelInfo[proveIndex] + '</option>';
                }
            }
            else if (approveLevelInfo[proveIndex] != "Proposed") {

                newTr += '<option value="' + approveLevelInfo[proveIndex] + '" id="levelinfo' + (parseInt(countRow) + 1) + '">' + approveLevelInfo[proveIndex] + '</option>';
            }
        }
        newTr +=
            '</td> ' +
            '<td><select class="form-control mandatory jobTitle" id="IdTb_OPL_JobTItles' + (parseInt(countRow) + 1) + '">';
        for (titleIndex = 0; titleIndex < jobTitleNameInfo.length; titleIndex++) {
            if (jobTitleCodeList.match(jobTitleNameInfoId[titleIndex]) != null) {
                continue;
            }
            if (propTitle.match(jobTitleNameInfoId[titleIndex]) != null) {
                continue;
            }
            newTr += '<option value="' + (titleIndex + 1) + '">' + jobTitleNameInfo[titleIndex] + '</option>';
        }
        newTr +=
            '</td>' +
            '<td><div class="input-group"><select disabled="disabled" class="form-control mandatory" id="rolesettinglist' + (parseInt(countRow) + 1) + '"><option value="MS">Must Sign</option><option value="NMS">Not Must Sign</option><option selected="selected" value="">Role Setting</option></select><span class="input-group-btn"><button class="btn btn-danger font-bold add_item fa fa-minus" id="deleteRow" type="button"></button></span></div></td>' +
            '</tr>';

        $('#mtable > tbody').append(newTr);

        // For sett select if changed
        $('.approvalCode').change(function() {
            var idCode = $(this).attr('id');
            var itemId = idCode.replace('ApprovalLevelCode', '');
            var codeLevl = $(this).val();
            var settrolelist = $('#rolesettinglist' + itemId).find("option").length;//$('#rolesettinglist' + itemId + ' option').length;
            if (codeLevl == "Approved" && settrolelist == 3) {
                $('#rolesettinglist' + itemId + ' option:selected').remove();
                $('#rolesettinglist' + itemId + '').attr("disabled", false);
            } else if (settrolelist == 2 && codeLevl == "Checked") {
                var newOpsi = '<option selected="selected" value="">Role Setting</option>';
                $('#rolesettinglist' + itemId + '').append(newOpsi);
                $('#rolesettinglist' + itemId + '').attr("disabled", true);
            }
        });

        return false;
    });

    $('#show').click(function() {

        var jobpositionSelect;
        var approvalLevelSelect;
        var provelevelid;
        var rolesettingselect;
        var approvalid;

        var jobpropose = [];
        var jobcheck = [];
        var jobapprove = [];

        var jobproposeid = [];
        var jobcheckid = [];
        var jobapproveid = [];

        var levelproposed = [];
        var levelchecked = [];
        var levelapproved = [];

        var rsettingproposed = [];
        var rsettingchecked = [];
        var rsettingapproved = [];

        var proposedtlid = [];
        var checkdtlid = [];
        var approvedtlid = [];

        var newTr = "";

        var rowAmount = $('.rowAmountRange').length;
        var baseMount = $('#baseAmount').val();
        var limitMount = $('#limitAmount').val();
        var branchval = $('#BranchName').val();
        if (rowAmount === 0) {
            $('span[data-valmsg-for="ApprovalPathList"]').removeClass("field-validation-error").addClass("field-validation-valid");
            $('span[data-valmsg-for="ApprovalPathList"]').text("");
        }
        if (branchval == "" || branchval == null) {
            if (branchval == "") {
                $('span[data-valmsg-for="BranchName"]').removeClass("field-validation-valid").addClass("field-validation-error");
                $('span[data-valmsg-for="BranchName"]').text("The Field DSF Office Name is required !");
            } else if (branchval == null) {
                $('span[data-valmsg-for="BranchName"]').removeClass("field-validation-valid").addClass("field-validation-error");
                $('span[data-valmsg-for="BranchName"]').text("The Field DSF Office Name is Required !");
            }
            return false;
        } else {
            $('span[data-valmsg-for="BranchName"]').removeClass("field-validation-error").addClass("field-validation-valid");
            $('span[data-valmsg-for="BranchName"]').text("");
        }
        if (limitMount == 0 || baseMount == "" || limitMount == "") {
           if (baseMount == "") {
                $('span[data-valmsg-for="RangeAmountBase"]').removeClass("field-validation-valid").addClass("field-validation-error");
                $('span[data-valmsg-for="RangeAmountBase"]').text("RangeAmountBase name is required !");
            }
            if (limitMount == 0) {
                $('span[data-valmsg-for="RangeAmountLimit"]').removeClass("field-validation-valid").addClass("field-validation-error");
                $('span[data-valmsg-for="RangeAmountLimit"]').text("The Field RangeAmountLimit name is required and must be greater than 0 !");
            } else if (limitMount == "") {
                $('span[data-valmsg-for="RangeAmountLimit"]').removeClass("field-validation-valid").addClass("field-validation-error");
                $('span[data-valmsg-for="RangeAmountLimit"]').text("RangeAmountLimit name is required !");
            }

            return false;
        } else if (baseMount == limitMount) {
            $('span[data-valmsg-for="RangeAmountBase"]').removeClass("field-validation-valid").addClass("field-validation-error");
            $('span[data-valmsg-for="RangeAmountBase"]').text("RangeAmountBase is equal to RangeAmountLimit. !");
            $('span[data-valmsg-for="RangeAmountLimit"]').removeClass("field-validation-valid").addClass("field-validation-error");
            $('span[data-valmsg-for="RangeAmountLimit"]').text("RangeAmountLimit is equal to RangeAmountBase. !");

            return false;
        } else if (parseFloat(limitMount.replace(/,/g, '').replace(' ', '')) < parseFloat(baseMount.replace(/,/g, '').replace(' ', ''))) {
            $('span[data-valmsg-for="RangeAmountBase"]').removeClass("field-validation-valid").addClass("field-validation-error");
            $('span[data-valmsg-for="RangeAmountBase"]').text("RangeAmountBase is bigger than RangeAmountLimit. !");
            $('span[data-valmsg-for="RangeAmountLimit"]').removeClass("field-validation-valid").addClass("field-validation-error");
            $('span[data-valmsg-for="RangeAmountLimit"]').text("RangeAmountLimit is smaller than RangeAmountBase. !");

            return false;
        } else {
            $('span[data-valmsg-for="RangeAmountBase"]').removeClass("field-validation-error").addClass("field-validation-valid");
            $('span[data-valmsg-for="RangeAmountBase"]').text("");
            $('span[data-valmsg-for="RangeAmountLimit"]').removeClass("field-validation-error").addClass("field-validation-valid");
            $('span[data-valmsg-for="RangeAmountLimit"]').text("");
        }

        var listcode = [];
        var codetext = $('.approvalCode option:selected');
        for (var t = 0; t < codetext.length; t++) {
            listcode.push(codetext[t].innerHTML);
        }
        var textCode = listcode.join(',');
        if (textCode.search("Approved") == -1) {
            //$('input[name="confirmButton"]').attr('type', 'button').attr('data-toggle', 'modal').attr('data-target', '#levelModal').click();
            $('#CodelevelModal').modal();
            return false;
        }

        var row = $('tr[id*=rApproval]').length;
        var countRow = $('select[id*=ApprovalLevelCode]');
        $('#rangetable tr:last').find("#deleteRowAmount").attr("disabled", "disabled");

        newTr = '<tr class="rowAmountRange" id="rApproval' + (row + 1) + '">' +
            '<td><input class="form-control" id="amount' + (row + 1) + '" type="text" readonly="readonly" placeholder="" value="" /><input id="aptId' + (row + 1) + '" type="hidden" value="" /></td>' +
            '<td><textarea class="form-control" id="proposedBy' + (row + 1) + '" readonly="readonly"></textarea><input id="proposedId' + (row + 1) + '" type="hidden" value="" /><input id="proposedlevel' + (row + 1) + '" type="hidden" value="" /><input id="proposedsetting' + (row + 1) + '" type="hidden" value="" /><input id="proposedAptDtlId' + (row + 1) + '" type="hidden" value="" /></td>' +
            '<td><textarea class="form-control" id="checkedBy' + (row + 1) + '" readonly="readonly"></textarea><input id="checkedId' + (row + 1) + '" type="hidden" value="" /><input id="checkedlevel' + (row + 1) + '" type="hidden" value="" /><input id="checkedsetting' + (row + 1) + '" type="hidden" value="" /><input id="checkedAptDtlId' + (row + 1) + '" type="hidden" value="" /></td>' +
            '<td><textarea class="form-control" id="approvedBy' + (row + 1) + '" readonly="readonly"></textarea><input id="approvedId' + (row + 1) + '" type="hidden" value="" /><input id="approvedlevel' + (row + 1) + '" type="hidden" value="" /><input id="approvedsetting' + (row + 1) + '" type="hidden" value="" /><input id="approvedAptDtlId' + (row + 1) + '" type="hidden" value="" /></td>' +
            '<td style="text-align:center;vertical-align:middle;"><a class="btn btn-primary btn-xs" id="editRowAmount"><i class="fa fa-edit"></i></a>&nbsp;<a class="btn btn-danger font-bold btn-xs" id="deleteRowAmount"><i class="fa fa-minus"></i></a></td>' +
            '</tr>';

        $($('#rangetable > tbody')).append(newTr);

        $('a[id=deleteRowAmount]').attr("disabled", "disabled");
        $('a[id=deleteRowAmount]').last().attr("disabled", false);

        $('#amount' + (row + 1) + '').val($("#baseAmount").val() + " - " + $("#limitAmount").val());

        for (var i = 0; i < countRow.length; i++) {
            var itemSelect = countRow[i];
            var index = itemSelect.id.replace('ApprovalLevelCode', '');

            approvalLevelSelect = $('select[id = "ApprovalLevelCode' + index + '"] option:selected').val();
            jobpositionSelect = $('select[id = "IdTb_OPL_JobTItles' + index + '"] option:selected').text();
            provelevelid = $('select[id = "IdTb_OPL_JobTItles' + index + '"] option:selected').val();
            rolesettingselect = $('select[id = "rolesettinglist' + index + '"] option:selected').val();
            
            var proposeid = $('#proposedAptDtlId' + (row + 1) + '').val();
            if (proposeid == "" || proposeid == null) {
                proposeid = "0";
            }

            var checkid = $('#checkedAptDtlId' + (row + 1) + '').val();
            if (checkid == "" || checkid == null) {
                checkid = "0";
            }

            var approveid = $('#approvedAptDtlId' + (row + 1) + '').val();
            if (approveid == "" || approveid == null) {
                approveid = "0";
            }

            if (approvalLevelSelect == "Proposed") {
                jobpropose.push(jobpositionSelect);
                jobproposeid.push(provelevelid);
                levelproposed.push(approvalLevelSelect);
                rsettingproposed.push(rolesettingselect);
                proposedtlid.push(proposeid);

            } else if (approvalLevelSelect == "Checked") {
                jobcheck.push(jobpositionSelect);
                jobcheckid.push(provelevelid);
                levelchecked.push(approvalLevelSelect);
                rsettingchecked.push(rolesettingselect);
                checkdtlid.push(checkid);

            } else if (approvalLevelSelect == "Approved") {
                jobapprove.push(jobpositionSelect);
                jobapproveid.push(provelevelid);
                levelapproved.push(approvalLevelSelect);
                rsettingapproved.push(rolesettingselect);
                approvedtlid.push(approveid);
            }


            var approvalid = $('#aptId' + (row + 1) + '').val();
            if (approvalid == "" || approvalid == "null") {
                approvalid = "0";
            }

        }
        var arrlist = [];
        for (var j = 0; j < jobapprove.length; j++) {
            var arr = jobapprove[j] + "(" + rsettingapproved[j] + ")";
            arrlist.push(arr);
        }

        if (rowAmount !== 0) {
            $('#proposedBy' + (row + 1) + '').val($('#proposedBy' + (1) + '').val());
        } else {
            $('#proposedBy' + (row + 1) + '').val(jobpropose.join(", "));
        }
        
        $('#checkedBy' + (row + 1) + '').val(jobcheck.join(", "));
        $('#approvedBy' + (row + 1) + '').val(arrlist.join(", "));

        if (rowAmount !== 0) {
            $('#proposedId' + (row + 1) + '').val($('#proposedId' + (1) + '').val());
        } else {
            $('#proposedId' + (row + 1) + '').val(jobproposeid.join(", "));
        }
        $('#checkedId' + (row + 1) + '').val(jobcheckid.join(", "));
        $('#approvedId' + (row + 1) + '').val(jobapproveid.join(", "));

        if (rowAmount !== 0) {
            $('#proposedlevel' + (row + 1) + '').val($('#proposedlevel' + (1) + '').val());
        } else {
            $('#proposedlevel' + (row + 1) + '').val(levelproposed.join(", "));
        }
        $('#checkedlevel' + (row + 1) + '').val(levelchecked.join(", "));
        $('#approvedlevel' + (row + 1) + '').val(levelapproved.join(", "));

        if (rowAmount !== 0) {
            $('#proposedsetting' + (row + 1) + '').val($('#proposedsetting' + (1) + '').val());
        } else {
            $('#proposedsetting' + (row + 1) + '').val(rsettingproposed.join(", "));
        }
        $('#checkedsetting' + (row + 1) + '').val(rsettingchecked.join(", "));
        $('#approvedsetting' + (row + 1) + '').val(rsettingapproved.join(", "));

        $('#aptId' + (row + 1) + '').val(approvalid);

        $('#proposedAptDtlId' + (row + 1) + '').val(proposedtlid.join(", "));
        $('#checkedAptDtlId' + (row + 1) + '').val(checkdtlid.join(", "));
        $('#approvedAptDtlId' + (row + 1) + '').val(approvedtlid.join(", "));

        var baseAmountSetValue = $("#limitAmount").val();
        var amountBaseVal = parseFloat(baseAmountSetValue.replace(/,/g, '').replace(' ', ''));
        var num = amountBaseVal + 1;
        var numStr = num.toString();

        s1 = reverseChars(numStr);	//reverse number
        s2 = dot(s1, 3);				//put decimals at desired intervals
        resultBase = reverseChars(s2);
        $('#baseAmount').val(resultBase).attr("readonly", "readonly");

        num = amountBaseVal + 2;
        numStr = num.toString();
        s1 = reverseChars(numStr);	//reverse number
        s2 = dot(s1, 3);				//put decimals at desired intervals
        resultLimit = reverseChars(s2);
        $('#limitAmount').val(resultLimit);


        $('tr[id=rUnit]').remove();
        $('#addUnit').click();
        $('button[id=deleteRow]').attr("disabled", "disabled");

        return false;

    });

    $("#mtable").on('click', '#deleteRow', function() {
        $(this).parent().parent().parent().parent().remove();
    });

    $("#rangetable").on('click', '#deleteRowAmount', function() {
        $(this).parent().parent().remove();
        $('a[id*=deleteRowAmount]').attr("disabled", "disabled");
        $('a[id=deleteRowAmount]').last().attr("disabled", false);


        if ($('input[id*=amount]').last().length == 0) {
            $('#baseAmount').val(0).attr("readonly", false);
            $('#limitAmount').val(0);
            $('tr[id=rUnit]').remove();
            $('#addUnit').click();
        } else {
            var mountRange = $('input[id*=amount]').last().val().split(" - ");
            var rangeLimit = mountRange[1].replace(/,/g, '').replace(' ', '');
            var baseAmt = reverseChars(dot(reverseChars((parseFloat(rangeLimit) + 1).toString()), 3));
            var limitAmt = reverseChars(dot(reverseChars((parseFloat(rangeLimit) + 2).toString()), 3));
            $("#baseAmount").val(baseAmt);
            $("#limitAmount").val(limitAmt);
            $('tr[id=rUnit]').remove();
            $('#addUnit').click();
        }
    });

    var idTr = "";
    $("#rangetable").on('click', '#editRowAmount', function() {
        idTr = $(this).closest("tr").attr("id"); //$('.rowAmountRange').attr("id");
        var idRow = idTr.replace('rApproval', '');
        //var rangeAmount = $(this).closest("tr").find("input").eq(0).val();
        var proposed = $(this).closest("tr").find("textarea").eq(0).val();
        var checked = $(this).closest("tr").find("textarea").eq(1).val();
        var approved = $(this).closest("tr").find("textarea").eq(2).val();

        var propCount = proposed.split(",");
        var checkCount = checked.split(",");
        var apprCount = approved.split(",");

        $('tr[id=rUnit]').remove();

        var countRow = $('tr[id*=rUnit]').length;
        var newTr = '';
        var idx = 0;

        for (var i = 0; i < propCount.length; i++) {

            if (propCount[i] == "") {
                continue;
            }

            var selectedJobTitleName = proposed.split(",")[i].split("[(\\)]")[0];
            var propid = $('#proposedAptDtlId' + idRow).val().split(",");

            newTr += '<tr class="rowUnit" id="rUnit">' +
            '<td><select class="form-control mandatory approvalCode" id="ApprovalLevelCode' + (i + 1) + '" disabled>';

            for (proveIndex = 0; proveIndex < approveLevelInfo.length; proveIndex++) {
                if (countRow == 0) {
                    if (approveLevelInfo[proveIndex] == "Proposed") {
                        newTr += '<option value="' + approveLevelInfo[proveIndex] + '" selected>' + approveLevelInfo[proveIndex] + '</option>';
                    }
                } else if (approveLevelInfo[proveIndex] != "Proposed") {
                    newTr += '<option value="' + approveLevelInfo[proveIndex] + '">' + approveLevelInfo[proveIndex] + '</option>';
                }
            }

            newTr +=
                '</td> ' +
                '<td><select class="form-control mandatory jobTitle" id="IdTb_OPL_JobTItles' + (i + 1) + '" disabled>';

            for (titleIndex = 0; titleIndex < jobTitleNameInfo.length; titleIndex++) {
                if (jobTitleNameInfo[titleIndex] == selectedJobTitleName) {
                    newTr += '<option value="' + (titleIndex + 1) + '" selected>' + jobTitleNameInfo[titleIndex] + '</option>';
                }
                else {
                    newTr += '<option value="' + (titleIndex + 1) + '">' + jobTitleNameInfo[titleIndex] + '</option>';
                }
            }

            newTr +=
                '</td>' +
                '<td><input id="proposedAptDtlId' + (i) + '" type="hidden" value="' + propid[i] + '" />' +
                    '<div class="input-group"><select class="form-control mandatory" disabled><option value="" selected>Role Setting</option></select><span class="input-group-btn"><button class="btn btn-danger font-bold add_item fa fa-minus" id="deleteRow" type="button"></button></span></div></td>' +
                '</tr>';
        }

        for (var i = 0; i < checkCount.length; i++) {

            if (checkCount[i] == "") {
                continue;
            }
            var countChecked = propCount.length;
            var selectedJobTitleName = checked.split(",")[i].split("(")[0];
            var checkid = $('#checkedAptDtlId' + idRow).val().split(",");

            newTr += '<tr class="rowUnit" id="rUnit">' +
            '<td><select class="form-control mandatory approvalCode" id="ApprovalLevelCode' + (i + 1 + countChecked) + '">';


            for (proveIndex = 0; proveIndex < approveLevelInfo.length; proveIndex++) {
                if (approveLevelInfo[proveIndex] == "Checked") {
                    newTr += '<option value="' + approveLevelInfo[proveIndex] + '" selected>' + approveLevelInfo[proveIndex] + '</option>';
                }
                else if (approveLevelInfo[proveIndex] != "Proposed") {
                    newTr += '<option value="' + approveLevelInfo[proveIndex] + '">' + approveLevelInfo[proveIndex] + '</option>';
                }
            }

            newTr +=
                '</td> ' +
                '<td><select class="form-control mandatory jobTitle" id="IdTb_OPL_JobTItles' + (i + 1 + countChecked) + '">';

            var jobSelectedPorp = $(this).closest("tr").find("input[id*=proposedId]").val().trim();
            var jobCheck = $(this).closest("tr").find("input[id*=checkedId]").val().split(",");
            var titleCheck = [];
            for (var k = 0; k < jobCheck.length; k++) {
                var checkTitles = jobCheck[k].trim();
                if (k < idx) {
                    titleCheck.push(checkTitles);
                    var checkList = titleCheck.join(',');
                }
            }
            var proveJobsCheck = [];
            var jobSelectedCheck = $(this).closest("tr").find("input[id*=approvedId]").val().split(",");
            for (var j = 0; j < jobSelectedCheck.length; j++) {
                var ljobsCheck = jobSelectedCheck[j].trim();
                proveJobsCheck.push(ljobsCheck);
                var jobsCheck = proveJobsCheck.join(',');
            }
            for (titleIndex = 0; titleIndex < jobTitleNameInfo.length; titleIndex++) {
                if (jobSelectedPorp.match(titleIndex + 1) != null) {
                    continue;
                }
                if (jobsCheck.match(titleIndex + 1) != null) {
                    continue;
                }
                if (i === idx && i !== 0) {
                    if (checkList.match(titleIndex + 1) != null) {
                        continue;
                    }
                }
                if (jobTitleNameInfo[titleIndex] == selectedJobTitleName.trim()) {
                    newTr += '<option value="' + (titleIndex + 1) + '" selected>' + jobTitleNameInfo[titleIndex] + '</option>';
                }
                else {
                    newTr += '<option value="' + (titleIndex + 1) + '">' + jobTitleNameInfo[titleIndex] + '</option>';
                }
            }
            idx++;
            newTr +=
                '</td>' +
                '<td><input id="checkedAptDtlId' + (i) + '" type="hidden" value="' + checkid[i] + '" />' +
                '<div class="input-group"><select class="form-control mandatory" id=rolesettinglist' + (i + 1 + countChecked) + ' disabled><option value="" selected>Role Setting</option><option value="MS">Must Sign</option><option value="NMS">Not Must Sign</option></select><span class="input-group-btn"><button class="btn btn-danger font-bold add_item fa fa-minus" id="deleteRow" type="button"></button></span></div></td>' +
                '</tr>';
        }

        idx = 0;

        for (var i = 0; i < apprCount.length; i++) {

            if (apprCount[i] == "") {
                continue;
            }

            var countProved = 0;
            for (var c = 0; c < checkCount.length; c++) {
                if (checkCount[c] != "") {
                    countProved++;
                }
            }

            var selectedJobTitleName = approved.split(",")[i].split("(")[0];
            var selectedRoleSettingId = approved.split("(")[1].replace(')', '');
            var appid = $('#approvedAptDtlId' + idRow).val().split(",");

            newTr += '<tr class="rowUnit" id="rUnit">' +
            '<td><select class="form-control mandatory approvalCode" id="ApprovalLevelCode' + (i + 2 + countProved) + '">';

            for (proveIndex = 0; proveIndex < approveLevelInfo.length; proveIndex++) {
                if (approveLevelInfo[proveIndex] == "Approved") {
                    newTr += '<option value="' + approveLevelInfo[proveIndex] + '" selected>' + approveLevelInfo[proveIndex] + '</option>';
                }
                else if (approveLevelInfo[proveIndex] != "Proposed") {
                    newTr += '<option value="' + approveLevelInfo[proveIndex] + '">' + approveLevelInfo[proveIndex] + '</option>';
                }
            }

            newTr +=
                '</td> ' +
                '<td><select class="form-control mandatory jobTitle" id="IdTb_OPL_JobTItles' + (i + 2 + countProved) + '">';

            var jobSelectedprove = $(this).closest("tr").find("input[id*=proposedId]").val().trim();
            var proveJobs = [];
            var jobId = $(this).closest("tr").find("input[id*=checkedId]").val().split(",");
            for (var j = 0; j < jobId.length; j++) {
                var ljobs = jobId[j].trim();
                proveJobs.push(ljobs);
                var jobs = proveJobs.join(',');
            }
            var jobApp = $(this).closest("tr").find("input[id*=approvedId]").val().split(",");
            var titleApp = [];
            for (var m = 0; m < jobApp.length; m++) {
                var appTitles = jobApp[m].trim();
                if (m < idx) {
                    titleApp.push(appTitles);
                    var appList = titleApp.join(',');
                }
            }
            for (titleIndex = 0; titleIndex < jobTitleNameInfo.length; titleIndex++) {
                if (jobSelectedprove.match(titleIndex + 1) != null) {
                    continue;
                }
                if (jobs.match(titleIndex + 1) != null) {
                    continue;
                }
                if (i === idx && i !== 0) {
                    if (appList.match(titleIndex + 1) != null) {
                        continue;
                    }
                }
                if (jobTitleNameInfo[titleIndex] == selectedJobTitleName.trim()) {
                    newTr += '<option value="' + (titleIndex + 1) + '" selected>' + jobTitleNameInfo[titleIndex] + '</option>';
                }
                else {
                    newTr += '<option value="' + (titleIndex + 1) + '">' + jobTitleNameInfo[titleIndex] + '</option>';
                }
            }
            idx++;
            newTr +=
                    '</td>' +
                    '<td><input id="approvedAptDtlId' + (i) + '" type="hidden" value="' + appid[i] + '" />' +
                    '<div class="input-group"><select class="form-control mandatory" id=rolesettinglist' + (i + 2 + countProved) + '>';
            newTr += '<option value="MS">Must Sign</option>';

            if (selectedRoleSettingId == "NMS") {
                newTr += '<option value="NMS" selected>Not Must Sign</option>';
            }
            else {
                newTr += '<option value="NMS">Not Must Sign</option>';
            }
            newTr += '</select><span class="input-group-btn"><button class="btn btn-danger font-bold add_item fa fa-minus" id="deleteRow" type="button"></button></span></div></td></tr>';


        }

        $('#mtable > tbody').append(newTr);

        // For sett select if changed
        $('.approvalCode').change(function() {
            var idCode = $(this).attr('id');
            var itemId = idCode.replace('ApprovalLevelCode', '');
            var codeLevl = $(this).val();
            var settrolelist = $('#rolesettinglist' + itemId).find("option").length;//$('#rolesettinglist' + itemId + ' option').length;
            if (codeLevl == "Approved" && settrolelist == 3) {
                $('#rolesettinglist' + itemId + ' option:selected').remove();
                $('#rolesettinglist' + itemId + '').attr("disabled", false);
            } else if (settrolelist == 2 && codeLevl == "Checked") {
                var newOpsi = '<option selected="selected" value="">Role Setting</option>';
                $('#rolesettinglist' + itemId + '').append(newOpsi);
                $('#rolesettinglist' + itemId + '').attr("disabled", true);
            }
        });

        var allRange = $(this).closest("tr").find("input").val();
        var rangeVal = allRange.split(" - ");
        $('#baseAmount').val(rangeVal[0]);
        $('#limitAmount').val(rangeVal[1]);

        $('button[id=show]').attr("style", "display: none");
        $('button[id=editsave]').removeAttr("style");
        $('button[id*=deleteRow]').first().attr("disabled", "disabled");
        $('#IdTb_OPL_Module').attr("disabled", "disabled");
        $('#BranchName').attr("disabled", "disabled");
        $('#limitAmount').attr("readonly", "readonly");
        $('a[id=deleteRowAmount]').attr("disabled", "disabled");
        $('a[id=editRowAmount]').attr("disabled", "disabled");

        return false;
    });

    $('#editsave').click(function() {
        var listcode = [];
        var codetext = $('.approvalCode option:selected');
        for (var t = 0; t < codetext.length; t++) {
            listcode.push(codetext[t].innerHTML);
        }
        var textCode = listcode.join(',');
        if (textCode.search("Approved") == -1) {
            //$('input[name="statusButton"]').attr('type', 'button').attr('data-toggle', 'modal').attr('data-target', '#levelModal').click();
            $('#CodelevelModal').modal();
            $('#mtable > tbody').find("tr[class=rowAmountRange]").remove(); //$('#mtable > tbody').find("tr[id=rApproval1]").remove(); //attr("style", "display: none");
            return false;
        }

        var jobpropose = [];
        var jobcheck = [];
        var jobapprove = [];

        var jobproposeid = [];
        var jobcheckid = [];
        var jobapproveid = [];

        var levelproposed = [];
        var levelchecked = [];
        var levelapproved = [];

        var rsettingproposed = [];
        var rsettingchecked = [];
        var rsettingapproved = [];

        var proposedtlid = [];
        var checkdtlid = [];
        var approvedtlid = [];

        var editValList = $('select[id*=ApprovalLevelCode]');
        var editIdx = idTr.replace('rApproval', '');
        for (var i = 0; i < editValList.length; i++) {
            var selectUnit = editValList[i];
            var idUnit = selectUnit.id.replace('ApprovalLevelCode', '');
            var approvalLevelSelect = $('#ApprovalLevelCode' + idUnit + ' option:selected').val();
            var jobpositionSelect = $('#IdTb_OPL_JobTItles' + idUnit + ' option:selected').text();
            var provelevelid = $('#IdTb_OPL_JobTItles' + idUnit + ' option:selected').val();
            var rolesettingselect = $('#rolesettinglist' + idUnit + ' option:selected').val();

            var proposeid = $('#proposedAptDtlId' + editIdx).val();
            if (proposeid == "" || proposeid == null) {
                proposeid = "0";
            }

            var checkid = $('#checkedAptDtlId' + editIdx).val();
            if (checkid == "" || checkid == null) {
                checkid = "0";
            }

            var approveid = $('#approvedAptDtlId' + editIdx).val();
            if (approveid == "" || approveid == null) {
                approveid = "0";
            }

            if (approvalLevelSelect == "Proposed") {
                jobpropose.push(jobpositionSelect);
                jobproposeid.push(provelevelid);
                levelproposed.push(approvalLevelSelect);
                rsettingproposed.push(rolesettingselect);
                proposedtlid.push(proposeid);

            } else if (approvalLevelSelect == "Checked") {
                jobcheck.push(jobpositionSelect);
                jobcheckid.push(provelevelid);
                levelchecked.push(approvalLevelSelect);
                rsettingchecked.push(rolesettingselect);
                checkdtlid.push(checkid);

            } else if (approvalLevelSelect == "Approved") {
                jobapprove.push(jobpositionSelect);
                jobapproveid.push(provelevelid);
                levelapproved.push(approvalLevelSelect);
                rsettingapproved.push(rolesettingselect);
                approvedtlid.push(approveid);
            }
        }

        var arrlist = [];
        for (var j = 0; j < jobapprove.length; j++) {
            var arr = jobapprove[j] + "(" + rsettingapproved[j] + ")";
            arrlist.push(arr);
        }

        $('#proposedBy' + editIdx + '').val(jobpropose.join(", "));
        $('#checkedBy' + editIdx + '').val(jobcheck.join(", "));
        $('#approvedBy' + editIdx + '').val(arrlist.join(", "));

        $('#proposedId' + editIdx + '').val(jobproposeid.join(", "));
        $('#checkedId' + editIdx + '').val(jobcheckid.join(", "));
        $('#approvedId' + editIdx + '').val(jobapproveid.join(", "));

        $('#proposedlevel' + editIdx + '').val(levelproposed.join(", "));
        $('#checkedlevel' + editIdx + '').val(levelchecked.join(", "));
        $('#approvedlevel' + editIdx + '').val(levelapproved.join(", "));

        $('#proposedsetting' + editIdx + '').val(rsettingproposed.join(", "));
        $('#checkedsetting' + editIdx + '').val(rsettingchecked.join(", "));
        $('#approvedsetting' + editIdx + '').val(rsettingapproved.join(", "));

        $('#proposedAptDtlId' + editIdx + '').val(proposedtlid.join(", "));
        $('#checkedAptDtlId' + editIdx + '').val(checkdtlid.join(", "));
        $('#approvedAptDtlId' + editIdx + '').val(approvedtlid.join(", "));

        var range = $('tr[class*=rowAmountRange]').last().find('input[id*=amount]').val();
        var rangVal = range.split(" - ");
        var rangConvrt = parseFloat(rangVal[1].replace(/,/g, '').replace(' ', ''));

        var num = rangConvrt + 1;
        var numStr = num.toString();

        s1 = reverseChars(numStr);	//reverse number
        s2 = dot(s1, 3);				//put decimals at desired intervals
        resultBase = reverseChars(s2);
        $('#baseAmount').val(resultBase);

        num = rangConvrt + 2;
        numStr = num.toString();
        s1 = reverseChars(numStr);	//reverse number
        s2 = dot(s1, 3);				//put decimals at desired intervals
        resultLimit = reverseChars(s2);
        $('#limitAmount').val(resultLimit);

        $('tr[id*=rUnit]').remove();
        $('#addUnit').click();
        $('button[id=deleteRow]').attr("disabled", "disabled");
        $('#limitAmount').attr("readonly", false);
        $('#IdTb_OPL_Module').attr("disabled", false);
        $('#BranchName').attr("disabled", false);
        $('a[id*=deleteRowAmount]').attr("disabled", "disabled");
        $('a[id*=deleteRowAmount]').last().attr("disabled", false);
        $('button[id=editsave]').attr("style", "display: none");
        $('button[id=show]').removeAttr("style");
        $('a[id=editRowAmount]').attr("disabled", false);
    });
});

function getRangeAmount(range) {
    var rangVal = range.split(" - ");
    var rangConvrtBase = parseFloat(rangVal[0].replace(/,/g, '').replace(' ', ''));
    var rangConvrtLimit = parseFloat(rangVal[1].replace(/,/g, '').replace(' ', ''));

    var numBase = rangConvrtBase;
    var numLimit = rangConvrtLimit;
    var numBaseStr = numBase.toString();
    var numLimitStr = numLimit.toString();

    var s1 = reverseChars(numBaseStr);	//reverse number
    var s2 = dot(s1, 3);				//put decimals at desired intervals
    var s3 = reverseChars(numLimitStr);
    var s4 = dot(s3, 3);

    var resultBase = reverseChars(s2);
    var resultLimit = reverseChars(s4);

    var result = resultBase + " - " + resultLimit;
    return result;
}

function setNewRangeAmount(range) {
    var rangVal = range.split(" - ");
    var rangConvrtLimit = parseFloat(rangVal[1].replace(/,/g, '').replace(' ', ''));

    var numBase = rangConvrtLimit + 1;
    var numLimit = rangConvrtLimit + 2;
    var numBaseStr = numBase.toString();
    var numLimitStr = numLimit.toString();

    var s1 = reverseChars(numBaseStr);	//reverse number
    var s2 = dot(s1, 3);				//put decimals at desired intervals
    var s3 = reverseChars(numLimitStr);
    var s4 = dot(s3, 3);

    var newBaseAmt = reverseChars(s2);
    var newLimitAmt = reverseChars(s4);

    $('#baseAmount').val(newBaseAmt).attr("readonly", "readonly");
    $('#limitAmount').val(newLimitAmt);

    return false;
}

function getTotalRow() {
    var countRow = $("tr[class*=rowUnit]").length;

    return countRow;
}

function getTotalRowApprovalInformation() {
    var count = $("tr[class*=rowApprovalInformation]").length;

    return count;
}

function getRoleSettingId(roleSettingName) {
    var roleSettingId = 0;
    if (roleSettingName != null) {
        if (roleSettingName.contains("NMS")) {
            roleSettingId = 2;
        }
        else if (roleSettingName.contains("MS")) {
            roleSettingId = 1;
        }
    }

    return roleSettingId;
}

function reverseChars(theString) {		//reverse a string character by character
    var revStr = "";
    for (var i = theString.length - 1; i > -1; i--) {
        revStr += theString.charAt(i);
    };
    return revStr;
};

function dot(reversedString, chunks) {     //chunks is how many #'s in between ,'s
    var dotStr = "";
    for (var j = 0; j < reversedString.length; j++) {
        if (j > 0 && j % chunks == 0) {
            dotStr += "," + reversedString.charAt(j);
        } else {
            dotStr += reversedString.charAt(j);
        };
    };
    return dotStr;
};

$(document).ready(function() {

    $('#datePic').datepicker({ startDate: new Date() }).datepicker('update', new Date());

    $('#show').click(function() {
        $('#ApprovalInformation').show();
    });

});

