using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public interface IMaintenanceCategoryRepository
    {
        IEnumerable<MaintenanceCategory> SelectAll();
        IQueryable<MaintenanceCategory> AsQueryable(Expression<Func<MaintenanceCategory, bool>> where);
        IQueryable<MaintenanceCategory> AsQueryable();
        MaintenanceCategory SelectSingle(Expression<Func<MaintenanceCategory, bool>> where);
        MaintenanceCategory SelectById(int id);
        MaintenanceCategory SelectByName(string name);
        void Insert(MaintenanceCategory obj);
        void Update(MaintenanceCategory obj);
    }
}
