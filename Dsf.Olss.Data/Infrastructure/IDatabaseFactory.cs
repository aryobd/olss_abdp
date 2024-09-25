using Dsf.Olss.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Data.Infrastructure
{
    public interface IDatabaseFactory
    {
        OlssEntities Get();
    }
}
