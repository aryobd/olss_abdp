using System;
using System.Text;
using System.Web.Mvc;
using System.Web.Routing;

namespace Dsf.Olss.Common.HtmlHelpers
{
    public static class WizardHelper
    {
        public static MvcHtmlString WizardNav(this HtmlHelper html, int totalstep, int currentstep, int maxstep, Func<int, string> pageUrl)
        {
            StringBuilder result = new StringBuilder();

            result.Append("<div class=\"wizard clearfix\" id=\"form-wizard\">");
            result.Append("<ul class=\"steps\">");

            for (int i = 1; i <= totalstep; i++)
            {
                TagBuilder tag = new TagBuilder("li");
                tag.MergeAttribute("data-target", "#step" + i.ToString());

                if (i <= maxstep)
                {
                    tag.AddCssClass("islink");
                    tag.MergeAttribute("onclick", "location.href='" + pageUrl(i) + "'");
                    tag.MergeAttribute("style", "cursor:pointer;");
                }

                TagBuilder span = new TagBuilder("span");
                span.AddCssClass("badge");
                span.InnerHtml = i.ToString();

                if (i == currentstep)
                {
                    span.AddCssClass("badge-info");
                    tag.AddCssClass("active");
                }

                tag.InnerHtml = span.ToString(TagRenderMode.Normal) + "Step " + i.ToString();
                result.Append(tag.ToString());
            }

            result.Append("</ul>");
            result.Append("</div>");

            return MvcHtmlString.Create(result.ToString());
        }
    }
}
