using Dsf.Lib.Diagnostics;
using Dsf.Olss.Common;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Hubs;
using Dsf.Olss.Models;
using Dsf.Olss.Service.MaintenanceService;
using Dsf.Olss.Service.Infos;
using Microsoft.AspNet.SignalR;
using System;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;

namespace Dsf.Olss.Controllers
{
    public class MaintenanceCategoryController : BaseController
    {
        private readonly IMaintenanceCategoryService _service;

        public MaintenanceCategoryController(IMaintenanceCategoryService maintenanceCategoryService)
        {
            _service = maintenanceCategoryService;
        }

        public ActionResult Index()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = TempData["Error"];

            return View();
        }

        public ActionResult Add()
        {
            return View(new MaintenanceCategoryViewModel());
        }

        public ActionResult Edit(int id)
        {
            var data = _service.SelectMaintenanceCategoryById(id);

            var model = new MaintenanceCategoryViewModel
            {
                IdMaintenanceCategory = data.IdMaintenanceCategory,
                MaintenanceCategoryName = data.MaintenanceCategoryName,
                Remarks = data.Remarks,
                CreatedDate = data.CreatedDate,
                CreatedBy = data.CreatedBy,
                LastModified = data.LastModified,
                LastModifiedBy = data.LastModifiedBy,
                IsDraft = data.IsDraft,
                IsSubmitted = data.IsSubmitted,
                IsActive = data.IsActive,
                IsDeleted = data.IsDeleted
            };

            return View(model);
        }

        public ActionResult Detail(int id)
        {
            var data = _service.SelectMaintenanceCategoryById(id);

            var model = new MaintenanceCategoryViewModel
            {
                IdMaintenanceCategory = data.IdMaintenanceCategory,
                MaintenanceCategoryName = data.MaintenanceCategoryName,
                Remarks = data.Remarks,
                CreatedDate = data.CreatedDate,
                CreatedBy = data.CreatedBy,
                LastModified = data.LastModified,
                LastModifiedBy = data.LastModifiedBy,
                IsDraft = data.IsDraft,
                IsSubmitted = data.IsSubmitted,
                IsActive = data.IsActive,
                IsDeleted = data.IsDeleted
            };

            return View(model);
        }

        [HttpPost]
        public ActionResult Add(string statusButton, MaintenanceCategoryViewModel model)
        {
            var data = new MaintenanceCategory();

            if (ModelState.IsValid)
            {
                if (_service.IsExistCategoryName(model.MaintenanceCategoryName))
                {
                    MessageUtils.SetErrorMessageDuplicate(statusButton, TempData, "Maintenance Category Name");

                    ViewBag.Error = TempData["Error"];

                    return View(model);
                }

                data.MaintenanceCategoryName = model.MaintenanceCategoryName;
                data.Remarks = model.Remarks;
                data.CreatedBy = HttpContext.User.Identity.Name;
                data.CreatedDate = DateTime.Now;
                
                if (statusButton.Equals("Submit"))
                    data.IsSubmitted = true;
                else
                    data.IsDraft = true;

                if (_service.AddMaintenanceCategory(data))
                {
                    var connIds = new string[1];
                    connIds[0] = model.ConnId;

                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    var hubContext = GlobalHost.ConnectionManager.GetHubContext<MaintenanceCategoryHub>();
                    hubContext.Clients.AllExcept(connIds).OnStatusLock();
                }
                else
                {
                    MessageUtils.SetErrorMessage(statusButton, TempData);
                }

                return RedirectToAction("Index","MaintenanceCategory");
            }
            else
            {
                return View(model);
            }
        }

