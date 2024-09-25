namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Tb_OPL_Branch
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tb_OPL_Branch()
        {
            //OPLAgreements = new HashSet<OPLAgreement>();
            //Tb_MKT_SKD = new HashSet<Tb_MKT_SKD>();
            //Tb_MKT_VisitCustSurvey = new HashSet<Tb_MKT_VisitCustSurvey>();
            //Tb_SYS_ApprovalPath = new HashSet<Tb_SYS_ApprovalPath>();
            //Tb_SYS_EmailSetting = new HashSet<Tb_SYS_EmailSetting>();
            //Tb_SYS_NumberingFormatDtl = new HashSet<Tb_SYS_NumberingFormatDtl>();
            UserBranches = new HashSet<UserBranch>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int IdTb_OPL_Branch { get; set; }

        [Required]
        [StringLength(10)]
        public string BranchCode { get; set; }

        [StringLength(10)]
        public string BranchShortName { get; set; }

        [Required]
        [StringLength(100)]
        public string BranchName { get; set; }

        public long IdOrgModel { get; set; }

        [Required]
        [StringLength(200)]
        public string BranchAddress { get; set; }

        [StringLength(3)]
        public string RT { get; set; }

        [StringLength(3)]
        public string RW { get; set; }

        [StringLength(50)]
        public string Kelurahan { get; set; }

        [StringLength(50)]
        public string Kecamatan { get; set; }

        [StringLength(50)]
        public string City { get; set; }

        [StringLength(10)]
        public string ZipCode { get; set; }

        [Required]
        [StringLength(4)]
        public string PhoneArea1 { get; set; }

        [Required]
        [StringLength(20)]
        public string Phone1 { get; set; }

        [StringLength(4)]
        public string PhoneArea2 { get; set; }

        [StringLength(20)]
        public string Phone2 { get; set; }

        [StringLength(4)]
        public string FaxArea { get; set; }

        [StringLength(20)]
        public string Fax { get; set; }

        [Required]
        [StringLength(100)]
        public string ContactPersonName { get; set; }

        [Required]
        [StringLength(100)]
        public string ContactPersonJobTitle { get; set; }

        [Required]
        [StringLength(200)]
        public string ContactPersonEmail1 { get; set; }

        [Required]
        [StringLength(20)]
        public string ContactPersonMobilePhone1 { get; set; }

        [StringLength(20)]
        public string ContactPersonMobilePhone2 { get; set; }

        [Required]
        [StringLength(20)]
        public string OfficeClass { get; set; }

        public long? IdBranchArea { get; set; }

        [Required]
        [StringLength(1)]
        public string IsActive { get; set; }

        public long? IdParentBranch { get; set; }

        [Required]
        [StringLength(1)]
        public string IsBranchClose { get; set; }

        public DateTime? BranchOpeningDate { get; set; }

        [Required]
        [StringLength(1)]
        public string IsAllowAppCreated { get; set; }

        public long IdHolidayScheme { get; set; }

        [StringLength(4)]
        public string PhoneArea3 { get; set; }

        [StringLength(20)]
        public string Phone3 { get; set; }

        [StringLength(200)]
        public string ContactPersonEmail2 { get; set; }

        public long IdWorkingHourScheme { get; set; }

        public long? IdTaxOffice { get; set; }

        [Required]
        [StringLength(1)]
        public string IsVirtualOffice { get; set; }

        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        [StringLength(50)]
        public string LastModifiedBy { get; set; }

        public DateTime? LastModifiedDate { get; set; }

        /*
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OPLAgreement> OPLAgreements { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tb_MKT_SKD> Tb_MKT_SKD { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tb_MKT_VisitCustSurvey> Tb_MKT_VisitCustSurvey { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tb_SYS_ApprovalPath> Tb_SYS_ApprovalPath { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tb_SYS_EmailSetting> Tb_SYS_EmailSetting { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tb_SYS_NumberingFormatDtl> Tb_SYS_NumberingFormatDtl { get; set; }
        */

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserBranch> UserBranches { get; set; }
    }
}
