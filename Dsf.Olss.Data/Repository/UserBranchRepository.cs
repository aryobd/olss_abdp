using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.IRepository;

namespace Dsf.Olss.Data.Repository
{
    public class UserBranchRepository : RepositoryBase<UserBranch>, IUserBranchRepository
    {
        public UserBranchRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

        public UserBranch SelectSingle(Expression<Func<UserBranch, bool>> where)
        {
            return dbset.Where(where).SingleOrDefault();
        }
    }
}