        [HttpPost]
        public ActionResult Edit(string statusButton, MaintenanceCategoryViewModel model)
        {
            var data = _service.SelectMaintenanceCategoryById(model.IdMaintenanceCategory);

            if (data == null)
                return RedirectToAction("Index");

            if ((data.IsActive) || (!data.IsActive && !data.IsDraft && !data.IsSubmitted) || (data.IsDeleted))
                return RedirectToAction("Index");

            if (ModelState.IsValid)
            {
                if (_service.IsExistCategoryNameExceptMe(model.IdMaintenanceCategory, model.MaintenanceCategoryName))
                {
                    MessageUtils.SetErrorMessageDuplicate(statusButton, TempData, "Maintenance Category Name");

                    ViewBag.Error = TempData["Error"];

                    return View(model);
                }

                data.MaintenanceCategoryName = model.MaintenanceCategoryName;
                data.Remarks = model.Remarks;
                data.LastModifiedBy = HttpContext.User.Identity.Name;
                data.LastModified = DateTime.Now;

                if (statusButton.Equals("Submit"))
                {
                    data.IsSubmitted = true;
                    data.IsDraft = false;
                }

                if (_service.EditMaintenanceCategory(data))
                {
                    var connIds = new string[1];
                    connIds[0] = model.ConnId;

                    MessageUtils.SetSuccessMessage(statusButton, TempData);

                    if (statusButton.Equals("Save Changes"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<MaintenanceCategoryHub>();
                        hubContext.Clients.AllExcept(connIds).OnSaveLock(data.IdMaintenanceCategory);
                    }
                    else if (statusButton.Equals("Submit"))
                    {
                        var hubContext = GlobalHost.ConnectionManager.GetHubContext<MaintenanceCategoryHub>();
                        hubContext.Clients.AllExcept(connIds).OnStatusLock(data.IdMaintenanceCategory);
                    }
                }
                else
                {
                    MessageUtils.SetErrorMessage(statusButton, TempData);
                }

                return RedirectToAction("Index", "MaintenanceCategory");
            }
            else
            {
                return View(model);
            }
        }

        [HttpPost]
        public ActionResult Detail(string statusButton, int id, string connId)
        {
            var data = _service.SelectMaintenanceCategoryById(id);
            data.LastModifiedBy = HttpContext.User.Identity.Name;
            data.LastModified = DateTime.Now;

            var connIds = new string[1];
            connIds[0] = connId;

            switch (statusButton)
            {
                case "Set to Draft":
                    data.IsDraft = true;
                    data.IsActive = false;
                    data.IsSubmitted = false;
                    data.IsDeleted = false;
                    break;
                case "Submit":
                    data.IsDraft = false;
                    data.IsActive = false;
                    data.IsSubmitted = true;
                    data.IsDeleted = false;
                    break;
                case "Activate":
                    data.IsDraft = false;
                    data.IsActive = true;
                    data.IsSubmitted = false;
                    data.IsDeleted = false;
                    break;
                case "Deactivate":
                    data.IsDraft = false;
                    data.IsActive = false;
                    data.IsSubmitted = false;
                    data.IsDeleted = false;
                    break;
                default:
                    data.IsDraft = true;
                    data.IsActive = false;
                    data.IsSubmitted = false;
                    data.IsDeleted = false;
                    break;
            }

            if (_service.EditMaintenanceCategory(data))
            {
                MessageUtils.SetSuccessMessage(statusButton, TempData);

                var hubContext = GlobalHost.ConnectionManager.GetHubContext<MaintenanceCategoryHub>();

                hubContext.Clients.AllExcept(connIds).OnStatusLock(data.IdMaintenanceCategory);
            }
            else
            {
                MessageUtils.SetErrorMessage(statusButton, TempData);
            }

            return RedirectToAction("Index");
        }
        
        public ActionResult AjaxHandler(JQueryDataTableParamModel param)
        {
            try
            {
                #region Set Filter
                Expression<Func<MaintenanceCategoryListInfo, bool>> filter = null;

                if (param.sSearch != null)
                    filter = (
                        c => c.MaintenanceCategoryName.Contains(param.sSearch)
                             ||
                             c.Remarks.Contains(param.sSearch)
                             ||
                             (
                                 SqlFunctions.StringConvert((double)c.CreatedDate.Month).TrimStart() + "/" +
                                 SqlFunctions.DateName("day", c.CreatedDate).Trim() + "/" +
                                 SqlFunctions.DateName("year", c.CreatedDate)
                             ).Contains(param.sSearch)
                    );
                #endregion Set Filter

                #region Set Sorting & Ordering
                var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);

                Expression<Func<MaintenanceCategoryListInfo, string>> ordering = (
                    c => sortColumnIndex == 0 ?
                         c.MaintenanceCategoryName :
                         sortColumnIndex == 1 ? c.Remarks :
                                                sortColumnIndex == 2 ?
                                                c.CreatedBy :
                                                SqlFunctions.StringConvert((double)SqlFunctions.DateDiff("DAY", DateTime.MinValue, c.CreatedDate))
                );

                var sortDirection = Request["sSortDir_0"]; // asc or desc
                #endregion Set Sorting & Ordering

                var data = _service.GetMaintenanceCategoryList(filter, param.iDisplayLength, param.iDisplayStart, ordering, sortDirection);
                
                // Display Start and Display Length
                var result = from c in data
                             select new
                             {
                                 c.IdMaintenanceCategory,
                                 c.MaintenanceCategoryName, 
                                 c.Remarks,
                                 c.CreatedBy,
                                 c.CreatedDate, 
                                 c.LastModifiedBy,
                                 c.LastModified,
                                 c.IsActive,
                                 c.IsDeleted,
                                 c.IsDraft,
                                 c.IsSubmitted
                             };
                
                // Return Json
                return Json(new
                    {
                        param.sEcho,
                        iTotalRecords = _service.TotalMaintenanceCategory(),
                        iTotalDisplayRecords = _service.TotalMaintenanceCategory(filter),
                        aaData = result.ToList()
                    },
                    JsonRequestBehavior.AllowGet
                );
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return View("Error");
            }
        }
    }
}
