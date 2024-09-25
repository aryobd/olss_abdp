using System.Web;
using System.Web.Optimization;

namespace Dsf.Olss
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            // OLSS Custom Script
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/ui-framework/js/jquery-1.11.1.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Content/ui-framework/js/bootstrap.js"));
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Content/ui-framework/js/app.js"));
            bundles.Add(new ScriptBundle("~/bundles/app.plugin").Include(
                        "~/Content/ui-framework/js/app.plugin.js"));
            bundles.Add(new ScriptBundle("~/bundles/fuelux").Include(
                        "~/Content/ui-framework/js/fuelux/fuelux.js"));
            bundles.Add(new ScriptBundle("~/bundles/jquery.min").Include(
                        "~/Content/ui-framework/js/jquery.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/app.data").Include(
                        "~/Content/ui-framework/js/app.data.js"));
            bundles.Add(new ScriptBundle("~/bundles/select2.min").Include(
                        "~/Content/ui-framework/js/select2/select2.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap-datepicker").Include(
                        "~/Content/ui-framework/js/datepicker/bootstrap-datepicker.js"));
            bundles.Add(new ScriptBundle("~/bundles/jquery.dataTables.min").Include(
                        "~/Content/ui-framework/js/datatables/jquery.dataTables.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/Olss").Include(
                        "~/Content/js/Olss.js"));
            bundles.Add(new ScriptBundle("~/bundles/parsley.min").Include(
                        "~/Content/ui-framework/js/parsley/parsley.min.js"));

            // OLSS Custom Style
            bundles.Add(new StyleBundle("~/bundles/bootstyle").Include(
                        "~/Content/ui-framework/css/bootstrap.css"));
            bundles.Add(new StyleBundle("~/bundles/animate").Include(
                        "~/Content/ui-framework/css/animate.css"));
            bundles.Add(new StyleBundle("~/bundles/font").Include(
                        "~/Content/ui-framework/css/font.css"));
            bundles.Add(new StyleBundle("~/bundles/plugins").Include(
                        "~/Content/ui-framework/css/plugin.css",
                        "~/Content/ui-framework/js/datepicker/datepicker.css"));
            bundles.Add(new StyleBundle("~/bundles/apps").Include(
                        "~/Content/ui-framework/css/app.css",
                        "~/Content/ui-framework/css/ErrorStyle.css",
                        "~/Content/ui-framework/js/fuelux/fuelux.css"));
        }
    }
}
