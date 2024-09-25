using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public interface IPermissionRepository
    {
        IEnumerable<Permission> SelectAll();
        Permission SelectById(int Id);

        void Insert(Permission obj);
        void Update(Permission obj);

        IQueryable<Permission> AsQueryable(Expression<Func<Permission, bool>> where);
        IQueryable<Permission> AsQueryable();
    }
}
