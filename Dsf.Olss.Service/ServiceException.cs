using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dsf.Olss.Service
{
    public class ServiceException : Exception
    {
        public ServiceException()
            : base()
        {
        }

        public ServiceException(string message)
            : base(message)
        {
        }
    }

    public class NumberingLimitException : Exception
    {
        public NumberingLimitException()
            : base()
        {
        }

        public NumberingLimitException(string message)
            : base(message)
        {
        }
    }
}
