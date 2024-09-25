using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;
using System.Linq.Expressions;

namespace Dsf.Olss.Data.IRepository
{
    public interface IOPLBranchRepository
    {
        IEnumerable<Tb_OPL_Branch> SelectAll();
        Tb_OPL_Branch SelectById(int Id);
        void Insert(Tb_OPL_Branch obj);
        void Update(Tb_OPL_Branch obj);

        IQueryable<Tb_OPL_Branch> AsQueryable(Expression<Func<Tb_OPL_Branch, bool>> where);
        IQueryable<Tb_OPL_Branch> AsQueryable();
        Tb_OPL_Branch SelectByNullableId(int? id);
    }
}
