using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;

namespace Dsf.Olss.Data.IRepository
{
    public interface IUserBranchRepository
    {
        IEnumerable<UserBranch> SelectAll();
        IQueryable<UserBranch> AsQueryable(Expression<Func<UserBranch, bool>> where);
        IQueryable<UserBranch> AsQueryable();
        UserBranch SelectSingle(Expression<Func<UserBranch, bool>> where);
        UserBranch SelectById(int Id);
        void Insert(UserBranch obj);
        void Update(UserBranch obj);
    }
}
