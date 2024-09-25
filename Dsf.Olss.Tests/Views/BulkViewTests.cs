using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Dsf.Olss.Tests.Helpers;

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;

namespace Dsf.Olss.Tests.Views
{
    [TestClass]
    public class BulkViewTests
    {
        public TestContext TestContext { get; set; }

        IWebDriver driver = null;

        GlobalConfig gC = new GlobalConfig();

        int freePort = 0;
        string urlSite = "";

        string jsScriptScrollToView = "arguments[0].scrollIntoView(true);";

        [TestInitialize]
        public void Initialize()
        {
            freePort = WebServer.FreePort();

            WebServer.StartIIS(freePort);

            urlSite = gC.IsLocalSiteTest ? gC.LocalSite + freePort : gC.PublishSite;

            driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(gC.SeleniumTimeOut);
            driver.Manage().Timeouts().PageLoad.Add(TimeSpan.FromSeconds(gC.SeleniumTimeOut));
            driver.Manage().Window.Maximize();
        }

        [TestCleanup]
        public void Cleanup()
        {
            driver.Quit();
            driver.Dispose();

            WebServer.StopIIS();
        }

        [TestMethod]
        [TestCategory("P0270367_P0270355_P0265586_P0270362_P0274263")]
        public void A_P0270367_P0270355_P0265586_P0270362_P0274263_IsProblemSolve()
        {
            //Arrange
            string[] getConfig = ConfigurationManager
                .AppSettings["A_P0270367_P0270355_P0265586_P0270362_P0274263_IsProblemSolve"]
                .Split(',');  

            //Expect
            bool expIsSuccessLogin = bool.Parse(getConfig[0].ToLower());
            bool expIsSuccessSaveChangeCalculation = bool.Parse(getConfig[1].ToLower());
            bool expIsSuccessPrintSKD = bool.Parse(getConfig[2].ToLower());
            bool expIsSuccessSaveDraftBAST = bool.Parse(getConfig[3].ToLower());
            bool expIsValidInvoiceDNCNCBRD = bool.Parse(getConfig[4].ToLower());
            bool expIsSuccessValidatePrintInvoice = bool.Parse(getConfig[5].ToLower());

            //Act
            bool actIsSuccessLogin = Login();
            bool actIsSuccessSaveChangeCalculation = urlSite.Contains(gC.ProductionSite) ? true : P0274263();
            bool actIsSuccessPrintSKD = P0270355();
            bool actIsSuccessSaveDraftBAST = urlSite.Contains(gC.ProductionSite) ? true : P0270367();
            bool actIsValidInvoiceDNCNCBRD = P0270362();
            bool actIsSuccessValidatePrintInvoice = P0265586();

            //Assert
            Assert.AreEqual(expIsSuccessLogin, actIsSuccessLogin);
            Assert.AreEqual(expIsSuccessSaveChangeCalculation, actIsSuccessSaveChangeCalculation);
            Assert.AreEqual(expIsSuccessPrintSKD, actIsSuccessPrintSKD);
            Assert.AreEqual(expIsSuccessSaveDraftBAST, actIsSuccessSaveDraftBAST);
            Assert.AreEqual(expIsValidInvoiceDNCNCBRD, actIsValidInvoiceDNCNCBRD);
            Assert.AreEqual(expIsSuccessValidatePrintInvoice, actIsSuccessValidatePrintInvoice);
        }

        public bool Login()
        {
            bool result = false;

            string getConfig = ConfigurationManager
                .AppSettings["OLSS_LoginAccount"];

            if (string.IsNullOrEmpty(getConfig))
            {
                return result;
            }

            string fileName = getConfig;
            string usrOLSS = "";
            string pwdOLSS = "";

            foreach (var line in File.ReadAllLines(fileName))
            {
                if (!string.IsNullOrEmpty(line))
                {
                    usrOLSS = line.Split(',')[0].ToString().ToUpper();
                    pwdOLSS = line.Split(',')[1].ToString();

                    if (string.IsNullOrEmpty(usrOLSS)
                            || string.IsNullOrWhiteSpace(usrOLSS))
                    {
                        return result;
                    }

                    if (string.IsNullOrEmpty(pwdOLSS)
                        || string.IsNullOrWhiteSpace(pwdOLSS))
                    {
                        return result;
                    }
                }
            }

            driver.Navigate().GoToUrl(urlSite);

            IWebElement txtUsr = driver.FindElement(By.Id("Username"));
            IWebElement txtPwd = driver.FindElement(By.Id("Password"));

            txtUsr.Clear();
            txtPwd.Clear();

            txtUsr.SendKeys(usrOLSS);
            txtPwd.SendKeys(pwdOLSS);

            TakeScreenshot("A_OLSS_Login_");

            txtPwd.Submit();

            IWebElement aUsrInfo = driver.FindElement(By.Id("user-info"));

            if (aUsrInfo != null)
            {
                result = true;

                TakeScreenshot("B_OLSS_Login_Success_");
            }            

            return result;
        }

