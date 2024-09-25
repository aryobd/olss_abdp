function CheckBoxSTNK(index) {
    var CheckedSTNK = 0;
    if ($("#SelectedStnk_" + index).is(':checked')) {
        $("#ProgressStatusStnk_" + index).prop("disabled", false);
        $("#ProgressStatusStnk_" + index).attr("onChange", "changeSTNK(" + index + ",this.value)");
        $("#ProgressStatusStnk_" + index).attr("onBlur", "changeSTNK(" + index + ",this.value),validationStnk(" + index + ")");
        $("#SelectedStnk_" + index).prop("name", "OPLUnit[" + index + "].IsChecked")
        $("#OPLUnitSTNKOPLId_" + index).prop("name", "OPLUnit[" + index + "].IdTb_OPL_Unit");
        $("#OPLUnitSTNKDocValue_" + index).prop("name", "OPLUnit[" + index + "].DocValue");
        $("#ProgressStatusStnk_" + index).prop("name", "OPLUnit[" + index + "].ProgresStnk");
        validationStnk(index)
        CheckedSTNK = CheckedSTNK + 1;
    } else {        
        $("#erroProgresStnk_" + index).hide();
        $("#startDateStnk_" + index).prop("readonly", true);
        $("#endDateSTNK_" + index).prop("readonly", true);
        $("#ProgressStatusStnk_" + index).prop("disabled", true);
        $("#startDateStnk_" + index).val('')
        $("#endDateSTNK_" + index).val('')
        $("#SelectedStnk_" + index).removeAttr("name");
        $("#OPLUnitSTNKOPLId_" + index).removeAttr("name");
        $("#OPLUnitSTNKDocValue_" + index).removeAttr("name");        
        $("#ProgressStatusStnk_" + index).removeAttr("name");
        $("#ProgressStatusStnk_" + index).removeAttr("onChange");
        $("#ProgressStatusStnk_" + index).removeAttr("onBlur");
        $("#ProgressStatusStnk_" + index).val("0");
        $("#startDateStnk_" + index).removeAttr("name");
        $("#endDateSTNK_" + index).removeAttr("name");
        CheckedSTNK = index - 1;
        validationStnk(CheckedSTNK)
    }
}

function changeSTNK(index, val) {
    if (val == 8) {
        $("#startDateStnk_" + index).prop("readonly", false);
        $("#endDateSTNK_" + index).prop("readonly", false);
        $("#newPoliceNumber_" + index).prop("readonly", false);
        $("#startDateStnk_" + index).datepicker({
            format: "mm/dd/yyyy"
        });
        $("#endDateSTNK_" + index).datepicker({
            format: "mm/dd/yyyy"
        });
        $("#startDateStnk_" + index).prop("name", "OPLUnit[" + index + "].StartSTNK");
        $("#endDateSTNK_" + index).prop("name", "OPLUnit[" + index + "].EndSTNK");
        $("#newPoliceNumber_" + index).prop("name", "OPLUnit[" + index + "].NewPoliceNumber");
        
    } else {
        $("#startDateStnk_" + index).prop("readonly", true);
        $("#endDateSTNK_" + index).prop("readonly", true);
        $("#newPoliceNumber_" + index).prop("readonly", true);
        $("#newPoliceNumber_" + index).val('')
        $("#startDateStnk_" + index).val('')
        $("#endDateSTNK_" + index).val('')
        $("#startDateStnk_" + index).datepicker('remove');
        $("#endDateSTNK_" + index).datepicker('remove');
        $("#startDateStnk_" + index).removeAttr("name");
        $("#endDateSTNK_" + index).removeAttr("name");
        $("#newPoliceNumber_" + index).removeAttr("name");
    }
}

