namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Permission")]
    public partial class Permission
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Permission()
        {
            Roles = new HashSet<Role>();
        }

        [Key]
        public int IdPermission { get; set; }

        [Required]
        [StringLength(50)]
        public string PermissionName { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        public bool? IsDeleted { get; set; }

        public bool IsDraft { get; set; }

        public bool IsSubmit { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Role> Roles { get; set; }
    }
}
