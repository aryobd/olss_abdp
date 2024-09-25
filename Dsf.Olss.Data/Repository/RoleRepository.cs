using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;
using System.Linq.Expressions;
using System.Web;
using Dsf.Lib.Constant;
using Dsf.Lib.Diagnostics;
using Dsf.Olss.Data.Infrastructure;

namespace Dsf.Olss.Data
{
    public class RoleRepository : RepositoryBase<Role>, IRoleRepository
    {
        public RoleRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
}
