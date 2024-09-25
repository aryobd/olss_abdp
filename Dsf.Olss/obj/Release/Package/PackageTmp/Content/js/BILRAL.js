var rowsSelected = new Array();
var SelectedRow = new Array();
var oTable = null;

function AddItem() {
    var lastRowNumber = parseInt($('#container tr:last').attr('rownumber'));
    lastRowNumber++;
    var html = '';
    html = '<tr rownumber="' + lastRowNumber + '">'
                + '<td>'
                    + '<div><input type="text" class="form-control mandatory EndorseeName" maxlength="50"></div>'
                    + '<span class="field-validation-valid" data-valmsg-for="EndorseeName-' + lastRowNumber + '" data-valmsg-replace="true"></span>'
                + '</td>'
                + '<td>'
                    + '<div><input type="text" class="form-control mandatory EndorseeID" maxlength="30"></div>'
                    + '<span class="field-validation-valid" data-valmsg-for="IdentityNumber-' + lastRowNumber + '" data-valmsg-replace="true"></span>'
                + '</td>'
                + '<td>'
                    + '<div><textarea value="" rows="2" cols="50" class="form-control mandatory EndorseeAddress" maxlength="100"></textarea></div>'
                    + '<span class="field-validation-valid" data-valmsg-for="Address-' + lastRowNumber + '" data-valmsg-replace="true"></span>'
                + '</td>'
                + '<td>'
                    + '<div><input type="text" class="form-control mandatory EndorseePhone" maxlength="25"></div>'
                    + '<span class="field-validation-valid" data-valmsg-for="PhoneNumber-' + lastRowNumber + '" data-valmsg-replace="true"></span>'
                + '</td>'
                + '<td>'
                    + '<button class="btn btn-danger remove_item" name="remove_btn" type="button" style="height: 30px; padding-top: 4px;" onclick="DeleteItem(' + lastRowNumber + ')"><i class="fa fa-minus"></i></button>'
                + '</td>'
            + '</tr>';

    $('#container').append(html);
    var isEnable = $('#container tr:first td:last button').attr('disabled');
    if (isEnable == "disabled") {
        var rownumber = $('#container tr:first').attr('rownumber');
        $('#container tr:first td:last button').removeAttr('disabled').attr('onclick', 'DeleteItem(' + rownumber + ')');
    }
}

function DeleteItem(rownumber) {
    $('#container tr[rownumber="' + rownumber + '"]').remove();
    var rowTotal = $('#container tr').length;
    if (rowTotal == 1) {
        $('#container tr:first td:last button').attr('disabled', 'disabled').removeAttr('onclick');
    }
}

function DeleteObjectList(rownumber) {
    //var idUObjLease = parseInt($('#IdUObjLease' + rownumber + '').val());

    //var cell = oTable.fnGetNodes($('#object-list-container tr:eq(' + (rownumber - 1) + ')'));
    var $tr = $('#object-list-container tr:eq(' + (rownumber - 1) + ')');
    var ChassisNumber = $tr.find(".RALObjectDtlChassisNumber").val();
    var EngineNumber = $tr.find(".RALObjectDtlEngineNumber").val();
    var PoliceNumber = $tr.find(".RALObjectDtlPoliceNumber").val();
    var Year = $tr.find(".RALObjectDtlYear").val();
    var Colour = $tr.find(".RALObjectDtlColour").val();
    var dataArray = { "ChassisNumber": ChassisNumber, "EngineNumber": EngineNumber, "PoliceNumber": PoliceNumber, "Year": Year.toString(), "Colour": Colour };
    var index = IndexObjectInArray(SelectedRow, dataArray);
    if (index != -1)
        SelectedRow.splice(index, 1);

    var rows = $('#object-list-container tr:eq(' + (rownumber - 1) + ')').nextAll();
    $('#object-list-container tr:eq(' + (rownumber - 1) + ')').remove();

    if (rows.length !== 0) {
        rows.each(function () {
            var noColumn = $(this).find('td:eq(0)');
            $(noColumn).text(rownumber);
            $(this).find('button').attr('onclick', 'DeleteObjectList(' + rownumber + ')');
            rownumber++;
        });
    }
}

function IndexObjectInArray(arrayOfObject, lookingObject) {
    for (var index = 0; index < arrayOfObject.length; ++index) {
        var o = arrayOfObject[index];
        if (JSON.stringify(o) === JSON.stringify(lookingObject))
            return index;
    }
    return -1;
}

