namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MaintenanceCategory")]
    public partial class MaintenanceCategory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MaintenanceCategory()
        {
            //MaintenanceCalculationDetails = new HashSet<MaintenanceCalculationDetail>();
        }

        [Key]
        public int IdMaintenanceCategory { get; set; }

        [Required]
        [StringLength(100)]
        public string MaintenanceCategoryName { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        public DateTime CreatedDate { get; set; }

        [Required]
        [StringLength(25)]
        public string CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }

        [StringLength(25)]
        public string LastModifiedBy { get; set; }

        public bool IsDraft { get; set; }

        public bool IsSubmitted { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<MaintenanceCalculationDetail> MaintenanceCalculationDetails { get; set; }
    }
}
