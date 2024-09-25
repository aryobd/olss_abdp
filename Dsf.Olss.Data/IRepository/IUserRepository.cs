using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data
{
    public interface IUserRepository
    {
        IEnumerable<User> SelectAll();
        IQueryable<User> AsQueryable(Expression<Func<User, bool>> where);
        IQueryable<User> AsQueryable();
        User SelectSingle(Expression<Func<User, bool>> where);
        User SelectById(int Id);
        void Insert(User obj);
        void Update(User obj);
    }
}