function CheckBoxKEUR(index) {
    var CheckedKEUR = 0;
    if ($("#SelectedKeur_" + index).is(':checked')) {
        $("#ProgressStatusKeur_" + index).prop("disabled", false);
        $("#ProgressStatusKeur_" + index).attr("onChange", "changeKEUR(" + index + ",this.value)");
        $("#ProgressStatusKeur_" + index).attr("onBlur", "changeKEUR(" + index + ",this.value),validationKeur(" + index + ")");
        $("#SelectedKeur_" + index).prop("name", "OPLUnit[" + index + "].IsChecked")
        $("#OPLUnitKEURIdTb_OPL_Unit_" + index).prop("name", "OPLUnit[" + index + "].IdTb_OPL_Unit");
        $("#OPLUnitKEURDocValue_" + index).prop("name", "OPLUnit[" + index + "].DocValue");
        $("#ProgressStatusKeur_" + index).prop("name", "OPLUnit[" + index + "].ProgressKeur");
        validationStnk(index)
        CheckedKEUR = CheckedKEUR + 1;
    } else {
        $("#startDateKeur_" + index).prop("readonly", true);
        $("#endDateKEUR_" + index).prop("readonly", true);
        $("#startDateKeur_" + index).val('')
        $("#endDateKEUR_" + index).val('')
        $("#SelectedKeur_" + index).removeAttr("name");
        $("#OPLUnitKEURIdTb_OPL_Unit_" + index).removeAttr("name");
        $("#OPLUnitKEURDocValue_" + index).removeAttr("name");
        $("#ProgressStatusKeur_" + index).prop("disabled", true);
        $("#ProgressStatusKeur_" + index).removeAttr("");
        $("#ProgressStatusKeur_" + index).removeAttr("name");
        $("#ProgressStatusKeur_" + index).removeAttr("onChange");
        $("#ProgressStatusKeur_" + index).removeAttr("onBlur");
        $("#ProgressStatusKeur_" + index).val('0');
        $("#startDateKeur_" + index).removeAttr("name");
        $("#endDateKEUR_" + index).removeAttr("name");
        CheckedKEUR = index - 1;
        validationKeur(CheckedKEUR)
    }
}

function changeKEUR(index, val) {
    if (val == 8) {
        $("#startDateKeur_" + index).prop("readonly", false);
        $("#endDateKEUR_" + index).prop("readonly", false);
        $("#startDateKeur_" + index).datepicker({
            format: "mm/dd/yyyy"
        });
        $("#endDateKEUR_" + index).datepicker({
            format: "mm/dd/yyyy"
        });
        $("#endDateKEUR_" + index).datepicker();
        $("#startDateKeur_" + index).prop("name", "OPLUnit[" + index + "].StartKEUR");
        $("#endDateKEUR_" + index).prop("name", "OPLUnit[" + index + "].EndKEUR");

    } else {
        $("#startDateKeur_" + index).prop("readonly", true);
        $("#endDateKEUR_" + index).prop("readonly", true);
        $("#startDateKeur_" + index).val('')
        $("#endDateKEUR_" + index).val('')
        $("#startDateKeur_" + index).datepicker('remove');
        $("#endDateKEUR_" + index).datepicker('remove');
        $("#startDateKeur_" + index).removeAttr("name");
        $("#endDateKEUR_" + index).removeAttr("name");
    }
}

function CheckBoxPolis(index, dayDiff) {
    var CheckedPOLIS = 0;
    if ($("#SelectedPolis_" + index).is(':checked')) {
        $("#startDatePolis_" + index).prop("readonly", false);
        $("#endDatePolis_" + index).prop("readonly", false);
        $("#companyInsurance_" + index).prop("readonly", false);
        $("#insuranceNo_" + index).prop("readonly", false);

        $(".form-control.datepicker-polis").each(function () {
            if (typeof ($(this).attr("readonly")) == "undefined")
                $(this).datepicker({
                    format: "mm/dd/yyyy"
                });
        });

        $(".form-control.datepicker-polis .input-group-addon").each(function () {
            if (typeof ($(this).attr("readonly")) == "undefined")
                $(this).on("click", function () {
                    $(this).closest(".form-control.datepicker-polis").datepicker('show');
                });
        });

        $("#SelectedPolis_" + index).prop("name", "OPLUnit[" + index + "].IsChecked")
        $("#OPLUnitPolisIdTb_OPL_Unit_" + index).prop("name", "OPLUnit[" + index + "].IdTb_OPL_Unit");
        $("#OPLUnitPolisDocValue_" + index).prop("name", "OPLUnit[" + index + "].DocValue");

        validationPolis(index)
        CheckedPOLIS = CheckedPOLIS + 1;
    } else {
        $("#startDatePolis_" + index).prop("readonly", true);
        $("#endDatePolis_" + index).prop("readonly", true);
        $("#companyInsurance_" + index).prop("readonly", true);
        $("#insuranceNo_" + index).prop("readonly", true);
        $("#startDatePolis_" + index).val($("#OPLUnitPolisStartDate_" + index).val());
        $("#endDatePolis_" + index).val($("#OPLUnitPolisEndDate_" + index).val());
        $("#SelectedPolis_" + index).removeAttr("name");
        CheckedPOLIS = index - 1;
        validationPolis(CheckedPOLIS);
    }
}

function isNullOrWhitespace(input) {
    return !input || !input.trim();
}

