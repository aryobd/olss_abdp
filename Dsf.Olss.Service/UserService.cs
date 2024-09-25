using Dsf.Lib.Diagnostics;
using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Service
{
    public interface IUserService
    {
        bool AddUser(User user);
        bool EditUser(User user);

        User SelectUserById(int id);

        IQueryable AsQueryable(Expression<Func<User, bool>> where);

        int TotalUser();
        int TotalUser(Expression<Func<User, bool>> where);

        IQueryable<User> GetUserListAsc(
            Expression<Func<User, bool>> where,
            int take,
            int skip,
            Expression<Func<User, string>> sort
        );
        IQueryable<User> GetUserListDesc(
            Expression<Func<User, bool>> where,
            int take,
            int skip,
            Expression<Func<User, string>> sort
        );
    }

    public class UserService : IUserService
    {

        private readonly IUserRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public UserService(IUserRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        private void SaveUser()
        {
            unitOfWork.Save();
        }

        public bool AddUser(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            try
            {
                repository.Insert(user);

                SaveUser();

                return true;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return false;
            }
        }

        public bool EditUser(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            if (user.IdUser == 0)
                throw new ArgumentException("0 is invalid user id", "user.IdUser");

            try
            {
                repository.Update(user);

                SaveUser();

                return true;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return false;
            }
        }

        public User SelectUserById(int id)
        {
            return repository.SelectById(id);
        }

        public IQueryable AsQueryable(Expression<Func<User, bool>> where)
        {
            return repository.AsQueryable(where);
        }

        public int TotalUser()
        {
            return repository.AsQueryable().Count();
        }

        public int TotalUser(Expression<Func<User, bool>> where)
        {
            if (where == null)
                return TotalUser();

            return repository.AsQueryable(where).Count();
        }

        public IQueryable<User> GetUserListAsc(
            Expression<Func<User, bool>> where,
            int take,
            int skip,
            Expression<Func<User, string>> sort
        )
        {
            if (where == null)
                return repository.AsQueryable().OrderBy(sort).Skip(skip).Take(take);

            return repository.AsQueryable(where).OrderBy(sort).Skip(skip).Take(take);
        }

        public IQueryable<User> GetUserListDesc(
            Expression<Func<User, bool>> where,
            int take,
            int skip,
            Expression<Func<User, string>> sort)
        {
            if (where == null)
                return repository.AsQueryable().OrderByDescending(sort).Skip(skip).Take(take);

            return repository.AsQueryable(where).OrderByDescending(sort).Skip(skip).Take(take);
        }
    }
}
