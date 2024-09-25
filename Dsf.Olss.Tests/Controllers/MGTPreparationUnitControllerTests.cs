using System;
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
    public class MGTPreparationUnitControllerTests
    {
        private IOPLCalculationCashflowService _calculationService;

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
        [TestCategory("S0266337")]
        public void A_MGTPreparationUnit_SendDataToSTGMFAPPL_GetPPNValueByAgrCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["MGTPreparationUnit_SendDataToSTGMFAPPL_GetPPNValueByAgrCreatedDate_IsValidData"]
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
        public void B_MGTPreparationUnit_SendDataToSTGMFAPPL_GetPPHValueByAgrCreatedDate_IsValidData()
        {
            //Arrange       
            string[] getConfig = ConfigurationManager
                .AppSettings["MGTPreparationUnit_SendDataToSTGMFAPPL_GetPPHValueByAgrCreatedDate_IsValidData"]
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