        public bool P0274263()
        {
            bool result = false;

            string[] getConfig = ConfigurationManager
                .AppSettings["OLSS_P0274263_CalculationDate"]
                .Split(',');

            if (getConfig.Length < 3)
            {
                return result;
            }

            string caclNumber = getConfig[0];
            string calcId = getConfig[1];
            string calcStartPeriodPlan = getConfig[2];

            if (string.IsNullOrEmpty(caclNumber)
                || string.IsNullOrWhiteSpace(caclNumber))
            {
                return result;
            }

            if (string.IsNullOrEmpty(calcId)
                || string.IsNullOrWhiteSpace(calcId))
            {
                return result;
            }

            if (string.IsNullOrEmpty(calcId)
                || string.IsNullOrWhiteSpace(calcId))
            {
                return result;
            }

            if (string.IsNullOrEmpty(calcStartPeriodPlan)
                || string.IsNullOrWhiteSpace(calcStartPeriodPlan))
            {
                return result;
            }

            DateTime dtCalcStartPeriodPlan = DateTime.MinValue;
            DateTime.TryParse(calcStartPeriodPlan, out dtCalcStartPeriodPlan);

            if (dtCalcStartPeriodPlan == DateTime.MinValue)
            {
                return result;
            }

            driver.Navigate().GoToUrl(urlSite + "/Marketing/Operating-Lease-Cashflow/CalculationCashflow/"+ calcId +"/1");

            IWebElement txtLeasePeriodPlan = driver.FindElement(By.Id("LeasePeriodPlan"));

            new Actions(driver)
                .MoveToElement(txtLeasePeriodPlan)
                .Perform();

            TakeScreenshot("C_OLSS_Calculation_Step1_Before_Update_");

            string calcEndPeriodPlan = "";
            calcEndPeriodPlan = dtCalcStartPeriodPlan
                .AddMonths(int.Parse(txtLeasePeriodPlan.GetAttribute("value")))
                .ToString("MM/dd/yyyy");

            ((IJavaScriptExecutor)driver).ExecuteScript("document.getElementById('StartPeriodPlan').setAttribute('value','" + calcStartPeriodPlan + "')");
            ((IJavaScriptExecutor)driver).ExecuteScript("document.getElementById('EndPeriodPlan').setAttribute('value','" + calcEndPeriodPlan + "')");

            TakeScreenshot("D_OLSS_Calculation_Step1_After_Update_");

            IWebElement btnSaveChangeCalcStep1 = driver.FindElement(By.Name("step_1"));
            btnSaveChangeCalcStep1.Click();

            IWebElement wizardCalcStep1 = driver.FindElement(By.Id("wizard"));

            new Actions(driver)
                .MoveToElement(wizardCalcStep1)
                .Perform();

            TakeScreenshot("E_OLSS_Calculation_Step1_After_SaveChange_");

            result = true;

            return result;
        }

        public bool P0270355()
        {
            bool result = false;

            string[] getConfig = ConfigurationManager
                .AppSettings["OLSS_P0270355_PrintSKD"]
                .Split(',');

            if (getConfig.Length < 2)
            {
                return result;
            }

            string skdNumber = getConfig[0];
            string skdId = getConfig[1];

            if (string.IsNullOrEmpty(skdNumber)
                || string.IsNullOrWhiteSpace(skdNumber))
            {
                return result;
            }

            if (string.IsNullOrEmpty(skdId)
                || string.IsNullOrWhiteSpace(skdId))
            {
                return result;
            }

            driver.Navigate().GoToUrl(urlSite + "/Skd/Report/" + skdId );

            if (bool.Parse(ConfigurationManager
                .AppSettings["OLSS_P0270355_PrintSKD_IsBefore"]) 
                && urlSite.Contains(gC.ProductionSite))
            {
                TakeScreenshot("F_OLSS_SKD_Report_Error_");
            }
            else
            {
                TakeScreenshot("F_OLSS_SKD_Report_Top_");

                IWebElement txtOSNI = driver.FindElement(By.XPath("//*[text()='O/S Net Investment']"));

                new Actions(driver)
                    .MoveToElement(txtOSNI)
                    .Perform();

                TakeScreenshot("G_OLSS_SKD_Report_Bottom_");
            }            

            result = true;

            return result;
        }

