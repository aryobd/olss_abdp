using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public class PermissionRepository : RepositoryBase<Permission>, IPermissionRepository
    {
        public PermissionRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
}
