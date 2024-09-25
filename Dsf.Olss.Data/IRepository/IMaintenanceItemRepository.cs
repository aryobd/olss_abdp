using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public interface IMaintenanceItemRepository
    {
        IEnumerable<MaintenanceItem> SelectAll();
        IQueryable<MaintenanceItem> AsQueryable(Expression<Func<MaintenanceItem, bool>> where);
        IQueryable<MaintenanceItem> AsQueryable();
        MaintenanceItem SelectSingle(Expression<Func<MaintenanceItem, bool>> where);
        MaintenanceItem SelectById(int id);
        MaintenanceItem SelectByName(string name);
        void Insert(MaintenanceItem obj);
        void Update(MaintenanceItem obj);
    }
}