        public bool P0270367()
        {
            bool result = false;

            string[] getConfig = ConfigurationManager
                .AppSettings["OLSS_P0270367_SaveDraftBAST"]
                .Split(',');

            if (getConfig.Length < 3)
            {
                return result;
            }

            string agrNumber = getConfig[0];
            string tabName = getConfig[1];
            string tblName = getConfig[2];

            if (string.IsNullOrEmpty(agrNumber)
                || string.IsNullOrWhiteSpace(agrNumber))
            {
                return result;
            }

            if (string.IsNullOrEmpty(tabName)
                || string.IsNullOrWhiteSpace(tabName))
            {
                return result;
            }

            if (string.IsNullOrEmpty(tblName)
                || string.IsNullOrWhiteSpace(tblName))
            {
                return result;
            }

            driver.Navigate().GoToUrl(urlSite + "/MGTPreparationUnit");

            IWebElement tabOut3 = driver
                .FindElement(By.XPath("//*[text()='" + tabName + "']"));
            tabOut3.Click();

            var tbWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                .Until(c => c.FindElement(By.Id(tblName + "-list")));

            var btnSave = driver
                .FindElement(By.XPath("//*[@id='btnSave']"));

            var tbBody = tbWait.FindElement(By.TagName("tbody"));
            var tbBodyRows = tbBody.FindElements(By.TagName("tr"));
            int r = 1;
            foreach (var row in tbBodyRows)
            {
                if (row.FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[2]")).Text 
                    == agrNumber)
                {
                    var chkSelectRow = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[12]/div/input"));
                    var ddlProgressStatus = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[13]/select"));
                    var txtRemarks = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[14]/textarea"));
                    var itmSelectRow = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[19]/div"));

                    new Actions(driver)
                    .MoveToElement(itmSelectRow)
                    .Perform();

                    chkSelectRow.Click();

                    var sltProgressStatus = new SelectElement(ddlProgressStatus);
                    sltProgressStatus.SelectByText("Confirm to Supplier");

                    txtRemarks.SendKeys("Complete !");

                    TakeScreenshot("H_OLSS_BAST_SaveDraft_InputProgessRemarks_");

                    btnSave.Click();

                    var mdlConfirmSaveWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                        .Until(c => c.FindElement(By.XPath("//*[@id='myModal']")));

                    var btnConfirmModel = mdlConfirmSaveWait.FindElement(By.XPath("//*[@id='confirmModal']"));

                    btnConfirmModel.Click();                    

                    break;
                }               

                r++;
            }

            tabOut3 = driver
                .FindElement(By.XPath("//*[text()='" + tabName + "']"));
            tabOut3.Click();

            tbWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                .Until(c => c.FindElement(By.Id(tblName + "-list")));

            btnSave = driver
                .FindElement(By.XPath("//*[@id='btnSave']"));

            tbBody = tbWait.FindElement(By.TagName("tbody"));
            tbBodyRows = tbBody.FindElements(By.TagName("tr"));

            TakeScreenshot("I_OLSS_BAST_SaveDraft_After_InputProgessRemarks_");

            r = 1;
            foreach (var row in tbBodyRows)
            {
                if (row.FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[2]")).Text
                    == agrNumber)
                {
                    var chkSelectRow = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[12]/div/input"));
                    var ddlReadiness = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[15]/select"));
                    var itmSelectRow = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[19]/div"));

                    new Actions(driver)
                    .MoveToElement(itmSelectRow)
                    .Perform();

                    chkSelectRow.Click();

                    var sltReadiness = new SelectElement(ddlReadiness);
                    sltReadiness.SelectByText("Complete");

                    TakeScreenshot("J_OLSS_BAST_SaveDraft_InputReadiness_");

                    btnSave.Click();

                    var mdlConfirmSaveWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                       .Until(c => c.FindElement(By.XPath("//*[@id='myModal']")));

                    var btnConfirmModel = mdlConfirmSaveWait.FindElement(By.XPath("//*[@id='confirmModal']"));

                    btnConfirmModel.Click();                    

                    break;
                }

                r++;
            }

            tabOut3 = driver
                .FindElement(By.XPath("//*[text()='" + tabName + "']"));
            tabOut3.Click();

            tbWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                .Until(c => c.FindElement(By.Id(tblName + "-list")));

            btnSave = driver
                .FindElement(By.XPath("//*[@id='btnSave']"));

            tbBody = tbWait.FindElement(By.TagName("tbody"));
            tbBodyRows = tbBody.FindElements(By.TagName("tr"));

            TakeScreenshot("K_OLSS_BAST_SaveDraft_After_InputReadiness_");

            r = 1;
            foreach (var row in tbBodyRows)
            {
                if (row.FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[2]")).Text
                    == agrNumber)
                {
                    var itmSelectRow = tbWait
                        .FindElement(By.XPath("//*[@id='" + tblName + "-list']/tbody/tr[" + r.ToString() + "]/td[19]/div"));

                    new Actions(driver)
                    .MoveToElement(itmSelectRow)
                    .Perform();

                    TakeScreenshot("L_OLSS_BAST_SaveDraft_After_InputProgessRemarksReadiness_");

                    break;
                }

                r++;
            }

            result = true;

            return result;
        }        

