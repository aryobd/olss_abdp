using Dsf.Lib.Diagnostics;
using Dsf.Olss.Common;
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
    public class PermissionController : BaseController
    {
        private IPermissionService _service;

        public PermissionController(IPermissionService service)
        {
            this._service = service;
        }

        // GET: Permission
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add()
        {
            return View(new Permission());
        }

        public ActionResult Edit(int id)
        {
            Permission permission = _service.SelectPermissionById(id);

            return View(permission);
        }

        public ActionResult Detail(int id)
        {
            Permission permission = _service.SelectPermissionById(id);

            return View(permission);
        }

        [HttpPost]
        public ActionResult Add(Permission permission, string statusButton)
        {
            if (ModelState.IsValid)
            {
                StatusUtils.SetStatus(permission, statusButton, true);

                permission.CreatedDate = DateTime.Now;
                permission.CreatedBy = HttpContext.User.Identity.Name;

                if (_service.AddPermission(permission))
                    MessageUtils.SetSuccessMessage(statusButton, TempData);
                else
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                return RedirectToAction("Index");
            }

            return View();
        }

        [HttpPost]
        public ActionResult Edit(Permission permission, string statusButton)
        {
            Permission data = _service.SelectPermissionById(permission.IdPermission);

            if (ModelState.IsValid)
            {
                data.PermissionName = permission.PermissionName;
                data.Remarks = permission.Remarks;

                // todo
                StatusUtils.SetStatus(data, statusButton);
             
                if (this._service.EditPermission(data))
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    if (statusButton.Equals("Save Changes"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<RoleHub>();

                        hubContext.Clients.All.OnSaveLock(data.IdPermission);
                    }
                    else if (statusButton.Equals("Submit"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<RoleHub>();

                        hubContext.Clients.All.OnStatusLock(data.IdPermission);
                    }
                }
                else
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);
                }

                return RedirectToAction("index");
            }

            return View("Index");
        }

        [HttpPost]
        public ActionResult Detail(Permission permission, string statusButton)
        {
            Permission data = _service.SelectPermissionById(permission.IdPermission);

            if (ModelState.IsValid)
            {
                StatusUtils.SetStatus(data, statusButton);

                if (this._service.EditPermission(data))
                {
                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    var hubContext = GlobalHost.ConnectionManager.GetHubContext<PermissionHub>();

                    hubContext.Clients.All.OnStatusLock(permission.IdPermission);
                }
                else
                {
                    MessageUtils.SetErrorMessage(statusButton, TempData);
                }
            }

            return RedirectToAction("index");
        }

        public ActionResult AjaxHandler( JQueryDataTableParamModel param)
        {
            try
            {
                Expression<Func<Permission, bool>> filter = null;

                if (param.sSearch != null)
                    filter = (
                        c => c.PermissionName.Contains(param.sSearch)
                        ||
                        c.Remarks.Contains(param.sSearch)
                    );

                var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);

                Expression<Func<Permission, string>> ordering = (c => sortColumnIndex == 0 ? c.PermissionName : c.Remarks);

                var sortDirection = Request["sSortDir_0"]; // asc or desc
                var agreementList = _service.GetPermissionList(filter, param.iDisplayLength, param.iDisplayStart, ordering, sortDirection);

                // Display Start and Display Length
                var result = (
                    from c in agreementList
                    select new
                    {
                        c.IdPermission,
                        c.PermissionName,
                        c.Remarks,
                        c.IsActive,
                        c.IsDraft,
                        c.IsSubmit
                    }).ToList();

                // Return Json
                return Json(new
                    {
                        sEcho = param.sEcho,
                        iTotalRecords = _service.TotalPermission(),
                        iTotalDisplayRecords = _service.TotalPermission(filter),
                        aaData = result
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
    }
}
