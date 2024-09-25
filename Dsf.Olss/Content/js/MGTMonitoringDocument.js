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
        changeSTNK(index, $("#ProgressStatusStnk_" + index).val());
        CheckedSTNK = CheckedSTNK + 1;
    } else {
        $("#erroProgresStnk_" + index).hide();
        $("#ProgressStatusStnk_" + index).prop("disabled", true);
        $("#SelectedStnk_" + index).removeAttr("name");
        $("#OPLUnitSTNKOPLId_" + index).removeAttr("name");
        $("#OPLUnitSTNKDocValue_" + index).removeAttr("name");
        $("#ProgressStatusStnk_" + index).removeAttr("name");
        $("#ProgressStatusStnk_" + index).removeAttr("onChange");
        $("#ProgressStatusStnk_" + index).removeAttr("onBlur");
        $("#ProgressStatusStnk_" + index).val("0");
        CheckedSTNK = index - 1;
        validationStnk(CheckedSTNK)
        changeSTNK(index, $("#ProgressStatusStnk_" + index).val());
    }
}

function changeSTNK(index, val) {
    if (val == 8) {
        $("#newPoliceNumber_" + index).prop("readonly", false);
        $("#newPoliceNumber_" + index).prop("name", "OPLUnit[" + index + "].NewPoliceNumber");
        $("#colorPlat_" + index).prop("readonly", false);
        $("#colorPlat_" + index).prop("name", "OPLUnit[" + index + "].ColorPlat");

    } else {
        $("#newPoliceNumber_" + index).prop("readonly", true);
        $("#newPoliceNumber_" + index).val('')
        $("#newPoliceNumber_" + index).removeAttr("name");
        $("#colorPlat_" + index).prop("readonly", true);
        $("#colorPlat_" + index).val('')
        $("#colorPlat_" + index).removeAttr("name");
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
        validationKeur(index)
        CheckedKEUR = CheckedKEUR + 1;
    } else {
        $("#SelectedKeur_" + index).removeAttr("name");
        $("#OPLUnitKEURIdTb_OPL_Unit_" + index).removeAttr("name");
        $("#OPLUnitKEURDocValue_" + index).removeAttr("name");
        $("#ProgressStatusKeur_" + index).prop("disabled", true);
        $("#ProgressStatusKeur_" + index).removeAttr("");
        $("#ProgressStatusKeur_" + index).removeAttr("name");
        $("#ProgressStatusKeur_" + index).removeAttr("onChange");
        $("#ProgressStatusKeur_" + index).removeAttr("onBlur");
        $("#ProgressStatusKeur_" + index).val('0');
        CheckedKEUR = index - 1;
        validationKeur(CheckedKEUR)
    }
}

function changeKEUR(index, val) {
    //if (val == 8) {
    //    $("#startDateKeur_" + index).prop("readonly", false);
    //    $("#endDateKEUR_" + index).prop("readonly", false);
    //    $("#startDateKeur_" + index).datepicker({
    //        format: "mm/dd/yyyy"
    //    });
    //    $("#endDateKEUR_" + index).datepicker({
    //        format: "mm/dd/yyyy"
    //    });
    //    $("#endDateKEUR_" + index).datepicker();
    //    $("#startDateKeur_" + index).prop("name", "OPLUnit[" + index + "].StartKEUR");
    //    $("#endDateKEUR_" + index).prop("name", "OPLUnit[" + index + "].EndKEUR");

    //} else {
    //    $("#startDateKeur_" + index).prop("readonly", true);
    //    $("#endDateKEUR_" + index).prop("readonly", true);
    //    $("#startDateKeur_" + index).val('')
    //    $("#endDateKEUR_" + index).val('')
    //    $("#startDateKeur_" + index).datepicker('remove');
    //    $("#endDateKEUR_" + index).datepicker('remove');
    //    $("#startDateKeur_" + index).removeAttr("name");
    //    $("#endDateKEUR_" + index).removeAttr("name");
    //}
}

