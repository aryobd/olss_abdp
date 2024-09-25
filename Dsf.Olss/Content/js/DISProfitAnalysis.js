$(document).ready(function() {
    // datatable
    $('#assetDetail-list').each(function() {
        var oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "asc"]],
            "sAjaxSource": serverRoot + "DISAssetSelling/DISGainAndLossList",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "fnServerParams": function(aoData) {
            aoData.push(
                { "name": "disposalNo", "value": $('#disposalNoTxt').val() },
                { "name": "assetSellingDetail", "value": $('#assetSellingIdDetail').val() }
            );
        },
        "sPaginationType": "full_numbers",
        "aoColumns": [
            { "mData": "AgreementNumber" },
            { "mData": "AssetCode" },
            { "mData": "EngineNumber" },
            { "mData": "ModelName" },
            { "mData": "amountToBePaid", "sClass": "text-right" },
            { "mData": "PPn", "sClass": "text-right" },
            { "mData": "BookValue", "sClass": "text-right" },
            { "mData": "Impairement", "sClass": "text-right" },
            { "mData": "GainLoss", "sClass": "text-right" }
        ]
    });
});
});

$(document).ready(function() {
    // datatable
    $('#assetDetail-list-report').each(function() {
        var oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "asc"]],
            "sAjaxSource": serverRoot + "DISAssetSelling/DISGainAndLossList",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "disposalNo", "value": $('#disposalNoTxt').val() },
                    { "name": "assetSellingDetail", "value": $('#assetSellingIdDetail').val() }
                );
            },
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "AgreementNumber" },
                { "mData": "AssetCode" },
                { "mData": "EngineNumber" },
                { "mData": "ModelName" },
                { "mData": "OfferPrice", "sClass": "text-right" },
                { "mData": "PPn", "sClass": "text-right" },
                { "mData": "BookValue", "sClass": "text-right" },
                { "mData": "Impairement", "sClass": "text-right" },
                { "mData": "GainLoss", "sClass": "text-right" }
            ]
        });
    });
});

//profit analysis on add page 
$(document).ready(function() {
    // datatable
    $('#agreementDetailAdd-list').each(function() {
        var oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "asc"]],
            "sAjaxSource": serverRoot + "DISAssetSelling/DISProfitAnalysisList",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "fnServerParams": function(aoData) {
            aoData.push(
                { "name": "disposalNo", "value": $('#disposalNoTxt').val() }
            );
        },
        "sPaginationType": "full_numbers",
        "aoColumns": [
            { "mData": "AgreementNumber" },
            { "mData": "ModelName" },
            { "mData": "Quantity", "sClass": "text-center" },
            { "mData": "ModelYear", "sClass": "text-center" },
            { "mData": "ProfitBudget", "sClass": "text-right" },
            { "mData": null }
        ]
    });
});
});

//profit analysis on edit & detail page
$(document).ready(function() {
    // datatable
    $('#agreementDetail-list').each(function() {
        var oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "asc"]],
            "sAjaxSource": serverRoot + "DISAssetSelling/ProfitAnalysisStaticData",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "fnServerParams": function(aoData) {
            aoData.push(
                { "name": "assetSellingId", "value": $('#assetSellingId').val() },
                { "name": "assetSellingDetail", "value": $('#assetSellingIdDetail').val() }
            );
        },
        "sPaginationType": "full_numbers",
        "aoColumns": [
            { "mData": "AgreementNumber" },
            { "mData": "ModelName" },
            { "mData": "ModelYear", "sClass": "text-center" },
            { "mData": "QuantityBudget", "sClass": "text-center" },
            { "mData": "ProfitBudget", "sClass": "text-right" },
            { "mData": "QuantityActual", "sClass": "text-center" },
            { "mData": "ProfitActual", "sClass": "text-right numeric currency" },
            {
                "mData": "IdTb_DIS_ProfitAnalysisBudget",
                "bSearchable": false,
                "bSortable": false,
                "fnRender": function(oObj) {
                    var id = oObj.aData["IdTb_DIS_ProfitAnalysisBudget"];
                    var iddetail = oObj.aData["IdTb_DIS_AssetSellingDetail"];

                    var isSubmitted = oObj.aData["IsSubmitted"];
                    var htmlButtonAction = "";

                    if (isSubmitted) {
                        htmlButtonAction = "<a title='Detail' href=' " + serverRoot + "DISAssetSelling/DetailProfitAnalysis?id=" + id + "&iddetail=" + iddetail + "' class='btn btn-info btn-xs'><i class='fa fa-bars'></i></a>";
                    } else {
                        htmlButtonAction = "<a title='Edit' href='" + serverRoot + "DISAssetSelling/EditProfitAnalysis?id=" + id + "&iddetail=" + iddetail + "' class='btn btn-info btn-xs'><i class='fa fa-bars'></i></a>";
                    }
                    
                    if ($(document).find("title").text() == "Detail Report Approval")
                    {
                        htmlButtonAction = "<a title='Edit' href='" + serverRoot + "DISAssetSelling/EditProfitAnalysisReport?id=" + id + "&iddetail=" + iddetail + "' class='btn btn-info btn-xs'><i class='fa fa-bars'></i></a>";
                    }
                    return htmlButtonAction;
                }
            }

        ]
    });
});
});

