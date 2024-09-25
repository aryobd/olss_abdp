using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Service.Infos
{
    public class MaintenanceItemListInfo
    {
        public int IdMaintenanceItem { get; set; }
        public string MaintenanceItemName { get; set; }
        public string Remarks { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? LastModified { get; set; }
        public string LastModifiedBy { get; set; }
        public bool IsDraft { get; set; }
        public bool IsSubmitted { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