function validationPolis(index) {
    var noDiff = true;
    var noEmptyDt = false;
    var noEmptyICo = false;
    var noEmptyINo = false;

    var AgrNoL = "";
    var InsCoL = "";
    var InsNoL = "";
    var sDateL = "";
    var eDateL = "";    

    $("#table-list-polis input[type=checkbox]:checked").each(function () {
        var row = $(this).closest("tr");
        var rI = row[0].rowIndex - 1;

        if ($("#startDatePolis_" + rI).val() == ""
        || $("#endDatePolis_" + rI).val() == "") {
            noEmptyDt = false;
        } else if ($("#startDatePolis_" + rI).val() != "" && $("#endDatePolis_" + rI).val() != "") {
            if ($("#startDatePolis_" + rI).val() >= $("#endDatePolis_" + rI).val()) {
                $("#erroStartPolis_" + rI).html("start date must not be greater than or equal to the end date");
                $("#erroEndPolis_" + rI).html("end date can not be smaller or equal to the start date");
                $("#erroStartPolis_" + rI).show();
                $("#erroEndPolis_" + rI).show();
                noEmptyDt = false;
            }
            if ($("#startDatePolis_" + rI).val() < $("#endDatePolis_" + rI).val()) {
                $("#erroStartPolis_" + rI).html("");
                $("#erroEndPolis_" + rI).html("");
                $("#erroStartPolis_" + rI).hide();
                $("#erroEndPolis_" + rI).hide();
                noEmptyDt = true;
            }
        }

        if (isNullOrWhitespace($("#companyInsurance_" + rI).val())) {
            $("#erroCompanyInsurance_" + rI).html("company insurance is empty");
            $("#erroCompanyInsurance_" + rI).show();
            noEmptyICo = false;
        } else {
            $("#erroCompanyInsurance_" + rI).html("");
            $("#erroCompanyInsurance_" + rI).hide();
            noEmptyICo = true;
        }

        if (isNullOrWhitespace($("#insuranceNo_" + rI).val())) {
            $("#erroInsuranceNo_" + rI).html("insurance policy number is empty");
            $("#erroInsuranceNo_" + rI).show();
            noEmptyINo = false;
        } else {
            $("#erroInsuranceNo_" + rI).html("");
            $("#erroInsuranceNo_" + rI).hide();
            noEmptyINo = true;
        }

        var AgrNo = row[0].cells[0].innerHTML;
        var InsCo = row.find("#companyInsurance_" + rI).val();
        var InsNo = row.find("#insuranceNo_" + rI).val();
        var sDate = row.find("#startDatePolis_" + rI).val();
        var eDate = row.find("#endDatePolis_" + rI).val();

        if (AgrNoL != "" || InsCoL != "" || InsNoL != ""
            || sDateL != "" || eDateL != "") {

            if (AgrNoL == AgrNo) {
                if (InsCoL != InsCo) {
                    $("#erroCompanyInsurance_" + index).html("company insurance is different");
                    $("#erroCompanyInsurance_" + index).show();
                    noDiff = false;
                    return false;
                } else {
                    $("#erroCompanyInsurance_" + index).html("");
                    $("#erroCompanyInsurance_" + index).hide();
                    noDiff = true;
                }

                if (InsNoL != InsNo) {
                    $("#erroInsuranceNo_" + index).html("insurance policy number is different");
                    $("#erroInsuranceNo_" + index).show();
                    noDiff = false;
                    return false;
                } else {
                    $("#erroInsuranceNo_" + index).html("");
                    $("#erroInsuranceNo_" + index).hide();
                    noDiff = true;
                }

                if (sDateL != sDate) {
                    $("#erroStartPolis_" + index).html("start date is different");
                    $("#erroStartPolis_" + index).show();
                    noDiff = false;
                    return false;
                } else {
                    $("#erroStartPolis_" + index).html("");
                    $("#erroStartPolis_" + index).show();
                    noDiff = true;
                }

                if (eDateL != eDate) {
                    $("#erroEndPolis_" + index).html("end date is different");
                    $("#erroEndPolis_" + index).show();
                    noDiff = false;
                    return false;
                } else {
                    $("#erroEndPolis_" + index).html("");
                    $("#erroEndPolis_" + index).show();
                    noDiff = true;
                }
            }

        }

        AgrNoL = AgrNo;
        InsCoL = InsCo;
        InsNoL = InsNo;
        sDateL = sDate;
        eDateL = eDate;
    });

    if (noDiff && noEmptyDt && noEmptyICo && noEmptyINo) {
        $("#savePolis").prop("disabled", false);
    } else {
        $("#savePolis").prop("disabled", true);
    }
}

