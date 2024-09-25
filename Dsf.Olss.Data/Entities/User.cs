namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("User")]
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            Tb_OPL_Employee = new HashSet<Tb_OPL_Employee>();
            UserBranches = new HashSet<UserBranch>();
        }

        [Key]
        public int IdUser { get; set; }

        public int IdRole { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; set; }

        [StringLength(200)]
        public string Password { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(50)]
        public string CreateBy { get; set; }

        public DateTime? LastModified { get; set; }

        [StringLength(50)]
        public string LastModifiedBy { get; set; }

        [StringLength(10)]
        public string Status { get; set; }

        public bool IsDraft { get; set; }

        public bool IsSubmit { get; set; }

        public bool IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual Role Role { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tb_OPL_Employee> Tb_OPL_Employee { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserBranch> UserBranches { get; set; }
    }
}
