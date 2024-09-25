using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data.Infrastructure
{
    public class DatabaseFactory : Disposable, IDatabaseFactory
    {
        private OlssEntities dataContext;
        public OlssEntities Get()
        {
            if (dataContext == null)
            {
                dataContext = new OlssEntities();
                dataContext.Database.CommandTimeout = 180;

                return dataContext;
            }
            else
            {
                dataContext.Database.CommandTimeout = 180;

                return dataContext;
            }
        }

        protected override void DisposeCore()
        {
            if (dataContext != null)
                dataContext.Dispose();
        }
    }
}
