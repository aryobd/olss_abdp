using System;
using System.Configuration;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.SqlServer;
using System.Diagnostics;
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
using Dsf.Olss.Service.MaintenanceService;
using Dsf.Olss.Service.ManagementService;
using Dsf.Olss.Service.MarketingService;

using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.Repository;

using Moq;

namespace Dsf.Olss.Tests.Net
{
    [TestClass]
    public class MaintenanceScheduleControllerTests
    {
        private IMaintenanceScheduleService _maintenanceScheduleService;
        private IMGTPreparationUnitService _preparationUnitService;
        private IOPLCalculationCashflowService _calculationService;

        private IDatabaseFactory _dataBaseFactory;

        public class DataUpdateMTNItemList
        {
            public List<MaintenanceScheduleViewModel.MaintenanceItem> MTNItemList { get; set; }
            public string Status { get; set; }
            public string IdMTNHistory { get; set; }
            public bool IsBilledToCustomer { get; set; }
            public string ActServiceDate { get; set; }
            public string ActServiceKM { get; set; }
        }

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
        [TestCategory("S0231698_Phase1")]
        public void A_HistoryUnitMaintenace_LoadHistoryUnitMaintenace_IsValidActServiceDateAndKMData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_LoadHistoryUnitMaintenace_IsValidActServiceDateAndKMData"]
                .Split('#');

            int idParam = int.Parse(string.IsNullOrEmpty(getConfig[0]) ? "0" : getConfig[0]);

            LoadHistoryUnitMaintenaceByIDHistoryMT(idParam);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            string expServiceDate = getConfig[1].Split(',')[0].ToString();
            decimal expServiceKM = decimal.Parse(getConfig[1].Split(',')[1].ToString());

            //Act
            JsonResult jsonResult = (JsonResult)controller.LoadHistoryUnitMaintenace(idParam);

            string actServiceDate = jsonResult.Data.GetType().GetProperty("actServiceDate").GetValue(jsonResult.Data, null).ToString();
            decimal actServiceKM = decimal.Parse(jsonResult.Data.GetType().GetProperty("actServiceKm").GetValue(jsonResult.Data, null).ToString());

            //Assert
            Assert.IsNotNull(jsonResult);
            Assert.AreEqual(expServiceDate, actServiceDate);
            Assert.AreEqual(expServiceKM, actServiceKM);

            Debug.Write("LoadHistoryUnitMaintenace, " +
                "Actual Service Date : " + actServiceDate + " " +
                "Actual Service KM : " + actServiceKM);
        }

        [TestMethod]
        [TestCategory("S0231698_Phase1")]
        public void B_HistoryUnitMaintenace_UpdateMTNItemList_IsHistoryMTUpdated()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNItemListUpdated"]
                .Split('#');

