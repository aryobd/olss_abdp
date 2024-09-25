using Dsf.Lib.Constant;
using Dsf.Lib.Diagnostics;
using Dsf.Olss.Common;
using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Hubs;
using Dsf.Olss.Models;
using Dsf.Olss.Service;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace Dsf.Olss.Controllers
{
    public class UserController : BaseController
    {
        private IUserService _userService;
        private IRoleService _roleService;

        public UserController(IUserService userService, IRoleService roleServices)
        {
            this._userService = userService;
            this._roleService = roleServices;
        }

        // Display Index
        public ActionResult Index()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = TempData["Error"];

            return View();
        }

        public ActionResult Add()
        {
            ViewBag.Role = this.GetDropDown();

            return View();
        }

        public ActionResult Detail(int Id)
        {
            var data = _userService.SelectUserById(Id);

            return View(data);
        }

        [HttpPost]
        public ActionResult Detail(string statusButton, User user)
        {
            var data = _userService.SelectUserById(user.IdUser);

            // TODO CREATE VALIDATION STATUS FUNCTION
            if (!data.IsActive.Equals(user.IsActive) ||
                !data.IsSubmit.Equals(user.IsSubmit) ||
                !data.IsDraft.Equals(user.IsDraft) ||
                data.IsDeleted.GetValueOrDefault(false)
            )
            {
                TempData["Error"] = OlssMessage.UpdateErrorStatusChanged;

                return RedirectToAction("Index");
            }

            StatusUtils.SetStatus(data, statusButton);

            if (_userService.EditUser(data))
            {
                MessageUtils.SetSuccessMessage(statusButton, TempData);

                var hubContext = GlobalHost.ConnectionManager.GetHubContext<UserHub>();

                hubContext.Clients.All.OnStatusLock(data.IdUser);
            }
            else
            {
                MessageUtils.SetErrorMessage(statusButton, TempData);
            }

            return RedirectToAction("index");
        }

        public ActionResult Edit(int Id)
        {
            ViewBag.Role = this.GetDropDown();

            var data = _userService.SelectUserById(Id);

            return View(data);
        }

        [HttpPost]
        public ActionResult Edit(string statusButton, User user)
        {
            var data = _userService.SelectUserById(user.IdUser);

            if (!data.IsActive.Equals(user.IsActive) ||
                !data.IsSubmit.Equals(user.IsSubmit) ||
                !data.IsDraft.Equals(user.IsDraft) ||
                data.IsDeleted.GetValueOrDefault(false)
            )
            {
                TempData["Error"] = OlssMessage.UpdateErrorStatusChanged;

                return RedirectToAction("Index");
            }

            if (ModelState.IsValid)
            {
                data.Remarks = user.Remarks;
                data.IdRole = user.IdRole;

                StatusUtils.SetStatus(data, statusButton);

                data.LastModified = DateTime.Now;
                data.LastModifiedBy = HttpContext.User.Identity.Name;

                if (_userService.EditUser(data))
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    if (statusButton.Equals("Save Changes"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<UserHub>();
                        hubContext.Clients.All.OnSaveLock(data.IdUser);
                    }
                    else if (statusButton.Equals("Submit"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<UserHub>();
                        hubContext.Clients.All.OnStatusLock(data.IdUser);
                    }
                }
                else
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);
                }

                return RedirectToAction("Index");
            }

            return View();
        }

        [HttpPost]
        public ActionResult Add(string statusButton, User user)
        {
            if (ModelState.IsValid)
            {
                StatusUtils.SetStatus(user, statusButton, true);

                user.CreateDate = DateTime.Now;
                user.CreateBy = string.IsNullOrWhiteSpace(HttpContext.User.Identity.Name) ? "Anonymous" : HttpContext.User.Identity.Name;

                if (_userService.AddUser(user))
                    MessageUtils.SetSuccessMessage(statusButton, TempData);
                else
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                return RedirectToAction("Index");
            }

            return View();
        }

        public ActionResult AjaxHandler(JQueryDataTableParamModel param)
        {
            try
            {
                IQueryable<User> user = null;
                Expression<Func<User, bool>> filter = null;

                if (param.sSearch != null)
                    filter = (c => c.UserName.Contains(param.sSearch));

                var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);
                
                Expression<Func<User, string>> ordering = (
                    c => sortColumnIndex == 0 ? c.UserName :
                                                sortColumnIndex == 1 ?
                                                c.Role.RoleName :
                                                sortColumnIndex == 2 ? c.Remarks : c.UserName
                );

                var sortDirection = Request["sSortDir_0"]; // asc or desc

                if (sortDirection == "asc")
                    user = _userService.GetUserListAsc(filter, param.iDisplayLength, param.iDisplayStart, ordering);
                else
                    user = _userService.GetUserListDesc(filter, param.iDisplayLength, param.iDisplayStart, ordering);

                // Display Start and Display Length
                var result = from c in user
                             select new
                             {
                                 c.UserName,
                                 c.Role.RoleName,
                                 c.Status,
                                 c.IsDraft,
                                 c.IsSubmit,
                                 c.IsActive,
                                 c.IdUser
                             };

                // Return Json
                return Json(new
                    {
                        sEcho = param.sEcho,
                        iTotalRecords = _userService.TotalUser(),
                        iTotalDisplayRecords = _userService.TotalUser(filter),
                        aaData = result.ToList()
                    },
                    JsonRequestBehavior.AllowGet
                );
            }
            catch (Exception Ex)
            {
                Tracer.Error(Ex.ToString());

                ViewBag.Message = Ex.Message;

                return View("Error");
            }
        }

        public List<SelectListItem> GetDropDown()
        {
            List<SelectListItem> ls = new List<SelectListItem>();
            List<Role> lm = (List<Role>)_roleService.GetRoleDropDown().ToList();

            foreach (var temp in lm)
            {
                ls.Add(new SelectListItem() { Text = temp.RoleName, Value = Convert.ToString(temp.IdRole) });
            }

            return ls;
        }
	}
}
