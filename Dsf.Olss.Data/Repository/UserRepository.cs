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
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }

        public User SelectSingle(Expression<Func<User, bool>> where)
        {
            return dbset.Where(where).SingleOrDefault();
        }
    }
}
