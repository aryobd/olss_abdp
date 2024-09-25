namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Tb_OPL_JobTitles
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tb_OPL_JobTitles()
        {
            //Tb_SYS_ApprovalPathDtl = new HashSet<Tb_SYS_ApprovalPathDtl>();
            //Tb_SYS_EmailSettingDtl = new HashSet<Tb_SYS_EmailSettingDtl>();
        }

        [Key]
        public int IdTb_OPL_JobTitles { get; set; }

        [StringLength(50)]
        public string TitleCode { get; set; }

        [Required]
        [StringLength(100)]
        public string TitleName { get; set; }

        public int OrderNumber { get; set; }

        public int? ParentId { get; set; }

        public int? BranchAccessCode { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<Tb_SYS_ApprovalPathDtl> Tb_SYS_ApprovalPathDtl { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<Tb_SYS_EmailSettingDtl> Tb_SYS_EmailSettingDtl { get; set; }
    }
}
