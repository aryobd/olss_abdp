namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OptionItemValue
    {
        [Key]
        public int IdOptionItemValue { get; set; }

        public int IdOptionItem { get; set; }

        [Required]
        [StringLength(200)]
        public string ItemValuesName { get; set; }

        public bool IsDeleted { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        public virtual OptionItem OptionItem { get; set; }
    }
}
