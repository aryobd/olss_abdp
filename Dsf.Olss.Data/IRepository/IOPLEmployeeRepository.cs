using System;
using System.Collections.Generic;
using System.Linq;
using Dsf.Olss.Data.Entities;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace Dsf.Olss.Data.IRepository
{
    public interface IOPLEmployeeRepository
    {
        IEnumerable<Tb_OPL_Employee> SelectAll();
        Tb_OPL_Employee SelectById(int Id);
        void Insert(Tb_OPL_Employee obj);
        void Update(Tb_OPL_Employee obj);

        IQueryable<Tb_OPL_Employee> AsQueryable(Expression<Func<Tb_OPL_Employee, bool>> where);
        IQueryable<Tb_OPL_Employee> AsQueryable();
    }
}