function validationStnk(index) {
    if (index < 0)
        index = 0;
    if ($("#newPoliceNumber_" + index).val().length == 0 && $("#ProgressStatusStnk_" + index).prop('readonly') == true) {
        $("#erroPoliceNumber_" + index).html("Police Number cannot be blank");
        $("#erroPoliceNumber_" + index).show();
    } else if ($("#newPoliceNumber_" + index).val().length == 0 && $("#ProgressStatusStnk_" + index).prop('readonly') == false) {
        $("#erroPoliceNumber_" + index).html("Police Number cannot be blank");
        $("#erroPoliceNumber_" + index).show();
    } else if ($("#newPoliceNumber_" + index).val().length > 0 && $("#ProgressStatusStnk_" + index).prop('readonly') == false) {
        $("#erroPoliceNumber_" + index).html("");
        $("#erroPoliceNumber_" + index).hide();
    }

    if ($("#ProgressStatusStnk_" + index).val() == 0) {
        $("#erroProgresStnk_" + index).html("Options have not been selected");
        $("#erroProgresStnk_" + index).show();
    } else if ($("#ProgressStatusStnk_" + index).val() > 0) {
        $("#erroProgresStnk_" + index).html("");
        $("#erroProgresStnk_" + index).hide();
    }
    if ($("#startDateStnk_" + index).val().length == 0 || $("#endDateSTNK_" + index).val().length == 0) {
        $("#saveStnk").prop("disabled", true);
    } else if ($("#startDateStnk_" + index).val().length > 0 && $("#endDateSTNK_" + index).val().length > 0) {
        var tglawal = Date.parse($("#startDateStnk_" + index).val());
        var tglakhir = Date.parse($("#endDateSTNK_" + index).val());
        if (tglawal >= tglakhir) {
            $("#erroStartSTNK_" + index).html("start date must not be greater than or equal to the end date");
            $("#erroEndSTNK_" + index).html("end date can not be smaller or equal to the start date");
            $("#erroStartSTNK_" + index).show();
            $("#erroEndSTNK_" + index).show();
            $("#saveStnk").prop("disabled", true);
        }
        if (tglawal < tglakhir) {
            $("#erroStartSTNK_" + index).html("");
            $("#erroEndSTNK_" + index).html("");
            $("#saveStnk").prop("disabled", false);
            $("#erroStartSTNK_" + index).hide();
            $("#erroEndSTNK_" + index).hide();
        }
    }

    if ($("#ProgressStatusStnk_" + index).prop("disabled") == true && $("#ProgressStatusStnk_" + index).val() == 0) {
        $("#erroProgresStnk_" + index).html("");
        $("#erroProgresStnk_" + index).hide();
    }

    if ($("#ProgressStatusStnk_" + index).prop("disabled") == false && $("#ProgressStatusStnk_" + index).val() > 0 && $("#startDateStnk_" + index).prop("readonly") == true && $("#endDateSTNK_" + index).prop("readonly") == true && $("#startDateStnk_" + index).val().length == 0 && $("#endDateSTNK_" + index).val().length == 0) {
        $("#saveStnk").prop("disabled", false);
    }
}

function validationKeur(index) {
    if (index < 0)
        index = 0;
    if ($("#ProgressStatusKeur_" + index).val() == 0) {
        $("#erroProgresKeur_" + index).html("Options have not been selected");
        $("#erroProgresKeur_" + index).show();
    } else if ($("#ProgressStatusKeur_" + index).val() > 0) {
        $("#erroProgresKeur_" + index).html("");
        $("#erroProgresKeur_" + index).hide();
    }
    if ($("#startDateKeur_" + index).val().length == 0 || $("#endDateKEUR_" + index).val().length == 0) {
        $("#saveKeur").prop("disabled", true);
    } else if ($("#startDateKeur_" + index).val().length > 0 && $("#endDateKEUR_" + index).val().length > 0) {
        var tglawal = Date.parse($("#startDateKeur_" + index).val());
        var tglakhir = Date.parse($("#endDateKEUR_" + index).val());
        if (tglawal >= tglakhir) {
            $("#erroStartKEUR_" + index).html("start date must not be greater than or equal to the end date");
            $("#erroEndKEUR_" + index).html("end date can not be smaller or equal to the start date");
            $("#erroStartKEUR_" + index).show();
            $("#erroEndKEUR_" + index).show();
            $("#saveKeur").prop("disabled", true);
        }
        if (tglawal < tglakhir) {
            $("#erroStartKEUR_" + index).html("");
            $("#erroEndKEUR_" + index).html("");
            $("#saveKeur").prop("disabled", false);
            $("#erroStartKEUR_" + index).hide();
            $("#erroEndKEUR_" + index).hide();
        }
    }

    if ($("#ProgressStatusKeur_" + index).prop("disabled") == true && $("#ProgressStatusKeur_" + index).val() == 0) {
        $("#erroProgresStnk_" + index).html("");
        $("#erroProgresStnk_" + index).hide();
    }

    if ($("#ProgressStatusKeur_" + index).prop("disabled") == false && $("#ProgressStatusKeur_" + index).val() > 0 && $("#startDateKeur_" + index).prop("readonly") == true && $("#endDateKEUR_" + index).prop("readonly") == true && $("#startDateKeur_" + index).val().length == 0 && $("#endDateKEUR_" + index).val().length == 0) {
        $("#saveKeur").prop("disabled", false);
    }
}

