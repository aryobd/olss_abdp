﻿using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.SqlServer;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Dsf.Lib.Constant;

using Dsf.Olss;
using Dsf.Olss.Common;
using Dsf.Olss.Controllers;
using Dsf.Olss.Models;
using Dsf.Olss.Report;

using Dsf.Olss.Service;
using Dsf.Olss.Service.Infos;
using Dsf.Olss.Service.CollectionService;
using Dsf.Olss.Service.MaintenanceService;
using Dsf.Olss.Service.SystemSetting;
using Dsf.Olss.Service.MasterService;
using Dsf.Olss.Service.MarketingService;

using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.Repository;

using Moq;

namespace Dsf.Olss.Tests.Net
{
    [TestClass]
    public class BilInvoiceMonitorControllerTests
    {
        private IBILCreationService _bilCreationService;
        private IGenericHistoryService _genericHistoryService;
        private IOPLAgreementService _agreementService;
        private ISysNumberingFormatService _numberingService;
        private IProductService _productService;
        private ICustomerService _customerService;
        private IApprovalService _approvalService;
        private IEmployeeService _employeeService;
        private IBILScheduleService _billSchService;
        private IOPLCalculationCashflowService _oplCalculationService;

        private IDatabaseFactory _dataBaseFactory;

        [TestInitialize]
        public void Initialize()
        {
            OlssEntities olssEntities =
                new OlssEntities();

            olssEntities.Database.Initialize(force: false);

            var databaseFactoryMock =
                new Mock<IDatabaseFactory>();

            databaseFactoryMock
                .Setup(a => a.Get())
                .Returns(olssEntities);

            _dataBaseFactory = databaseFactoryMock.Object;
        }

        [TestMethod]
        [TestCategory("S0264484")]
        public void A_BILInvoiceMonitor_ReportInstallmentInvoiceReceive_LoadNonGroupReportData_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["BILInvoiceMonitor_ReportInstallmentInvoiceReceive_LoadNonGroupReportData_IsValidData"]
                .Split(',');

            var IdBilInvRcp = int.Parse(getConfig[0].ToString());

            LoadAllReportInvoiceReceiptSupportData(IdBilInvRcp, "Combine");

            var controller =
                new BusinessObject();

