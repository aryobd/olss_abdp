using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;


namespace Dsf.Olss
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            LogConfig.Initialize();
            AreaRegistration.RegisterAllAreas();
            ModelBinders.Binders.Add(typeof(decimal), new DecimalModelBinder());
            ModelBinders.Binders.Add(typeof(decimal?), new DecimalModelBinder());
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            ValueProviderFactories.Factories.Add(new JsonValueProviderFactory());
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
