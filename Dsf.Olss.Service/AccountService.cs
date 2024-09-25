using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Lib.Diagnostics;
using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.IRepository;

namespace Dsf.Olss.Service
{
    public interface IAccountService
    {
        Role UserRole { get; }
        bool Login(string domain, string accountId, string password, string enableDevelopmentMode);
        User GetUserId(string accountId, string password);
        UserBranch GetBranchId(string loginName);
    }

    /// <summary>
    /// authentication service
    /// </summary>
    public class AccountService : IAccountService
    {
        private IUserRepository repository;
        private IUserBranchRepository _userBranchRepository;

        public AccountService(IUserRepository repository, IUserBranchRepository userBranchRepository)
        {
            this.repository = repository;
            _userBranchRepository = userBranchRepository;
        }

        public Role UserRole { get; private set; }

        /// <summary>
        /// authenticate user by id and password using AD
        /// </summary>
        /// <param name="domain">AD domain name</param>
        /// <param name="accountId">user id</param>
        /// <param name="password">password</param>
        /// <returns></returns>
        public bool Login(string domain, string accountId, string password, string enableDevelopmentMode)
        {
            using (DirectoryEntry entry = new DirectoryEntry(domain, accountId, password))
            {
                DirectorySearcher searcher = new DirectorySearcher(entry);
                searcher.Filter = String.Format("(sAMAccountName={0})", accountId);

                try
                {
                    var userdata = repository.SelectSingle(
                        u => u.UserName == accountId
                        &&
                        u.IsActive == true
                        &&
                        u.IsDraft == false
                        &&
                        u.IsDeleted == false
                    );

                    if (userdata != null)
                    {
                        Tracer.Info(this, "Login", "tring to look up AD ...");

                        if (!enableDevelopmentMode.Equals("true"))
                        {
                            SearchResult adsSearchResult = searcher.FindOne();
                        }

                        Tracer.Info(this, "Login", "done. UserName: " + userdata.UserName);

                        this.UserRole = userdata.Role;

                        return true;
                    }
                    else
                    {
                        Tracer.Warning(this, "Login", "SignInNotRegisteredError. UserName: " + accountId);

                        return false;
                    }
                }
                catch (Exception ex)
                {
                    // Failed to authenticate.
                    // Most likely it is caused by unknown user id or bad password.
                    Tracer.Error(ex.ToString() + "\r\nUserName: " + accountId);
                }
                finally
                {
                    searcher.Dispose();
                }

                return false;
            }
        }

        public User GetUserId(string accountId, string password)
        {
            var userdata = repository.SelectSingle(
                u => u.UserName == accountId
                &&
                u.IsActive == true
                &&
                u.IsDraft == false
                &&
                u.IsDeleted == false
            );

            return userdata;
        }

        public UserBranch GetBranchId(string loginName)
        {
            var userBranch = _userBranchRepository.SelectSingle(u => u.LoginName == loginName);

            return userBranch;
        }
    }
}
