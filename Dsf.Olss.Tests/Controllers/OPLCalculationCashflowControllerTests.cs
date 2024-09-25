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
using Dsf.Olss.Service.MasterService;

using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.Repository;

using Moq;

namespace Dsf.Olss.Tests.Net
{
    [TestClass]
    public class OPLCalculationCashflowControllerTests
    {
        private IOPLCalculationCashflowService _oplCalculationService;
        private ICustomerService _customerService;
        private IProductService _productService;
        private IMaintenanceCalculationService _maintenanceCalculationService;

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
        [TestCategory("P0243765")]
        public void A_OPLCalculation_GetSelectListItems_WithMaintenanceConditionTypeParameter_IsDataFound()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["Calculation_GetOptionItemValues_WithMaintenanceConditionTypeParameter_IsDataFound"]
                .Split(',');

            CheckOptionItemValue();

            var controller =
                new OPLCalculationCashflowController(_oplCalculationService, _customerService, _productService, _maintenanceCalculationService);

            //Expect
            var isDataFound = true;

            //Act
            var result = controller.GetSelectListItems("Maintenance Condition Type", 0);

            //Assert
            for (int x = 0; x < getConfig.Count(); x++)
            {
                Assert.AreEqual(isDataFound, (result.Where(o => o.Text == getConfig[x].ToString().Trim()).Count() != 0 ? true : false));
            }

        }

        [TestMethod]
        [TestCategory("S0266337")]
        public void B_OPLCalculation_AddEditDetail_GetPPNValueByCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["OPLCalculation_AddEditDetail_GetPPNValueByCreatedDate_IsValidData"]
                .Split(',');

            var createdDate = DateTime.Parse(getConfig[0].ToString());

            LoadAllPPNValueSupportData(createdDate);

            //Expect
            var PPNValue = int.Parse(getConfig[1].ToString());

            //Act
            var result = Decimal.ToInt16(_oplCalculationService.OPLTAxSettingGetValue(createdDate, TaxType.OptNameTaxType, TaxType.TaxTypePPN));

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(PPNValue, result);

        }

        [TestMethod]
        [TestCategory("S0266337")]
        public void C_OPLCalculation_AddEditDetail_GetPPHValueByCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["OPLCalculation_AddEditDetail_GetPPHValueByCreatedDate_IsValidData"]
                .Split(',');

            var createdDate = DateTime.Parse(getConfig[0].ToString());

            LoadAllPPHValueSupportData(createdDate);

            //Expect
            var PPHValue = int.Parse(getConfig[1].ToString());

            //Act
            var result = Decimal.ToInt16(_oplCalculationService.OPLTAxSettingGetValue(createdDate, TaxType.OptNameTaxType, TaxType.TaxTypePPH23));

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(PPHValue, result);

        }

        [TestMethod]
        [TestCategory("S0266337")]
        public void D_OPLCalculation_AddEditDetail_GetWithholdingValueByCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["OPLCalculation_AddEditDetail_GetWithholdingValueByCreatedDate_IsValidData"]
                .Split(',');

            var createdDate = DateTime.Parse(getConfig[0].ToString());

            LoadAllWithholdingValueSupportData(createdDate);

            //Expect
            var WHValue = int.Parse(getConfig[1].ToString());

            //Act
            var result = Decimal.ToInt16(_oplCalculationService.OPLTAxSettingGetValue(createdDate, TaxType.OptNameTaxType, TaxType.TaxTypeWithholding));

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(WHValue, result);

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

            var oplCalculationServiceMock =
                new Mock<IOPLCalculationCashflowService>();

            oplCalculationServiceMock
                .Setup(a => a.GetOptionItemValues("Maintenance Condition Type"))
                .Returns(data);

            #endregion

            _oplCalculationService = oplCalculationServiceMock.Object;

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

            _oplCalculationService = calculationServiceMock.Object;

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

            _oplCalculationService = calculationServiceMock.Object;

        }

        public void LoadAllWithholdingValueSupportData(DateTime date)
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
                .AsQueryable(x => !x.IsDeleted && x.IdOptionItem == idOpt && x.ItemValuesName == TaxType.TaxTypeWithholding)
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
                .Setup(a => a.OPLTAxSettingGetValue(date, TaxType.OptNameTaxType, TaxType.TaxTypeWithholding))
                .Returns(Decimal.ToInt16(taxVal));

            #endregion

            _oplCalculationService = calculationServiceMock.Object;

        }
    }
}
