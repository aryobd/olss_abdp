using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public interface IRoleRepository
    {
        IEnumerable<Role> SelectAll();
        IQueryable<Role> AsQueryable(Expression<Func<Role, bool>> where);
        IQueryable<Role> AsQueryable();
        Role SelectById(int Id);
        void Insert(Role obj);
        void Update(Role obj);
    }
}