        public bool P0270362()
        {
            bool result = false;

            string[] getConfig = ConfigurationManager
                .AppSettings["OLSS_P0270362_InvoiceDNCNCBRD"]
                .Split(',');

            if (getConfig.Length < 3)
            {
                return result;
            }

            string invNo = getConfig[0];
            string invId = getConfig[1];
            string kwTotal = getConfig[2];
            string kwTotalBefore = getConfig[3];

            if (string.IsNullOrEmpty(invNo)
                || string.IsNullOrWhiteSpace(invNo))
            {
                return result;
            }

            if (string.IsNullOrEmpty(invId)
                || string.IsNullOrWhiteSpace(invId))
            {
                return result;
            }

            if (string.IsNullOrEmpty(kwTotal)
                || string.IsNullOrWhiteSpace(kwTotal))
            {
                return result;
            }

            if (string.IsNullOrEmpty(kwTotalBefore)
                || string.IsNullOrWhiteSpace(kwTotalBefore))
            {
                return result;
            }

            var isBefore = bool.Parse(ConfigurationManager
                .AppSettings["OLSS_P0270362_InvoiceDNCNCBRD_IsBefore"]);

            if (isBefore 
                && urlSite.Contains(gC.ProductionSite))
            {
                kwTotal = kwTotalBefore;
            }

            driver.Navigate().GoToUrl(urlSite + "/BILCreation/ReportInstallmentReceipt/" + invId);

            var lblKwTotal = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                .Until(c => c.FindElement(By.XPath("//*[text()='" + kwTotal + "']")));

            if (lblKwTotal == null)
            {
                return result;
            }

            if (lblKwTotal.Displayed)
            {
                new Actions(driver)
                .MoveToElement(lblKwTotal)
                .Perform();
            }
            else
            {
                ((IJavaScriptExecutor)driver).ExecuteScript(jsScriptScrollToView, lblKwTotal);
            }            

            TakeScreenshot("M_OLSS_Collection_InvoiceDNCNCBRD_KwitansiTotal_");

            if (!isBefore)
            {
                driver.Navigate().GoToUrl(urlSite + "/BILCreation/ReportDetailListReceipt/" + invId);

                var lblKwDetailTotal = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                    .Until(c => c.FindElement(By.XPath("//*[text()='" + kwTotal.Replace("Rp. ", "").Replace(".", ",") + "']")));

                if (lblKwDetailTotal == null)
                {
                    return result;
                }

                if (lblKwDetailTotal.Displayed)
                {
                    new Actions(driver)
                    .MoveToElement(lblKwDetailTotal)
                    .Perform();
                }
                else
                {
                    ((IJavaScriptExecutor)driver).ExecuteScript(jsScriptScrollToView, lblKwDetailTotal);
                }

                TakeScreenshot("N_OLSS_Collection_InvoiceDNCNCBRD_KwitansiDetailTotal_");
            }            

            result = true;

            return result;
        }

        public bool P0265586()
        {
            bool result = false;

            driver.Navigate().GoToUrl(urlSite + "/BilInvoiceMonitor");

            var tbWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                .Until(c => c.FindElement(By.XPath("//*[@id='table-list']/tbody/tr[1]/td[1]/input")));

            if (tbWait == null)
            {
                return result;
            }

            driver
                .FindElement(By.XPath("//*[@id='btnSaveInternal']"))
                .Click();

            if (bool.Parse(ConfigurationManager
                .AppSettings["OLSS_P0270362_InvoiceDNCNCBRD_IsBefore"]))
            {
                TakeScreenshot("O_OLSS_Collection_InvoiceAllertSelected_Before_");
            }
            else
            {
                var alertInvoiceSelected = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                    .Until(c => c.FindElement(By.XPath("//*[@id='pAlert']")));

                if (alertInvoiceSelected == null)
                {
                    return result;
                }

                new Actions(driver)
                .MoveToElement(alertInvoiceSelected)
                .Perform();

                TakeScreenshot("O_OLSS_Collection_InvoiceAllertSelected_");
            }            

            result = true;

            return result;
        }

        public void TakeScreenshot(string fileName)
        {
            var uid = Guid.NewGuid().ToString("N").Substring(0, 10);
            var cDir = TestContext.TestResultsDirectory;
            var fName = @"\" + fileName + uid + ".jpeg";
            var filePath = cDir + fName;

            ((ITakesScreenshot)driver)
                .GetScreenshot()
                .SaveAsFile(filePath, ScreenshotImageFormat.Jpeg);

            TestContext.AddResultFile(filePath);
        }
    }
}