//$(document).ready(function() {
//    // datatable
//    $('#buyerDetail-list').each(function() {
//        var oTable = $(this).dataTable({
//            "bServerSide": true,
//            "bProcessing": true,
//            "bRetrieve": true,
//            "aaSorting": [[0, "asc"]],
//            //"sAjaxSource": "@Url.Action("GetBuyerList", "DISAssetSelling")",
//            "sAjaxSource": serverRoot + "DISAssetSelling/GetBuyerList",
//            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
//            "fnServerParams": function(aoData) {
//                aoData.push(
//                    { "name": "disposalNo", "value": $('#disposalNoTxt').val() }
//                );
//            },
//            "sPaginationType": "full_numbers",
//            "aoColumns": [
//                { "mData": "Name" },
//                { "mData": "Address" },
//                { "mData": "AssetCode" },
//                { "mData": "OfferPriceDate", "sClass": "text-right" },
//                { "mData": "OfferPriceAmount", "sClass": "text-right" },
//                { "mData": "AmountToBePaid", "sClass": "text-right" },
//                {
//                    "mData": "Winner",
//                    "bSearchable": false,
//                    "bSortable": false,
//                    "fnRender": function(oObj) {
//                        var status = oObj.aData["Winner"];

//                        if (status === true) {
//                            return "<span class='fa fa-check-square'></span>";
//                        } else {
//                            return "";
//                        }
//                    },
//                    "sClass": "text-center"
//                }
//            ]
//        });
//    });
//});

$(document).ready(function() {
    // datatable
    $('#assetDetailAuction-list').each(function() {
        var oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "asc"]],
            "sAjaxSource": serverRoot + "DISAssetSelling/DISGainAndLossList",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "disposalNo", "value": $('#disposalNoTxt').val() }
                );
            },
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "AgreementNumber" },
                { "mData": "AssetCode" },
                { "mData": "ModelName" },
                { "mData": "JBAOfferPriceAmount", "sClass": "text-right" },
                { "mData": "OfferPrice", "sClass": "text-right" },
                { "mData": "PPn", "sClass": "text-right" },
                { "mData": "BookValue", "sClass": "text-right" },
                { "mData": "Impairement", "sClass": "text-right" },
                { "mData": "GainLoss", "sClass": "text-right" }
            ]
        });
    });
});

$(document).ready(function() {
    // datatable
    $('#assetDetailAuctionEst-list').each(function() {
        var oTable = $(this).dataTable({
            "bServerSide": true,
            "bProcessing": true,
            "bRetrieve": true,
            "aaSorting": [[0, "asc"]],
            "sAjaxSource": serverRoot + "DISAssetSelling/DISGainAndLossList",
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "fnServerParams": function(aoData) {
                aoData.push(
                    { "name": "disposalNo", "value": $('#disposalNoTxt').val() }
                );
            },
            "sPaginationType": "full_numbers",
            "aoColumns": [
                { "mData": "AgreementNumber" },
                { "mData": "AssetCode" },
                { "mData": "ModelName" },
                { "mData": "JBAOfferPriceAmount", "sClass": "text-right" },
                { "mData": "DSFOfferPriceAmount", "sClass": "text-right" },
                { "mData": "PPnEst", "sClass": "text-right" },
                { "mData": "BookValue", "sClass": "text-right" },
                { "mData": "GainLossEst", "sClass": "text-right" }
            ]
        });
    });
});