function datagridstnk(a) {
    $('#table-list-stnk').each(function () {
        oTable1 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[17, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTComplementUnit/DataGridList?mode=1",
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
                { "mData" : "AgreementNumber" }, // S0113506
                { "mData" : "CustomerName" }, // S0113506

            { "mData": "PoliceNumber" },
                
                { "mData" : "ProductType" }, // S0113506
                { "mData" : "ChassisNumber" }, // S0113506
                { "mData" : "EngineNumber" }, // S0113506

            { "mData": "StatusUnit" },
            { "mData": "IsStnk" },
            { "mData": "EndDate" },
            { "mData": "RenewalBy" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterSelect++;
                    var id = oObj.aData["IdTb_OPL_Unit"];
                    
                    var endDate = new Date(oObj.aData["EndDate"]); // S0107506 - STNK KEUR for over 60 days
                    var today = new Date();
                    
                    //var timeDiff = Math.abs(endDate.getTime() - today.getTime());
                    var timeDiff = endDate.getTime() - today.getTime();
                    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    
                    var varCheckBox = "<div class='text-center'><input id='SelectedStnk_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxSTNK(" + CounterSelect + ")' /></div><input id='OPLUnitSTNKOPLId_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitSTNKDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";
                    
                    if (dayDiff > 60)
                        varCheckBox = "<div class='text-center'><input id='SelectedStnk_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxSTNK(" + CounterSelect + ")' disabled /></div><input id='OPLUnitSTNKOPLId_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitSTNKDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";
                    
                    return varCheckBox;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterOption++;
                    var id = oObj.aData["IdTb_OPL_Unit"]
                    var SelectOption = "<div class='text-center'>";
                    var StatusStnk = oObj.aData["ProgresStnk"];
                    var Sel1 = StatusStnk == 1 ? "selected" : ""
                    var Sel2 = StatusStnk == 2 ? "selected" : ""
                    var Sel3 = StatusStnk == 3 ? "selected" : ""
                    var Sel4 = StatusStnk == 4 ? "selected" : ""
                    var Sel5 = StatusStnk == 5 ? "selected" : ""
                    var Sel6 = StatusStnk == 6 ? "selected" : ""
                    var Sel7 = StatusStnk == 7 ? "selected" : ""
                    var Sel8 = StatusStnk == 8 ? "selected" : ""
                    SelectOption += "<select id='ProgressStatusStnk_" + CounterOption + "' class='form-control' style='width:100%;' disabled>";
                    SelectOption += "<option value='0'>Choose Your Selection</option>";
                    SelectOption += "<option value='1' " + Sel1 + ">Remind Customer</option>";
                    SelectOption += "<option value='2' " + Sel2 + ">Arrange Schedule with Customer</option>";
                    //SelectOption += "<option value='3' " + Sel3 + ">Customer return STNK</option>";
                    //SelectOption += "<option value='4' " + Sel4 + ">BAST STNK preparation</option>";
                    SelectOption += "<option value='5' " + Sel5 + ">Customer return STNK to DSF</option>";
                    SelectOption += "<option value='6' " + Sel6 + ">Deliver STNK to Biro Jasa</option>";
                    SelectOption += "<option value='7' " + Sel7 + ">Renewal STNK will be complete</option>";
                    SelectOption += "<option value='8' " + Sel8 + ">BAST STNK to Customer</option>";
                    SelectOption += "</select>";
                    SelectOption += "<span id='erroProgresStnk_" + CounterOption + "' class='field-validation-error' style='display: none;'></span>";
                    SelectOption += "</div>";                    
                    return SelectOption;
                    
                }
            },            
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterPoliceNumber++;
                    varHtmlNewPoliceNumber = "<input id='newPoliceNumber_" + CounterPoliceNumber + "' name='OPLUnit[" + CounterPoliceNumber + "].NewPoliceNumber' class='form-control' type='text' readonly onchange='validationStnk(" + CounterPoliceNumber + ")' onblur='validationStnk(" + CounterPoliceNumber + ")' style='width:100%;' /><span id='erroPoliceNumber_" + CounterPoliceNumber + "' class='field-validation-error' style='display: none;'></span>"; // ABDP - X0098743
                    return varHtmlNewPoliceNumber; // ABDP - X0098743
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterStart++;
                    varHtmlStartDate = "<div class='input-group date'><input id='startDateStnk_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].StartSTNK' class='form-control datepicker-stnk datepicker-stnk-start' type='text' data-date-format='MM/dd/yyyy' readonly onchange='validationStnk(" + CounterStart + ")' onblur='validationStnk(" + CounterStart + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroStartSTNK_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>"; // ABDP - X0098743
                    return varHtmlStartDate;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterEnd++;
                    varHtmlEndDate = "<div class='input-group date'><input id='endDateSTNK_" + CounterEnd + "' name='OPLUnit[" + CounterEnd + "].EndSTNK' class='form-control datepicker-stnk datepicker-stnk-end' type='text' data-date-format='MM/dd/yyyy' readonly onchange='validationStnk(" + CounterEnd + ")' onblur='validationStnk(" + CounterEnd + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroEndSTNK_" + CounterEnd + "' class='field-validation-error' style='display: none;'></span>"; // ABDP - X0098743
                    return varHtmlEndDate;
                }
            },            
            ],
            "fnServerData": function (sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "global": false,
                    "success": fnCallback,
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError // this sets up jQuery to give me errors
                });
            },
            "fnDrawCallback": function (oSettings) {
                CounterStart = -1;
                CounterEnd = -1;
                CounterSelect = -1;
                CounterOption = -1;
                CounterOptionKeur = -1;
                CounterPoliceNumber = -1;
            }
        });
        var htmlTemp1 = '<div id="paging1" class="dataTables_wrapper row table-list-stnk">';
        var fakePagination1 = $('#table-list-stnk_wrapper > div:eq(1)').html();
        var datatableInfo1 = $('#table-list-stnk_wrapper > div:eq(1) > div:eq(0) > #table-list-stnk_info');
        $('#table-list-stnk_wrapper > div:eq(1)').prop('style', 'display: none;');
        htmlTemp1 += fakePagination1 + '</div>';
        $('.table-stnk-responsive').append(htmlTemp1);
        $('.table-stnk-responsive > div:eq(1) > div:eq(1) > #table-list-stnk_paginate').remove();
        $('.table-stnk-responsive > #paging1 > div:eq(1)').append($('#table-list-stnk_paginate'));
        $('.table-stnk-responsive > div:eq(1) > div:eq(0) > #table-list-stnk_info').replaceWith(datatableInfo1);
        $('#table-list-stnk_wrapper').css({ "overflow": "auto", "height": "375px" });
    });
}

