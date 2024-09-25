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

using Dsf.Olss;
using Dsf.Olss.Common;
using Dsf.Olss.Controllers;
using Dsf.Olss.Models;
using Dsf.Olss.Report;

using Dsf.Olss.Service;
using Dsf.Olss.Service.Infos;
using Dsf.Olss.Service.ManagementService;

using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.Repository;

using Moq;

namespace Dsf.Olss.Tests.Net
{
    [TestClass]
    public class MGTComplementUnitControllerTests
    {
        private IMGTComplementUnitService _mgtCompUnitService;
        private IMGTReplacementUnit _mgtReplaceUnitService;

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
        [TestCategory("P0264761")]
        public void A_MGTComplementUnit_DataGridList_LoadAllData_IsValidData()
        {
            //Arrange   
            string[] getConfig = ConfigurationManager
                .AppSettings["MGTComplementUnit_DataGridList_LoadAllData_IsValidData"]
                .Split(',');

            //Expect
            var AgrNo = getConfig[0].ToString();
            var PNo = getConfig[1].ToString();
            var CNo = getConfig[2].ToString();
            var ENo = getConfig[3].ToString();

            //Act
            var jQPar = new JQueryDataTableParamModel();
            jQPar.iDisplayLength = 10;
            jQPar.iDisplayStart = 1;

            var mode = int.Parse(getConfig[4].ToString());

            LoadAllDataGridListSupportData(mode);

            var controller =
                new MGTComplementUnitController(_mgtCompUnitService, _mgtReplaceUnitService);

            var vRes = (JsonResult)controller.DataGridList(jQPar, 0, "", null, null);

            //Assert
            Assert.IsNotNull(vRes.Data);
        }

        [TestMethod]
        [TestCategory("P0264761")]
        public void B_MGTComplementUnit_Index_UpdatePoliceNoSTNK_IsSuccess()
        {
            //Arrange 
            string[] getConfig = ConfigurationManager
                .AppSettings["MGTComplementUnit_Index_UpdatePoliceNoSTNK_IsSuccess"]
                .Split(',');

            var dataForUpdate = DocComplementUpdateDocComplementUnit(getConfig);

            //Expect
            var expData = dataForUpdate;

            //Act
            var controller =
                new MGTComplementUnitController(_mgtCompUnitService, _mgtReplaceUnitService);

            controller.Index(dataForUpdate);

            var idOPLUnit = dataForUpdate.OPLUnit.FirstOrDefault().IdTb_OPL_Unit;
            var newPoliceNo = dataForUpdate.OPLUnit.FirstOrDefault().NewPoliceNumber;

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
                new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            GenericRepository<Tb_MTN_Monschdl> mtnMonschRepo =
                new GenericRepository<Tb_MTN_Monschdl>(_dataBaseFactory);

            GenericRepository<OPLUObjectLease> oplObjLeaseRepo =
                new GenericRepository<OPLUObjectLease>(_dataBaseFactory);

            var actOPLUnit = oplUnitRepo.AsQueryable(x => !x.IsDelete
                    && x.IdTb_OPL_Unit == idOPLUnit)
                .FirstOrDefault();

            var actMtnMonschdl = mtnMonschRepo.AsQueryable(x => !x.IsDelete
                    && x.IdTb_OPL_Unit == idOPLUnit)
                .ToList();

            var actObjLease = oplObjLeaseRepo.AsQueryable(x => !x.IsDelete
                    && x.IdTb_OPL_Unit == idOPLUnit)
                .ToList();

            var isPoliceNoMtnSchdlUpdated = true;
            var isPoliceNoObjLeaseUpdated = true;

            foreach (var d in actMtnMonschdl)
            {
                if (d.PoliceNumber != newPoliceNo)
                {
                    isPoliceNoMtnSchdlUpdated = false;

                    break;
                }
            }

            foreach (var d in actObjLease)
            {
                if (d.IdentityPoliceNumber != newPoliceNo)
                {
                    isPoliceNoObjLeaseUpdated = false;

                    break;
                }
            }

            //Assert
            Assert.AreEqual(newPoliceNo, actOPLUnit.PoliceNumber);
            Assert.AreEqual(newPoliceNo, actOPLUnit.PoliceNumberAct);
            Assert.IsTrue(isPoliceNoMtnSchdlUpdated);
            Assert.IsTrue(isPoliceNoObjLeaseUpdated);

        }

