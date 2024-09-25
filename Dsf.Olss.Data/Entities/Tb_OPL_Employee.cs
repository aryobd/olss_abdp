namespace Dsf.Olss.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Tb_OPL_Employee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tb_OPL_Employee()
        {
            //OPLAgreements = new HashSet<OPLAgreement>();
            //Tb_MKT_VisitCustSurvey = new HashSet<Tb_MKT_VisitCustSurvey>();
            UserBranches = new HashSet<UserBranch>();
        }

        [Key]
        public int IdTb_OPL_Employee { get; set; }

        public int? IdUser { get; set; }

        public int? IdTb_OPL_Branch { get; set; }

        public int? IdTb_OPL_JobTitles { get; set; }

        public long IdRefEmployee { get; set; }

        [Required]
        [StringLength(20)]
        public string EmployeeNo { get; set; }

        [Required]
        [StringLength(100)]
        public string EmployeeName { get; set; }

        public DateTime JoinDate { get; set; }

        [Required]
        [StringLength(100)]
        public string Address { get; set; }

        [Required]
        [StringLength(3)]
        public string RT { get; set; }

        [Required]
        [StringLength(3)]
        public string RW { get; set; }

        [Required]
        [StringLength(5)]
        public string ZipCode { get; set; }

        [StringLength(4)]
        public string PhoneArea1 { get; set; }

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
        [StringLength(50)]
        public string MobilePhone1 { get; set; }

        [StringLength(50)]
        public string MobilePhone2 { get; set; }

        [StringLength(200)]
        public string Email { get; set; }

        [StringLength(20)]
        public string LastModifiedBy { get; set; }

        public DateTime? LastModifiedDate { get; set; }

        [Required]
        [StringLength(20)]
        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        [Required]
        [StringLength(1)]
        public string IsActive { get; set; }

        [Required]
        [StringLength(200)]
        public string Email2 { get; set; }

        [StringLength(4)]
        public string PhoneArea3 { get; set; }

        [StringLength(20)]
        public string Phone3 { get; set; }

        [Required]
        [StringLength(1)]
        public string IsExt { get; set; }

        [Required]
        [StringLength(50)]
        public string NPWP { get; set; }

        [Required]
        [StringLength(50)]
        public string IDNo { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<OPLAgreement> OPLAgreements { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<Tb_MKT_VisitCustSurvey> Tb_MKT_VisitCustSurvey { get; set; }

        public virtual User User { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserBranch> UserBranches { get; set; }
    }
}