function datagridkeur(a) {
    $('#table-list-keur').each(function () {
        oTable2 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTComplementUnit/DataGridList?mode=2",
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
                { "mData" : "AgreementNumber" }, // S0113506
                { "mData" : "CustomerName" }, // S0113506

                { "mData": "PoliceNumber" },

                { "mData" : "ProductType" }, // S0113506
                { "mData" : "ChassisNumber" }, // S0113506
                { "mData" : "EngineNumber" }, // S0113506

            { "mData": "StatusUnit" },
            { "mData": "EndDate" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterSelect++;
                    var id = oObj.aData["IdTb_OPL_Unit"];

                    var endDate = new Date(oObj.aData["EndDate"]); // S0107506 - STNK KEUR for over 60 days
                    var today = new Date();

                    //var timeDiff = Math.abs(endDate.getTime() - today.getTime());
                    var timeDiff = endDate.getTime() - today.getTime();
                    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    var varCheckBox = "<div class='text-center'><input id='SelectedKeur_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxKEUR(" + CounterSelect + ")' /></div><input id='OPLUnitKEURIdTb_OPL_Unit_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitKEURDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";
                    
                    if (dayDiff > 60)
                        var varCheckBox = "<div class='text-center'><input id='SelectedKeur_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxKEUR(" + CounterSelect + ")' disabled /></div><input id='OPLUnitKEURIdTb_OPL_Unit_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitKEURDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";
                    
                    return varCheckBox;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterOptionKeur++;
                    var id = oObj.aData["IdTb_OPL_Unit"]
                    var SelectOption = "<div class='text-center'>";
                    var StatusKeur = oObj.aData["ProgressKeur"];
                    var Sel1 = StatusKeur == 1 ? "selected" : ""
                    var Sel2 = StatusKeur == 2 ? "selected" : ""
                    var Sel3 = StatusKeur == 3 ? "selected" : ""
                    var Sel4 = StatusKeur == 4 ? "selected" : ""
                    var Sel5 = StatusKeur == 5 ? "selected" : ""
                    var Sel6 = StatusKeur == 6 ? "selected" : ""
                    var Sel7 = StatusKeur == 7 ? "selected" : ""
                    var Sel8 = StatusKeur == 8 ? "selected" : ""
                    SelectOption += "<select id='ProgressStatusKeur_" + CounterOptionKeur + "' class='form-control' style='width:100%;' disabled>";
                    SelectOption += "<option value='0'>Choose Your Selection</option>";
                    SelectOption += "<option value='1' " + Sel1 + ">Remind Customer</option>";
                    SelectOption += "<option value='2' " + Sel2 + ">Arrange Schedule with Customer</option>";
                    //SelectOption += "<option value='3' " + Sel3 + ">Customer return KEUR</option>";
                    //SelectOption += "<option value='4' " + Sel4 + ">BAST KEUR preparation</option>";
                    SelectOption += "<option value='5' " + Sel5 + ">Customer return KEUR to DSF</option>";
                    SelectOption += "<option value='6' " + Sel6 + ">Deliver KEUR to Biro Jasa</option>";
                    SelectOption += "<option value='7' " + Sel7 + ">Renewal KEUR will be complete</option>";
                    SelectOption += "<option value='8' " + Sel8 + ">BAST KEUR to Customer</option>";
                    SelectOption += "</select>";
                    SelectOption += "<span id='erroProgresKeur_" + CounterOption + "' class='field-validation-error' style='display: none;'></span>";
                    SelectOption += "</div>";
                    return SelectOption;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterStart++;
                    varHtmlStartDate = "<div class='input-group date'><input id='startDateKeur_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].StartKEUR' class='form-control datepicker-keur datepicker-keur-start' type='text' data-date-format='MM/dd/yyyy' readonly onchange='validationKeur(" + CounterStart + ")' onblur='validationKeur(" + CounterStart + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroStartKEUR_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlStartDate;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterEnd++;
                    varHtmlEndDate = "<div class='input-group date'><input id='endDateKEUR_" + CounterEnd + "' name='OPLUnit[" + CounterEnd + "].EndKEUR' class='form-control datepicker-keur datepicker-keur-end' type='text' data-date-format='MM/dd/yyyy' readonly onchange='validationKeur(" + CounterEnd + ")' onblur='validationKeur(" + CounterEnd + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroEndKEUR_" + CounterEnd + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlEndDate;
                }
            },
            ],
            "fnServerData": function (sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "global": false,
                    "success": fnCallback,
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError // this sets up jQuery to give me errors
                });
            },
            "fnDrawCallback": function (oSettings) {
                CounterStart = -1;
                CounterEnd = -1;
                CounterSelect = -1;
                CounterOption = -1;
                CounterOptionKeur = -1;
                CounterPoliceNumber = -1;
            }
        });
        var htmlTemp2 = '<div id="paging2" class="dataTables_wrapper row table-list-keur">';
        var fakePagination2 = $('#table-list-keur_wrapper > div:eq(1)').html();
        var datatableInfo2 = $('#table-list-keur_wrapper > div:eq(1) > div:eq(0) > #table-list-keur_info');
        $('#table-list-keur_wrapper > div:eq(1)').prop('style', 'display: none;');
        htmlTemp2 += fakePagination2 + '</div>';
        $('.table-keur-responsive').append(htmlTemp2);
        $('.table-keur-responsive > div:eq(1) > div:eq(1) > #table-list-keur_paginate').remove();
        $('.table-keur-responsive > #paging2 > div:eq(1)').append($('#table-list-keur_paginate'));
        $('.table-keur-responsive > div:eq(1) > div:eq(0) > #table-list-keur_info').replaceWith(datatableInfo2);
        $('#table-list-keur_wrapper').css({ "overflow": "auto", "height": "375px" });
    });
}

