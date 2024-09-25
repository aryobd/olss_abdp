using System;
using System.Configuration;

namespace Dsf.Olss.Tests.Helpers
{
    public class GlobalConfig
    {
        public double SeleniumTimeOut = double.Parse(ConfigurationManager.AppSettings["SeleniumTimeOut"]);
        public bool IsLocalSiteTest = bool.Parse(ConfigurationManager.AppSettings["IsLocalSiteTest"].ToLower());
        public string LocalSite = ConfigurationManager.AppSettings["LocalSite"].ToLower();
        public string PublishSite = ConfigurationManager.AppSettings["PublishSite"].ToLower();
        public string ProductionSite = ConfigurationManager.AppSettings["ProductionSite"].ToLower();
        public string LocalSiteRoot = ConfigurationManager.AppSettings["LocalSiteRoot"].ToLower();
    }
}
