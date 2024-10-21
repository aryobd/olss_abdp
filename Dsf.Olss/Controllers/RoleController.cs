using Dsf.Lib.Constant;
using Dsf.Olss.Common;
using Dsf.Olss.Models;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq.Expressions;
using Microsoft.AspNet.SignalR;
//using Dsf.Olss.Hubs;
using Microsoft.AspNet.SignalR.Hubs;
using Dsf.Olss.Hubs;

namespace Dsf.Olss.Controllers
{
    public class RoleController : BaseController
    {
        private IRoleService _service;
        private IPermissionService _permissionService;

        public RoleController(IRoleService service, IPermissionService permissionService)
        {
            this._service = service;
            this._permissionService = permissionService;
        }

        public ActionResult Index()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = TempData["Error"];

            return View();
        }

        // Display Add New Role
        public ActionResult Add()
        {
            ViewBag.Permission = GetPermission();

            return View();
        }

        // Handle Add / Save Changes
        [HttpPost]
        public ActionResult Add(string statusButton, Role role, int[] selectedPermission)
        {
            ViewBag.Permission = GetPermission();

            if (ModelState.IsValid)
            {
                StatusUtils.SetStatus(role, statusButton, true);

                role.CreatedDate = DateTime.Now;
                role.CreatedBy = string.IsNullOrWhiteSpace(HttpContext.User.Identity.Name) ? "Anonymous" : HttpContext.User.Identity.Name;

                if (selectedPermission != null)
                {
                    for (int i = 0; i < selectedPermission.Length; i++)
                    {
                        Permission permission = _permissionService.SelectPermissionById(selectedPermission[i]);

                        role.Permissions.Add(permission);
                    }
                }

                if (_service.AddRole(role))
                    MessageUtils.SetSuccessMessage(statusButton, TempData);
                else
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                return RedirectToAction("Index");
            }

            return View();
        }

        // Display Edit Screen
        public ActionResult Edit(int Id)
        {
            Role role = this._service.SelectRoleById(Id);

            ViewBag.Permission = GetPermission(role.Permissions.Select(o => o.IdPermission).ToArray());

            return View(role);
        }

        // Handle Edit When Save Changes Button Clicked
        [HttpPost]
        public ActionResult Edit(string statusButton, Role role, int[] selectedPermission)
        {
            Role data = this._service.SelectRoleById(role.IdRole);

            if (!data.IsActive.Equals(role.IsActive) ||
                !data.IsSubmit.Equals(role.IsSubmit) ||
                !data.IsDraft.Equals(role.IsDraft) ||
                data.IsDeleted.GetValueOrDefault(false)
            )
            {
                TempData["Error"] = OlssMessage.UpdateErrorStatusChanged;

                return RedirectToAction("Index");
            }

            if (ModelState.IsValid)
            {
                //data.Menus = role.Menus;
                data.Remarks = role.Remarks;
                data.RoleName = role.RoleName;

                // todo
                StatusUtils.SetStatus(data, statusButton);

                role.CreatedBy = HttpContext.User.Identity.Name;
                role.CreatedDate = DateTime.Now;

                role.Permissions.Clear();

                var allpermisions = _permissionService.GetActivePermission();

                if (selectedPermission != null)
                {                   
                    var permissions = allpermisions.Where(o => selectedPermission.Contains(o.IdPermission));
                    var nopermission = allpermisions.Where(o => !selectedPermission.Contains(o.IdPermission));

                    foreach(var permission in nopermission)
                    {
                        permission.Roles.Remove(data);
                    }

                    foreach (var permission in permissions)
                    {                      
                        permission.Roles.Add(data);
                        role.Permissions.Add(permission);
                    }
                }
                else
                {
                    foreach (var permission in allpermisions)
                    {
                        permission.Roles.Remove(data);
                    }
                }

                if (this._service.EditRole(data))
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    if (statusButton.Equals("Save Changes"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<RoleHub>();

                        hubContext.Clients.All.OnSaveLock(data.IdRole);
                    }
                    else if (statusButton.Equals("Submit"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<RoleHub>();

                        hubContext.Clients.All.OnStatusLock(data.IdRole);
                    }
                }
                else
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);
                }

                return RedirectToAction("index");
            }

