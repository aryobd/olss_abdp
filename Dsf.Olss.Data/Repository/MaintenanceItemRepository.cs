using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;
using System.Linq.Expressions;
using Dsf.Lib.Constant;
using System.Web;
using Dsf.Lib.Diagnostics;
using Dsf.Olss.Data.Infrastructure;

namespace Dsf.Olss.Data
{
    public class MaintenanceItemRepository : RepositoryBase<MaintenanceItem>, IMaintenanceItemRepository
    {
        public MaintenanceItemRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

        public MaintenanceItem SelectSingle(Expression<Func<MaintenanceItem, bool>> where)
        {
            return dbset.Where(where).SingleOrDefault();
        }

        public MaintenanceItem SelectById(int id)
        {
            return dbset.Where(o => o.IdMaintenanceItem.Equals(id)).FirstOrDefault();
        }

        public MaintenanceItem SelectByName(string name)
        {
            return dbset.Where(o => o.MaintenanceItemName.Equals(name)).FirstOrDefault();
        }
    }
}
