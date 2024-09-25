namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class OlssEntities : DbContext
    {
        public OlssEntities()
            : base("name=OlssEntities")
        {
        }

        public virtual DbSet<MaintenanceCategory> MaintenanceCategories { get; set; }
        public virtual DbSet<MaintenanceItem> MaintenanceItems { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<Tb_OPL_Branch> Tb_OPL_Branch { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserBranch> UserBranches { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<CalculationOfSale>()
            //    .Property(e => e.COSNumber)
            //    .IsUnicode(false);

            //modelBuilder.Entity<CalculationOfSale>()
            //    .Property(e => e.CustomerCode)
            //    .IsUnicode(false);
        }
    }
}
