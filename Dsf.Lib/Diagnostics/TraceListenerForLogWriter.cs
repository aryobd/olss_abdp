using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace Dsf.Lib.Diagnostics
{
    public class TraceListenerForLogWriter : TextWriterTraceListener
    {
        public const string LISTENER_FOR_LOGWRITER_NAME = "__Listener_for_LogWriter";

        /// <summary>
        /// default constructor
        /// </summary>
        public TraceListenerForLogWriter()
            : base()
        {
        }

        /// <summary>
        /// name of listener instance
        /// </summary>
        public override string Name
        {
            get
            {
                return LISTENER_FOR_LOGWRITER_NAME;
            }
            set
            {
                base.Name = value;
            }
        }


        /// <summary>
        /// override of output methosd
        /// </summary>
        /// <param name="message">message</param>
        /// <param name="category">category</param>
        public override void WriteLine(string message, string category)
        {
            if (message == null) return;
            Dsf.Lib.Log.LogWriter.GetInstance().WriteTextLog(message, category);
        }

        /// <summary>
        /// override of output methosd
        /// </summary>
        /// <param name="message">message</param>
        public override void WriteLine(string message)
        {
            if (message == null) return;
            Dsf.Lib.Log.LogWriter.GetInstance().WriteTextLog(message);
        }
    }
}
