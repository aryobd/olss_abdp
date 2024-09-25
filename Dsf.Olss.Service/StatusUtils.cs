using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dsf.Olss.Service
{
    public class StatusUtils
    {
        /// <summary>
        /// obsoleted
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="status"></param>
        /// <param name="IsNew"></param>
        public static void SetStatus(dynamic entity, string status, bool IsNew = false)
        {
            if (IsNew)
            {
                entity.IsActive = false;
                entity.IsSubmit = false;
                entity.IsDeleted = false;
            }

            if (status == "Save as Draft" || status == "Set to Draft")
            {
                entity.IsDraft = true;

            }
            else if (status == "Activate")
            {
                entity.IsActive = true;
                entity.IsSubmit = false;
            }
            else if (status == "Deactivate")
            {
                entity.IsActive = false;
            }

            else if (status == "Submit")
            {
                entity.IsSubmit = true;
                entity.IsDraft = false;
            }
        }

        /// <summary>
        /// manages entity status update
        /// </summary>
        /// <param name="entity">entity to be </param>
        /// <param name="status"></param>
        /// <param name="IsNew"></param>
        public static void SetStatus(dynamic entity, EntityStatus status, bool IsNew = false)
        {
            if (IsNew)
            {
                entity.IsActive = false;
                entity.IsSubmit = false;
                entity.IsDeleted = false;
            }

            if (status == EntityStatus.SaveAsDraft || status == EntityStatus.SetToDraft)
            {
                entity.IsDraft = true;

            }
            else if (status == EntityStatus.Activate)
            {
                entity.IsActive = true;
                entity.IsSubmit = false;
            }
            else if (status == EntityStatus.Deactivate)
            {
                entity.IsActive = false;
            }
            else if (status == EntityStatus.Submit)
            {
                entity.IsSubmit = true;
                entity.IsDraft = false;
            }
        }

    }

    /// <summary>
    /// represents entity status
    /// </summary>
    public enum EntityStatus
    {
        SaveAsDraft,
        SetToDraft,
        Activate,
        Deactivate,
        Submit,
    }
}
