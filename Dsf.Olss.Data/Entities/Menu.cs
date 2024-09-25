namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Menu")]
    public partial class Menu
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Menu()
        {
            Menu1 = new HashSet<Menu>();
        }

        [Key]
        public int IdMenu { get; set; }

        public int IdRole { get; set; }

        public int IdChildMenu { get; set; }

        [Required]
        [StringLength(50)]
        public string MenuName { get; set; }

        [StringLength(100)]
        public string Url { get; set; }

        [StringLength(200)]
        public string Remarks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Menu> Menu1 { get; set; }

        public virtual Menu Menu2 { get; set; }

        public virtual Role Role { get; set; }
    }
}