function LoadObjectList(payScheduleId) {
    // datatable
    oTable = $('#object-list').dataTable({
        "bServerSide": true,
        "bProcessing": true,
        "aaSorting": [[0, "desc"]],
        "bRetrieve": true,
        "sAjaxSource": serverRoot + "BILRAL/ObjectListDataTable",
        "fnServerParams": function (aoData) {
            aoData.push(
                { "name": "payScheduleId", "value": payScheduleId },
                { "name": "selectedObjectList", "value": JSON.stringify(SelectedRow) }
            );

            //if (SelectedRow.length != 0) {
            //    for (index = 0; index < SelectedRow.length; index++) {
            //        aoData.push({ "name": "selectedIdUObjLeaseList[" + index + "]", "value": SelectedRow[index] });
            //    }
            //}
            //else {
            //    aoData.push({ "name": "selectedIdUObjLeaseList", "value": SelectedRow });
            //}
        },
        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",
        "aoColumns": [
            {
                "mData": null,
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function (oObj) {
                    return "<input type='checkbox' name='chkbox' style='width: 15px;'>";
                }
            },
            { "mData": "ObjectType" },
            { "mData": "PoliceNumber" },
            { "mData": "Year" },
            { "mData": "Colour" },
            {
                "mData": "IdUObjLease",
                "bVisible": false,
            },
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var data = aData;
            var rowSelected = rowsSelected.map(function (e) {
                return e.IdUObjLease;
            });

            var isExist = rowSelected.indexOf(data.IdUObjLease) !== -1;
            // If row ID is in the list of selected row IDs
            if (isExist) {
                $(nRow).find('input[type="checkbox"]').prop('checked', true);
                $('#select-all-object').prop('checked', true);
            }
            else {
                $('#select-all-object').prop('checked', false);
            }
        },
        "iDisplayLength": 5,
        "bLengthChange": false
    });

    $("#object-list tbody").delegate("input[type='checkbox']", "click", function () {
        var isChecked = $(this).is(':checked');
        var cell = oTable.fnGetNodes($(this).parent().parent().index());
        var data = oTable.fnGetData(cell);
        var idUObjLeaseSelected = rowsSelected.map(function (e) {
            return e.IdUObjLease;
        });
        var index = idUObjLeaseSelected.indexOf(data.IdUObjLease);

        if (isChecked) {
            if (index === -1) {
                rowsSelected.push(data);
            }
        }
        else if (index !== -1) {
            rowsSelected.splice(index, 1);
        }

        $("#object-list tbody").undelegate("tr", "click");
    });

    $('#select-all-object').click(function () {
        var isChecked = $(this).is(':checked');
        var cells = oTable.fnGetNodes();
        $(cells).each(function () {
            var data = oTable.fnGetData(this);
            var idUObjLeaseSelected = rowsSelected.map(function (e) {
                return e.IdUObjLease;
            });
            var index = idUObjLeaseSelected.indexOf(data.IdUObjLease);
            if (isChecked) {
                if (index === -1) {
                    rowsSelected.push(data);
                }
            }
            else if (index !== -1) {
                rowsSelected.splice(index, 1);
            }
        });

        $(cells).find(':checkbox').prop('checked', $(this).is(':checked'));
    });

    $('#select-object').click(function () {
        var html = "";
        var no = SelectedRow.length;

        rowsSelected.forEach(function (e) {
            var dataArray = { "ChassisNumber": e.ChassisNumber, "EngineNumber": e.EngineNumber, "PoliceNumber": e.PoliceNumber, "Year": e.Year.toString(), "Colour": e.Colour };
            SelectedRow.push(dataArray);
            no++;

            html += '<tr>' +
                        '<input id="IdUObjLease' + no + '" type="hidden" value="' + e.IdUObjLease + '">' +
                        '<td class="font-bold text-right">' + no + '</td>' +
                        '<td>' +
                            '<input type="text" class="form-control RALObjectDtlObjectType" style="background-color: white;" value="' + e.ObjectType + '" readonly />' +
                            //'<p class="form-control-static">' + e.ObjectType + '</p>' +
                        '</td>' +
                        '<td>' +
                            '<input type="text" class="form-control RALObjectDtlChassisNumber" style="background-color: white;" value="' + e.ChassisNumber + '" readonly />' +
                            //'<p class="form-control-static">' + e.ChassisNumber + '</p>' +
                        '</td>' +
                        '<td>' +
                            '<input type="text" class="form-control RALObjectDtlEngineNumber" style="background-color: white;" value="' + e.EngineNumber + '" readonly />' +
                            //'<p class="form-control-static">' + e.EngineNumber + '</p>' +
                        '</td>' +
                        '<td>' +
                            '<input type="text" class="form-control RALObjectDtlPoliceNumber" style="background-color: white;" value="' + e.PoliceNumber + '" readonly />' +
                            //'<p class="form-control-static">' + e.PoliceNumber + '</p>' +
                        '</td>' +
                        '<td>' +
                            '<input type="text" class="form-control RALObjectDtlYear" style="background-color: white;" value="' + e.Year + '" readonly />' +
                            //'<p class="form-control-static text-center">' + e.Year + '</p>' +
                        '</td>' +
                        '<td>' +
                            '<input type="text" class="form-control RALObjectDtlColour" style="background-color: white;" value="' + e.Colour + '" readonly />' +
                            //'<p class="form-control-static">' + e.Colour + '</p>' +
                        '</td>' +
                        '<td class="text-center">' +
                            '<input type="hidden" class="IdTb_BIL_RALObjectDtl" />' +
                            '<button class="btn btn-danger remove_item" name="add_btn" type="button" onclick="DeleteObjectList(' + no + ')"><i class="fa fa-minus"></i></button>' +
                        '</td>' +
                    '</tr>';
        });

        rowsSelected.length = 0;

        $('#object-list-container').append(html);

        $('#objectListModal').modal('hide');
        $('#select-all-object').prop('checked', false);
    });

    oTable.fnFilter('');
}

