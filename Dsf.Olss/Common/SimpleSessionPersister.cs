using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dsf.Olss.Common
{
    public class SimpleSessionPersister
    {
        static string usernameSessionVar = "username";
        static string roleSessionVar = "role";
        static string branchId = "branchid";
        static string branchName = "branchname";

        public static string Username
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionVar = HttpContext.Current.Session[usernameSessionVar];

                if (sessionVar != null)
                    return sessionVar as string;

                return null;
            }
            set
            {
                HttpContext.Current.Session[usernameSessionVar] = value;
            }
        }

        public static string Role
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionVar = HttpContext.Current.Session[roleSessionVar];

                if (sessionVar != null)
                    return sessionVar as string;

                return null;
            }
            set
            {
                HttpContext.Current.Session[roleSessionVar] = value;
            }
        }

        public static int BranchId
        {
            get
            {
                if (HttpContext.Current == null) return 0;

                var sessionVar = HttpContext.Current.Session[branchId];

                if (sessionVar != null)
                    return (int)sessionVar;

                return 0;
            }
            set
            {
                HttpContext.Current.Session[branchId] = value;
            }
        }

        public static string BranchName
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionVar = HttpContext.Current.Session[branchName];

                return sessionVar as string;
            }
            set
            {
                HttpContext.Current.Session[branchName] = value;
            }
        }
    }
}