            var dataForUpdate = HistoryUnitMaintenaceUpdateMTNItemList(getConfig);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in expData.MTNItemList.ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem expMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                expMTNItemList.Add(expMTNItem);
            }

            expMTNItemList = expMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Act
            controller.UpdateMTNItemList(dataForUpdate.MTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<MaintenanceScheduleViewModel.MaintenanceItem> actMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in actData.Tb_MTN_HistoryMTDtl.Where(x => !x.IsDelete).ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem actMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem.Value,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                actMTNItemList.Add(actMTNItem);
            }

            actMTNItemList = actMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(dataForUpdate.ActServiceKM, actData.ActualKM.ToString());
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.AreEqual(expMTNItemList.Count(), actMTNItemList.Count());

            bool isSame = false;

            for (int x = 0; x < actMTNItemList.Count(); x++)
            {
                if (expMTNItemList[x].IdMaintenanceItem == actMTNItemList[x].IdMaintenanceItem
                    && expMTNItemList[x].ItemCost == actMTNItemList[x].ItemCost
                    && expMTNItemList[x].Quantity == actMTNItemList[x].Quantity
                    && expMTNItemList[x].Ppn == actMTNItemList[x].Ppn
                    && expMTNItemList[x].Pph == actMTNItemList[x].Pph
                    && expMTNItemList[x].IsService == actMTNItemList[x].IsService
                    && expMTNItemList[x].IdTb_MTN_HistoryMTDtl == actMTNItemList[x].IdTb_MTN_HistoryMTDtl)
                {
                    isSame = true;
                }
                else
                {
                    isSame = false;

                    break;
                }
            }

            Assert.IsTrue(isSame);

            Debug.Write("UpdateMTNItemList_IsHistoryMTUpdated");

        }

        [TestMethod]
        [TestCategory("S0231698_Phase1")]
        public void C_HistoryUnitMaintenace_UpdateMTNItemList_IsHistoryMTDeleted()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNItemListDeleted"]
                .Split('#');

            var dataForUpdate = HistoryUnitMaintenaceUpdateMTNItemList(getConfig);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in expData.MTNItemList.ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem expMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                expMTNItemList.Add(expMTNItem);
            }

            expMTNItemList = expMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Act
            controller.UpdateMTNItemList(expMTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<MaintenanceScheduleViewModel.MaintenanceItem> actMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in actData.Tb_MTN_HistoryMTDtl.Where(x => !x.IsDelete).ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem actMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem.Value,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                actMTNItemList.Add(actMTNItem);
            }

            actMTNItemList = actMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(dataForUpdate.ActServiceKM, actData.ActualKM.ToString());
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.AreEqual(expMTNItemList.Count(), actMTNItemList.Count());

            bool isSame = false;

            for (int x = 0; x < actMTNItemList.Count(); x++)
            {
                if (expMTNItemList[x].IdMaintenanceItem == actMTNItemList[x].IdMaintenanceItem
                    && expMTNItemList[x].ItemCost == actMTNItemList[x].ItemCost
                    && expMTNItemList[x].Quantity == actMTNItemList[x].Quantity
                    && expMTNItemList[x].Ppn == actMTNItemList[x].Ppn
                    && expMTNItemList[x].Pph == actMTNItemList[x].Pph
                    && expMTNItemList[x].IsService == actMTNItemList[x].IsService
                    && expMTNItemList[x].IdTb_MTN_HistoryMTDtl == actMTNItemList[x].IdTb_MTN_HistoryMTDtl)
                {
                    isSame = true;
                }
                else
                {
                    isSame = false;

                    break;
                }
            }

            Assert.IsTrue(isSame);

            var dataDeleted = actData.Tb_MTN_HistoryMTDtl.Where(x => x.IsDelete).OrderByDescending(x => x.LastModifiedDate).FirstOrDefault();

            Debug.Write("UpdateMTNItemList_IsHistoryMTDeleted, IDMaintenanceItem : " + dataDeleted.IdMaintenanceItem.ToString()
                + ", ItemCost : " + dataDeleted.ItemCost.ToString()
                + ", Ppn : " + dataDeleted.Ppn.ToString()
                + ", Pph : " + dataDeleted.Pph.ToString()
                + ", IsService : " + dataDeleted.IsService.ToString());

        }

        [TestMethod]
        [TestCategory("S0231698_Phase1")]
        public void D_HistoryUnitMaintenace_UpdateMTNItemList_IsHistoryMTAdded()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNItemListAdded"]
                .Split('#');

            var dataForUpdate = HistoryUnitMaintenaceUpdateMTNItemList(getConfig);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in expData.MTNItemList.ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem expMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService
                    };

                expMTNItemList.Add(expMTNItem);
            }

            expMTNItemList = expMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Act
            controller.UpdateMTNItemList(dataForUpdate.MTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<MaintenanceScheduleViewModel.MaintenanceItem> actMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in actData.Tb_MTN_HistoryMTDtl.Where(x => !x.IsDelete).ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem actMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem.Value,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService
                    };

                actMTNItemList.Add(actMTNItem);
            }

            actMTNItemList = actMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(dataForUpdate.ActServiceKM, actData.ActualKM.ToString());
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.AreEqual(expMTNItemList.Count(), actMTNItemList.Count());

            bool isSame = false;

            for (int x = 0; x < actMTNItemList.Count(); x++)
            {
                if (expMTNItemList[x].IdMaintenanceItem == actMTNItemList[x].IdMaintenanceItem
                    && expMTNItemList[x].ItemCost == actMTNItemList[x].ItemCost
                    && expMTNItemList[x].Quantity == actMTNItemList[x].Quantity
                    && expMTNItemList[x].Ppn == actMTNItemList[x].Ppn
                    && expMTNItemList[x].Pph == actMTNItemList[x].Pph
                    && expMTNItemList[x].IsService == actMTNItemList[x].IsService)
                {
                    isSame = true;
                }
                else
                {
                    isSame = false;

                    break;
                }
            }

            Assert.IsTrue(isSame);

            var dataAdded = dataForUpdate.MTNItemList.Where(x => x.IdTb_MTN_HistoryMTDtl == 0).FirstOrDefault();

            Debug.Write("UpdateMTNItemList_IsHistoryMTAdded, IDMaintenanceItem : " + dataAdded.IdMaintenanceItem.ToString()
                + ", ItemCost : " + dataAdded.ItemCost.ToString()
                + ", Ppn : " + dataAdded.Ppn.ToString()
                + ", Pph : " + dataAdded.Pph.ToString()
                + ", IsService : " + dataAdded.IsService.ToString());

        }

        [TestMethod]
        [TestCategory("S0231698_Phase1")]
        public void E_MaintenanceSchedule_PrintReportHistoricalMaintenanceDetailByUnit_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportHistoricalMaintenanceDetailByUnit_IsValidData"]
                .Split('#');

            var paramUnit = getConfig[0].Split(',');

            string policeNumber = paramUnit[0];
            string engineNumber = paramUnit[1];

            var OPLUnit = PrintReportHistoricalMaintenanceDetailByUnit(policeNumber, engineNumber);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[1]);
            string invoiceNo = getConfig[2].Trim();

            var dataCompare = getConfig[3].Split(',');

            decimal mtnBudget = decimal.Parse(dataCompare[0]);
            decimal totInvoice = decimal.Parse(dataCompare[1]);

            //Act
            var result = controller.GetMTNHistoryDetailByUnitReportInfo(OPLUnit, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNumber == invoiceNo).FirstOrDefault();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(result.Where(x => x.InvoiceNumber == invoiceNo).FirstOrDefault());
            Assert.AreEqual(mtnBudget, dAct.MaintenanceBudget);
            Assert.AreEqual(totInvoice, dAct.TotalInvoice);

            Debug.Write("PrintReportHistoricalMaintenanceDetailByUnit_IsValidData, count data for unit " + dAct.PoliceNumber
                + " : " + result.Count
                + ", sample data -> Invoice No : " + dAct.InvoiceNumber
                + ", Maintenance Budget : " + dAct.MaintenanceBudget
                + ", Total Invoice : " + dAct.TotalInvoice);

        }

        [TestMethod]
        [TestCategory("S0231698_Phase1")]
        public void F_MaintenanceSchedule_PrintReportMTNBudgetControlUnit_AllMaintenanceTypeActiveEndContract_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNBudgetControlUnit_AllMaintenanceTypeActiveEndContract_IsValidData"]
                .Split('#');

            Expression<Func<MTNBudgetControlUnitReportInfo, bool>> filter = null;

            filter = (c => 1 == 1);

            PrintReportMTNBudgetControlUnit(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[0]);

            var dataCompareUnit = getConfig[1].Split(',');

            string engineNo = dataCompareUnit[0];
            string chassisNo = dataCompareUnit[1];
            string policeNo = dataCompareUnit[2];

            int countDataSample = int.Parse(getConfig[2]);

            var dataCompareAgr = getConfig[3].Split(',');

            string agr1 = dataCompareAgr[0];
            string agr2 = dataCompareAgr[1];

            //Act
            var result = controller.GetMTNBudgetControlUnitReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.EngineNumber == engineNo
                                        && x.ChassisNumber == chassisNo
                                        && x.PoliceNumber == policeNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(countDataSample, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.EngineNumber == engineNo));
            Assert.IsNotNull(dAct.Where(x => x.ChassisNumber == chassisNo));
            Assert.IsNotNull(dAct.Where(x => x.PoliceNumber == policeNo));
            Assert.IsNotNull(dAct.Where(x => x.AgreementNumber == agr1));
            Assert.IsNotNull(dAct.Where(x => x.AgreementNumber == agr2));

            Debug.Write("PrintReportMTNBudgetControlUnit_AllMaintenanceTypeActiveEndContract_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", agreement history, 1 : "
                + agr1
                + ", 2 : "
                + agr2);

        }

        [TestMethod]
        [TestCategory("S0231698_Phase1")]
        public void G_MaintenanceSchedule_PrintReportMTNActCost_WithParameter_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNActCost_WithParameter_IsValidData"]
                .Split('#');

            Expression<Func<MTNActCostByPeriodReportInfo, bool>> filter = null;

            string sCriteria1 = !string.IsNullOrEmpty(getConfig[0]) ? getConfig[0] : "";
            string vCriteria1 = !string.IsNullOrEmpty(getConfig[1]) ? getConfig[1] : "";

            var vCriteria2 = getConfig[2].Split(',');

            DateTime? startDate = null;
            if (!string.IsNullOrEmpty(vCriteria2[0]))
            {
                startDate = DateTime.Parse(vCriteria2[0]);
            }

            DateTime? endDate = null;
            if (!string.IsNullOrEmpty(vCriteria2[1]))
            {
                endDate = DateTime.Parse(vCriteria2[1]);
            }

            if (!string.IsNullOrEmpty(sCriteria1) && !string.IsNullOrEmpty(vCriteria1))
            {
                if (sCriteria1 == "Agreement No")
                {
                    filter = (c => c.AgreementNumber.Contains(vCriteria1));
                }
                else
                {
                    filter = (c => c.CustomerName.Contains(vCriteria1));
                }
            }

            if (startDate.HasValue)
            {
                if (!string.IsNullOrEmpty(sCriteria1) && !string.IsNullOrEmpty(vCriteria1))
                {
                    if (sCriteria1 == "Agreement No")
                    {
                        filter = (c => c.AgreementNumber.Contains(vCriteria1)
                            && c.PayApvDate.CompareTo(startDate.Value) >= 0);
                    }
                    else
                    {
                        filter = (c => c.CustomerName.Contains(vCriteria1)
                            && c.PayApvDate.CompareTo(startDate.Value) >= 0);
                    }
                }
                else
                {
                    filter = (c => c.PayApvDate.CompareTo(startDate.Value) >= 0);
                }
            }

            if (endDate.HasValue)
            {
                if (!string.IsNullOrEmpty(sCriteria1) && !string.IsNullOrEmpty(vCriteria1))
                {
                    if (sCriteria1 == "Agreement No")
                    {
                        filter = (c => c.AgreementNumber.Contains(vCriteria1)
                            && c.PayApvDate.CompareTo(endDate.Value) < 1);
                    }
                    else
                    {
                        filter = (c => c.CustomerName.Contains(vCriteria1)
                            && c.PayApvDate.CompareTo(endDate.Value) < 1);
                    }
                }
                else
                {
                    filter = (c => c.PayApvDate.CompareTo(endDate.Value) < 1);
                }
            }

            if (startDate.HasValue && endDate.HasValue)
            {
                if (!string.IsNullOrEmpty(sCriteria1) && !string.IsNullOrEmpty(vCriteria1))
                {
                    if (sCriteria1 == "Agreement No")
                    {
                        filter = (c => c.AgreementNumber.Contains(vCriteria1)
                            && c.PayApvDate.CompareTo(startDate.Value) > -1
                            && c.PayApvDate.CompareTo(endDate.Value) < 1);
                    }
                    else
                    {
                        filter = (c => c.CustomerName.Contains(vCriteria1)
                            && c.PayApvDate.CompareTo(startDate.Value) > -1
                            && c.PayApvDate.CompareTo(endDate.Value) < 1);
                    }
                }
                else
                {
                    filter = (c => c.PayApvDate.CompareTo(startDate.Value) > -1
                        && c.PayApvDate.CompareTo(endDate.Value) < 1);
                }
            }

            PrintReportMTNActCost(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[3]);

            var invoiceNo = getConfig[4];
            int cDataByInvoice = int.Parse(getConfig[5]);
            decimal totByInvoice = decimal.Parse(getConfig[6]);

            //Act
            var result = controller.GetMTNActCostByPeriodReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNo == invoiceNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(cDataByInvoice, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.ActualCost == totByInvoice));

            Debug.Write("PrintReportMTNActCost_WithParameter_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Invoice No : " + dAct.FirstOrDefault().InvoiceNo
                + ", Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", Actual Cost : " + dAct.FirstOrDefault().ActualCost);

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void H_MaintenanceSchedule_PrintReportMTNActCost_WithAgreementParameter_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNActCost_WithAgreementParameter_IsValidData"]
                .Split('#');

            Expression<Func<MTNActCostByPeriodReportInfo, bool>> filter = null;

            string sCriteria1 = !string.IsNullOrEmpty(getConfig[0]) ? getConfig[0] : "";
            string vCriteria1 = !string.IsNullOrEmpty(getConfig[1]) ? getConfig[1] : "";

            if (!string.IsNullOrEmpty(sCriteria1) && !string.IsNullOrEmpty(vCriteria1))
            {
                if (sCriteria1 == "Agreement No")
                {
                    filter = (c => c.AgreementNumber.Contains(vCriteria1));
                }
            }

            PrintReportMTNActCost(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[2]);

            var invoiceNo = getConfig[3];
            int cDataByInvoice = int.Parse(getConfig[4]);
            decimal totByInvoice = decimal.Parse(getConfig[5]);

            //Act
            var result = controller.GetMTNActCostByPeriodReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNo == invoiceNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(cDataByInvoice, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.ActualCost == totByInvoice));

            Debug.Write("PrintReportMTNActCost_WithAgreementParameter_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Invoice No : " + dAct.FirstOrDefault().InvoiceNo
                + ", Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", Actual Cost : " + dAct.FirstOrDefault().ActualCost);

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void I_MaintenanceSchedule_PrintReportMTNActCost_WithCustomerNameParameter_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNActCost_WithCustomerNameParameter_IsValidData"]
                .Split('#');

            Expression<Func<MTNActCostByPeriodReportInfo, bool>> filter = null;

            string sCriteria1 = !string.IsNullOrEmpty(getConfig[0]) ? getConfig[0] : "";
            string vCriteria1 = !string.IsNullOrEmpty(getConfig[1]) ? getConfig[1] : "";

            if (!string.IsNullOrEmpty(sCriteria1) && !string.IsNullOrEmpty(vCriteria1))
            {
                if (sCriteria1 == "Customer Name")
                {
                    filter = (c => c.CustomerName.Contains(vCriteria1));
                }
            }

            PrintReportMTNActCost(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[2]);

            var invoiceNo = getConfig[3];
            int cDataByInvoice = int.Parse(getConfig[4]);
            decimal totByInvoice = decimal.Parse(getConfig[5]);

            //Act
            var result = controller.GetMTNActCostByPeriodReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNo == invoiceNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(cDataByInvoice, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.ActualCost == totByInvoice));

            Debug.Write("PrintReportMTNActCost_WithCustomerNameParameter_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Invoice No : " + dAct.FirstOrDefault().InvoiceNo
                + ", Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", Actual Cost : " + dAct.FirstOrDefault().ActualCost);

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void J_MaintenanceSchedule_PrintReportMTNActCost_WithPayApvDateParameter_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNActCost_WithPayApvDateParameter_IsValidData"]
                .Split('#');

            Expression<Func<MTNActCostByPeriodReportInfo, bool>> filter = null;

            string sCriteria1 = !string.IsNullOrEmpty(getConfig[0]) ? getConfig[0] : "";

            var vCriteria1 = getConfig[1].Split(',');

            DateTime? startDate = null;
            if (!string.IsNullOrEmpty(vCriteria1[0]))
            {
                startDate = DateTime.Parse(vCriteria1[0]);
            }

            DateTime? endDate = null;
            if (!string.IsNullOrEmpty(vCriteria1[1]))
            {
                endDate = DateTime.Parse(vCriteria1[1]);
            }

            if (startDate.HasValue && endDate.HasValue)
            {
                filter = (c => c.PayApvDate.CompareTo(startDate.Value) > -1
                        && c.PayApvDate.CompareTo(endDate.Value) < 1);
            }

            PrintReportMTNActCost(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[2]);

            var invoiceNo = getConfig[3];
            int cDataByInvoice = int.Parse(getConfig[4]);
            decimal totByInvoice = decimal.Parse(getConfig[5]);

            //Act
            var result = controller.GetMTNActCostByPeriodReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNo == invoiceNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(cDataByInvoice, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.ActualCost == totByInvoice));

            Debug.Write("PrintReportMTNActCost_WithPayApvDateParameter_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Invoice No : " + dAct.FirstOrDefault().InvoiceNo
                + ", Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", Actual Cost : " + dAct.FirstOrDefault().ActualCost);

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void K_MaintenanceSchedule_PrintReportMTNActCost_WithAgreementPayApvDateParameter_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNActCost_WithAgreementPayApvDateParameter_IsValidData"]
                .Split('#');

            Expression<Func<MTNActCostByPeriodReportInfo, bool>> filter = null;

            string sCriteria1 = !string.IsNullOrEmpty(getConfig[0]) ? getConfig[0] : "";
            string vCriteria1 = !string.IsNullOrEmpty(getConfig[1]) ? getConfig[1] : "";

            var vCriteria2 = getConfig[2].Split(',');

            DateTime? startDate = null;
            if (!string.IsNullOrEmpty(vCriteria2[0]))
            {
                startDate = DateTime.Parse(vCriteria2[0]);
            }

            DateTime? endDate = null;
            if (!string.IsNullOrEmpty(vCriteria2[1]))
            {
                endDate = DateTime.Parse(vCriteria2[1]);
            }

            if (startDate.HasValue && endDate.HasValue)
            {
                filter = (c => c.AgreementNumber.Contains(vCriteria1)
                    && c.PayApvDate.CompareTo(startDate.Value) > -1
                    && c.PayApvDate.CompareTo(endDate.Value) < 1);
            }

            PrintReportMTNActCost(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[3]);

            var invoiceNo = getConfig[4];
            int cDataByInvoice = int.Parse(getConfig[5]);
            decimal totByInvoice = decimal.Parse(getConfig[6]);

            //Act
            var result = controller.GetMTNActCostByPeriodReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNo == invoiceNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(cDataByInvoice, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.ActualCost == totByInvoice));

            Debug.Write("PrintReportMTNActCost_WithAgreementPayApvDateParameter_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Invoice No : " + dAct.FirstOrDefault().InvoiceNo
                + ", Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", Actual Cost : " + dAct.FirstOrDefault().ActualCost);

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void L_MaintenanceSchedule_PrintReportMTNActCost_WithCustomerNamePayApvDateParameter_IsValidData()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_PrintReportMTNActCost_WithCustomerNamePayApvDateParameter_IsValidData"]
                .Split('#');

            Expression<Func<MTNActCostByPeriodReportInfo, bool>> filter = null;

            string sCriteria1 = !string.IsNullOrEmpty(getConfig[0]) ? getConfig[0] : "";
            string vCriteria1 = !string.IsNullOrEmpty(getConfig[1]) ? getConfig[1] : "";

            var vCriteria2 = getConfig[2].Split(',');

            DateTime? startDate = null;
            if (!string.IsNullOrEmpty(vCriteria2[0]))
            {
                startDate = DateTime.Parse(vCriteria2[0]);
            }

            DateTime? endDate = null;
            if (!string.IsNullOrEmpty(vCriteria2[1]))
            {
                endDate = DateTime.Parse(vCriteria2[1]);
            }

            if (startDate.HasValue && endDate.HasValue)
            {
                filter = (c => c.CustomerName.Contains(vCriteria1)
                    && c.PayApvDate.CompareTo(startDate.Value) > -1
                    && c.PayApvDate.CompareTo(endDate.Value) < 1);
            }

            PrintReportMTNActCost(filter);

            var controller =
                new BusinessObject();

            //Expect
            int countData = int.Parse(getConfig[3]);

            var invoiceNo = getConfig[4];
            int cDataByInvoice = int.Parse(getConfig[5]);
            decimal totByInvoice = decimal.Parse(getConfig[6]);

            //Act
            var result = controller.GetMTNActCostByPeriodReportInfo(filter, _maintenanceScheduleService);

            var dAct = result.Where(x => x.InvoiceNo == invoiceNo).ToList();

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(countData, result.Count);
            Assert.IsNotNull(dAct);
            Assert.AreEqual(cDataByInvoice, dAct.Count);
            Assert.IsNotNull(dAct.Where(x => x.ActualCost == totByInvoice));

            Debug.Write("PrintReportMTNActCost_WithCustomerNamePayApvDateParameter_IsValidData, count data : "
                + result.Count
                + ", count data sample "
                + dAct.Count
                + ", sample data -> Invoice No : " + dAct.FirstOrDefault().InvoiceNo
                + ", Engine No : " + dAct.FirstOrDefault().EngineNumber
                + ", Chassis No : " + dAct.FirstOrDefault().ChassisNumber
                + ", Police No : " + dAct.FirstOrDefault().PoliceNumber
                + ", Actual Cost : " + dAct.FirstOrDefault().ActualCost);

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void M_MaintenanceSchedule_GetOptionItemValues_WithMaintenanceConditionTypeParameter_IsDataFound()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MaintenanceSchedule_GetOptionItemValues_WithMaintenanceConditionTypeParameter_IsDataFound"]
                .Split(',');

            CheckOptionItemValue();

            //Expect
            var isDataFound = true;

            //Act
            var result = _maintenanceScheduleService.GetOptionItemValues("Maintenance Condition Type");

            //Assert
            for (int x = 0; x < getConfig.Count(); x++)
            {
                Assert.AreEqual(isDataFound, (result.Where(o => o.ItemValuesName == getConfig[x].ToString().Trim()).Count() != 0 ? true : false));
            }

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void N_HistoryUnitMaintenace_UpdateMTNDtlItemList_IsHistoryMTDtlUpdated()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNDtlItemListUpdated"]
                .Split('#');

            var dataForUpdate = HistoryUnitMaintenaceUpdateMTNItemList(getConfig);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in expData.MTNItemList.ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem expMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                expMTNItemList.Add(expMTNItem);
            }

            expMTNItemList = expMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Act
            controller.UpdateMTNItemList(dataForUpdate.MTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<MaintenanceScheduleViewModel.MaintenanceItem> actMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in actData.Tb_MTN_HistoryMTDtl.Where(x => !x.IsDelete).ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem actMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem.Value,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                actMTNItemList.Add(actMTNItem);
            }

            actMTNItemList = actMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(dataForUpdate.ActServiceKM, actData.ActualKM.ToString());
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.AreEqual(expMTNItemList.Count(), actMTNItemList.Count());

            bool isSame = false;

            for (int x = 0; x < actMTNItemList.Count(); x++)
            {
                if (expMTNItemList[x].IdMaintenanceItem == actMTNItemList[x].IdMaintenanceItem
                    && expMTNItemList[x].ItemCost == actMTNItemList[x].ItemCost
                    && expMTNItemList[x].Quantity == actMTNItemList[x].Quantity
                    && expMTNItemList[x].Ppn == actMTNItemList[x].Ppn
                    && expMTNItemList[x].Pph == actMTNItemList[x].Pph
                    && expMTNItemList[x].IsService == actMTNItemList[x].IsService
                    && expMTNItemList[x].IdTb_MTN_HistoryMTDtl == actMTNItemList[x].IdTb_MTN_HistoryMTDtl)
                {
                    isSame = true;
                }
                else
                {
                    isSame = false;

                    break;
                }
            }

            Assert.IsTrue(isSame);

            Debug.Write("HistoryUnitMaintenace_UpdateMTNDtlItemListUpdated");

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void O_HistoryUnitMaintenace_UpdateMTNDtlItemList_IsHistoryMTDtlDeleted()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNDtlItemListDeleted"]
                .Split('#');

            var dataForUpdate = HistoryUnitMaintenaceUpdateMTNItemList(getConfig);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in expData.MTNItemList.ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem expMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                expMTNItemList.Add(expMTNItem);
            }

            expMTNItemList = expMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Act
            controller.UpdateMTNItemList(expMTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<MaintenanceScheduleViewModel.MaintenanceItem> actMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in actData.Tb_MTN_HistoryMTDtl.Where(x => !x.IsDelete).ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem actMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem.Value,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService,
                        IdTb_MTN_HistoryMTDtl = a.IdTb_MTN_HistoryMTDtl
                    };

                actMTNItemList.Add(actMTNItem);
            }

            actMTNItemList = actMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(dataForUpdate.ActServiceKM, actData.ActualKM.ToString());
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.AreEqual(expMTNItemList.Count(), actMTNItemList.Count());

            bool isSame = false;

            for (int x = 0; x < actMTNItemList.Count(); x++)
            {
                if (expMTNItemList[x].IdMaintenanceItem == actMTNItemList[x].IdMaintenanceItem
                    && expMTNItemList[x].ItemCost == actMTNItemList[x].ItemCost
                    && expMTNItemList[x].Quantity == actMTNItemList[x].Quantity
                    && expMTNItemList[x].Ppn == actMTNItemList[x].Ppn
                    && expMTNItemList[x].Pph == actMTNItemList[x].Pph
                    && expMTNItemList[x].IsService == actMTNItemList[x].IsService
                    && expMTNItemList[x].IdTb_MTN_HistoryMTDtl == actMTNItemList[x].IdTb_MTN_HistoryMTDtl)
                {
                    isSame = true;
                }
                else
                {
                    isSame = false;

                    break;
                }
            }

            Assert.IsTrue(isSame);

            var dataDeleted = actData.Tb_MTN_HistoryMTDtl.Where(x => x.IsDelete).OrderByDescending(x => x.LastModifiedDate).FirstOrDefault();

            Debug.Write("HistoryUnitMaintenace_UpdateMTNDtlItemListDeleted, IDMaintenanceItem : " + dataDeleted.IdMaintenanceItem.ToString()
                + ", ItemCost : " + dataDeleted.ItemCost.ToString()
                + ", Ppn : " + dataDeleted.Ppn.ToString()
                + ", Pph : " + dataDeleted.Pph.ToString()
                + ", IsService : " + dataDeleted.IsService.ToString());

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void P_HistoryUnitMaintenace_UpdateMTNDtlItemList_IsHistoryMTDtlAdded()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNDtlItemListAdded"]
                .Split('#');

            var dataForUpdate = HistoryUnitMaintenaceUpdateMTNItemList(getConfig);

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in expData.MTNItemList.ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem expMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService
                    };

                expMTNItemList.Add(expMTNItem);
            }

            expMTNItemList = expMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Act
            controller.UpdateMTNItemList(dataForUpdate.MTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<MaintenanceScheduleViewModel.MaintenanceItem> actMTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            foreach (var a in actData.Tb_MTN_HistoryMTDtl.Where(x => !x.IsDelete).ToList())
            {
                MaintenanceScheduleViewModel.MaintenanceItem actMTNItem =
                    new MaintenanceScheduleViewModel.MaintenanceItem()
                    {
                        IdMaintenanceItem = a.IdMaintenanceItem.Value,
                        ItemCost = a.ItemCost,
                        Quantity = a.Quantity,
                        Ppn = a.Ppn,
                        Pph = a.Pph,
                        IsService = a.IsService
                    };

                actMTNItemList.Add(actMTNItem);
            }

            actMTNItemList = actMTNItemList.OrderBy(x => x.IdTb_MTN_HistoryMTDtl).ToList();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(dataForUpdate.ActServiceKM, actData.ActualKM.ToString());
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.AreEqual(expMTNItemList.Count(), actMTNItemList.Count());

            bool isSame = false;

            for (int x = 0; x < actMTNItemList.Count(); x++)
            {
                if (expMTNItemList[x].IdMaintenanceItem == actMTNItemList[x].IdMaintenanceItem
                    && expMTNItemList[x].ItemCost == actMTNItemList[x].ItemCost
                    && expMTNItemList[x].Quantity == actMTNItemList[x].Quantity
                    && expMTNItemList[x].Ppn == actMTNItemList[x].Ppn
                    && expMTNItemList[x].Pph == actMTNItemList[x].Pph
                    && expMTNItemList[x].IsService == actMTNItemList[x].IsService)
                {
                    isSame = true;
                }
                else
                {
                    isSame = false;

                    break;
                }
            }

            Assert.IsTrue(isSame);

            var dataAdded = dataForUpdate.MTNItemList.Where(x => x.IdTb_MTN_HistoryMTDtl == 0).FirstOrDefault();

            Debug.Write("HistoryUnitMaintenace_UpdateMTNDtlItemListAdded, IDMaintenanceItem : " + dataAdded.IdMaintenanceItem.ToString()
                + ", ItemCost : " + dataAdded.ItemCost.ToString()
                + ", Ppn : " + dataAdded.Ppn.ToString()
                + ", Pph : " + dataAdded.Pph.ToString()
                + ", IsService : " + dataAdded.IsService.ToString());

        }

        [TestMethod]
        [TestCategory("P0243765")]
        public void Q_HistoryUnitMaintenace_UpdateMTNDtlItemList_IsHistoryMTDtlDeleteAll()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_UpdateMTNDtlItemListDeleteAll"]
                .Split('#');

            DataUpdateMTNItemList data =
                new DataUpdateMTNItemList();

            data.IdMTNHistory = getConfig[0].ToString();
            data.Status = getConfig[1].ToString();
            data.IsBilledToCustomer = bool.Parse(getConfig[2].ToString());
            data.ActServiceDate = getConfig[3].ToString();
            data.ActServiceKM = getConfig[4].ToString();

            var dataForUpdate = data;

            var controller =
                new MaintenanceScheduleController(_maintenanceScheduleService, _preparationUnitService, _calculationService);

            //Expect
            var expData = dataForUpdate;

            List<MaintenanceScheduleViewModel.MaintenanceItem> expMTNItemList = null;

            //Act
            controller.UpdateMTNItemList(expMTNItemList, dataForUpdate.Status, dataForUpdate.IdMTNHistory,
                dataForUpdate.IsBilledToCustomer, dataForUpdate.ActServiceDate, dataForUpdate.ActServiceKM);

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            Tb_MTN_HistoryMT actData =
                new Tb_MTN_HistoryMT();

            int IdTb_MTN_HistoryMT = int.Parse(dataForUpdate.IdMTNHistory);

            actData = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HistoryMT
                                && !x.IsDelete)
                            .FirstOrDefault();

            //Assert
            Assert.AreEqual(dataForUpdate.ActServiceDate, actData.MTDate.ToString("MM/dd/yyyy"));
            Assert.AreEqual(decimal.Parse(dataForUpdate.ActServiceKM), actData.ActualKM);
            Assert.AreEqual(dataForUpdate.IsBilledToCustomer, actData.IsBilledToCustomer.HasValue ? actData.IsBilledToCustomer.Value : false);
            Assert.IsTrue(expMTNItemList == null);

            Debug.Write("HistoryUnitMaintenace_UpdateMTNDtlItemListDeleteAll");

        }

        [TestMethod]
        [TestCategory("S0266337")]
        public void R_HistoryUnitMaintenace_AddEditHistoryUnitMaintenace_GetPPNValueByPaymentApprovalCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_AddEditHistoryUnitMaintenace_GetPPNValueByPaymentApprovalCreatedDate_IsValidData"]
                .Split(',');

            var createdDate = DateTime.Parse(getConfig[0].ToString());

            LoadAllPPNValueSupportData(createdDate);

            //Expect
            var PPNValue = int.Parse(getConfig[1].ToString());

            //Act
            var result = Decimal.ToInt16(_calculationService.OPLTAxSettingGetValue(createdDate, TaxType.OptNameTaxType, TaxType.TaxTypePPN));

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(PPNValue, result);

        }

        [TestMethod]
        [TestCategory("S0266337")]
        public void S_HistoryUnitMaintenace_AddEditHistoryUnitMaintenace_GetPPHValueByPaymentApprovalCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["HistoryUnitMaintenace_AddEditHistoryUnitMaintenace_GetPPHValueByPaymentApprovalCreatedDate_IsValidData"]
                .Split(',');

            var createdDate = DateTime.Parse(getConfig[0].ToString());

            LoadAllPPHValueSupportData(createdDate);

            //Expect
            var PPHValue = int.Parse(getConfig[1].ToString());

            //Act
            var result = Decimal.ToInt16(_calculationService.OPLTAxSettingGetValue(createdDate, TaxType.OptNameTaxType, TaxType.TaxTypePPH23));

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(PPHValue, result);

        }

        public void LoadHistoryUnitMaintenaceByIDHistoryMT(int idParam)
        {
            int IdTb_MTN_HIstoryMt = idParam;

            #region"Init Repo"

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            GenericRepository<Tb_MTN_HistoryMTDtl> historyMTDtlRepo =
                new GenericRepository<Tb_MTN_HistoryMTDtl>(_dataBaseFactory);

            GenericRepository<MaintenanceItem> maintenanceItemRepo =
                new GenericRepository<MaintenanceItem>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            Tb_MTN_HistoryMT historyMT =
                new Tb_MTN_HistoryMT();

            historyMT = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HIstoryMt)
                            .FirstOrDefault();

            List<MTNHistoryMTDtlListInfo> listHistoryMTDtl =
                new List<MTNHistoryMTDtlListInfo>();

            listHistoryMTDtl = (from b in historyMTDtlRepo.AsQueryable(x => x.IdTb_MTN_HistoryMT == IdTb_MTN_HIstoryMt)
                                join c in maintenanceItemRepo.AsQueryable() on b.IdMaintenanceItem equals c.IdMaintenanceItem
                                select new MTNHistoryMTDtlListInfo()
                                {
                                    IdTb_MTN_HistoryMTDtl = b.IdTb_MTN_HistoryMTDtl,
                                    IdTb_MTN_HistoryMT = b.IdTb_MTN_HistoryMT,
                                    MaintenanceItemCode = c.MaintenanceItemName,
                                    MaintenanceItemName = c.Remarks,
                                    ItemCost = b.ItemCost,
                                    IdMaintenanceItem = b.IdMaintenanceItem ?? 0,
                                    Quantity = b.Quantity ?? 0,
                                    Ppn = b.Ppn ?? 0,
                                    Pph = b.Pph ?? 0,
                                    IsService = b.IsService,
                                    IsDelete = b.IsDelete
                                }).ToList();

            #endregion

            #region"Set Up"

            var maintenanceScheduleServiceMock =
                new Mock<IMaintenanceScheduleService>();

            maintenanceScheduleServiceMock
                .Setup(a => a.SelectMtnHistoryMtById(IdTb_MTN_HIstoryMt))
                .Returns(historyMT);

            maintenanceScheduleServiceMock
                .Setup(a => a.GetHistoryUnitMaintenanceListById(IdTb_MTN_HIstoryMt))
                .Returns(listHistoryMTDtl);

            #endregion

            _maintenanceScheduleService = maintenanceScheduleServiceMock.Object;

        }

        public DataUpdateMTNItemList HistoryUnitMaintenaceUpdateMTNItemList(string[] config)
        {
            #region "Intialize"

            DataUpdateMTNItemList data =
                new DataUpdateMTNItemList();

            data.IdMTNHistory = config[0].ToString();
            data.Status = config[1].ToString();
            data.IsBilledToCustomer = bool.Parse(config[2].ToString());
            data.ActServiceDate = config[3].ToString();
            data.ActServiceKM = config[4].ToString();

            data.MTNItemList =
                new List<MaintenanceScheduleViewModel.MaintenanceItem>();

            var d = config[5].Split('*');

            for (int x = 0; x < d.Length; x++)
            {
                var e = d[x].Split(',');

                MaintenanceScheduleViewModel.MaintenanceItem mtnItem =
                new MaintenanceScheduleViewModel.MaintenanceItem()
                {
                    IdMaintenanceItem = int.Parse(e[0].ToString()),
                    ItemCost = decimal.Parse(e[1].ToString()),
                    Quantity = int.Parse(e[2].ToString()),
                    Ppn = decimal.Parse(e[3].ToString()),
                    Pph = decimal.Parse(e[4].ToString()),
                    IsService = e[5].ToString() == "0" ? false : true,
                    IdTb_MTN_HistoryMTDtl = int.Parse(e[6].ToString())
                };

                data.MTNItemList.Add(mtnItem);
            }

            int IdTb_MTN_HIstoryMt = int.Parse(data.IdMTNHistory);
            string statusDesc = (data.Status == "Save as Draft" ? "Draft" : "Firmed");

            #endregion

            #region"Init Repo"

            GenericRepository<Tb_MTN_HistoryMT> historyMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Status> oplStatusRepo =
                new GenericRepository<Tb_OPL_Status>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            Tb_MTN_HistoryMT historyMT =
                new Tb_MTN_HistoryMT();

            historyMT = historyMTRepo
                            .AsQueryable(x => x.IDHistoryMT == IdTb_MTN_HIstoryMt
                                && !x.IsDelete)
                            .FirstOrDefault();

            List<Tb_MTN_HistoryMT> listHistoryMT =
                new List<Tb_MTN_HistoryMT>();

            listHistoryMT = historyMTRepo
                                .AsQueryable(x => x.IdTb_OPL_Unit == historyMT.IdTb_OPL_Unit
                                    && x.AgreementNumber == historyMT.AgreementNumber
                                    && !x.IsDelete)
                                .ToList();

            Tb_OPL_Status oplStatus =
                new Tb_OPL_Status();

            oplStatus = oplStatusRepo
                .AsQueryable(x => x.StatusDescription == (data.Status == "Save as Draft" ? "Draft" : "Firmed"))
                .FirstOrDefault();

            #endregion

            #region"Set Up"

            var maintenanceScheduleServiceMock =
                new Mock<IMaintenanceScheduleService>();

            maintenanceScheduleServiceMock
                .Setup(a => a.SelectMtnHistoryMtById(IdTb_MTN_HIstoryMt))
                .Returns(historyMT);

            maintenanceScheduleServiceMock
                .Setup(a => a.GetStatusByStatusDesc(statusDesc))
                .Returns(oplStatus);

            maintenanceScheduleServiceMock
                .Setup(a => a.SelectHistoryMTByIdUnitAgreementNumber(historyMT.IdTb_OPL_Unit, historyMT.AgreementNumber))
                .Returns(listHistoryMT);

            #endregion

            _maintenanceScheduleService = maintenanceScheduleServiceMock.Object;

            return data;
        }

        public List<Tb_OPL_Unit> PrintReportHistoricalMaintenanceDetailByUnit(string policeNumber, string engineNumber)
        {
            #region"Init Repo"

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
                new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            GenericRepository<Product> productRepo =
                new GenericRepository<Product>(_dataBaseFactory);

            GenericRepository<Tb_MTN_HistoryMT> mtnHistoryMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            GenericRepository<OPLAgreement> agreementRepo =
                new GenericRepository<OPLAgreement>(_dataBaseFactory);

            GenericRepository<Tb_MTN_HistoryMTDtl> mtnHistoryMTDtlRepo =
                new GenericRepository<Tb_MTN_HistoryMTDtl>(_dataBaseFactory);

            GenericRepository<OPLCalculation> claculationRepo =
                new GenericRepository<OPLCalculation>(_dataBaseFactory);

            GenericRepository<OPLMaintenanceCondition> calcMtnRepo =
                new GenericRepository<OPLMaintenanceCondition>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optItemValueRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            GenericRepository<MaintenanceItem> mtnItemRepo =
                new GenericRepository<MaintenanceItem>(_dataBaseFactory);

            GenericRepository<Tb_MTN_Payment_Approval_Detail> mtnPayApvDtlRepo =
                new GenericRepository<Tb_MTN_Payment_Approval_Detail>(_dataBaseFactory);

            GenericRepository<Tb_MTN_Payment_Approval> mtnPayApvRepo =
                new GenericRepository<Tb_MTN_Payment_Approval>(_dataBaseFactory);

            GenericRepository<MaintenanceCalculation> mtnCalcDtRepo =
                new GenericRepository<MaintenanceCalculation>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var idOPLUnitData = new List<int>();

            var OPLUnit = oplUnitRepo.AsQueryable(x => !x.IsDelete
                && (x.PoliceNumber == policeNumber || x.PoliceNumberAct == engineNumber)
                && x.EngineNumber == engineNumber)
                .ToList();

            foreach (var d in OPLUnit)
            {
                idOPLUnitData.Add(d.IdTb_OPL_Unit);
            }

            List<MTNHistoryDetailByUnitReportInfo> data =
                new List<MTNHistoryDetailByUnitReportInfo>();

            var mtnCalc = (from a in claculationRepo.AsQueryable(x => !x.IsDeleted)
                           join b in calcMtnRepo.AsQueryable()
                                on a.IdOPLCalculation equals b.IdOPLCalculation into bb
                           from b in bb.DefaultIfEmpty()
                           join c in optItemValueRepo.AsQueryable()
                                on b.MaintenanceConditionType.HasValue ? b.MaintenanceConditionType.Value : 0 equals c.IdOptionItemValue into cc
                           from c in cc.DefaultIfEmpty()
                           join d in mtnCalcDtRepo.AsQueryable(x => !x.IsDeleted)
                                on b.IdMaintenanceCalculation equals d.IdMaintenanceCalculation into dd
                           from d in dd.DefaultIfEmpty()
                           select new
                           {
                               IdOPLCalculation = a.IdOPLCalculation,
                               OPLCalculationNumber = a.OPLCalculationNumber,
                               CalcMaintenanceBudget = b.IdMaintenanceCalculation.HasValue ?
                                   (d.TotalMaintenanceCost12.HasValue ? (d.TotalMaintenanceCost12.Value / 12) : 0)
                                   :
                                   (b.CsdMaintenanceFeeHandByTpPerMonth.HasValue ? b.CsdMaintenanceFeeHandByTpPerMonth.Value :
                                   (b.FullMaintenanceFeeHandByTp.HasValue ? b.FullMaintenanceFeeHandByTp.Value :
                                   (b.MaintenanceAmount.HasValue ? b.MaintenanceAmount.Value : 0))),
                               IdMaintenanceCoditionType = b.MaintenanceConditionType.HasValue ? b.MaintenanceConditionType.Value : 0,
                               MaintenanceCoditionType = c.ItemValuesName != null ? c.ItemValuesName : ""
                           });

            data = (from a in mtnHistoryMTRepo.AsQueryable(x => !x.IsDelete
                            && x.Status == 30
                            && idOPLUnitData.Any(z => x.IdTb_OPL_Unit.Equals(z)))
                    join b in agreementRepo.AsQueryable(x => !x.IsDelete)
                        on a.AgreementNumber equals b.AgreementNumber
                    join c in mtnHistoryMTDtlRepo.AsQueryable(x => !x.IsDelete)
                        on a.IDHistoryMT equals c.IdTb_MTN_HistoryMT
                    join d in oplUnitRepo.AsQueryable(x => !x.IsDelete)
                        on a.IdTb_OPL_Unit equals d.IdTb_OPL_Unit
                    join e in productRepo.AsQueryable()
                        on d.IdProduct equals e.IdProduct
                    join f in mtnCalc
                             on b.OPLCalculationNumber equals f.OPLCalculationNumber
                    join h in optItemValueRepo.AsQueryable()
                        on a.MTType equals SqlFunctions.StringConvert((decimal)h.IdOptionItemValue).Trim()
                    join i in mtnItemRepo.AsQueryable()
                        on c.IdMaintenanceItem equals i.IdMaintenanceItem
                    join j in mtnPayApvDtlRepo.AsQueryable()
                        on a.WONum equals j.Work_Order_Number into jj
                    from j in jj.DefaultIfEmpty()
                    join k in mtnPayApvRepo.AsQueryable(x => x.IdTb_Opl_Status != 1)
                        on j.IdTb_MTN_Payment_Approval equals k.IdTb_MTN_Payment_Approval into kk
                    from k in kk.DefaultIfEmpty()
                    orderby new { b.IdOPLAgreement, k.CreatedDate, a.MTDate, c.IsService } descending
                    select new MTNHistoryDetailByUnitReportInfo()
                    {
                        PoliceNumber = d.PoliceNumber,
                        BrandName = e.BrandName,
                        BrandModel = e.ModelName,
                        BrandYear = SqlFunctions.DatePart("YEAR", e.ModelYear.HasValue ? e.ModelYear.Value : DateTime.Now).Value,
                        ChassissNumber = d.ChassisNumber,
                        EngineNumber = d.EngineNumber,
                        Colour = d.Colour,
                        ServiceDate = (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", a.MTDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", a.MTDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", a.MTDate))), 4)).Replace(" ", "0"),
                        AgreementNumber = b.AgreementNumber,
                        ActualKM = (int)a.ActualKM,
                        MaintenanceBudget = (f.CalcMaintenanceBudget *
                                (SqlFunctions.DateDiff("MONTH", b.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, b.EndPeriodDate)).HasValue ?
                                (SqlFunctions.DateDiff("MONTH", b.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, b.EndPeriodDate)).Value) : 0)),
                        IsService = c.IsService,
                        ServiceType = i.Remarks,
                        LabourCharge = j.Services ?? 0,
                        PartNumber = i.MaintenanceItemName,
                        SparePart = i.Remarks,
                        Qty = c.Quantity ?? 0,
                        UnitPrice = c.ItemCost ?? 0,
                        Ppn = j.Ppn ?? 0,
                        Pph = j.Pph ?? 0,
                        PpnMtnDtl = c.Ppn ?? 0,
                        PphMtnDtl = c.Pph ?? 0,
                        TotalInvoice = a.MTActualCost ?? 0,//j.Total ?? 0,
                        RemainingBudget = 0,
                        Workshop = a.Workshop,
                        InvoiceNumber = j.Invoice_Number
                    }).ToList();

            #endregion

            #region"Set Up"

            var maintenanceScheduleServiceMock =
                new Mock<IMaintenanceScheduleService>();

            maintenanceScheduleServiceMock
                .Setup(a => a.GetListMTNHistoryDetailByUnitReport(idOPLUnitData))
                .Returns(data);

            #endregion

            _maintenanceScheduleService = maintenanceScheduleServiceMock.Object;

            return OPLUnit;

        }

        public void PrintReportMTNBudgetControlUnit(Expression<Func<MTNBudgetControlUnitReportInfo, bool>> @where)
        {

            #region"Init Repo"

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
                new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            GenericRepository<Product> productRepo =
                new GenericRepository<Product>(_dataBaseFactory);

            GenericRepository<Customer> customerRepo =
                new GenericRepository<Customer>(_dataBaseFactory);

            GenericRepository<Tb_MTN_HistoryMT> mtnHistoryMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            GenericRepository<OPLAgreement> agreementRepo =
                new GenericRepository<OPLAgreement>(_dataBaseFactory);

            GenericRepository<OPLUObjectLease> objLeaseRepo =
               new GenericRepository<OPLUObjectLease>(_dataBaseFactory);

            GenericRepository<OPLCalculation> claculationRepo =
                new GenericRepository<OPLCalculation>(_dataBaseFactory);

            GenericRepository<OPLMaintenanceCondition> calcMtnRepo =
                new GenericRepository<OPLMaintenanceCondition>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optItemValueRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Status> oplStatusRepo =
                new GenericRepository<Tb_OPL_Status>(_dataBaseFactory);

            GenericRepository<TB_MGT_DailyRecordCar> dailyRecordCarRepo =
                new GenericRepository<TB_MGT_DailyRecordCar>(_dataBaseFactory);

            GenericRepository<Tb_MKT_SKD_Dtl> skdDtlRepo =
                new GenericRepository<Tb_MKT_SKD_Dtl>(_dataBaseFactory);

            GenericRepository<MaintenanceCalculation> mtnCalcDtRepo =
                new GenericRepository<MaintenanceCalculation>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var dAllocation = (from a in oplStatusRepo.AsQueryable().Where(x => x.StatusCode == "S1")
                               select new
                               {
                                   IdTb_OPL_Status = a.IdTb_OPL_Status,
                                   StatusDescription = a.StatusDescription
                               });

            var dRC = (from a in dailyRecordCarRepo.AsQueryable().Where(x => !x.IsDelete)
                       join s1 in dAllocation on a.Allocation equals s1.IdTb_OPL_Status into _s1
                       from sub_s1 in _s1.DefaultIfEmpty()
                       join Pp in optItemValueRepo.AsQueryable() on a.Province equals Pp.IdOptionItemValue into _Pp
                       from sub_Pp in _Pp.DefaultIfEmpty()
                       join Cp in optItemValueRepo.AsQueryable() on a.City equals Cp.IdOptionItemValue into _Cp
                       from sub_Cp in _Cp.DefaultIfEmpty()
                       select new
                       {
                           IdOPLAgreement = a.IdOPLAgreement,
                           IdTb_OPL_Unit = a.IdTb_OPL_Unit,
                           IdAllocation = a.Allocation,
                           Allocation = sub_s1.StatusDescription,
                           Province = sub_Pp.ItemValuesName,
                           City = sub_Cp.ItemValuesName
                       });

            var skd = (from a in skdDtlRepo.AsQueryable(x => !x.IsDelete && x.Type == "Unit")
                       group a by new { a.IdTb_MKT_SKD, a.Qty } into aa
                       select new
                       {
                           IdTb_MKT_SKD = aa.Select(x => x.IdTb_MKT_SKD).FirstOrDefault(),
                           QtySKD = aa.Select(x => x.Qty).FirstOrDefault()
                       });

            var mtnCalc = (from a in claculationRepo.AsQueryable(x => !x.IsDeleted)
                           join aa in agreementRepo.AsQueryable(x => !x.IsDelete)
                                on a.OPLCalculationNumber equals aa.OPLCalculationNumber
                           join b in calcMtnRepo.AsQueryable()
                                on a.IdOPLCalculation equals b.IdOPLCalculation into bb
                           from b in bb.DefaultIfEmpty()
                           join c in optItemValueRepo.AsQueryable()
                                on b.MaintenanceConditionType.HasValue ? b.MaintenanceConditionType.Value : 0 equals c.IdOptionItemValue into cc
                           from c in cc.DefaultIfEmpty()
                           join d in mtnCalcDtRepo.AsQueryable(x => !x.IsDeleted)
                                on b.IdMaintenanceCalculation equals d.IdMaintenanceCalculation into dd
                           from d in dd.DefaultIfEmpty()
                           select new
                           {
                               IdOPLCalculation = a.IdOPLCalculation,
                               OPLCalculationNumber = a.OPLCalculationNumber,
                               CalcMaintenanceBudget = b.IdMaintenanceCalculation.HasValue ?
                                   (d.TotalMaintenanceCost12.HasValue ? (d.TotalMaintenanceCost12.Value / 12) : 0)
                                   :
                                   (b.CsdMaintenanceFeeHandByTpPerMonth.HasValue ? b.CsdMaintenanceFeeHandByTpPerMonth.Value :
                                   (b.FullMaintenanceFeeHandByTp.HasValue ? b.FullMaintenanceFeeHandByTp.Value :
                                   (b.MaintenanceAmount.HasValue ? b.MaintenanceAmount.Value : 0))),
                               IdMaintenanceCoditionType = b.MaintenanceConditionType.HasValue ?
                                    b.MaintenanceConditionType.Value :
                                    aa.MaintenanceType == "91" ? 91 :
                                    aa.MaintenanceType == "92" ? 92 :
                                    aa.MaintenanceType == "93" ? 93 :
                                    94,
                               MaintenanceCoditionType = c.ItemValuesName != null ?
                                    c.ItemValuesName :
                                    aa.MaintenanceType == "91" ? "Full Maintenance" :
                                    aa.MaintenanceType == "92" ? "Limited" :
                                    aa.MaintenanceType == "93" ? "Customer Service Desk" :
                                    "Non Maintenance"
                           });

            List<MTNBudgetControlUnitReportInfo> data =
                new List<MTNBudgetControlUnitReportInfo>();

            data = (from a in objLeaseRepo.AsQueryable(x => !x.IsDelete)
                    join b in dRC
                        on new { IdOPLAgreement = a.IdOPLAgreement, IdTb_OPL_Unit = a.IdTb_OPL_Unit } equals
                        new { IdOPLAgreement = b.IdOPLAgreement, IdTb_OPL_Unit = b.IdTb_OPL_Unit } into bb
                    from b in bb.DefaultIfEmpty()
                    join c in mtnHistoryMTRepo.AsQueryable(x => !x.IsDelete
                        && x.Status == 30)
                        on new { AgreementNumber = a.AgreementNumber, IdTb_OPL_Unit = a.IdTb_OPL_Unit } equals
                        new { AgreementNumber = c.AgreementNumber, IdTb_OPL_Unit = c.IdTb_OPL_Unit } into cc
                    from c in cc.DefaultIfEmpty()
                    join d in agreementRepo.AsQueryable(x => !x.IsDelete)
                        on a.IdOPLAgreement equals d.IdOPLAgreement
                    join e in customerRepo.AsQueryable()
                        on d.CustomerCode equals e.CustomerCode
                    join f in productRepo.AsQueryable()
                        on d.ProductCode equals f.ProductCode
                    join g in oplUnitRepo.AsQueryable(x => !x.IsDelete)
                        on a.IdTb_OPL_Unit equals g.IdTb_OPL_Unit
                    join h in skd
                        on d.IdTb_MKT_SKD equals h.IdTb_MKT_SKD
                    join i in mtnCalc
                        on d.OPLCalculationNumber equals i.OPLCalculationNumber
                    orderby a.IdOPLAgreement
                    select new MTNBudgetControlUnitReportInfo()
                    {
                        IdMaintenanceCondition = i.IdMaintenanceCoditionType,
                        MaintenanceCondition = i.MaintenanceCoditionType,
                        IdContractStatus = d.IdTb_OPL_Status,
                        ContractStatus = d.Tb_OPL_Status.StatusDescription == "Open" ? "Active Contract" : "End Contract",
                        AgreementNumber = d.AgreementNumber,
                        CustomerName = e.CustomerName,
                        ObjectLease = f.BrandName + " " + f.ModelName,
                        Province = b.Province,
                        City = b.City,
                        IdAllocation = b.IdAllocation.HasValue ? b.IdAllocation.Value : 0,
                        AllocationUnit = b.IdAllocation.HasValue ? b.Allocation : "-",
                        PoliceNumber = g.PoliceNumber,
                        ChassisNumber = g.ChassisNumber,
                        EngineNumber = g.EngineNumber,
                        StartPeriodDate = (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", d.StartPeriodDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", d.StartPeriodDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", d.StartPeriodDate))), 4)).Replace(" ", "0"),
                        EndPeriodDate = (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", d.EndPeriodDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", d.EndPeriodDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", d.EndPeriodDate))), 4)).Replace(" ", "0"),
                        PeriodMonth = (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, d.EndPeriodDate)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, d.EndPeriodDate)).Value) : 0),
                        MtnBudgetSKD = (i.CalcMaintenanceBudget * ((SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, d.EndPeriodDate)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, d.EndPeriodDate)).Value) : 0)) * h.QtySKD),
                        MtnBudgetMonthly = i.CalcMaintenanceBudget,
                        CurrentPeriod = (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, DateTime.Now)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, DateTime.Now)).Value) : 0),
                        CurrentBudget = (i.CalcMaintenanceBudget * (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, DateTime.Now)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, DateTime.Now)).Value) : 0)),
                        CurrentMtnCost = c.MTActualCost.HasValue ? c.MTActualCost.Value : 0,
                        CurrentBalance = ((i.CalcMaintenanceBudget * (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, DateTime.Now)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, DateTime.Now)).Value) : 0)) - (c.MTActualCost.HasValue ? c.MTActualCost.Value : 0)),
                        TotalBalance = ((i.CalcMaintenanceBudget * ((SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, d.EndPeriodDate)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", d.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, d.EndPeriodDate)).Value) : 0)) * h.QtySKD) - (c.MTActualCost.HasValue ? c.MTActualCost.Value : 0))
                    }).Where(x => x.IdMaintenanceCondition != 94).Where(@where).ToList();

            #endregion

            #region"Set Up"

            var maintenanceScheduleServiceMock =
                new Mock<IMaintenanceScheduleService>();

            maintenanceScheduleServiceMock
                .Setup(a => a.GetListMTNBudgetControlUnitReport(@where))
                .Returns(data);

            #endregion

            _maintenanceScheduleService = maintenanceScheduleServiceMock.Object;

        }

        public void PrintReportMTNActCost(Expression<Func<MTNActCostByPeriodReportInfo, bool>> @where)
        {

            #region"Init Repo"

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
                new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            GenericRepository<Product> productRepo =
                new GenericRepository<Product>(_dataBaseFactory);

            GenericRepository<Customer> customerRepo =
                new GenericRepository<Customer>(_dataBaseFactory);

            GenericRepository<Tb_MTN_HistoryMT> mtnHistoryMTRepo =
                new GenericRepository<Tb_MTN_HistoryMT>(_dataBaseFactory);

            GenericRepository<OPLAgreement> agreementRepo =
                new GenericRepository<OPLAgreement>(_dataBaseFactory);

            GenericRepository<OPLCalculation> claculationRepo =
                new GenericRepository<OPLCalculation>(_dataBaseFactory);

            GenericRepository<OPLMaintenanceCondition> calcMtnRepo =
                new GenericRepository<OPLMaintenanceCondition>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optItemValueRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Status> oplStatusRepo =
                new GenericRepository<Tb_OPL_Status>(_dataBaseFactory);

            GenericRepository<TB_MGT_DailyRecordCar> dailyRecordCarRepo =
                new GenericRepository<TB_MGT_DailyRecordCar>(_dataBaseFactory);

            GenericRepository<Tb_MTN_Payment_Approval_Detail> mtnPayApvDtlRepo =
                new GenericRepository<Tb_MTN_Payment_Approval_Detail>(_dataBaseFactory);

            GenericRepository<Tb_MTN_Payment_Approval> mtnPayApvRepo =
                new GenericRepository<Tb_MTN_Payment_Approval>(_dataBaseFactory);

            GenericRepository<MaintenanceCalculation> mtnCalcDtRepo =
                new GenericRepository<MaintenanceCalculation>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var OPLStatus = oplStatusRepo.AsQueryable();
            var MgtDailyRecordCar = dailyRecordCarRepo.AsQueryable();

            var dAllocation = (from a in OPLStatus.Where(x => x.StatusCode == "S1")
                               select new
                               {
                                   IdTb_OPL_Status = a.IdTb_OPL_Status,
                                   StatusDescription = a.StatusDescription
                               });

            var dRC = (from a in MgtDailyRecordCar.Where(x => !x.IsDelete)
                       join s1 in dAllocation on a.Allocation equals s1.IdTb_OPL_Status into _s1
                       from sub_s1 in _s1.DefaultIfEmpty()
                       join Pp in optItemValueRepo.AsQueryable() on a.Province equals Pp.IdOptionItemValue into _Pp
                       from sub_Pp in _Pp.DefaultIfEmpty()
                       join Cp in optItemValueRepo.AsQueryable() on a.City equals Cp.IdOptionItemValue into _Cp
                       from sub_Cp in _Cp.DefaultIfEmpty()
                       select new
                       {
                           IdOPLAgreement = a.IdOPLAgreement,
                           IdTb_OPL_Unit = a.IdTb_OPL_Unit,
                           IdAllocation = a.Allocation,
                           Allocation = sub_s1.StatusDescription,
                           Province = sub_Pp.ItemValuesName,
                           City = sub_Cp.ItemValuesName
                       });

            var mtnCalc = (from a in claculationRepo.AsQueryable(x => !x.IsDeleted)
                           join b in calcMtnRepo.AsQueryable()
                                on a.IdOPLCalculation equals b.IdOPLCalculation into bb
                           from b in bb.DefaultIfEmpty()
                           join c in optItemValueRepo.AsQueryable()
                                on b.MaintenanceConditionType.HasValue ? b.MaintenanceConditionType.Value : 0 equals c.IdOptionItemValue into cc
                           from c in cc.DefaultIfEmpty()
                           join d in mtnCalcDtRepo.AsQueryable(x => !x.IsDeleted)
                                on b.IdMaintenanceCalculation equals d.IdMaintenanceCalculation into dd
                           from d in dd.DefaultIfEmpty()
                           select new
                           {
                               IdOPLCalculation = a.IdOPLCalculation,
                               OPLCalculationNumber = a.OPLCalculationNumber,
                               CalcMaintenanceBudget = b.IdMaintenanceCalculation.HasValue ?
                                   (d.TotalMaintenanceCost12.HasValue ? (d.TotalMaintenanceCost12.Value / 12) : 0)
                                   :
                                   (b.CsdMaintenanceFeeHandByTpPerMonth.HasValue ? b.CsdMaintenanceFeeHandByTpPerMonth.Value :
                                   (b.FullMaintenanceFeeHandByTp.HasValue ? b.FullMaintenanceFeeHandByTp.Value :
                                   (b.MaintenanceAmount.HasValue ? b.MaintenanceAmount.Value : 0))),
                               IdMaintenanceCoditionType = b.MaintenanceConditionType.HasValue ? b.MaintenanceConditionType.Value : 0,
                               MaintenanceCoditionType = c.ItemValuesName != null ? c.ItemValuesName : ""
                           });

            List<MTNActCostByPeriodReportInfo> data =
                new List<MTNActCostByPeriodReportInfo>();

            data = (from a in mtnHistoryMTRepo.AsQueryable(x => !x.IsDelete
                            && x.Status == 30)
                    join b in agreementRepo.AsQueryable(x => !x.IsDelete)
                       on a.AgreementNumber equals b.AgreementNumber
                    join c in oplUnitRepo.AsQueryable(x => !x.IsDelete)
                       on a.IdTb_OPL_Unit equals c.IdTb_OPL_Unit
                    join d in productRepo.AsQueryable()
                       on c.IdProduct equals d.IdProduct
                    join e in customerRepo.AsQueryable()
                       on b.CustomerCode equals e.CustomerCode
                    join f in dRC
                        on new { IdOPLAgreement = b.IdOPLAgreement, IdTb_OPL_Unit = a.IdTb_OPL_Unit } equals
                        new { IdOPLAgreement = f.IdOPLAgreement, IdTb_OPL_Unit = f.IdTb_OPL_Unit } into ff
                    from f in ff.DefaultIfEmpty()
                    join g in mtnCalc
                        on b.OPLCalculationNumber equals g.OPLCalculationNumber
                    join i in mtnPayApvDtlRepo.AsQueryable()
                        on a.WONum equals i.Work_Order_Number into ii
                    from i in ii.DefaultIfEmpty()
                    join j in mtnPayApvRepo.AsQueryable(x => x.IdTb_Opl_Status != 1)
                        on i.IdTb_MTN_Payment_Approval equals j.IdTb_MTN_Payment_Approval into jj
                    from j in jj.DefaultIfEmpty()
                    orderby new { e.CustomerName, b.IdOPLAgreement, c.PoliceNumber, a.MTDate, a.CreatedDate }
                    select new MTNActCostByPeriodReportInfo()
                    {
                        AgreementNumber = a.AgreementNumber,
                        CustomerName = e.CustomerName,
                        ObjectLease = d.BrandName + " " + d.ModelName,
                        Province = f.Province,
                        City = f.City,
                        IdAllocation = f.IdAllocation.HasValue ? f.IdAllocation.Value : 0,
                        AllocationUnit = f.IdAllocation.HasValue ? f.Allocation : "-",
                        PoliceNumber = c.PoliceNumber,
                        ChassisNumber = c.ChassisNumber,
                        EngineNumber = c.EngineNumber,
                        InvoiceNo = i.Invoice_Number,
                        TotalBudget = (g.CalcMaintenanceBudget * ((SqlFunctions.DateDiff("MONTH", b.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, b.EndPeriodDate)).HasValue ?
                                           (SqlFunctions.DateDiff("MONTH", b.StartPeriodDate, SqlFunctions.DateAdd("DAY", 1, b.EndPeriodDate)).Value) : 0))),
                        ActualCost = a.MTActualCost ?? 0,
                        RemainingBudget = 0,
                        ServiceDate = (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", a.MTDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", a.MTDate))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", a.MTDate))), 4)).Replace(" ", "0"),
                        CreatedDateHistoryMT = a.CreatedDate,
                        PayApvDate = j.CreatedDate == null ? DateTime.Now : j.CreatedDate
                    }).Where(@where).ToList();

            #endregion

            #region"Set Up"

            var maintenanceScheduleServiceMock =
                new Mock<IMaintenanceScheduleService>();

            maintenanceScheduleServiceMock
                .Setup(a => a.GetListMTNActCostByPeriodReport(@where))
                .Returns(data);

            #endregion

            _maintenanceScheduleService = maintenanceScheduleServiceMock.Object;

        }

        public void CheckOptionItemValue()
        {

            #region"Init Repo"

            GenericRepository<OptionItem> optItemRepo =
                new GenericRepository<OptionItem>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var optionItem = optItemRepo.AsQueryable().FirstOrDefault(o => o.OptionItemName.Equals("Maintenance Condition Type"));

            var data = optionItem.OptionItemValues.AsEnumerable();

            #endregion

            #region"Set Up"

            var maintenanceScheduleServiceMock =
                new Mock<IMaintenanceScheduleService>();

            maintenanceScheduleServiceMock
                .Setup(a => a.GetOptionItemValues("Maintenance Condition Type"))
                .Returns(data);

            #endregion

            _maintenanceScheduleService = maintenanceScheduleServiceMock.Object;

        }

        public void LoadAllPPHValueSupportData(DateTime date)
        {
            #region"Init Repo"

            GenericRepository<Tb_OPL_TAXSetting> taxSettingRepo =
                new GenericRepository<Tb_OPL_TAXSetting>(_dataBaseFactory);

            GenericRepository<OptionItem> optRepo =
                new GenericRepository<OptionItem>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optValRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var idOpt = optRepo
               .AsQueryable(x => !x.IsDeleted && x.OptionItemName == TaxType.OptNameTaxType)
               .FirstOrDefault()
               .IdOptionItem;

            var idOptItm = optValRepo
                .AsQueryable(x => !x.IsDeleted && x.IdOptionItem == idOpt && x.ItemValuesName == TaxType.TaxTypePPH23)
                .FirstOrDefault()
                .IdOptionItemValue;

            var taxVal = taxSettingRepo
                .AsQueryable(x => !x.IsDelete && date >= x.StartDate && date <= x.EndDate && x.TaxType == idOptItm)
                .OrderBy(x => x.IdTb_OPL_TAXSetting)
                .FirstOrDefault()
                .Value;

            #endregion

            #region"Set Up"

            var calculationServiceMock =
                new Mock<IOPLCalculationCashflowService>();

            calculationServiceMock
                .Setup(a => a.OPLTAxSettingGetValue(date, TaxType.OptNameTaxType, TaxType.TaxTypePPH23))
                .Returns(Decimal.ToInt16(taxVal));

            #endregion

            _calculationService = calculationServiceMock.Object;

        }

        public void LoadAllPPNValueSupportData(DateTime date)
        {
            #region"Init Repo"

            GenericRepository<Tb_OPL_TAXSetting> taxSettingRepo =
                new GenericRepository<Tb_OPL_TAXSetting>(_dataBaseFactory);

            GenericRepository<OptionItem> optRepo =
                new GenericRepository<OptionItem>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optValRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var idOpt = optRepo
               .AsQueryable(x => !x.IsDeleted && x.OptionItemName == TaxType.OptNameTaxType)
               .FirstOrDefault()
               .IdOptionItem;

            var idOptItm = optValRepo
                .AsQueryable(x => !x.IsDeleted && x.IdOptionItem == idOpt && x.ItemValuesName == TaxType.TaxTypePPN)
                .FirstOrDefault()
                .IdOptionItemValue;

            var taxVal = taxSettingRepo
                .AsQueryable(x => !x.IsDelete && date >= x.StartDate && date <= x.EndDate && x.TaxType == idOptItm)
                .OrderBy(x => x.IdTb_OPL_TAXSetting)
                .FirstOrDefault()
                .Value;

            #endregion

            #region"Set Up"

            var calculationServiceMock =
                new Mock<IOPLCalculationCashflowService>();

            calculationServiceMock
                .Setup(a => a.OPLTAxSettingGetValue(date, TaxType.OptNameTaxType, TaxType.TaxTypePPN))
                .Returns(Decimal.ToInt16(taxVal));

            #endregion

            _calculationService = calculationServiceMock.Object;

        }
    }
}