            //Expect
            var InvNo = getConfig[1].ToString();
            var RcpNo = getConfig[2].ToString();
            var InvDt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[3].ToString()));
            var JTO = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[4].ToString()));
            var SDt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[5].ToString()));
            var EDt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[6].ToString()));
            var BAmt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "Rp. {0:N0}", decimal.Parse(getConfig[7].ToString()));
            var VAmt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:N0}", decimal.Parse(getConfig[8].ToString()));
            var TInv = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:N0}", decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString()));
            var TRcp = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "Rp. {0:N0}", (decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString())) - decimal.Parse(getConfig[9].ToString()));

            //Act
            var result = controller.GetInvoiceReport(IdBilInvRcp, _bilCreationService, _customerService
                , _agreementService, _productService, "Combine").FirstOrDefault();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(InvNo, result.InvoiceNo);
            Assert.AreEqual(RcpNo, result.ReceiptNumberInstallment);
            Assert.AreEqual(InvDt, result.CreateDate);
            Assert.AreEqual(JTO, result.PaymentSchedule);
            Assert.AreEqual(SDt, result.StartPeriodDatePaymentSchDtl);
            Assert.AreEqual(EDt, result.EndPeriodDatePaymentSchDtl);
            Assert.AreEqual(BAmt, result.BillingAmount);
            Assert.AreEqual(VAmt, result.PpnInstallment);
            Assert.AreEqual(TInv, result.TotalInstallment);
            Assert.AreEqual(TRcp, result.InstallmentTotalAmount);

        }

        [TestMethod]
        [TestCategory("S0264484")]
        public void B_BILInvoiceMonitor_ReportDetailListInvoiceReceipt_LoadNonGroupReportData_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["BILInvoiceMonitor_ReportDetailListInvoiceReceipt_LoadNonGroupReportData_IsValidData"]
                .Split(',');

            var IdBilInvRcp = int.Parse(getConfig[0].ToString());

            LoadAllReportDetailInvoiceReceiptSupportData(IdBilInvRcp);

            var controller =
                new BusinessObject();

            //Expect
            var InvNo = getConfig[1].ToString();
            var RcpNo = getConfig[2].ToString();
            var InvDt = DateTime.Parse(getConfig[3].ToString());
            var JTO = DateTime.Parse(getConfig[4].ToString());
            var SDt = DateTime.Parse(getConfig[5].ToString());
            var EDt = DateTime.Parse(getConfig[6].ToString());
            var BAmt = decimal.Parse(getConfig[7].ToString());
            var VAmt = decimal.Parse(getConfig[8].ToString());
            var TInv = decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString());
            var TRcp = (decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString())) - decimal.Parse(getConfig[9].ToString());
            var PNo = getConfig[10].ToString();
            var SAgr = DateTime.Parse(getConfig[11].ToString());
            var EAgr = DateTime.Parse(getConfig[12].ToString());
            var TAgr = int.Parse(getConfig[13].ToString());
            var TAlt = int.Parse(getConfig[14].ToString());
            var TUnt = int.Parse(getConfig[15].ToString());

            //Act
            var result = controller.GetDetaiListReport(IdBilInvRcp, _bilCreationService, _customerService
                , "Combine");

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(SDt, result.FirstOrDefault().BillingStartDate);
            Assert.AreEqual(EDt, result.FirstOrDefault().BillingEndDate);
            Assert.AreEqual(BAmt, result.Sum(x => x.BillingAmt));
            Assert.AreEqual(VAmt, result.Sum(x => x.VATAmt));
            Assert.AreEqual(TInv, (result.Sum(x => x.BillingAmt) + result.Sum(x => x.VATAmt)));
            Assert.AreEqual(TRcp, (result.Sum(x => x.BillingAmt) + result.Sum(x => x.VATAmt)) - result.Sum(x => x.PPHAmt));
            Assert.AreEqual(PNo, result.FirstOrDefault().PoliceNumber);
            Assert.AreEqual(TAgr, result.GroupBy(x => x.IdOPLAgreement).Count());
            Assert.AreEqual(TAlt, result.GroupBy(x => x.ModelName).Count());
            Assert.AreEqual(TAlt, result.Sum(x => x.QtyUnit));
        }

        [TestMethod]
        [TestCategory("S0264484")]
        public void C_BILInvoiceMonitor_ReportInstallmentInvoiceReceive_LoadGroupReportData_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["BILInvoiceMonitor_ReportInstallmentInvoiceReceive_LoadGroupReportData_IsValidData"]
                .Split(',');

            var IdBilInvRcp = int.Parse(getConfig[0].ToString());

            LoadAllReportInvoiceReceiptSupportData(IdBilInvRcp, "Combine");

            var controller =
                new BusinessObject();

            //Expect
            var InvNo = getConfig[1].ToString();
            var RcpNo = getConfig[2].ToString();
            var InvDt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[3].ToString()));
            var JTO = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[4].ToString()));
            var SDt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[5].ToString()));
            var EDt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:dd MMMM yyyy}", DateTime.Parse(getConfig[6].ToString()));
            var BAmt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "Rp. {0:N0}", decimal.Parse(getConfig[7].ToString()));
            var VAmt = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:N0}", decimal.Parse(getConfig[8].ToString()));
            var TInv = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:N0}", decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString()));
            var TRcp = string.Format(CultureInfo.CreateSpecificCulture("id-id"), "Rp. {0:N0}", (decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString())) - decimal.Parse(getConfig[9].ToString()));

            //Act
            var result = controller.GetInvoiceReport(IdBilInvRcp, _bilCreationService, _customerService
                , _agreementService, _productService, "Combine").FirstOrDefault();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(InvNo, result.InvoiceNo);
            Assert.AreEqual(RcpNo, result.ReceiptNumberInstallment);
            Assert.AreEqual(InvDt, result.CreateDate);
            Assert.AreEqual(JTO, result.PaymentSchedule);
            Assert.AreEqual(SDt, result.StartPeriodDatePaymentSchDtl);
            Assert.AreEqual(EDt, result.EndPeriodDatePaymentSchDtl);
            Assert.AreEqual(BAmt, result.BillingAmount);
            Assert.AreEqual(VAmt, result.PpnInstallment);
            Assert.AreEqual(TInv, result.TotalInstallment);
            Assert.AreEqual(TRcp, result.InstallmentTotalAmount);
        }

        [TestMethod]
        [TestCategory("S0264484")]
        public void D_BILInvoiceMonitor_ReportDetailListInvoiceReceipt_LoadGroupReportData_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["BILInvoiceMonitor_ReportDetailListInvoiceReceipt_LoadGroupReportData_IsValidData"]
                .Split(',');

            var IdBilInvRcp = int.Parse(getConfig[0].ToString());

            LoadAllReportDetailInvoiceReceiptSupportData(IdBilInvRcp);

            var controller =
                new BusinessObject();

            //Expect
            var InvNo = getConfig[1].ToString();
            var RcpNo = getConfig[2].ToString();
            var InvDt = DateTime.Parse(getConfig[3].ToString());
            var JTO = DateTime.Parse(getConfig[4].ToString());
            var SDt = DateTime.Parse(getConfig[5].ToString());
            var EDt = DateTime.Parse(getConfig[6].ToString());
            var BAmt = decimal.Parse(getConfig[7].ToString());
            var VAmt = decimal.Parse(getConfig[8].ToString());
            var TInv = decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString());
            var TRcp = (decimal.Parse(getConfig[7].ToString()) + decimal.Parse(getConfig[8].ToString())) - decimal.Parse(getConfig[9].ToString());
            var PNo = getConfig[10].ToString();
            var SAgr = DateTime.Parse(getConfig[11].ToString());
            var EAgr = DateTime.Parse(getConfig[12].ToString());
            var TAgr = int.Parse(getConfig[13].ToString());
            var TAlt = int.Parse(getConfig[14].ToString());
            var TUnt = int.Parse(getConfig[15].ToString());

            //Act
            var result = controller.GetDetaiListReport(IdBilInvRcp, _bilCreationService, _customerService
                , "Combine");

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(SDt, result.FirstOrDefault().BillingStartDate);
            Assert.AreEqual(EDt, result.FirstOrDefault().BillingEndDate);
            Assert.AreEqual(BAmt, result.Sum(x => x.BillingAmt));
            Assert.AreEqual(VAmt, result.Sum(x => x.VATAmt));
            Assert.AreEqual(TInv, (result.Sum(x => x.BillingAmt) + result.Sum(x => x.VATAmt)));
            Assert.AreEqual(TRcp, (result.Sum(x => x.BillingAmt) + result.Sum(x => x.VATAmt)) - result.Sum(x => x.PPHAmt));
            Assert.AreEqual(PNo, result.FirstOrDefault().PoliceNumber);
            Assert.AreEqual(TAgr, result.GroupBy(x => x.IdOPLAgreement).Count());
            Assert.AreEqual(TAlt, result.GroupBy(x => x.ModelName).Count());
            Assert.AreEqual(TAlt, result.Sum(x => x.QtyUnit));
        }

        [TestMethod]
        [TestCategory("S0266337")]
        public void E_BILInvoiceMonitor_PrintReportContainsPPNLabel_GetPPNValueByInvoiceIssueDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["BILInvoiceMonitor_PrintReportContainsPPNLabel_GetPPNValueByInvoiceIssueDate_IsValidData"]
                .Split(',');

            var IdBilInvRcp = int.Parse(getConfig[0].ToString());

            var cDateInv = LoadAllReportPrintReportContainsPPNLabelSupportData(IdBilInvRcp);

            //Expect
            var PPNValue = int.Parse(getConfig[1].ToString());

            //Act
            var result = Decimal.ToInt16(_oplCalculationService.OPLTAxSettingGetValue(cDateInv, TaxType.OptNameTaxType, TaxType.TaxTypePPN));

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(PPNValue, result);

        }

        public DateTime LoadAllReportPrintReportContainsPPNLabelSupportData(int Id)
        {
            #region"Init Repo"

            GenericRepository<Tb_BIL_InvoiceReceipt> bilInvRcpRepo =
                new GenericRepository<Tb_BIL_InvoiceReceipt>(_dataBaseFactory);

            GenericRepository<Tb_OPL_TAXSetting> taxSettingRepo =
                new GenericRepository<Tb_OPL_TAXSetting>(_dataBaseFactory);

            GenericRepository<OptionItem> optRepo =
                new GenericRepository<OptionItem>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optValRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var createdDateInv = bilInvRcpRepo.AsQueryable(x => x.IdTb_BIL_InvoiceReceipt == Id)
                .FirstOrDefault().CreatedDate;

            var idOpt = optRepo
               .AsQueryable(x => !x.IsDeleted && x.OptionItemName == TaxType.OptNameTaxType)
               .FirstOrDefault()
               .IdOptionItem;

            var idOptItm = optValRepo
                .AsQueryable(x => !x.IsDeleted && x.IdOptionItem == idOpt && x.ItemValuesName == TaxType.TaxTypePPN)
                .FirstOrDefault()
                .IdOptionItemValue;

            var taxVal = taxSettingRepo
                .AsQueryable(x => !x.IsDelete && createdDateInv >= x.StartDate && createdDateInv <= x.EndDate && x.TaxType == idOptItm)
                .OrderBy(x => x.IdTb_OPL_TAXSetting)
                .FirstOrDefault()
                .Value;

            #endregion

            #region"Set Up"

            var calculationServiceMock =
                new Mock<IOPLCalculationCashflowService>();

            calculationServiceMock
                .Setup(a => a.OPLTAxSettingGetValue(createdDateInv, TaxType.OptNameTaxType, TaxType.TaxTypePPN))
                .Returns(Decimal.ToInt16(taxVal));

            #endregion

            _oplCalculationService = calculationServiceMock.Object;

            return createdDateInv;

        }

        public void LoadAllReportInvoiceReceiptSupportData(int Id, string rptType)
        {
            #region"Init Repo"

            GenericRepository<Tb_BIL_InvoiceReceipt> bilInvRcpRepo =
                new GenericRepository<Tb_BIL_InvoiceReceipt>(_dataBaseFactory);

            GenericRepository<Tb_BIL_PayScheduleDtl> bilPymSchDtlRepo =
                new GenericRepository<Tb_BIL_PayScheduleDtl>(_dataBaseFactory);

            GenericRepository<Tb_BIL_PaySchedule> bilPymSchRepo =
                new GenericRepository<Tb_BIL_PaySchedule>(_dataBaseFactory);

            GenericRepository<OPLAgreement> agrRepo =
                new GenericRepository<OPLAgreement>(_dataBaseFactory);

            GenericRepository<Product> prdRepo =
                new GenericRepository<Product>(_dataBaseFactory);

            GenericRepository<ProductType> prdTypeRepo =
                new GenericRepository<ProductType>(_dataBaseFactory);

            GenericRepository<Customer> custRepo =
                new GenericRepository<Customer>(_dataBaseFactory);

            GenericRepository<OPLCalculation> calcRepo =
                new GenericRepository<OPLCalculation>(_dataBaseFactory);

            GenericRepository<Tb_BIL_PayScheduleDtlRevision> bilPaySchDtlRevRepo =
                new GenericRepository<Tb_BIL_PayScheduleDtlRevision>(_dataBaseFactory);

            GenericRepository<Tb_BIL_CustomerMerge> custMergeRepo =
                new GenericRepository<Tb_BIL_CustomerMerge>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Employee> employeeRepo =
                new GenericRepository<Tb_OPL_Employee>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var dataInv = bilInvRcpRepo.AsQueryable(x => x.IdTb_BIL_InvoiceReceipt == Id)
                .FirstOrDefault();

            var dataPaymentSchDtl = bilPymSchDtlRepo.AsQueryable(x => x.IdTb_BIL_PayScheduleDtl == dataInv.IdTb_BIL_PayScheduleDtl)
                .FirstOrDefault();

            var dataPaymentSch = bilPymSchRepo.AsQueryable(x => x.IdTb_BIL_PaySchedule == dataPaymentSchDtl.IdTb_BIL_PaySchedule)
                .FirstOrDefault();

            var dataAgreement = agrRepo.AsQueryable(x => x.IdOPLAgreement == dataPaymentSch.IdOPLAgreement)
                .FirstOrDefault();

            var dataProduct = prdRepo.AsQueryable(x => x.ProductCode == dataAgreement.ProductCode)
                .FirstOrDefault();

            var dataProductType = prdTypeRepo.AsQueryable(x => x.IdProductType == dataProduct.IdProduct)
                .FirstOrDefault();

            var dataCustomer = custRepo.AsQueryable(x => x.CustomerCode == dataAgreement.CustomerCode)
                .FirstOrDefault();

            var dataCalculation = calcRepo.AsQueryable(x => x.OPLCalculationNumber == dataAgreement.OPLCalculationNumber)
                .FirstOrDefault();

            var dataPaySchDtlRev = bilPaySchDtlRevRepo.AsQueryable(x => x.IdTb_BIL_PayScheduleDtl == dataPaymentSchDtl.IdTb_BIL_PayScheduleDtl)
                .FirstOrDefault();

            var dataCustomerMerge = custMergeRepo.AsQueryable(x => x.IdCustomer == dataCustomer.IdCustomer)
                .FirstOrDefault();

            var dataHODEmployee = employeeRepo.AsQueryable(x => x.IdTb_OPL_JobTitles == 5)
                .FirstOrDefault();

            #endregion

            #region"Set Up"

            var bilCreationServiceMock =
                new Mock<IBILCreationService>();

            var agrServiceMock =
                new Mock<IOPLAgreementService>();

            var productServiceMock =
                new Mock<IProductService>();

            var customerServiceMock =
                new Mock<ICustomerService>();

            bilCreationServiceMock
                .Setup(a => a.SelectInvoiceReceiptById(Id))
                .Returns(dataInv);

            bilCreationServiceMock
                .Setup(a => a.GetPaymentScheduleDtl(dataInv.IdTb_BIL_PayScheduleDtl))
                .Returns(dataPaymentSchDtl);

            bilCreationServiceMock
                .Setup(a => a.GetPaymentSchedule(dataPaymentSchDtl.IdTb_BIL_PaySchedule))
                .Returns(dataPaymentSch);

            bilCreationServiceMock
                .Setup(a => a.GetAgreement(dataPaymentSch.IdOPLAgreement))
                .Returns(dataAgreement);

            agrServiceMock
                .Setup(a => a.SelectProductByProductCode(dataAgreement.ProductCode))
                .Returns(dataProduct);

            productServiceMock
                .Setup(a => a.GetProductTypeById(dataProduct.IdProductType))
                .Returns(dataProductType);

            customerServiceMock
                .Setup(a => a.SelectCustomerByCode(dataAgreement.CustomerCode))
                .Returns(dataCustomer);

            agrServiceMock
                .Setup(a => a.SelectCalculationByNumber(dataAgreement.OPLCalculationNumber))
                .Returns(dataCalculation);

            bilCreationServiceMock
                .Setup(a => a.GetBILPayScheduleDtlRevisionByIdPaySchDtl(dataInv.IdTb_BIL_PayScheduleDtl))
                .Returns(dataPaySchDtlRev);

            bilCreationServiceMock
                .Setup(a => a.GetBILCustomerMergeById(dataCustomer.IdCustomer))
                .Returns(dataCustomerMerge);

            bilCreationServiceMock
                .Setup(a => a.GetEmployeeByIdJobTitle(5))
                .Returns(dataHODEmployee);

            #endregion

            _bilCreationService = bilCreationServiceMock.Object;
            _agreementService = agrServiceMock.Object;
            _productService = productServiceMock.Object;
            _customerService = customerServiceMock.Object;

        }

        public void LoadAllReportDetailInvoiceReceiptSupportData(int Id)
        {
            #region"Init Repo"

            GenericRepository<Tb_BIL_InvoiceReceipt> bilInvRcpRepo =
                new GenericRepository<Tb_BIL_InvoiceReceipt>(_dataBaseFactory);

            GenericRepository<Tb_BIL_PayScheduleDtl> bilPymSchDtlRepo =
                new GenericRepository<Tb_BIL_PayScheduleDtl>(_dataBaseFactory);

            GenericRepository<Tb_BIL_PaySchedule> bilPymSchRepo =
                new GenericRepository<Tb_BIL_PaySchedule>(_dataBaseFactory);

            GenericRepository<OPLAgreement> agrRepo =
                new GenericRepository<OPLAgreement>(_dataBaseFactory);

            GenericRepository<Product> prdRepo =
                new GenericRepository<Product>(_dataBaseFactory);

            GenericRepository<ProductType> prdTypeRepo =
                new GenericRepository<ProductType>(_dataBaseFactory);

            GenericRepository<Customer> custRepo =
                new GenericRepository<Customer>(_dataBaseFactory);

            GenericRepository<OPLCalculation> calcRepo =
                new GenericRepository<OPLCalculation>(_dataBaseFactory);

            GenericRepository<Tb_BIL_PayScheduleDtlRevision> bilPaySchDtlRevRepo =
                new GenericRepository<Tb_BIL_PayScheduleDtlRevision>(_dataBaseFactory);

            GenericRepository<Tb_BIL_CustomerMerge> custMergeRepo =
                new GenericRepository<Tb_BIL_CustomerMerge>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Employee> employeeRepo =
                new GenericRepository<Tb_OPL_Employee>(_dataBaseFactory);

            GenericRepository<TB_MGT_DailyRecordCar> mgtDailyRepo =
                new GenericRepository<TB_MGT_DailyRecordCar>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
                new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var dataInv = bilInvRcpRepo.AsQueryable(x => x.IdTb_BIL_InvoiceReceipt == Id)
                .FirstOrDefault();

            var dataPaymentSchDtl = bilPymSchDtlRepo.AsQueryable(x => x.IdTb_BIL_PayScheduleDtl == dataInv.IdTb_BIL_PayScheduleDtl)
                .FirstOrDefault();

            var dataPaymentSch = bilPymSchRepo.AsQueryable(x => x.IdTb_BIL_PaySchedule == dataPaymentSchDtl.IdTb_BIL_PaySchedule)
                .FirstOrDefault();

            var dataAgreement = agrRepo.AsQueryable(x => x.IdOPLAgreement == dataPaymentSch.IdOPLAgreement)
                .FirstOrDefault();

            var dataCustomer = custRepo.AsQueryable(x => x.CustomerCode == dataAgreement.CustomerCode)
                .FirstOrDefault();

            var dataPaySchDtlRev = bilPaySchDtlRevRepo.AsQueryable(x => x.IdTb_BIL_PayScheduleDtl == dataPaymentSchDtl.IdTb_BIL_PayScheduleDtl)
                .FirstOrDefault();

            var dataCustomerMerge = custMergeRepo.AsQueryable(x => x.IdCustomer == dataCustomer.IdCustomer)
                .FirstOrDefault();

            var mgtDaily = (from a in mgtDailyRepo.AsQueryable(x => !x.IsDelete && x.Allocation == 44)
                            group a by a.IdOPLAgreement into aa
                            select new
                            {
                                IdOPlAgreement = aa.FirstOrDefault().IdOPLAgreement,
                                SumQty = aa.Count()
                            }
                           );

            var lData = (from a in agrRepo.AsQueryable()
                         join b in prdRepo.AsQueryable() on a.ProductCode equals b.ProductCode
                         join c in bilPymSchRepo.AsQueryable() on a.IdOPLAgreement equals c.IdOPLAgreement
                         join d in bilPymSchDtlRepo.AsQueryable() on c.IdTb_BIL_PaySchedule equals d.IdTb_BIL_PaySchedule
                         join e in bilInvRcpRepo.AsQueryable(x => x.IdTb_BIL_InvoiceReceipt == Id) on d.IdTb_BIL_PayScheduleDtl equals e.IdTb_BIL_PayScheduleDtl
                         join f in bilPaySchDtlRevRepo.AsQueryable(x => !x.IsDelete) on e.IdTb_BIL_PayScheduleDtl equals f.IdTb_BIL_PayScheduleDtl into ff
                         from f in ff.DefaultIfEmpty()
                         join g in mgtDaily on a.IdOPLAgreement equals g.IdOPlAgreement into gg
                         from g in gg.DefaultIfEmpty()
                         orderby a.IdOPLAgreement
                         select new BILInvoiceReceiptDetailListInfo()
                         {
                             IdOPLAgreement = a.IdOPLAgreement,
                             AgreementNumber = a.AgreementNumber,
                             ModelName = b.ModelName,
                             PoliceNumber = "",
                             QtyUnit = f != null ? f.QtyUnit : (g.SumQty != null ? g.SumQty : (int)a.TotalUnitQuantity),
                             BillingStartDate = d.StartPeriod,
                             BillingEndDate = d.EndPeriod,
                             AgrStartDate = a.StartPeriodDate.Value,
                             AgrEndDate = a.EndPeriodDate.Value,
                             AgrDate = a.AgreementDate,
                             UnitPrice = a.MonthlyInstallmentAmount,
                             VATAmt = d.VATAmt.HasValue ? d.VATAmt.Value : 0,
                             PPHAmt = d.PPHAmt.HasValue ? d.PPHAmt.Value : 0,
                             BillingAmt = d.BillingAmt
                         }).ToList();

            var IdOPLAgreement = lData.FirstOrDefault().IdOPLAgreement;

            var pData = (from a in mgtDailyRepo.AsQueryable(x => !x.IsDelete && x.Allocation == 44)
                         join b in oplUnitRepo.AsQueryable() on a.IdTb_OPL_Unit equals b.IdTb_OPL_Unit
                         where a.IdOPLAgreement.Equals(IdOPLAgreement)
                         select new BILInvoiceReceiptPoliceNoListInfo()
                         {
                             PoliceNumber = b.PoliceNumber
                         }).ToList();

            #endregion

            #region"Set Up"

            var bilCreationServiceMock =
                new Mock<IBILCreationService>();

            var agrServiceMock =
                new Mock<IOPLAgreementService>();

            var productServiceMock =
                new Mock<IProductService>();

            var customerServiceMock =
                new Mock<ICustomerService>();

            bilCreationServiceMock
                .Setup(a => a.SelectInvoiceReceiptById(Id))
                .Returns(dataInv);

            bilCreationServiceMock
                .Setup(a => a.GetPaymentScheduleDtl(dataInv.IdTb_BIL_PayScheduleDtl))
                .Returns(dataPaymentSchDtl);

            bilCreationServiceMock
                .Setup(a => a.GetPaymentSchedule(dataPaymentSchDtl.IdTb_BIL_PaySchedule))
                .Returns(dataPaymentSch);

            bilCreationServiceMock
                .Setup(a => a.GetAgreement(dataPaymentSch.IdOPLAgreement))
                .Returns(dataAgreement);

            customerServiceMock
                .Setup(a => a.SelectCustomerByCode(dataAgreement.CustomerCode))
                .Returns(dataCustomer);

            bilCreationServiceMock
                .Setup(a => a.GetBILPayScheduleDtlRevisionByIdPaySchDtl(dataInv.IdTb_BIL_PayScheduleDtl))
                .Returns(dataPaySchDtlRev);

            bilCreationServiceMock
                .Setup(a => a.GetBILCustomerMergeById(dataCustomer.IdCustomer))
                .Returns(dataCustomerMerge);

            bilCreationServiceMock
                .Setup(a => a.GetBILInvoiceReceiptDetailListInfoById(Id))
                .Returns(lData);

            bilCreationServiceMock
                .Setup(a => a.GetBILInvoiceReceiptPoliceNoListInfoById(lData.FirstOrDefault().IdOPLAgreement))
                .Returns(pData);

            #endregion

            _bilCreationService = bilCreationServiceMock.Object;
            _agreementService = agrServiceMock.Object;
            _productService = productServiceMock.Object;
            _customerService = customerServiceMock.Object;

        }
    }
}