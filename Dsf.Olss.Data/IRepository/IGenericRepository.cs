using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        void Insert(TEntity obj);
        void Update(TEntity obj);
        void UpdateWithRowVersion(TEntity obj, byte[] rowVersion);
        void Delete(TEntity obj);
        IEnumerable<TEntity> SelectAll();
        TEntity SelectById(int id);
        TEntity SelectByNullableId(int? id);
        IQueryable<TEntity> AsQueryable();
        IQueryable<TEntity> AsQueryable(Expression<Func<TEntity,bool>> where);
    }
}
