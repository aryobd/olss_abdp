$(document).ready(function() {

	// datatable
	$('#customer-list').each(function() {
	    var oTable = $(this).dataTable({
            "bServerSide": true,
			"bProcessing": true,
			"sAjaxSource": "Customer/AjaxHandler",
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"sPaginationType": "full_numbers",
			"aoColumns": [
				{ "mData": "Code" },
				{ "mData": "Name" },
				{ "mData": "Phone" },
				{ "mData": "InternalRating" },
				{ "mData": "Industry" },
                {
                    "mData": "Id",
                    "bSearchable": false,
                    "bSortable": false,
                    "fnRender": function (oObj) {
                        return "<a href='Customer/Details/" + oObj.aData["Id"] + "' class='btn btn-info btn-sm'><i class='fa fa-bars'></i></a>&nbsp;<a href='Customer/Edit/" + oObj.aData["Id"] + "' class='btn btn-info btn-sm'><i class='fa fa-edit'></i></a>&nbsp;<a href='Customer/Delete/" + oObj.aData["Id"] + "' class='btn btn-danger btn-sm'><i class='fa fa-times'></i></a>"
                    }
                },
			]
		} );
	});

		// datatable
	$('#supplier-list').each(function() {
		var oTable = $(this).dataTable( {
			"bProcessing": true,
			"sAjaxSource": "js/data/datatable-supplier.json",
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"sPaginationType": "full_numbers",
			"aoColumns": [
				{ "mData": "code" },
				{ "mData": "name" },
				{ "mData": "phone" },
				{ "mData": "industry" },
				{ "mData": "action",
				  "bSortable": false }
			]
		} );
	});

	$('#role-list').each(function() {
		var oTable = $(this).dataTable( {
			"bProcessing": true,
			"sAjaxSource": "js/data/datatable-role.json",
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"sPaginationType": "full_numbers",
			"aoColumns": [
				{ "mData": "id" },
				{ "mData": "name" },
				{ "mData": "description" },
				{ "mData": "action",
				  "bSortable": false  }
			]
		} );
	});

	$('#user-list').each(function() {
		var oTable = $(this).dataTable( {
			"bProcessing": true,
			"sAjaxSource": "js/data/datatable-user.json",
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"sPaginationType": "full_numbers",
			"aoColumns": [
				{ "mData": "id" },
				{ "mData": "username" },
				{ "mData": "realname" },
				{ "mData": "role" },
				{ "mData": "action",
				  "bSortable": false  }
			]
		} );
	});

	$('#vehicle-list').each(function() {
		var oTable = $(this).dataTable( {
			"bProcessing": true,
			"sAjaxSource": "js/data/datatable-vehicle.json",
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"sPaginationType": "full_numbers",
			"aoColumns": [
				{ "mData": "id" },
				{ "mData": "brandcode" },
				{ "mData": "brand" },
				{ "mData": "vehiclename" },
				{ "mData": "model" },
				{ "mData": "year" },
				{ "mData": "action",
				  "bSortable": false  }
			]
		} );
	});

});