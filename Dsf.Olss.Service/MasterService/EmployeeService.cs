using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dsf.Olss.Data;
using Dsf.Olss.Data.Entities;

namespace Dsf.Olss.Service.MasterService
{
    public interface IEmployeeService
    {
        Tb_OPL_Employee SelectEmployeeById(int? id);
        Tb_OPL_JobTitles SelectJobTitlesById(int? id);
        Tb_OPL_Employee SelectEmployeeByAccountID(string accountId);
        Tb_OPL_Branch SelectByBranchID(int? id);
        List<Tb_OPL_Branch> SelectByBranchAreaId(int branchAreaId);
        List<Tb_OPL_Employee> SelectEmployeeByBranchJob(int branchAreaId, int jobId);
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly IGenericRepository<Tb_OPL_Employee> _oplEmployeeRepository;
        private readonly IGenericRepository<Tb_OPL_JobTitles> _oplJobTitlesRepository;
        private readonly IGenericRepository<Tb_OPL_Branch> _tbOplBranchRepository;
        private readonly IUserRepository _userRepository;

        public EmployeeService(
            IGenericRepository<Tb_OPL_Employee> oplEmployeeRepository,
            IGenericRepository<Tb_OPL_JobTitles> oplJobTitlesRepository,
            IUserRepository userRepository,
            IGenericRepository<Tb_OPL_Branch> tbOplBranchRepository
        )
        {
            _oplEmployeeRepository = oplEmployeeRepository;
            _oplJobTitlesRepository = oplJobTitlesRepository;
            _userRepository = userRepository;
            _tbOplBranchRepository = tbOplBranchRepository;
        }

        public Tb_OPL_Employee SelectEmployeeById(int? id)
        {
            return _oplEmployeeRepository.SelectByNullableId(id);
        }

        public Tb_OPL_JobTitles SelectJobTitlesById(int? id)
        {
            return _oplJobTitlesRepository.SelectByNullableId(id);
        }

        public Tb_OPL_Employee SelectEmployeeByAccountID(string accountId)
        {
            var user = _userRepository.SelectSingle(
                u => u.UserName == accountId
                &&
                u.IsActive
                &&
                u.IsDraft == false
                &&
                u.IsDeleted == false
            );
            var employee = _oplEmployeeRepository.AsQueryable(o => o.IdUser == user.IdUser).FirstOrDefault();

            return employee;
        }

        public List<Tb_OPL_Employee> SelectEmployeeByBranchJob(int branchAreaId, int jobId)
        {
            var result = _oplEmployeeRepository.AsQueryable().Where(
                b => b.IdTb_OPL_Branch == branchAreaId
                &&
                b.IdTb_OPL_JobTitles == jobId
                &&
                b.IsActive == "1"
            ).ToList();

            return result;
        }

        public Tb_OPL_Branch SelectByBranchID(int? id)
        {
            return _tbOplBranchRepository.SelectByNullableId(id);
        }

        /// <summary>
        /// Get Tb_OPL_Branch based on IdBranchArea
        /// </summary>
        /// <param name="branchAreaId"></param>
        /// <returns></returns>
        public List<Tb_OPL_Branch> SelectByBranchAreaId(int branchAreaId)
        {
            var result = _tbOplBranchRepository.AsQueryable().Where(b => b.IdBranchArea == branchAreaId).ToList();

            return result;
        }
    }
}