function CheckBoxPolis(index, dayDiff) {
    var CheckedPOLIS = 0;
    if ($("#SelectedPolis_" + index).is(':checked')) {
        $("#startDatePolis_" + index).prop("readonly", false);
        $("#endDatePolis_" + index).prop("readonly", false);
        $("#companyInsurance_" + index).prop("readonly", false);
        $("#insuranceNo_" + index).prop("readonly", false);

        $(".form-control.datepicker-polis").each(function() {
            if (typeof ($(this).attr("readonly")) == "undefined")
                $(this).datepicker({
                    format: "mm/dd/yyyy"
                });
        });

        $(".form-control.datepicker-polis .input-group-addon").each(function() {
            if (typeof ($(this).attr("readonly")) == "undefined")
                $(this).on("click", function() {
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

    $("#table-list-polis input[type=checkbox]:checked").each(function() {
        var row = $(this).closest("tr");
        var rI = row[0].rowIndex - 1;

        if ($("#startDatePolis_" + rI).val() == ""
        || $("#endDatePolis_" + rI).val() == "") {
            noEmptyDt = false;
        } else if ($("#startDatePolis_" + rI).val() != "" && $("#endDatePolis_" + rI).val() != "") {
            if (new Date($("#startDatePolis_" + rI).val()) >= new Date($("#endDatePolis_" + rI).val())) {
                $("#erroStartPolis_" + rI).html("start date must not be greater than or equal to the end date");
                $("#erroEndPolis_" + rI).html("end date can not be smaller or equal to the start date");
                $("#erroStartPolis_" + rI).show();
                $("#erroEndPolis_" + rI).show();
                noEmptyDt = false;
            }
            if (new Date($("#startDatePolis_" + rI).val()) < new Date($("#endDatePolis_" + rI).val())) {
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

    if ($("#colorPlat_" + index).val().length == 0 && $("#ProgressStatusStnk_" + index).prop('readonly') == true) {
        $("#erroColorPlat_" + index).html("Color Plat cannot be blank");
        $("#erroColorPlat_" + index).show();
    } else if ($("#colorPlat_" + index).val().length == 0 && $("#ProgressStatusStnk_" + index).prop('readonly') == false) {
        $("#erroColorPlat_" + index).html("Color Plat cannot be blank");
        $("#erroColorPlat_" + index).show();
    } else if ($("#colorPlat_" + index).val().length > 0 && $("#ProgressStatusStnk_" + index).prop('readonly') == false) {
        $("#erroColorPlat_" + index).html("");
        $("#erroColorPlat_" + index).hide();
    }

    if ($("#ProgressStatusStnk_" + index).val() == 0) {
        $("#erroProgresStnk_" + index).html("Options have not been selected");
        $("#erroProgresStnk_" + index).show();
    } else if ($("#ProgressStatusStnk_" + index).val() > 0) {
        $("#erroProgresStnk_" + index).html("");
        $("#erroProgresStnk_" + index).hide();
    }

    if ($("#ProgressStatusStnk_" + index).prop("disabled") == true && $("#ProgressStatusStnk_" + index).val() == 0) {
        $("#erroProgresStnk_" + index).html("");
        $("#erroProgresStnk_" + index).hide();
    }

    if ($("#ProgressStatusStnk_" + index).prop("disabled") == false
        && $("#ProgressStatusStnk_" + index).val() > 0
        && $("#newPoliceNumber_" + index).val().length > 0
        && $("#colorPlat_" + index).val().length > 0) {
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

    if ($("#ProgressStatusKeur_" + index).prop("disabled") == true && $("#ProgressStatusKeur_" + index).val() == 0) {
        $("#erroProgresStnk_" + index).html("");
        $("#erroProgresStnk_" + index).hide();
    }

    if ($("#ProgressStatusKeur_" + index).prop("disabled") == false && $("#ProgressStatusKeur_" + index).val() > 0 ) {
        $("#saveKeur").prop("disabled", false);
    }
}

function datagridstnk(a) {
    $('#table-list-stnk').each(function() {
        oTable1 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[17, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTComplementUnit/DataGridList?mode=1",
            "fnServerParams": function(aoData) {
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
                { "mData": "AgreementNumber" }, // S0113506
                { "mData": "CustomerName" }, // S0113506
                { "mData": "PoliceNumber" },
            { "mData": "UnitDescription" },
                { "mData": "ChassisNumber" }, // S0113506
                { "mData": "EngineNumber" }, // S0113506

            { "mData": "ContractStartDate" },
            { "mData": "ContractEndDate" },
            { "mData": "Allocation" },
            { "mData": "Status" },
            { "mData": "RegistrationStatus" },
            { "mData": "EndDate" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    CounterSelect++;
                    var id = oObj.aData["IdTb_OPL_Unit"];

                    var endDate = new Date(oObj.aData["EndDate"]); // S0107506 - STNK KEUR for over 60 days
                    var today = new Date();

                    //var timeDiff = Math.abs(endDate.getTime() - today.getTime());
                    var timeDiff = endDate.getTime() - today.getTime();
                    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    var varCheckBox = "<div class='text-center'><input id='SelectedStnk_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxSTNK(" + CounterSelect + ")' /></div><input id='OPLUnitSTNKOPLId_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitSTNKDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";

                    //if (dayDiff > 60)
                    //    varCheckBox = "<div class='text-center'><input id='SelectedStnk_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxSTNK(" + CounterSelect + ")' disabled /></div><input id='OPLUnitSTNKOPLId_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitSTNKDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";

                    return varCheckBox;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
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
                    SelectOption += "<select id='ProgressStatusStnk_" + CounterOption + "' class='form-control' style='width:230px;' disabled>";
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
                "fnRender": function(oObj) {
                    CounterPoliceNumber++;
                    varHtmlNewPoliceNumber = "<input id='newPoliceNumber_" + CounterPoliceNumber + "' name='OPLUnit[" + CounterPoliceNumber + "].NewPoliceNumber' value =" + oObj.aData["NewPoliceNumber"] + " class='form-control' type='text' style='text-transform:uppercase !important;' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode >= 97 && event.charCode <= 122 || event.charCode >= 65 && event.charCode <= 90' maxlength = '20' readonly onchange='validationStnk(" + CounterPoliceNumber + ")' onblur='validationStnk(" + CounterPoliceNumber + ")' style='width:100%;' /><span id='erroPoliceNumber_" + CounterPoliceNumber + "' class='field-validation-error' style='display: none;'></span>"; // ABDP - X0098743
                    return varHtmlNewPoliceNumber; // ABDP - X0098743
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    varHtmlNewColorPlat = "<input id='colorPlat_" + CounterPoliceNumber + "' name='OPLUnit[" + CounterPoliceNumber + "].ColorPlat' value =" + oObj.aData["ColorPlat"] + " class='form-control' type='text' style='text-transform:uppercase !important;' onkeypress='return event.charCode >= 48 && event.charCode <= 57 || event.charCode >= 97 && event.charCode <= 122 || event.charCode >= 65 && event.charCode <= 90 || event.charCode == 32' maxlength = '20' readonly onchange='validationStnk(" + CounterPoliceNumber + ")' onblur='validationStnk(" + CounterPoliceNumber + ")' style='width:100%;' /><span id='erroColorPlat_" + CounterPoliceNumber + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlNewColorPlat;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function(oObj) {
                    var idopl = oObj.aData["IdOPLAgreement"];
                    var idunit = oObj.aData["IdTb_OPL_Unit"];
                    var isEdit = oObj.aData["IsEdit"];
                    var sType = 1;

                    var htmlButtonAction = "";

                    //onclick='ShowDataOPLUnit(" + idopl + "," + idunit + "," + 0 + ");return false;' 

                    if (isEdit) {
                        htmlButtonAction += "&nbsp;<a title='Update' href='#' data-target='#updateRenewalDocModal' onclick='UpdateRenewalDocUnit(" + idopl + "," + idunit + "," + sType + ")' data-toggle='modal' class='btn btn-primary btn-xs'><i class='fa fa-edit'></i> Update</a>";
                    } else {
                        htmlButtonAction += "&nbsp;<span class='btn btn-primary disabled btn-xs'><i class='fa fa-edit'></i> Update</span>";
                    }

                    return htmlButtonAction;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function(oObj) {
                    var agrV = oObj.aData["AgreementNumber"];
                    var idunitV = oObj.aData["IdTb_OPL_Unit"];
                    var tab = "STNK";
                    var tRpt = "PerUnit";

                    var htmlButtonView = "<input id='agrSTNK_" + CounterSelect + "' type='hidden' value='" + agrV + "' /><input id='idUnitSTNK_" + CounterSelect + "' type='hidden' value='" + idunitV + "' /><input id='tabSTNK_" + CounterSelect + "' type='hidden' value='" + tab + "' /><input id='tRptSTNK_" + CounterSelect + "' type='hidden' value='" + tRpt + "' /><a title='View' href='#' onclick='printReportRenewalDocPerUnitSTNK(" + CounterSelect + ");' data-target='#dataoplunitmodal' data-toggle='modal' class='btn btn-info btn-xs'><i class='fa fa-bars'></i> View</a>";
                    
                    return htmlButtonView;
                }
            },
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
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
            "fnDrawCallback": function(oSettings) {
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
    $('#table-list-keur').each(function() {
        oTable2 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTComplementUnit/DataGridList?mode=2",
            "fnServerParams": function(aoData) {
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
                { "mData": "AgreementNumber" }, // S0113506
                { "mData": "CustomerName" }, // S0113506
                { "mData": "PoliceNumber" },
            { "mData": "UnitDescription" },
                { "mData": "ChassisNumber" }, // S0113506
                { "mData": "EngineNumber" }, // S0113506

            { "mData": "ContractStartDate" },
            { "mData": "ContractEndDate" },
            { "mData": "Allocation" },
            { "mData": "Status" },
            { "mData": "RegistrationStatus" },
            { "mData": "EndDate" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    CounterSelect++;
                    var id = oObj.aData["IdTb_OPL_Unit"];

                    var endDate = new Date(oObj.aData["EndDate"]); // S0107506 - STNK KEUR for over 60 days
                    var today = new Date();

                    //var timeDiff = Math.abs(endDate.getTime() - today.getTime());
                    var timeDiff = endDate.getTime() - today.getTime();
                    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    var varCheckBox = "<div class='text-center'><input id='SelectedKeur_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxKEUR(" + CounterSelect + ")' /></div><input id='OPLUnitKEURIdTb_OPL_Unit_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitKEURDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";

                    //if (dayDiff > 60)
                    //    var varCheckBox = "<div class='text-center'><input id='SelectedKeur_" + CounterSelect + "' type='checkbox' class='form-control' style='width: 15px; height: 15px; padding: 0px;' onclick='CheckBoxKEUR(" + CounterSelect + ")' disabled /></div><input id='OPLUnitKEURIdTb_OPL_Unit_" + CounterSelect + "' type='hidden' value='" + id + "' /> <input id='OPLUnitKEURDocValue_" + CounterSelect + "' type='hidden' value='" + a + "' />";

                    return varCheckBox;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
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
                    SelectOption += "<select id='ProgressStatusKeur_" + CounterOptionKeur + "' class='form-control' style='width:230px;' disabled>";
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
                "sClass": "center",
                "fnRender": function(oObj) {
                    var idopl = oObj.aData["IdOPLAgreement"];
                    var idunit = oObj.aData["IdTb_OPL_Unit"];
                    var isEdit = oObj.aData["IsEdit"];
                    var sType = 2;

                    var htmlButtonAction = "";

                    //onclick='ShowDataOPLUnit(" + idopl + "," + idunit + "," + 0 + ");return false;'

                    if (isEdit) {
                        htmlButtonAction += "&nbsp;<a title='Update' href='#' data-target='#updateRenewalDocModal' onclick='UpdateRenewalDocUnit(" + idopl + "," + idunit + "," + sType + ")' data-toggle='modal' class='btn btn-primary btn-xs'><i class='fa fa-edit'></i> Update</a>";
                    } else {
                        htmlButtonAction += "&nbsp;<span class='btn btn-primary disabled btn-xs'><i class='fa fa-edit'></i> Update</span>";
                    }

                    return htmlButtonAction;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function(oObj) {
                    var agrV = oObj.aData["AgreementNumber"];
                    var idunitV = oObj.aData["IdTb_OPL_Unit"];
                    var tab = "KEUR";
                    var tRpt = "PerUnit";

                    var htmlButtonView = "<input id='agrKEUR_" + CounterSelect + "' type='hidden' value='" + agrV + "' /><input id='idUnitKEUR_" + CounterSelect + "' type='hidden' value='" + idunitV + "' /><input id='tabKEUR_" + CounterSelect + "' type='hidden' value='" + tab + "' /><input id='tRptKEUR_" + CounterSelect + "' type='hidden' value='" + tRpt + "' /><a title='View' href='#' onclick='printReportRenewalDocPerUnitKEUR(" + CounterSelect + ");' data-target='#dataoplunitmodal' data-toggle='modal' class='btn btn-info btn-xs'><i class='fa fa-bars'></i> View</a>";

                    return htmlButtonView;
                }
            },
            ],
            "fnServerData": function(sSource, aoData, fnCallback) {
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
            "fnDrawCallback": function(oSettings) {
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
    $('#table-list-polis').each(function() {
        oTable3 = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "aaSorting": [[0, "desc"]],
            "sScrollXInner": "200%",
            "sAjaxSource": serverRoot + "MGTComplementUnit/DataGridList?mode=3",
            "fnServerParams": function(aoData) {
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

                { "mData": "ProductType" }, // S0113506
                { "mData": "ChassisNumber" }, // S0113506
                { "mData": "EngineNumber" }, // S0113506

            { "mData": "StatusUnit" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {                    
                    CounterStart++;
                    varHtmlCompanyInsurance = "<div class='input-group'><textarea id='companyInsurance_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].CompanyInsurance' class='form-control' type='text' rows='3' cols='20' wrap='hard' style='resize:none;overflow:hidden;' readonly onchange='validationPolis(" + CounterStart + ")' onblur='validationPolis(" + CounterStart + ")'>" + oObj.aData["CompanyInsurance"] + "</textarea><input type='hidden' id='IdTb_MGT_HistoryDoc_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].IdTb_MGT_HistoryDoc' value='" + oObj.aData["IdTb_MGT_HistoryDoc"] + "' /><input type='hidden' id='agrNo_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].AgreementNumber' value='" + oObj.aData["AgreementNumber"] + "' /></div><span id='erroCompanyInsurance_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlCompanyInsurance;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    varHtmlInsuranceNo = "<div class='input-group'><textarea id='insuranceNo_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].InsuranceNumber' class='form-control' type='text' rows='3' cols='20' wrap='hard' style='resize:none;overflow:hidden;' readonly onchange='validationPolis(" + CounterStart + ")' onblur='validationPolis(" + CounterStart + ")'>" + oObj.aData["InsuranceNumber"] + "</textarea></div><span id='erroInsuranceNo_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlInsuranceNo;
                }
            },
            { "mData": "EndDate" },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {                    
                    varHtmlStartDate = "<div class='input-group date'><input id='OPLUnitPolisStartDate_" + CounterSelect + "' type='hidden' value='" + oObj.aData["StartInsurance"] + "' /><input id='startDatePolis_" + CounterStart + "' name='OPLUnit[" + CounterStart + "].StartInsurance' value=" + oObj.aData["StartInsurance"] + " class='form-control datepicker-polis datepicker-polis-start' type='text' data-date-format='MM/dd/yyyy' readonly style='width:100px;' onchange='validationPolis(" + CounterStart + ")' onblur='validationPolis(" + CounterStart + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroStartPolis_" + CounterStart + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlStartDate;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    CounterEnd++;
                    varHtmlEndDate = "<div class='input-group date'><input id='OPLUnitPolisEndDate_" + CounterSelect + "' type='hidden' value='" + oObj.aData["EndInsurance"] + "' /><input id='endDatePolis_" + CounterEnd + "' name='OPLUnit[" + CounterEnd + "].EndInsurance' value=" + oObj.aData["EndInsurance"] + " class='form-control datepicker-polis datepicker-polis-end' type='text' data-date-format='MM/dd/yyyy' readonly style='width:100px;' onchange='validationPolis(" + CounterEnd + ")' onblur='validationPolis(" + CounterEnd + ")' /><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div><span id='erroEndPolis_" + CounterEnd + "' class='field-validation-error' style='display: none;'></span>";
                    return varHtmlEndDate;
                }
            },
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
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
            "fnServerData": function(sSource, aoData, fnCallback) {
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
            "fnDrawCallback": function(oSettings) {                
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

$('#addItemRenDoc').on('click', function(e) {
    e.preventDefault();

    AddRowItemRenDoc(null);
});

function AddRowItemRenDoc(d) {
    var countRowItem = $("tr[class*='rowItem']").length;
    var newTr = $('' +
        '<tr class="rowItem" id="row_' + countRowItem + '">' +

            '<td>' +
                '<input data-val="true" id="renDoc_' + countRowItem + '__IdTb_MGT_RenewalDocumentDtl" name="RenewalDocumentDtl[' + countRowItem + '].IdTb_MGT_RenewalDocumentDtl" type="hidden" value=""/>' +
                '<input data-val="true" id="renDoc_' + countRowItem + '__IsValid" name="RenewalDocumentDtl[' + countRowItem + '].IsValid" type="hidden" value=""/>' +
                '<input data-val="true" id="renDoc_' + countRowItem + '__IdType" name="RenewalDocumentDtl[' + countRowItem + '].IdType" type="hidden" value=""/>' +
                    '<div class="input-group">' +
                    //'<select id="renDoc_' + countRowItem + '__Type" name="RenewalDocumentDtl[' + countRowItem + '].Type" style="width: 200px;" class="form-control mandatory" title="Type" onchange="OnChangeSelectOption(' + countRowItem + ')"><option value="" disabled selected>Type</option></select> ' +
                    '<select id="renDoc_' + countRowItem + '__Type" name="RenewalDocumentDtl[' + countRowItem + '].Type" style="width: 200px;" class="form-control mandatory" title="Type" onchange="validateRenDoc(' + countRowItem + ')"><option value="" disabled selected>Type</option></select> ' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group date">' +
                    '<input class="form-control datepicker-input datepicker-renDoc" id="renDoc_' + countRowItem + '__StartDate" style="width: 100px;" name="RenewalDocumentDtl[' + countRowItem + '].StartDate" onmouseover="setDatePicker(this)" type="text" placeholder="Start Date" /> ' +
                    '<span class="input-group-addon">' +
                          '<i class="fa fa-calendar"></i>'+
                    '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group date">' +
                    '<input class="form-control datepicker-input datepicker-renDoc" id="renDoc_' + countRowItem + '__EndDate" style="width: 100px;" name="RenewalDocumentDtl[' + countRowItem + '].EndDate" onmouseover="setDatePicker(this)" type="text" placeholder="End Date" /> ' +
                    '<span class="input-group-addon">' +
                          '<i class="fa fa-calendar"></i>' +
                    '</span>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group" style="width:230px;">' +
                    '<input data-val="true" id="renDoc_' + countRowItem + '__IdSupplier" name="RenewalDocumentDtl[' + countRowItem + '].IdSupplier" type="hidden" value=""/>' +
                    '<input class="form-control" style="flex:1" id="renDoc_' + countRowItem + '__Supplier" name="RenewalDocumentDtl[' + countRowItem + '].Supplier" type="text" onkeypress="return false;" readonly placeholder="Supplier" /> ' +
                    '<span class="input-group-btn"> ' +
                    '<button class="btn btn-white" id="renDoc_' + countRowItem + '__BtnSupplier" data-toggle="modal" data-target="#renDocSupplier" type="button" onclick="loadSupplierRenDoc(' + countRowItem + ')" >...</button> ' +
                    '</span> ' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<input class="form-control" id="renDoc_' + countRowItem + '__InvoiceNumber" style="width: 150px;" name="RenewalDocumentDtl[' + countRowItem + '].InvoiceNumber" type="text" placeholder="Invoice Number" /> ' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__TaxAmount" style="width: 120px;" name="RenewalDocumentDtl[' + countRowItem + '].TaxAmount" onChange = "calculateTotalPerRow(this,' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="" placeholder="Tax Amount" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__Fee" style="width: 120px;" name="RenewalDocumentDtl[' + countRowItem + '].Fee" onChange = "calculateTotalPerRow(this,' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="" placeholder="Fee" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__Penalty" style="width: 120px;" name="RenewalDocumentDtl[' + countRowItem + '].Penalty" onChange = "calculateTotalPerRow(this,' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="" placeholder="Penalty" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__Ppn" style="width: 120px;" name="RenewalDocumentDtl[' + countRowItem + '].Ppn" onChange = "calculateTotalPerRow(this,' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="" placeholder="Ppn" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__Pph" style="width: 120px;" name="RenewalDocumentDtl[' + countRowItem + '].Pph" onChange = "calculateTotalPerRow(this,' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="" placeholder="Pph" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__Other" style="width: 120px;" name="RenewalDocumentDtl[' + countRowItem + '].Other" onChange = "calculateTotalPerRow(this,' + countRowItem + ')" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" value="" placeholder="Other" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<span class="input-group-addon">Rp</span>' +
                    '<input class="form-control text-right numeric" id="renDoc_' + countRowItem + '__Total" style="width: 120px;" readonly name="RenewalDocumentDtl[' + countRowItem + '].Total" type="text" value="" placeholder="Total" />' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<input class="form-control" id="renDoc_' + countRowItem + '__Remark" style="width: 200px;" name="RenewalDocumentDtl[' + countRowItem + '].Remark" type="text" placeholder="Remark" /> ' +
                '</div>' +
            '</td>' +
            '<td class="text-center">' +
                    '<button class="btn btn-danger font-bold fa fa-minus" type="button" id="renDoc_' + countRowItem + '__BtnRemove" onclick="deleteRowItem(' + countRowItem + ')"></button>' +
            '</td>' +
        '</tr>');

    $(newTr).appendTo('#itemRenDoc-table tbody');
    loadTypeRenDoc(countRowItem, $("#tRenDoc").val(), d);

    if (d != null) {
        setValueRowItem(countRowItem, d);
    }

    validateRenDoc(countRowItem);
    countRowItem += 1;
    return false;
}

function setValueRowItem(rowId, d) {
    $("#renDoc_" + rowId + "__IdTb_MGT_RenewalDocumentDtl").val(d.IdTb_MGT_RenewalDocDtl);
    $("#renDoc_" + rowId + "__IsValid").val(d.IsValid);
    $("#renDoc_" + rowId + "__StartDate").val(d.StartDate);
    $("#renDoc_" + rowId + "__EndDate").val(d.EndDate);
    $("#renDoc_" + rowId + "__IdSupplier").val(d.IdSupplier);
    $("#renDoc_" + rowId + "__Supplier").val(d.SupplierName);
    $("#renDoc_" + rowId + "__InvoiceNumber").val(d.InvoiceNumber);
    $("#renDoc_" + rowId + "__TaxAmount").val(d.TaxAmount);
    thousandSeparator2($("#renDoc_" + rowId + "__TaxAmount"));
    $("#renDoc_" + rowId + "__Fee").val(d.Fee);
    thousandSeparator2($("#renDoc_" + rowId + "__Fee"));
    $("#renDoc_" + rowId + "__Penalty").val(d.Penalty);
    thousandSeparator2($("#renDoc_" + rowId + "__Penalty"));
    $("#renDoc_" + rowId + "__Ppn").val(d.Ppn);
    thousandSeparator2($("#renDoc_" + rowId + "__Ppn"));
    $("#renDoc_" + rowId + "__Pph").val(d.Pph);
    thousandSeparator2($("#renDoc_" + rowId + "__Pph"));
    $("#renDoc_" + rowId + "__Other").val(d.Others);
    thousandSeparator2($("#renDoc_" + rowId + "__Other"));
    $("#renDoc_" + rowId + "__Total").val(d.Total);
    thousandSeparator2($("#renDoc_" + rowId + "__Total"));
    $("#renDoc_" + rowId + "__Remark").val(d.Remark);

    if (d.IsValid) {
        enableDisableRowItem(rowId, true);
    } else {
        enableDisableRowItem(rowId, false);
    }
}

function enableDisableRowItem(i,p) {
    $("#renDoc_" + i + "__Type").prop("disabled", p);
    $("#renDoc_" + i + "__StartDate").prop("disabled", p);
    $("#renDoc_" + i + "__EndDate").prop("disabled", p);
    $("#renDoc_" + i + "__Supplier").prop("disabled", p);
    $("#renDoc_" + i + "__InvoiceNumber").prop("disabled", p);
    $("#renDoc_" + i + "__TaxAmount").prop("disabled", p);
    $("#renDoc_" + i + "__Fee").prop("disabled", p);
    $("#renDoc_" + i + "__Penalty").prop("disabled", p);
    $("#renDoc_" + i + "__Ppn").prop("disabled", p);
    $("#renDoc_" + i + "__Pph").prop("disabled", p);
    $("#renDoc_" + i + "__Other").prop("disabled", p);
    $("#renDoc_" + i + "__Remark").prop("disabled", p);
    $("#renDoc_" + i + "__BtnRemove").prop("disabled", p);
    $("#renDoc_" + i + "__BtnSupplier").prop("disabled", p);
}

function deleteRowItem(rowId) {
    $("#row_" + rowId).hide();

    //$("#addItemRenDoc").removeAttr("disabled");

    //var tbSelector = "#itemRenDoc-table tbody";
    //var trList = $(tbSelector).find("*.rowItem");
    //var length = $("tr[class*='rowItem']").length;

    //for (var i = 0; i < length; i++) {
    //    if ($(trList[i]).is(":visible")) {
    //        $("#renDoc_" + i + "__Type").append('<option value=' + $("#renDoc_" + rowId + "__Type").val() + '>' + $("#renDoc_" + rowId + "__Type" + " option:selected").text() + '</option>');
    //    }
    //}    
}

function calculateTotalPerRow(elm, index) {
    var l = $("tr[class*='rowItem']").length;
    var trList = $("#itemRenDoc-table tbody").find("*.rowItem");
    var ttl = 0;

    var tAmt = replaceSeparator($("#renDoc_" + index + "__TaxAmount").val());
    var fAmt = replaceSeparator($("#renDoc_" + index + "__Fee").val());
    var pAmt = replaceSeparator($("#renDoc_" + index + "__Penalty").val());
    var hAmt = replaceSeparator($("#renDoc_" + index + "__Pph").val());
    var nAmt = replaceSeparator($("#renDoc_" + index + "__Ppn").val());
    var oAmt = replaceSeparator($("#renDoc_" + index + "__Other").val());
    var rBdt = replaceSeparator($("#rBudgetHidden").val());
    var totAmt = ((parseFloat(tAmt) + parseFloat(fAmt) + parseFloat(pAmt) + parseFloat(oAmt) + parseFloat(nAmt)) - parseFloat(hAmt));
    var tElm = $("#renDoc_" + index + "__Total");

    tElm.val(totAmt);    
    thousandSeparator2(elm);
    thousandSeparator2(tElm);

    for (var x = 0; x < l; x++) {
        if ($(trList[x]).is(":visible")) {
            ttl = ttl + parseFloat(replaceSeparator($("#renDoc_" + x + "__Total").val()));
        }
    }

    rBdt = parseFloat(rBdt) - parseFloat(ttl);
    $("#rBudget").val(rBdt);
    thousandSeparator2($("#rBudget"));

    validateRenDoc(index);
}

function validateRenDoc(index) {
    var type = $("#renDoc_" + index + "__Type").val();
    var supplier = $("#renDoc_" + index + "__Supplier").val();
    var iID = "#renDoc_" + index + "__IdType";

    $(iID).val(type);

    if (type == "" || type == null) {
        $("#btnSaveRenDoc").attr('disabled', 'disabled');
        $("#btnValidateRenDoc").attr('disabled', 'disabled');
    } else {
        $("#btnSaveRenDoc").removeAttr("disabled");

        if ($("#canValidate").val() == "yes") {
            $("#btnValidateRenDoc").removeAttr("disabled");
        } else {
            $("#btnValidateRenDoc").attr('disabled', 'disabled');
        }
    }

    //if (type == "" || supplier == "") {
    //    $("#btnSaveRenDoc").attr('disabled', 'disabled');
    //    $("#btnValidateRenDoc").attr('disabled', 'disabled');
    //} else {
    //    $("#btnSaveRenDoc").removeAttr("disabled");

    //    if ($("#canValidate").val() == "yes") {
    //        $("#btnValidateRenDoc").removeAttr("disabled");
    //    } else {
    //        $("#btnValidateRenDoc").attr('disabled', 'disabled');
    //    }
    //}
}

function setDatePicker(elm) {
    $(elm).datepicker({
        format: 'mm/dd/yyyy',
        minViewMode: 0,
        startView: 0,
        endDate: '12/31/9999',
        startDate: '01/01/1753'
    });
}

function replaceSeparator(elmVal) {
    var v = elmVal == "" ?
        "0" :
        elmVal.replace(/,/g, '');
    return v;
}

function thousandSeparator2(param) {
    var v = $(param).val();

    v = v.replace(/[^-\d]/g, '');

    if (v.length > 3) {
        v = v.replace(/(\d{3,3})$/g, ',$1');
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }    

    v = v ? v : '';

    $(param).val(v);
}

function loadSupplierRenDoc(cI) {
    var oTable = null;
    var idSup = $("#renDoc_" + cI + "__IdSupplier");
    var supp = $("#renDoc_" + cI + "__Supplier");

    $('#supplierRenDoc-list').each(function() {
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

    $("#supplierRenDoc-list tbody").delegate("tr", "click", function() {
        var data = oTable.fnGetData(this);

        supp.val(data.SupplierName);
        idSup.val(data.IdSupplier);

        validateRenDoc(cI);

        $('#supplierRenDoc-list tbody').undelegate("tr", "click");

        $('body').on('hidden.bs.modal', '.modal', function() {
            $(this).removeData('bs.modal');
        });

        $('#supplierRenDoc-list').dataTable().fnFilter('');

        $('#renDocSupplier').modal('hide');
    });
};

function extractKeyValue(obj, value) {
    var keyObj = "";
    for (var i in obj) {
        if (obj[i] == value) {
            keyObj = i;
        }
    }

    return keyObj;
};

function loadTypeRenDoc(cIn, dataTRD, d) {
    var rType = $("#renDoc_" + cIn + "__Type");
    var oID = "#renDoc_" + cIn + "__Type";
    var iID = "#renDoc_" + cIn + "__IdType";
    var sType = "";
    //var xType = "";
    //var hasSelected = false;
    //var l = $("tr[class*='rowItem']").length;
    //var trList = $("#itemRenDoc-table tbody").find("*.rowItem");
    //var aD = [];
    //var dLenght = 0;

    if (dataTRD == 1) {
        sType = "STNK";
        //xType = "KEUR";
    } else {
        sType = "KEUR";
        //xType = "STNK";
    }

    //for (var x = 0; x < l; x++) {
    //    if ($(trList[x]).is(":visible")) {
    //        aD.push($("#renDoc_" + x + "__Type").val());
    //    }        
    //}

    $.post('MGTComplementUnit/GetOptionItem', function(data) {
        var s = '<option value="" disabled selected>Type</option>';
        for (var i = 0; i < data.length; i++) {
            s += '<option value="' + data[i].IdOptionItemValue + '">' + data[i].ItemValuesName + '</option>';
            //if ((l == 1) && (data[i].ItemValuesName != xType)) {
            //    s += '<option value="' + data[i].IdOptionItemValue + '">' + data[i].ItemValuesName + '</option>';
            //} else {
            //    if ((extractKeyValue(aD, data[i].IdOptionItemValue) == "") && (data[i].ItemValuesName != xType)) {
            //        s += '<option value="' + data[i].IdOptionItemValue + '">' + data[i].ItemValuesName + '</option>';
            //    } else {
            //        if (data[i].ItemValuesName == sType) {
            //            hasSelected = true;
            //        }
            //    }
            //}                       
        }
        //dLenght = data.length;
        rType.html(s);
    })
    .done(function() {
        //if (hasSelected) {
        //    $(oID + " option:contains(" + sType + ")").attr("selected", true);
        //    $(iID).val($(oID).val());
        //}

        if (d != null) {
            $(oID).val(d.Type);
            $(iID).val($(oID).val());
        }

        //if ($(oID + " option").length == 2 || cIn == (dLenght - 1) ) {
        //    $("#addItemRenDoc").attr('disabled', 'disabled');
        //}

        //OnChangeSelectOption(cIn);
    });
};

function UpdateRenewalDocUnit(IdOPLAgreement, IdTb_OPL_Unit, tRenDoc) {
    $.ajax(
        {
            url: serverRoot + "MGTComplementUnit/GetDataRenewalDocumentOPLUnit/?IdOPLAgreement=" + IdOPLAgreement + "&IdTb_OPL_Unit=" + IdTb_OPL_Unit,
            cache: false,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                $("#tRenDoc").val(tRenDoc);
                $(".rowItem").remove();

                if (data.header != null) {
                    $("#IdTb_MGT_RenewalDoc").val(data.header.IdTb_MGT_RenewalDoc);
                    $("#IdOPLAgreement").val(data.header.IdOPLAgreement);
                    $("#IdTb_OPL_Unit").val(data.header.IdTb_OPL_Unit);
                    $("#titleRenewalDoc").html("Renewal Document Of " + data.header.PoliceNumber);
                    $("#tBudget").val(data.header.TotalBudget);
                    $("#rBudget").val(data.header.RemainingBudget);
                    $("#tBudgetHidden").val(data.header.TotalBudget);
                    $("#rBudgetHidden").val(data.header.BaseRemainingBudget);
                    $("#lastUpdateByRenDoc").html(data.header.LastModifiedBy);
                    $("#lastUpdateDateRenDoc").html(data.header.LastModifiedDate);

                    thousandSeparator2($("#tBudget"));
                    thousandSeparator2($("#rBudget"));
                } else {
                    $("#IdTb_MGT_RenewalDoc").val("0");
                    $("#IdOPLAgreement").val(IdOPLAgreement);
                    $("#IdTb_OPL_Unit").val(IdTb_OPL_Unit);
                    $("#titleRenewalDoc").html("Renewal Document");
                    $("#tBudget").val("0");
                    $("#rBudget").val("0");
                    $("#tBudgetHidden").val("0");
                    $("#rBudgetHidden").val("0");
                    $("#lastUpdateByRenDoc").html("");
                    $("#lastUpdateDateRenDoc").html("");
                }

                if (data.detail.length > 0) {
                    for (var x = 0 ; x < data.detail.length; x++) {
                        AddRowItemRenDoc(data.detail[x]);
                    }

                    if (data.isValidate) {
                        $("#btnValidateRenDoc").removeAttr("disabled");
                    } else {
                        $("#btnValidateRenDoc").attr('disabled', 'disabled');
                    }
                } else {
                    $("#btnValidateRenDoc").attr('disabled', 'disabled');
                }

                if (data.isValidate) {
                    $("#canValidate").val("yes");
                } else {
                    $("#canValidate").val("no");
                }

                $("#addItemRenDoc").removeAttr("disabled");                
            }

        });
};

$("input[name='statusBtnRenDoc']").on('click', function(e) {
    var state = $(this).val();

    $('#RenewalDocSuccessUpdated').remove();

    var tbSelector = "#itemRenDoc-table tbody";

    var rDDtlList = $(tbSelector).find("input[name*='.IdTb_MGT_RenewalDocumentDtl']");
    var validList = $(tbSelector).find("input[name*='.IsValid']");
    var typeList = $(tbSelector).find("input[name*='.IdType']");
    var sDateList = $(tbSelector).find("input[name*='.StartDate']");
    var eDateList = $(tbSelector).find("input[name*='.EndDate']");
    var suppList = $(tbSelector).find("input[name*='.IdSupplier']");
    var invList = $(tbSelector).find("input[name*='.InvoiceNumber']");
    var tAmtList = $(tbSelector).find("input[name*='.TaxAmount']");
    var fAmtList = $(tbSelector).find("input[name*='.Fee']");
    var pAmtList = $(tbSelector).find("input[name*='.Penalty']");
    var nAmtList = $(tbSelector).find("input[name*='.Ppn']");
    var hAmtList = $(tbSelector).find("input[name*='.Pph']");
    var oAmtList = $(tbSelector).find("input[name*='.Other']");
    var totAmtList = $(tbSelector).find("input[name*='.Total']");
    var remarkList = $(tbSelector).find("input[name*='.Remark']");
    var idRenDoc = $("#IdTb_MGT_RenewalDoc").val();
    var idOPLAgr = $("#IdOPLAgreement").val();
    var idOPLUnit = $("#IdTb_OPL_Unit").val();
    var tBudget = replaceSeparator($("#tBudget").val());
    var rBudget = replaceSeparator($("#rBudget").val());
    var trList = $(tbSelector).find("*.rowItem");

    var length = $("tr[class*='rowItem']").length;

    var hObj = {};
    hObj.IdTb_MGT_RenewalDoc = idRenDoc;
    hObj.IdOPLAgreement = idOPLAgr;
    hObj.IdTb_OPL_Unit = idOPLUnit;
    hObj.TotalBudget = tBudget;
    hObj.RemainingBudget = rBudget;

    var data = {
        Header: hObj,
        Detail: []
    };

    for (var i = 0; i < length; i++) {
        if ($(trList[i]).is(":visible")) {

            var obj = {};

            obj.IdTb_MGT_RenewalDocDtl = $(rDDtlList[i]).val();
            obj.IdTb_MGT_RenewalDoc = idRenDoc;
            obj.Type = $(typeList[i]).val();
            obj.StartDate = $(sDateList[i]).val();
            obj.EndDate = $(eDateList[i]).val();
            obj.IdSupplier = $(suppList[i]).val();
            obj.InvoiceNumber = $(invList[i]).val();
            obj.TaxAmount = replaceSeparator($(tAmtList[i]).val());
            obj.Fee = replaceSeparator($(fAmtList[i]).val());
            obj.Penalty = replaceSeparator($(pAmtList[i]).val());
            obj.Ppn = replaceSeparator($(nAmtList[i]).val());
            obj.Pph = replaceSeparator($(hAmtList[i]).val());
            obj.Others = replaceSeparator($(oAmtList[i]).val());
            obj.Total = replaceSeparator($(totAmtList[i]).val());
            obj.Remark = $(remarkList[i]).val();
            obj.IsValid = state == "Validate" ? true : false;

            data.Detail.push(obj);
        }                
    }

    $.ajax(
    {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        url: serverRoot + "MGTComplementUnit/UpdateRenewalDocumentOPLUnit",
        success: function(response) {

            $('body').on('hidden.bs.modal', '.modal', function() {
                $(this).removeData('bs.modal');
            });

            $('#updateRenewalDocModal').modal('hide');

            UpdateRenewalDocSuccessMsg();
        }
    });
});

function UpdateRenewalDocSuccessMsg() {
    var successMsg = "<div id = 'RenewalDocSuccessUpdated' class='alert alert-success' role='alert'>" +
                                "<button type='button' class='close' data-dismiss='alert'>" +
                                    "<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span>" +
                                "</button><b>Success!</b> Renewal Doc have been updated" +
                            "</div>";
    $('#datatable').before(successMsg);

    setTimeout(function() {
        $('#RenewalDocSuccessUpdated').fadeOut('fast');
    }, 3000);
}
$("#ddlSearchCriteria").change(function() {
    var check = $("#ddlSearchCriteria option:selected").text();

    if (iActiveIndex == 3) {
        if (check == "Modified Date") {
            $("#sDateParam").text("Start Modified Date");
            $("#eDateParam").text("End Modified Date");
        } else {
            $("#sDateParam").text("Start Expiration Date");
            $("#eDateParam").text("End Expiration Date");
        }
    } else {
        if (check == "Agreement Number" && $("#txtSearch").val() == "") {
            $("#btnPrintSTNK").prop("disabled", true);
            $("#btnPrintKEUR").prop("disabled", true);
        } else {
            $("#btnPrintSTNK").prop("disabled", false);
            $("#btnPrintKEUR").prop("disabled", false);
        }
    }

});
function OnChangeSelectOption(index) {
    var check = $("#renDoc_" + index + "__Type" + " option:selected").text();
    var tbSelector = "#itemRenDoc-table tbody";
    var trList = $(tbSelector).find("*.rowItem");
    var length = $("tr[class*='rowItem']").length;    

    for (var i = 0; i < length; i++) {
        if ($(trList[i]).is(":visible")) {            
            var sOLenght = $("#renDoc_" + i + "__Type" + " option").length;            
                        
            for (var x = 0; x < sOLenght; x++) {
                var cInd = $("#renDoc_" + x + "__Type" + " option:contains(" + check + ")");
                var cIndTxt = $("#renDoc_" + x + "__Type" + " option:selected").text();                

                if (cInd && (check != cIndTxt) && (check != "Type")) {
                    cInd.hide();
                } else {
                    cInd.show();
                }
            }
        }
    }
};