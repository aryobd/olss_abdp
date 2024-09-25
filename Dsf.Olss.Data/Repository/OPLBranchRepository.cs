using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.IRepository;

namespace Dsf.Olss.Data
{
    public class OPLBranchRepository : RepositoryBase<Tb_OPL_Branch>, IOPLBranchRepository
    {
        public OPLBranchRepository(IDatabaseFactory databasefactory) 
            : base(databasefactory)
        {
        }
    }
}