        public void LoadAllDataGridListSupportData(int mode)
        {

            #region"Init Repo"

            GenericRepository<Tb_OPL_Status> oplStatusRepo =
                new GenericRepository<Tb_OPL_Status>(_dataBaseFactory);

            GenericRepository<TB_MGT_DailyRecordCar> mgtDailyRepo =
                new GenericRepository<TB_MGT_DailyRecordCar>(_dataBaseFactory);

            GenericRepository<OptionItemValue> optItmValRepo =
                new GenericRepository<OptionItemValue>(_dataBaseFactory);

            GenericRepository<TB_MGT_RenewalDoc> renDocRepo =
                new GenericRepository<TB_MGT_RenewalDoc>(_dataBaseFactory);

            GenericRepository<OPLCalculation> calcRepo =
               new GenericRepository<OPLCalculation>(_dataBaseFactory);

            GenericRepository<Dsf.Olss.Data.Entities.Tb_MGT_HistoryDoc> mgtHisDocRepo =
               new GenericRepository<Dsf.Olss.Data.Entities.Tb_MGT_HistoryDoc>(_dataBaseFactory);

            GenericRepository<OPLAgreement> agrRepo =
               new GenericRepository<OPLAgreement>(_dataBaseFactory);

            GenericRepository<Customer> custRepo =
               new GenericRepository<Customer>(_dataBaseFactory);

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
               new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var dRC = (from a in mgtDailyRepo.AsQueryable().Where(x => !x.IsDelete)
                       join s1 in oplStatusRepo.AsQueryable().Where(o => o.StatusCode == "S1") on a.Allocation equals s1.IdTb_OPL_Status into _s1
                       from sub_s1 in _s1.DefaultIfEmpty()
                       join s2 in oplStatusRepo.AsQueryable().Where(o => o.StatusCode == "S1Active" ||
                                                    o.StatusCode == "S1Replacement" ||
                                                    o.StatusCode == "S1Stock" ||
                                                    o.StatusCode == "S1Disposal") on a.Status equals s2.IdTb_OPL_Status into _s2
                       from sub_s2 in _s2.DefaultIfEmpty()
                       join s3 in oplStatusRepo.AsQueryable().Where(o => o.StatusCode == "CS") on a.ContractStatus equals s3.IdTb_OPL_Status into _s3
                       from sub_s3 in _s3.DefaultIfEmpty()
                       join lp in optItmValRepo.AsQueryable() on a.ParkingLocation equals lp.IdOptionItemValue into _lp
                       from sub_lp in _lp.DefaultIfEmpty()
                       select new
                       {
                           IdOPLAgreement = a.IdOPLAgreement,
                           IdTb_OPL_Unit = a.IdTb_OPL_Unit,
                           Allocation = sub_s1.StatusDescription,
                           Status = sub_s2.StatusDescription,
                           ContarctStatus = sub_s3.StatusDescription,
                           City = a.City,
                           ParkingLocation = sub_lp.ItemValuesName,
                           Remark = a.Remark,
                           Aging = a.Aging,
                           CreatedDate = a.CreatedDate,
                           SoldDate = a.SoldDate
                       });

            var dRenDoc = (from a in renDocRepo.AsQueryable(x => !x.IsDelete)
                           group a by new { a.IdOPLAgreement, a.IdTb_OPL_Unit } into aa
                           select new MGTComplementInfoRenewalDocForJoin()
                           {
                               IdOPLAgreement = aa.FirstOrDefault().IdOPLAgreement,
                               IdTb_OPL_Unit = aa.FirstOrDefault().IdTb_OPL_Unit,
                               TotalBudget = aa.FirstOrDefault().TotalBudget,
                               RemainingBudget = aa.FirstOrDefault().RemainingBudget
                           });

            var dOPLCalc = (from a in calcRepo.AsQueryable(x => !x.IsDeleted)
                            group a by a.OPLCalculationNumber into aa
                            select new
                            {
                                OPLCalculationNumber = aa.FirstOrDefault().OPLCalculationNumber,
                                RegistrationFeeBy = aa.FirstOrDefault().RegistrationFeeBy,
                                RegistrationValueAmount = aa.FirstOrDefault().OPLFinanceCondition.RegistrationValueAmount
                            });

            var query = (from aa in mgtHisDocRepo.AsQueryable(x => !x.IsDelete)
                         join kk in dRC on aa.IdTb_OPL_Unit equals kk.IdTb_OPL_Unit
                         join cc in agrRepo.AsQueryable(x => !x.IsDelete) on kk.IdOPLAgreement equals cc.IdOPLAgreement
                         join bb in oplUnitRepo.AsQueryable() on aa.IdTb_OPL_Unit equals bb.IdTb_OPL_Unit
                         join dd in custRepo.AsQueryable() on cc.CustomerCode equals dd.CustomerCode into ddd
                         from dd in ddd.DefaultIfEmpty()
                         join ff in dOPLCalc on cc.OPLCalculationNumber equals ff.OPLCalculationNumber into fff
                         from ff in fff.DefaultIfEmpty()
                         join ii in dRenDoc on new { IdOPLAgreement = kk.IdOPLAgreement, IdTb_OPL_Unit = kk.IdTb_OPL_Unit } equals
                                    new { IdOPLAgreement = ii.IdOPLAgreement, IdTb_OPL_Unit = ii.IdTb_OPL_Unit } into ik
                         from sub_ii in ik.DefaultIfEmpty()
                         join ll in optItmValRepo.AsQueryable() on bb.Product.ProductCategory.ProductCategory1 equals ll.Remarks into lll
                         from ll in lll.DefaultIfEmpty()
                         select new MGTComplementInfo()
                         {
                             AgreementNumber = cc.AgreementNumber,
                             CustomerName = dd.CustomerName, 
                             ProductType = bb.Product.ModelName, 
                             ChassisNumber = bb.ChassisNumber, 
                             EngineNumber = bb.EngineNumber, 
                             UnitDescription = bb.Product.ModelName,
                             ContractStartDate = cc.StartPeriodDate,
                             ContractEndDate = cc.EndPeriodDate,
                             Allocation = kk.Allocation,
                             Status = kk.Status,
                             IdOPLAgreement = cc.IdOPLAgreement,
                             RegistrationStatus = string.IsNullOrEmpty(ff.RegistrationFeeBy) ? "Without Registration" : ff.RegistrationFeeBy == "DSF" ? "With Registration" : "Without Registration",//bb.IsSTNK.Value ? "With Registration" : "Without Registration",
                             PoliceNumber = string.IsNullOrEmpty(bb.PoliceNumberAct) ? bb.PoliceNumber : bb.PoliceNumberAct, 
                             PoliceNumberAct = string.IsNullOrEmpty(bb.PoliceNumberAct) ? bb.PoliceNumber : bb.PoliceNumberAct,
                             ColorPlat = string.IsNullOrEmpty(bb.ColorPlat) ? "-" : bb.ColorPlat,
                             StatusUnit = bb.IsOPL.Equals(false) ? "Replacement Unit" :
                                          bb.IsOPL.Equals(true) ? "OPL" : null,
                             StartDateShort = aa.DocValue.Equals(1) ? (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", bb.StartSTNK))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", bb.StartSTNK))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", bb.StartSTNK))), 4)).Replace(" ", "0") :
                                          aa.DocValue.Equals(2) ? (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", bb.StartKEUR))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", bb.StartKEUR))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", bb.StartKEUR))), 4)).Replace(" ", "0") :
                                          aa.DocValue.Equals(3) ? (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", bb.StartInsurance))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", bb.StartInsurance))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", bb.StartInsurance))), 4)).Replace(" ", "0") : null,
                             EndDateShort = aa.DocValue.Equals(1) ? (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", bb.EndSTNK))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", bb.EndSTNK))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", bb.EndSTNK))), 4)).Replace(" ", "0") :
                                          aa.DocValue.Equals(2) ? (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", bb.EndKEUR))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", bb.EndKEUR))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", bb.EndKEUR))), 4)).Replace(" ", "0") :
                                          aa.DocValue.Equals(3) ? (DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("mm", bb.EndInsurance))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("dd", bb.EndInsurance))), 2)
                                            + "/" + DbFunctions.Right(String.Concat(" ", SqlFunctions.StringConvert((double?)SqlFunctions.DatePart("yyyy", bb.EndInsurance))), 4)).Replace(" ", "0") : null,
                             IdTb_OPL_Unit = bb.IdTb_OPL_Unit,
                             DocValue = aa.DocValue,
                             StartDate = aa.DocValue.Equals(1) ? bb.StartSTNK :
                                         aa.DocValue.Equals(2) ? bb.StartKEUR : bb.StartInsurance,
                             EndDate = aa.DocValue.Equals(1) ? bb.EndSTNK :
                                        aa.DocValue.Equals(2) ? bb.EndKEUR : bb.EndInsurance,
                             CompanyInsurance = bb.CompanyInsurance,
                             InsuranceNumber = bb.InsuranceNumber,
                             ProgresStnk = bb.ProgressStatus,
                             ProgressKeur = bb.ProgressKeur,
                             isStnk = bb.IsSTNK,
                             RenewalBy = string.IsNullOrEmpty(ff.RegistrationFeeBy) ? ff.RegistrationFeeBy : "",
                             CreatedDateHDoc = bb.LastModifiedDate,
                             RegistrationBudget = sub_ii.TotalBudget.HasValue ? sub_ii.TotalBudget.Value :
                                (ff.RegistrationValueAmount.HasValue ? ff.RegistrationValueAmount.Value : 0),
                             PCCV = ll.ItemValuesName,
                             RemainingBudget = sub_ii.RemainingBudget.HasValue ? sub_ii.RemainingBudget.Value : 0
                         }).OrderByDescending(a => a.EndDate);

            var result = query.Where(a => a.DocValue.Equals(mode)).AsEnumerable();

            #endregion           

            #region"Set Up"
            
            var mgtCompUnitServiceMock =
                new Mock<IMGTComplementUnitService>();

            mgtCompUnitServiceMock
                .Setup(a => a.GetList(null, 10, 1, null, "asc", mode))
                .Returns(result);

            #endregion

            _mgtCompUnitService = mgtCompUnitServiceMock.Object;

        }

        public MGTComplementUnitData DocComplementUpdateDocComplementUnit(string[] config)
        {
            #region "Intialize"

            var data =
                new MGTComplementUnitData();

            data.OPLUnit =
                new List<MGTComplementOPLUnit>();        

            var oplUnit =
                new MGTComplementOPLUnit();

            oplUnit.DocValue = 1;
            oplUnit.IdTb_OPL_Unit = int.Parse(config[0].ToString());
            oplUnit.StartSTNK = DateTime.Parse(config[1].ToString());
            oplUnit.StartSTNK = DateTime.Parse(config[2].ToString());
            oplUnit.ProgresStnk = int.Parse(config[3].ToString());
            oplUnit.ColorPlat = config[4].ToString();
            oplUnit.NewPoliceNumber = config[5].ToString();
            oplUnit.IsChecked = "on";

            data.OPLUnit.Add(oplUnit);
            
            #endregion

            #region"Init Repo"

            GenericRepository<Tb_OPL_Unit> oplUnitRepo =
                new GenericRepository<Tb_OPL_Unit>(_dataBaseFactory);

            GenericRepository<Dsf.Olss.Data.Entities.Tb_MGT_HistoryDoc> mgtHisDocRepo =
                new GenericRepository<Dsf.Olss.Data.Entities.Tb_MGT_HistoryDoc>(_dataBaseFactory);

            GenericRepository<Tb_MTN_Monschdl> mtnMonschRepo =
                new GenericRepository<Tb_MTN_Monschdl>(_dataBaseFactory);

            GenericRepository<OPLUObjectLease> oplObjLeaseRepo =
                new GenericRepository<OPLUObjectLease>(_dataBaseFactory);

            #endregion

            #region"Set Return"

            var dOPLUnit = oplUnitRepo.AsQueryable(x => !x.IsDelete 
                    && x.IdTb_OPL_Unit == oplUnit.IdTb_OPL_Unit)
                .FirstOrDefault();

            var dHisDoc = mgtHisDocRepo.AsQueryable(x => !x.IsDelete
                    && x.IdTb_OPL_Unit == oplUnit.IdTb_OPL_Unit
                    && x.DocValue == oplUnit.DocValue)
                .FirstOrDefault();

            var dMtMonsch = mtnMonschRepo.AsQueryable(x => !x.IsDelete
                    && x.IdTb_OPL_Unit == oplUnit.IdTb_OPL_Unit)
                .ToList();

            var dObjLease = oplObjLeaseRepo.AsQueryable(x => !x.IsDelete
                    && x.IdTb_OPL_Unit == oplUnit.IdTb_OPL_Unit)
                .ToList();

            #endregion

            #region"Set Up"

            var mgtCompUnitServiceMock =
                new Mock<IMGTComplementUnitService>();

            mgtCompUnitServiceMock
                .Setup(a => a.GetOPLUnitById(oplUnit.IdTb_OPL_Unit))
                .Returns(dOPLUnit);

            mgtCompUnitServiceMock
                .Setup(a => a.GetByNoDoc(oplUnit.IdTb_OPL_Unit, oplUnit.DocValue))
                .Returns(dHisDoc);

            mgtCompUnitServiceMock
                .Setup(a => a.GetMtnSchdlByOPLId(oplUnit.IdTb_OPL_Unit))
                .Returns(dMtMonsch);

            mgtCompUnitServiceMock
                .Setup(a => a.GetObjLeaseByOPLId(oplUnit.IdTb_OPL_Unit))
                .Returns(dObjLease);

            #endregion

            _mgtCompUnitService = mgtCompUnitServiceMock.Object;

            return data;
        }
    }
}
