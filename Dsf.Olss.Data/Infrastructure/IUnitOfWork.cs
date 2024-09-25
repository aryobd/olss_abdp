using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void Save();
        Task<bool> SaveAsync();
        void ExecuteSqlCommand(string strsql); // added by Sonny (22 Mar 2018) untuk execute perintah SQL
        void ExecuteSqlCommand(string strsql, SqlParameter[] param); // added by Sonny (22 Mar 2018) untuk execute perintah SQL dengan sql parameter
    }
}
