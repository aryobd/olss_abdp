using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;
using System.Linq.Expressions;

namespace Dsf.Olss.Data.IRepository
{
    public interface IOPLJobTitlesRepository
    {
        IEnumerable<Tb_OPL_JobTitles> SelectAll();
        Tb_OPL_JobTitles SelectById(int Id);
        void Insert(Tb_OPL_JobTitles obj);
        void Update(Tb_OPL_JobTitles obj);

        IQueryable<Tb_OPL_JobTitles> AsQueryable(Expression<Func<Tb_OPL_JobTitles, bool>> where);
        IQueryable<Tb_OPL_JobTitles> AsQueryable();
    }
}
