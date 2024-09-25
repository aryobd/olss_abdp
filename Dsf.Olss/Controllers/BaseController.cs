using System;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Configuration;
using Dsf.Olss.Common;
using Dsf.Lib.Diagnostics;

namespace Dsf.Olss.Controllers
{
    public class BaseController : Controller
    {
        protected override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!string.IsNullOrEmpty(SimpleSessionPersister.Username))
            {
                filterContext.HttpContext.User = new CustomPrincipal(new CustomIdentity(SimpleSessionPersister.Username));

                base.OnAuthorization(filterContext);
            }

            bool skipAuthorization =
                filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
                ||
                filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true);

            if (!skipAuthorization)
            {
                if (string.IsNullOrEmpty(SimpleSessionPersister.Username))
                {
                    var url = new UrlHelper(filterContext.RequestContext);
                    var LoginUrl = url.Action("Login", "Account", null);

                    filterContext.Result = new RedirectResult(LoginUrl);
                }
            }
        }

        /// <summary>
        /// Download file from server
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="rptType"></param>
        /// <returns></returns>
        public virtual ActionResult Download(string fileName, int rptType)
        {
            var fName = Path.GetFileName(fileName);
            var contentType = MimeMapping.GetMimeMapping(fileName);
            var fullPath = string.Empty;

            switch (rptType)
            {
                case 0:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputCvs), fName);
                    break;
                case 1:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputSkd), fName);
                    break;
                case 2:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputAgmt), fName);
                    break;
                case 3:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputPo), fName);
                    break;
                case 4:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputURcp), fName);
                    break;
                case 5:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputRepUnit), fName);
                    break;
                case 6:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputOPLUnitAll), fName);
                    break;
                case 7:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputSTNK), fName);
                    break;
                case 8:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputKEUR), fName);
                    break;
                case 9:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputInsurance), fName);
                    break;
                case 10:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputPrepUnitRcp), fName);
                    break;
                case 11:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputMaintenance), fName);
                    break;
                case 12:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputHistoryMaintenance), fName);
                    break;
                case 13:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputUnderMaintenance), fName);
                    break;
                case 14:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputBillingSchedule), fName);
                    break;
                case 15:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputReminderMemoHistory), fName);
                    break;
                case 16:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputWarningLetter), fName);
                    break;
                case 17:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputInvoice), fName);
                    break;
                case 18:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptRAL), fName);
                    break;
                case 19:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptBilOverdue), fName);
                    break;
                case 20:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputOPLUnitActive), fName);
                    break;
                case 21:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputOPLUnitReplace), fName);
                    break;
                case 22:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputOPLUnitStock), fName);
                    break;
                case 23:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputOPLUnitDisposal), fName);
                    break;
                case 24:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputMTNHistoryDetailByUnit), fName);
                    break;
                case 25:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputMTNBudgetControlUnit), fName);
                    break;
                case 26:
                    //fullPath = Path.Combine(Server.MapPath(RptOutputRoot + RptOutputMTNActualCostReport), fName);
                    break;
                default:
                    break;
            }

            // return file to download in client
            return File(fullPath, contentType, fName);
        }

        /// <summary>
        /// Send Email
        /// </summary>
        /// <param name="to">Send to Addresses</param>
        /// <param name="cc">Send cc Addresses</param>
        /// <param name="bcc">Send bcc Addresses</param>
        /// <param name="attachments">Email Attachments</param>
        /// <param name="subject">Email Subject</param>
        /// <param name="body">Email body</param>
        public virtual void SendEmail(MailAddressCollection to, MailAddressCollection cc, MailAddressCollection bcc, AttachmentCollection attachments, string subject, string body, string module)
        {
            string emailName = "";
            string displayName = "";

            if (module=="cvs")
            {
                //emailName = EmailAddress;
                //displayName = DisplayName;
            }
            else if (module == "billing")
            {
                //emailName = BillingEmailAddress;
                //displayName = BillingDisplayName;
            }

            MailAddress emailSender = new MailAddress(emailName, displayName);

            SmtpClient client = new SmtpClient
            {
                //Port = Port,
                //Host = Host,
                //EnableSsl = EnableSsl,
                //Timeout = Timeout,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = true//false,
                //Credentials = new NetworkCredential(emailSender.Address, Password)
            };

            MailMessage mm = new MailMessage();
            mm.Subject = subject;
            mm.From = emailSender;//new MailAddress("OpeLease.Phase2@bsi.co.id");
            mm.Body = body;
            mm.BodyEncoding = Encoding.UTF8;
            mm.IsBodyHtml = true;
            mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            foreach (MailAddress email in to ?? new MailAddressCollection())
                mm.To.Add(email);

            foreach (MailAddress email in cc ?? new MailAddressCollection())
                mm.CC.Add(email);

            foreach (MailAddress email in bcc ?? new MailAddressCollection())
                mm.Bcc.Add(email);

            if (attachments != null)
                foreach (Attachment item in attachments)
                    mm.Attachments.Add(item);

            try
            {
                ServicePointManager.ServerCertificateValidationCallback = delegate(object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
                {
                    return true;
                };

                client.Send(mm);
            }
            catch (Exception e)
            {
                Tracer.Error(e.ToString());

                throw;
            }
        }

        /// <summary>
        /// Delete old file report
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="fileName"></param>
        public virtual string DeleteReportFile(string filePath, string fileName)
        {
            var fName = fileName;

            try
            {
                string[] files = Directory.GetFiles(filePath);

                foreach (string file in files)
                {
                    FileInfo fi = new FileInfo(file);

                    if (fi.LastWriteTime < DateTime.Now.AddDays(-1))
                    {
                        fName = fi.Name;
                        fi.Delete();
                    }
                }
            }
            catch (IOException exp)
            {
                Tracer.Error(this, "Delete File..!!", exp.ToString());
            }
            catch (Exception exp)
            {
                Tracer.Error(this, "Delete File..!!", exp.ToString());
            }

            // Return filename
            return fName;
        }
    }
}
