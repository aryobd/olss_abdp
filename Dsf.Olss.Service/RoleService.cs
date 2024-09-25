using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using System.Linq.Expressions;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Lib.Diagnostics;

namespace Dsf.Olss.Service
{
    public interface IRoleService
    {
        bool AddRole(Role role);
        bool EditRole(Role role);

        Role SelectRoleById(int id);

        IQueryable AsQueryable(Expression<Func<Role, bool>> where);
        IEnumerable<Role> GetRoleDropDown();

        int TotalRole();
        int TotalRole(Expression<Func<Role, bool>> where);

        IQueryable<Role> GetRoleListAsc(
            Expression<Func<Role, bool>> where,
            int take,
            int skip,
            Expression<Func<Role, string>> sort
        );
        IQueryable<Role> GetRoleListDesc(
            Expression<Func<Role, bool>> where,
            int take,
            int skip,
            Expression<Func<Role, string>> sort
        );
    }

    public class RoleService : IRoleService
    {
        private IRoleRepository repository;
        private IUnitOfWork unitOfWork;

        public RoleService(IRoleRepository repository,IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        private void SaveRole()
        {
            unitOfWork.Save();
        }

        public bool AddRole(Role role)
        {
            if (role == null)
                throw new ArgumentNullException("role");

            try
            {
                repository.Insert(role);

                SaveRole();

                return true;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return false;
            }
        }

        public Role SelectRoleById(int id)
        {
            if (id == 0)
                throw new ArgumentException("0 is invalid role id", "id");

            return repository.SelectById(id);
        }

        public bool EditRole(Role role)
        {
            if (role == null)
                throw new ArgumentNullException("role");

            if (role.IdRole == 0)
                throw new ArgumentException("0 is invalid role id", "role.IdRole");

            try
            {
                repository.Update(role);

                SaveRole();

                return true;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return false;
            }
        }

        public IQueryable AsQueryable(Expression<Func<Role, bool>> where)
        {
            return repository.AsQueryable(where);
        }

        public IEnumerable<Role> GetRoleDropDown()
        {
            return repository.AsQueryable().AsEnumerable();
        }

        public int TotalRole()
        {
            return repository.AsQueryable().Count();
        }

        public int TotalRole(Expression<Func<Role, bool>> where)
        {
            if (where == null)
                return TotalRole();

            return repository.AsQueryable(where).Count();
        }

        public IQueryable<Role> GetRoleListAsc(
            Expression<Func<Role, bool>> where,
            int take,
            int skip,
            Expression<Func<Role, string>> sort
        )
        {
            if (where == null)
                return repository.AsQueryable().OrderBy(sort).Take(take).Skip(skip);

            return repository.AsQueryable(where).OrderBy(sort).Take(take).Skip(skip);
        }

        public IQueryable<Role> GetRoleListDesc(
            Expression<Func<Role, bool>> where,
            int take,
            int skip,
            Expression<Func<Role, string>> sort
        )
        {
            if (where == null)
                return repository.AsQueryable().OrderByDescending(sort).Skip(skip).Take(take);

            return repository.AsQueryable(where).OrderByDescending(sort).Skip(skip).Take(take);
        }
    }
}
