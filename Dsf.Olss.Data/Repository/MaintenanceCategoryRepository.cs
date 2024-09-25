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
    public class MaintenanceCategoryRepository : RepositoryBase<MaintenanceCategory>, IMaintenanceCategoryRepository
    {
        public MaintenanceCategoryRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

        public MaintenanceCategory SelectSingle(Expression<Func<MaintenanceCategory, bool>> where)
        {
            return dbset.Where(where).SingleOrDefault();
        }

        public MaintenanceCategory SelectById(int id)
        {
            return dbset.Where(o => o.IdMaintenanceCategory.Equals(id)).FirstOrDefault();
        }

        public MaintenanceCategory SelectByName(string name)
        {
            return dbset.Where(o => o.MaintenanceCategoryName.Equals(name)).FirstOrDefault();
        }
    }
}
