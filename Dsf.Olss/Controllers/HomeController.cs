using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using Microsoft.Office.Interop.Excel;
using System.Net;

namespace Dsf.Olss.Controllers
{
    public class HomeController : BaseController
    {
        // Home Folder
        public ActionResult Index()
        {
            return View();
        }
    }
}
