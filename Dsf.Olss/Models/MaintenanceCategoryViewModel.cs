using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Dsf.Olss.Models
{
    public class MaintenanceCategoryViewModel
    {
        public string ConnId { get; set; }
        public int IdMaintenanceCategory { get; set; }
        [Required(ErrorMessage = "Category Name is required.")]
        [StringLength(100, ErrorMessage = "Maximum 100 characters.")]
        public string MaintenanceCategoryName { get; set; }
        [StringLength(200, ErrorMessage = "Maximum 200 characters.")]
        public string Remarks { get; set; }

        [DisplayFormat(NullDisplayText = "-", DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreatedDate { get; set; }

        [DisplayFormat(NullDisplayText = "-")]
        public string CreatedBy { get; set; }

        [DisplayFormat(NullDisplayText = "-", DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime? LastModified { get; set; }

        [DisplayFormat(NullDisplayText = "-")]
        public string LastModifiedBy { get; set; }

        public bool IsDraft { get; set; }
        public bool IsSubmitted { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}