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
    public interface IPermissionService
    {
        bool AddPermission(Permission permission);
        bool EditPermission(Permission permission);
        int TotalPermission();
        int TotalPermission(Expression<Func<Permission, bool>> where);
        Permission SelectPermissionById(int id);
        IEnumerable<Permission> GetPermissionList(
            Expression<Func<Permission, bool>> where,
            int take,
            int skip,
            Expression<Func<Permission, string>> sort,
            string sortType
        );
        IEnumerable<Permission> GetActivePermission();
    }
    public class PermissionService : IPermissionService
    {
        private readonly IPermissionRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public PermissionService(IPermissionRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public bool AddPermission(Permission permission)
        {
            try
            {
                if (permission == null)
                    throw new ArgumentNullException("permission");

                repository.Insert(permission);
                unitOfWork.Save();

                return true;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return false;
            }
        }

        public bool EditPermission(Permission permission)
        {

            try
            {
                if (permission == null)
                    throw new ArgumentNullException("permission");

                if (permission.IdPermission == 0)
                    throw new ArgumentException("0 is invalid permission id", "permission.IdPermission");

                repository.Update(permission);
                unitOfWork.Save();

                return true;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return false;
            }
        }

        public int TotalPermission()
        {
            return repository.AsQueryable().Count();
        }

        public int TotalPermission(Expression<Func<Permission, bool>> where)
        {
            if (where == null)
                return TotalPermission();

            return repository.AsQueryable(where).Count();
        }

        public Permission SelectPermissionById(int id)
        {
            try
            {
                if (id == 0)
                    throw new ArgumentException("0 is invalid costomer id", "id");

                var data = repository.SelectById(id);

                if (!data.IsActive && !data.IsDraft && !data.IsSubmit)
                    return null;
                else
                    return data;
            }
            catch (Exception ex)
            {
                Tracer.Error(ex.ToString());

                return null;
            }
        }

        public IEnumerable<Permission> GetPermissionList(
            Expression<Func<Permission, bool>> where,
            int take,
            int skip,
            Expression<Func<Permission, string>> sort,
            string sortType
        )
        {
            if (sortType.Equals("asc"))
            {
                if (where == null)
                    return repository.AsQueryable().OrderBy(sort).Skip(skip).Take(take).AsEnumerable();
                else
                    return repository.AsQueryable().Where(where).OrderBy(sort).Skip(skip).Take(take).AsEnumerable();
            }
            else
            {
                if (where == null)
                    return repository.AsQueryable().OrderByDescending(sort).Skip(skip).Take(take).AsEnumerable();
                else
                    return repository.AsQueryable().Where(where).OrderByDescending(sort).Skip(skip).Take(take).AsEnumerable();
            }
        }

        public IEnumerable<Permission> GetActivePermission()
        {
           return repository.AsQueryable(o => o.IsActive.Equals(true)).AsEnumerable();
        }
    }
}
