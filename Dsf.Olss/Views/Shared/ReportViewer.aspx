<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="Dsf.Olss.Common" %>
<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script runat="server">
        void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                var reportsession = (Dsf.Olss.Common.ReportSessionData)Session["ReportData"];

                ReportViewer1.LocalReport.ReportPath = Server.MapPath(reportsession.ReportPath);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportDataSource rdc = new ReportDataSource("DataSet1", reportsession.ReportData);
                ReportDataSource rdc2 = new ReportDataSource("DataSet2", reportsession.ReportDetails);
                ReportDataSource rdc3 = new ReportDataSource("DataSet3", reportsession.ReportDetails2);
                ReportDataSource rdc4 = new ReportDataSource("DataSet4", reportsession.ReportDetailsData3);
                ReportDataSource rdc5 = new ReportDataSource("DataSet5", reportsession.ReportDetailsData4);
                ReportDataSource rdc6 = new ReportDataSource("DataSet6", reportsession.ReportDetailsData5);
                
                ReportViewer1.LocalReport.DataSources.Add(rdc);
                ReportViewer1.LocalReport.DataSources.Add(rdc2);
                ReportViewer1.LocalReport.DataSources.Add(rdc3);
                ReportViewer1.LocalReport.DataSources.Add(rdc4);
                ReportViewer1.LocalReport.DataSources.Add(rdc5);
                ReportViewer1.LocalReport.DataSources.Add(rdc6);
                switch (reportsession.ReportModule)
                {
                    case 1:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.Cvs, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 2:

                        ReportParameter TaxValueSKD = new ReportParameter("TaxValue", reportsession.ReportParameter.ToString());
                        ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { TaxValueSKD });
                        
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.Skd, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 3:
                        
                        ReportParameter TaxValueAgr = new ReportParameter("TaxValue", reportsession.ReportParameter.ToString());
                        ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { TaxValueAgr });
                        
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.Agr, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 4:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.Po, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 5:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.Upc, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 6:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.Ups, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 7:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.BastRpc, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 8:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.BastOpl, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 9:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.WorkOrder, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 10:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.MaintenanceReceipt, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 11:
                        ReportParameter pTypeRpt = new ReportParameter("PrintTypeReport", "Internal");
                        ReportParameter TaxValueInv = new ReportParameter("TaxValue", reportsession.ReportParameter.ToString());
                        ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { pTypeRpt, TaxValueInv });  
                        
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.InstallmentInvoice, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 12:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.InstallmentReceipt, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 14:
                        ReportParameter TaxValueMtn = new ReportParameter("TaxValue", reportsession.ReportParameter.ToString());
                        ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { TaxValueMtn });  
                        
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.MaintenanceInvoice, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 15:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.InstallmentReceipt, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 16:
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.WarningLetter, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 17:
                        rdc = new ReportDataSource("DataSetDetailListInvoiceReceipt", reportsession.ReportData);
                        ReportViewer1.LocalReport.DataSources.Add(rdc);

                        var rptParamsInv = (Dsf.Olss.Service.Infos.DetailReportListParamInfo)reportsession.ReportParameter;

                        ReportParameter invNo = new ReportParameter("InvoiceNo", rptParamsInv.InvoiceNo);
                        ReportParameter tAgrInv = new ReportParameter("TotalAgr", rptParamsInv.TotalAgr.ToString());
                        ReportParameter tAlatInv = new ReportParameter("TotalAlat", rptParamsInv.TotalAlat.ToString());
                        ReportParameter tUnitInv = new ReportParameter("TotalUnit", rptParamsInv.TotalUnit.ToString());
                        ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { invNo, tAgrInv, tAlatInv, tUnitInv });
                        
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.InvoiceDetailList, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    case 18:
                        rdc = new ReportDataSource("DataSetDetailListInvoiceReceipt", reportsession.ReportData);
                        ReportViewer1.LocalReport.DataSources.Add(rdc);

                        var rptParamsRcp = (Dsf.Olss.Service.Infos.DetailReportListParamInfo)reportsession.ReportParameter;

                        ReportParameter rcpNo = new ReportParameter("ReceiptNo", rptParamsRcp.ReceiptNo);
                        ReportParameter tAgrRcp = new ReportParameter("TotalAgr", rptParamsRcp.TotalAgr.ToString());
                        ReportParameter tAlatRcp = new ReportParameter("TotalAlat", rptParamsRcp.TotalAlat.ToString());
                        ReportParameter tUnitRcp = new ReportParameter("TotalUnit", rptParamsRcp.TotalUnit.ToString());
                        ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { rcpNo, tAgrRcp, tAlatRcp, tUnitRcp });
                        
                        ReportViewer1.LocalReport.DisplayName = string.Concat(ModuleNameReport.ReceiptDetailList, string.Format("{0:MMddyyyy}", DateTime.Now), "_", string.Format("{0:hhmm}", DateTime.Now));
                        break;
                    default:

                        if (Path.GetFileNameWithoutExtension(ReportViewer1.LocalReport.ReportPath) == "DISMemoAuctionLampiran")
                        {
                            ReportParameter TaxValueMemoAucLampiran = new ReportParameter("TaxValue", reportsession.ReportParameter.ToString());
                            ReportViewer1.LocalReport.SetParameters(new ReportParameter[] { TaxValueMemoAucLampiran }); 
                        }
                        
                        ReportViewer1.LocalReport.DisplayName = ReportViewer1.LocalReport.DisplayName = Path.GetFileNameWithoutExtension(ReportViewer1.LocalReport.ReportPath);
                        break;

                }
                ReportViewer1.LocalReport.Refresh();
            }
        }

        protected void ReportViewer1_PreRender(object sender, EventArgs e)
        {
            var reportsession = (Dsf.Olss.Common.ReportSessionData)Session["ReportData"];
            //Excel 2003
            VisibleExportFormat((ReportViewer)sender, "Excel", false);
            //Excel
            if (reportsession.ReportModule == (int)Dsf.Lib.Constant.OlssOplModule.Agreement)
                VisibleExportFormat((ReportViewer)sender, "EXCELOPENXML", false);
            else 
                VisibleExportFormat((ReportViewer)sender, "EXCELOPENXML", true);
            //TIFF file
            VisibleExportFormat((ReportViewer)sender, "IMAGE", false);
            //PDF
            //Edited by Fadilah 16/01/2020
            VisibleExportFormat((ReportViewer)sender, "PDF", true);
            if (reportsession.ReportPath == "~/Report/SalePurchaseAgreement(Company Asset).rdlc" || 
                reportsession.ReportPath == "~/Report/SalePurchaseAgreement(Company).rdlc" ||
                reportsession.ReportPath == "~/Report/SalePurchaseAgreement(Private Asset).rdlc" ||
                reportsession.ReportPath == "~/Report/SalePurchaseAgreement(Private).rdlc" ||
                reportsession.ReportPath == "~/Report/DISMemoPenjualanAssetTerminate(Company).rdlc" ||
                reportsession.ReportPath == "~/Report/DISMemoPenjualanAssetTerminate(Individu).rdlc" ||
                reportsession.ReportPath == "~/Report/DISMemoPenjualanAssetPhase2.rdlc")
            {
                //Word 2003
                VisibleExportFormat((ReportViewer)sender, "WORD", true);
            }
            //End by Fadilah 16/01/2020
            //Word
            VisibleExportFormat((ReportViewer)sender, "WORDOPENXML", false);
        }

        /// <summary>
        /// Hidden/Display the special SSRS rendering format in ReportViewer control
        /// </summary>
        /// <param name="ReportViewerID">The ID of the relevant ReportViewer control</param>
        /// <param name="strFormatName">Format Name</param>
        /// <param name="isVisible">Visible value</param>
        public void VisibleExportFormat(ReportViewer ReportViewerID, string strFormatName, bool isVisible)
        {
            System.Reflection.FieldInfo info;
            foreach (RenderingExtension extension in ReportViewerID.LocalReport.ListRenderingExtensions())
            {
                if (extension.Name.Trim().ToUpper() == strFormatName.Trim().ToUpper())
                {
                    info = extension.GetType().GetField("m_isVisible", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
                    info.SetValue(extension, isVisible);
                }
            }
        }
    </script>
</head>

<body>
    <form id="form1" runat="server">
        <div>
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server"
                AsyncRendering="false"
                SizeToReportContent="true"
                Font-Names="Verdana"
                Font-Size="8pt"
                WaitMessageFont-Names="Verdana"
                WaitMessageFont-Size="14pt"
                OnPreRender="ReportViewer1_PreRender">
                <LocalReport ReportPath="Report\OPLProposal.rdlc">
                </LocalReport>
            </rsweb:ReportViewer>
        </div>
    </form>
</body>
</html>