            return View(role);
        }

        // Display Detail Screen
        public ActionResult Detail(int Id)
        {
            Role role = this._service.SelectRoleById(Id);

            return View(role);
        }

        // Post Detail Screen (When Changing Status)
        [HttpPost]
        public ActionResult Detail(string statusButton, Role role)
        {
            var data = _service.SelectRoleById(role.IdRole);

            if (!data.IsActive.Equals(role.IsActive) ||
                !data.IsSubmit.Equals(role.IsSubmit) ||
                !data.IsDraft.Equals(role.IsDraft) ||
                data.IsDeleted.GetValueOrDefault(false)
            )
            {
                TempData["Error"] = OlssMessage.UpdateErrorStatusChanged;

                return RedirectToAction("Index");
            }

            if (ModelState.IsValid)
            {
                if ((statusButton == "Deactivate" || statusButton == "Set to Draft") && data.Users.Count() != 0)
                {
                    TempData["Error"] = "Sorry, we cannot perform that action because user with that role is available.";

                    return RedirectToAction("index");
                }
                else
                {
                    StatusUtils.SetStatus(data, statusButton);
                }

                if (this._service.EditRole(data))
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    var hubContext = GlobalHost.ConnectionManager.GetHubContext<RoleHub>();

                    hubContext.Clients.All.OnStatusLock(role.IdRole);
                }
                else
                {
                    MessageUtils.SetErrorMessage(statusButton, TempData);
                }
            }

            return RedirectToAction("index");
        }

        // Called by Javascript. It's display data into DataTables
        public ActionResult AjaxHandler(JQueryDataTableParamModel param)
        {
            try
            {
                IQueryable<Role> role = null;
                Expression<Func<Role, bool>> filter = null;

                if (param.sSearch != null)
                    filter = (
                        c => c.RoleName.Contains(param.sSearch)
                        ||
                        c.Remarks.Contains(param.sSearch)
                    );

                var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);

                Expression<Func<Role, string>> ordering = (c => sortColumnIndex == 0 ? c.RoleName : sortColumnIndex == 1 ? c.Remarks : c.RoleName);

                var sortDirection = Request["sSortDir_0"]; // asc or desc

                if (sortDirection == "asc")
                    role = _service.GetRoleListAsc(filter, param.iDisplayLength, param.iDisplayStart, ordering);
                else
                    role = _service.GetRoleListDesc(filter, param.iDisplayLength, param.iDisplayStart, ordering);

                // Display Start and Display Length
                var result = from c in role
                             select new
                             {
                                 c.RoleName,
                                 c.Remarks,
                                 c.Status,
                                 c.IsDraft,
                                 c.IsSubmit,
                                 c.IsActive,
                                 c.IdRole
                             };

                // Return Json
                return Json(new
                    {
                        sEcho = param.sEcho,
                        iTotalRecords = _service.TotalRole(),
                        iTotalDisplayRecords = _service.TotalRole(filter),
                        aaData = result.ToList()
                    },
                    JsonRequestBehavior.AllowGet
                );
            }
            catch (Exception Ex)
            {
                ViewBag.Message = Ex.Message;

                return View("Error");
            }
        }

        public List<SelectListItem> GetPermission(int[] id = null)
        {
            List<SelectListItem> ls = new List<SelectListItem>();
            List<Permission> lm = _permissionService.GetActivePermission().ToList();

            foreach (var temp in lm)
            {
                ls.Add(new SelectListItem()
                {
                    Text = temp.PermissionName,
                    Value = Convert.ToString(temp.IdPermission),
                    Selected = id != null ? id.Contains(temp.IdPermission) : false
                });
            }

            return ls;
        }
    }
}