function datagridpolis(a) {
    $('#table-list-polis').each(function () {
        oTable3 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTComplementUnit/DataGridList?mode=3",
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
                { "mData": "AgreementNumber" },
                { "mData" : "CustomerName" }, // S0113506

                { "mData": "PoliceNumber" },

                { "mData" : "ProductType" }, // S0113506
                { "mData" : "ChassisNumber" }, // S0113506
                { "mData" : "EngineNumber" }, // S0113506

            { "mData": "StatusUnit" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {                    
                    CounterStart++;
                    varHtmlCompanyInsurance = "<div class='input-group'><textarea id='companyInsurance_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].CompanyInsurance' class='form-control' type='text' rows='3' cols='20' wrap='hard' style='resize:none;overflow:hidden;' readonly onchange='validationPolis(" + CounterStart + ")' onblur='validationPolis(" + CounterStart + ")'>" + oObj.aData["CompanyInsurance"] + "</textarea><input type='hidden' id='IdTb_MGT_HistoryDoc_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].IdTb_MGT_HistoryDoc' value='" + oObj.aData["IdTb_MGT_HistoryDoc"] + "' /><input type='hidden' id='agrNo_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].AgreementNumber' value='" + oObj.aData["AgreementNumber"] + "' /></div><span id='erroCompanyInsurance_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlCompanyInsurance;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    varHtmlInsuranceNo = "<div class='input-group'><textarea id='insuranceNo_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].InsuranceNumber' class='form-control' type='text' rows='3' cols='20' wrap='hard' style='resize:none;overflow:hidden;' readonly onchange='validationPolis(" + CounterStart + ")' onblur='validationPolis(" + CounterStart + ")'>" + oObj.aData["InsuranceNumber"] + "</textarea></div><span id='erroInsuranceNo_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlInsuranceNo;
                }
            },
            { "mData": "EndDate" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {                    
                    varHtmlStartDate = "<div class='input-group date'><input id='OPLUnitPolisStartDate_" + CounterSelect + "' type='hidden' value='" + oObj.aData["StartInsurance"] + "' /><input id='startDatePolis_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].StartInsurance' value=" + oObj.aData["StartInsurance"] + " class='form-control datepicker-polis datepicker-polis-start' type='text' data-date-format='MM/dd/yyyy' readonly style='width:100px;' onchange='validationPolis(" + CounterStart + ")' onblur='validationPolis(" + CounterStart + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroStartPolis_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlStartDate;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterEnd++;
                    varHtmlEndDate = "<div class='input-group date'><input id='OPLUnitPolisEndDate_" + CounterSelect + "' type='hidden' value='" + oObj.aData["EndInsurance"] + "' /><input id='endDatePolis_" + CounterEnd + "' name='OPLUnit[" + CounterEnd + "].EndInsurance' value=" + oObj.aData["EndInsurance"] + " class='form-control datepicker-polis datepicker-polis-end' type='text' data-date-format='MM/dd/yyyy' readonly style='width:100px;' onchange='validationPolis(" + CounterEnd + ")' onblur='validationPolis(" + CounterEnd + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroEndPolis_" + CounterEnd + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlEndDate;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    CounterSelect++;
                    var id = oObj.aData["IdTb_OPL_Unit"];
                    var endDate = new Date(oObj.aData["EndDate"]);
                    var today = new Date();

                    var timeDiff = endDate.getTime() - today.getTime();
                    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    varCheckBox = "<div class='text-center'><input id='SelectedPolis_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxPolis(" + CounterSelect + "," + dayDiff + ")' /></div><input id='OPLUnitPolisIdTb_OPL_Unit_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitPolisDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";

                    return varCheckBox;
                }
            },
            ],
            "fnServerData": function (sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "global": false,
                    "success": fnCallback,
                    "timeout": 0, // optional if you want to handle timeouts (which you should)
                    "error": handleAjaxError // this sets up jQuery to give me errors
                });
            },
            "fnDrawCallback": function (oSettings) {                
                CounterStart = -1;
                CounterEnd = -1;
                CounterSelect = -1;
                CounterOption = -1;
                CounterOptionKeur = -1;
                CounterPoliceNumber = -1;
            }
        });
        var htmlTemp3 = '<div id="paging3" class="dataTables_wrapper row table-list-polis">';
        var fakePagination3 = $('#table-list-polis_wrapper > div:eq(1)').html();
        var datatableInfo3 = $('#table-list-polis_wrapper > div:eq(1) > div:eq(0) > #table-list-polis_info');
        $('#table-list-polis_wrapper > div:eq(1)').prop('style', 'display: none;');
        htmlTemp3 += fakePagination3 + '</div>';
        $('.table-polis-responsive').append(htmlTemp3);
        $('.table-polis-responsive > div:eq(1) > div:eq(1) > #table-list-polis_paginate').remove();
        $('.table-polis-responsive > #paging3 > div:eq(1)').append($('#table-list-polis_paginate'));
        $('.table-polis-responsive > div:eq(1) > div:eq(0) > #table-list-polis_info').replaceWith(datatableInfo3);
        $('#table-list-polis_wrapper').css({ "overflow": "auto", "height": "375px" });
    });
}

$("#ddlSearchCriteria").change(function () {
    var check = $("#ddlSearchCriteria option:selected").text();

    if (check == "Modified Date") {
        $("#sDateParam").text("Start Modified Date");
        $("#eDateParam").text("End Modified Date");
    }else {
        $("#sDateParam").text("Start Expiration Date");
        $("#eDateParam").text("End Expiration Date");
    }
});