using Dsf.Olss.Data.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public class GenericRepository<TEntity> : RepositoryBase<TEntity>, IGenericRepository<TEntity> where TEntity : class
    {
         public GenericRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory)
        {
        }
    }
}
