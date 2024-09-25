namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OptionItem
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OptionItem()
        {
            OptionItemValues = new HashSet<OptionItemValue>();
        }

        [Key]
        public int IdOptionItem { get; set; }

        [Required]
        [StringLength(200)]
        public string OptionItemName { get; set; }

        public bool IsDeleted { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OptionItemValue> OptionItemValues { get; set; }
    }
}