function PopulateObjectDtlList(objectDtlList, payScheduleId) {
    $('#object-list-container tr').remove();

    var html = '';
    var isNotEmpty = false;
    for (index = 0; index < objectDtlList.length; index++) {
        var dataArray = { "ChassisNumber": objectDtlList[index].ChassisNumber, "EngineNumber": objectDtlList[index].EngineNumber, "PoliceNumber": objectDtlList[index].PoliceNumber, "Year": objectDtlList[index].Year.toString(), "Colour": objectDtlList[index].Colour };

        SelectedRow.push(dataArray);

        html += '<tr>' +
                    '<input id="IdUObjLease' + (index + 1) + '" type="hidden" value="' + objectDtlList[index].IdUObjLease + '">' +
                    '<td class="font-bold text-right">' + (index + 1) + '</td>' +
                    '<td>' +
                        '<input type="text" class="form-control RALObjectDtlObjectType" style="background-color: white;" value="' + objectDtlList[index].ObjectType + '" readonly />' +
                        //'<p class="form-control-static">' + objectDtlList[index].ObjectType + '</p>' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="form-control RALObjectDtlChassisNumber" style="background-color: white;" value="' + objectDtlList[index].ChassisNumber + '" readonly />' +
                        //'<p class="form-control-static">' + objectDtlList[index].ChassisNumber + '</p>' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="form-control RALObjectDtlEngineNumber" style="background-color: white;" value="' + objectDtlList[index].EngineNumber + '" readonly />' +
                        //'<p class="form-control-static">' + objectDtlList[index].EngineNumber + '</p>' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="form-control RALObjectDtlPoliceNumber" style="background-color: white;" value="' + objectDtlList[index].PoliceNumber + '" readonly />' +
                        //'<p class="form-control-static text-center">' + objectDtlList[index].PoliceNumber + '</p>' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="form-control RALObjectDtlYear" style="background-color: white;" value="' + objectDtlList[index].Year + '" readonly />' +
                        //'<p class="form-control-static text-center">' + objectDtlList[index].Year + '</p>' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="form-control RALObjectDtlColour" style="background-color: white;" value="' + objectDtlList[index].Colour + '" readonly />' +
                        //'<p class="form-control-static">' + objectDtlList[index].Colour + '</p>' +
                    '</td>' +
                    '<td>' +
                        '<input type="hidden" class="IdTb_BIL_RALObjectDtl" />' +
                        '<button class="btn btn-danger remove_item" name="add_btn" type="button" onclick="DeleteObjectList(' + (index + 1) + ')"><i class="fa fa-minus"></i></button>' +
                    '</td>' +
                '</tr>';
    }

    $('#object-list-container').append(html);
}

function UpdateNames() {
    //Update name attribute for each rows on the ral endorsee detail list
    var rows = $('#container tr');
    var index = 0;
    rows.each(function () {
        $(this).find(".EndorseeName").prop("name", "RALEndorseeDtl[" + index + "].EndorseeName");
        $(this).find(".EndorseeID").prop("name", "RALEndorseeDtl[" + index + "].EndorseeID");
        $(this).find(".EndorseeAddress").prop("name", "RALEndorseeDtl[" + index + "].EndorseeAddress");
        $(this).find(".EndorseePhone").prop("name", "RALEndorseeDtl[" + index + "].EndorseePhone");
        index++;
    });

    //Update name attribute for each rows on the ral object detail list
    var rowsObjectList = $('#object-list-container tr');
    var indexObjectList = 0;

    rowsObjectList.each(function () {
        $(this).find(".RALObjectDtlObjectType").attr("name", "RALObjectDtl[" + indexObjectList + "].ObjectType");
        $(this).find(".RALObjectDtlChassisNumber").attr("name", "RALObjectDtl[" + indexObjectList + "].ChassisNumber");
        $(this).find(".RALObjectDtlEngineNumber").attr("name", "RALObjectDtl[" + indexObjectList + "].EngineNumber");
        $(this).find(".RALObjectDtlPoliceNumber").attr("name", "RALObjectDtl[" + indexObjectList + "].PoliceNumber");
        $(this).find(".RALObjectDtlYear").attr("name", "RALObjectDtl[" + indexObjectList + "].Year");
        $(this).find(".RALObjectDtlColour").attr("name", "RALObjectDtl[" + indexObjectList + "].Colour");

        indexObjectList++;
    });
}