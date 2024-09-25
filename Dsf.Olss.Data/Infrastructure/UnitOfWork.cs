using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDatabaseFactory _databaseFactory;
        private OlssEntities _dataContext;

        public UnitOfWork(IDatabaseFactory databaseFactory)
        {
            this._databaseFactory = databaseFactory;
        }

        protected OlssEntities DataContext
        {  
            get { return _dataContext ?? (_dataContext = _databaseFactory.Get()); }
        }

        public void Save()
        {
            DataContext.SaveChanges();
        }

        public async Task<bool> SaveAsync()
        {
            await DataContext.SaveChangesAsync();
            return true;
        }

        public void ExecuteSqlCommand(string strsql)
        { // added by Sonny (22 Mar 2018) untuk execute perintah SQL
            DataContext.Database.ExecuteSqlCommand(strsql);
        }

        public void ExecuteSqlCommand(string strsql, SqlParameter[] param)
        { // added by Sonny (22 Mar 2018) untuk execute perintah SQL dengan sql parameter
            DataContext.Database.ExecuteSqlCommand(strsql);
        }
    }
}
