using System.Web.Mvc;
using System.Web.Security;
using Dsf.Olss.Models;
using System.DirectoryServices;
using System;
using Dsf.Olss.Common;
using Dsf.Lib.Constant;
using Dsf.Lib.Diagnostics;
using Dsf.Olss.Service;
using System.Web.Configuration;
using System.Globalization;
using System.Threading;

namespace Dsf.Olss.Controllers 
{
    /// <summary>
    /// controller for aunthentication
    /// </summary>
    /// <remarks>
    /// Just for AccountController, Please don't Inherit from BaseController - Asep
    /// </remarks>
    public class AccountController : Controller
    {
        private IAccountService service;

        public AccountController(IAccountService service)
        {
            this.service = service;
        }

        //Display Login Screen
        [AllowAnonymous]
        public ActionResult Login()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error   = TempData["Error"];

            return this.View();
        }

        // Handle Authentication When Login Form Submitted
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (!this.ModelState.IsValid)
                return this.View(model);

            string path = WebConfigurationManager.ConnectionStrings["ADConnectionString"].ToString();
            string accountId = model.UserName;
            string password  = model.Password;

            Tracer.Verbose(this, "Login", "try to authenticate " + model.UserName);

            // bypass checking Login Account on Dev Environment
            var enableDevelopmentMode = WebConfigurationManager.AppSettings["enableDevelopmentMode"];
            var userBranch = service.GetBranchId(accountId);

            if (userBranch != null)
            {
                bool result = service.Login(path, userBranch.User.UserName, password, enableDevelopmentMode);

                if (result)
                {
                    CultureInfo cultureInfo = Thread.CurrentThread.CurrentCulture;
                    TextInfo textInfo = cultureInfo.TextInfo;
                    SimpleSessionPersister.Username = textInfo.ToTitleCase(userBranch.User.UserName.ToLower());
                    SimpleSessionPersister.Role = service.UserRole.RoleName;
                    SimpleSessionPersister.BranchId = userBranch.IdTb_OPL_Branch;
                    SimpleSessionPersister.BranchName = userBranch.Tb_OPL_Branch.BranchShortName;

                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    TempData["Error"] = "The username or password you entered did not match our records. Please double-check and try again.";

                    return RedirectToAction("Login", "Account");
                }

            }
            else
            {
                TempData["Error"] = "The username or password you entered did not match our records. Please double-check and try again.";

                return RedirectToAction("Login", "Account");
            }
        }

        /// <summary>
        /// Handle Logout Activity.
        /// </summary>
        /// <returns>ActionResult</returns>
        public ActionResult LogOff()
        {
            Session.RemoveAll();

            return this.RedirectToAction("Login", "Account");
        }
    }
}
