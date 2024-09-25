namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UserBranch")]
    public partial class UserBranch
    {
        [Key]
        [StringLength(100)]
        public string LoginName { get; set; }

        public int IdUser { get; set; }

        public int IdTb_OPL_Employee { get; set; }

        public int IdTb_OPL_Branch { get; set; }

        public virtual Tb_OPL_Branch Tb_OPL_Branch { get; set; }

        public virtual Tb_OPL_Employee Tb_OPL_Employee { get; set; }

        public virtual User User { get; set; }
    }
}
