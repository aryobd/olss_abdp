using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using Dsf.Olss.Tests.Helpers;

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace Dsf.Olss.Tests.Views
{
    [TestClass]
    public class AccountLoginViewTests
    {
        public TestContext TestContext { get; set; }

        IWebDriver driver = null;

        GlobalConfig gC = new GlobalConfig();

        int freePort = 0;
        string urlSite = "";

        [TestInitialize]
        public void Initialize()
        {
            freePort = WebServer.FreePort();

            WebServer.StartIIS(freePort);

            urlSite = gC.IsLocalSiteTest ? gC.LocalSite + freePort : gC.PublishSite;

            driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(gC.SeleniumTimeOut);
        }

        [TestCleanup]
        public void Cleanup()
        {
            driver.Quit();
            driver.Dispose();

            WebServer.StopIIS();
        }

        [TestMethod]
        [TestCategory("TestCICD")]
        public void A_AccountLogin_View_PlaceholderPassword_IsValidText()
        {
            //Arrange  
            string[] getConfig = ConfigurationManager
                .AppSettings["A_AccountLogin_View_PlaceholderPassword_IsValidText"]
                .Split(',');            

            //Expect
            string plcTextExp = getConfig[0];

            //Act
            driver.Navigate().GoToUrl(urlSite);

            var wDWait = new WebDriverWait(driver, TimeSpan.FromSeconds(gC.SeleniumTimeOut))
                .Until(c => c.FindElement(By.Id("Password")));

            IWebElement txtPwd = driver.FindElement(By.Id("Password"));
            string plcTextAct = txtPwd.GetAttribute("placeholder");

            var uid = Guid.NewGuid().ToString("N").Substring(0, 10);
            var cDir = TestContext.TestResultsDirectory;
            var fName = @"\A_AccountLogin_View_PlaceholderPassword_IsValidText_" + uid + ".jpeg";
            var filePath = cDir + fName;

            ((ITakesScreenshot)driver)
                .GetScreenshot()
                .SaveAsFile(filePath, ScreenshotImageFormat.Jpeg);

            TestContext.AddResultFile(filePath);

            //Assert
            Assert.AreEqual(plcTextExp, plcTextAct);            
        }        
    }
}
