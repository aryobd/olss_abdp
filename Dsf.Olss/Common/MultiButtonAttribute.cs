using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace Dsf.Olss.Common
{
    /// <summary>
    /// add this attribute if one html form has two input with difference action name 
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class MultiButtonAttribute : ActionNameSelectorAttribute
    {
        public string MatchFormKey { get; set; }
        public string MatchFormValue { get; set; }

        public override bool IsValidName(ControllerContext controllerContext, string actionName, MethodInfo methodInfo)
        {
            return
                controllerContext.HttpContext.Request[MatchFormKey] != null
                &&
                controllerContext.HttpContext.Request[MatchFormKey] == MatchFormValue;
        }
    }
}
