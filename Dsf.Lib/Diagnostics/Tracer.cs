#define TRACE

using System;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.Text;

namespace Dsf.Lib.Diagnostics
{
    /// <summary>
    /// Wrapper class for System.Diagnostics.Trace
    /// </summary>
    public class Tracer
    {
        const string CLASS_METHOD_SEPARATOR = "#";
        const string SPACER = " ";
        const string MESSAGE_SEPARATOR = " : ";
        const string DELIMITER = ",";

        /// <summary>
        /// trace switch
        /// </summary>
        private static TraceSwitch _traceSwitch;

#if DEBUG
        public static TraceSwitch Switch
        {
            get
            {
                return _traceSwitch;
            }
            set
            {
                _traceSwitch = value;
            }
        }
#endif //DEBUG

        /// <summary>
        /// static initializer
        /// </summary>
        static Tracer()
        {
            // create switch instance as singleton
            _traceSwitch = new TraceSwitch(
                AppSettingsCache.GetInstance().TraceSwitchName,
                AppSettingsCache.GetInstance().TraceSwitchDescription
            );

            //default level is Verbose
            _traceSwitch.Level = TraceLevel.Verbose;

            try
            {
                _traceSwitch.Level = AppSettingsCache.GetInstance().TraceLevel;
            }
            catch
            {
            } // sgnore all the exception
        }

        /// <summary>
        /// output error
        /// </summary>
        /// <param name="caller">type of class which invoked this method</param>
        /// <param name="methodName">name of method which invoked this method</param>
        /// <param name="message">message</param>
        public static void Error(Type caller, string methodName, string message)
        {
            Error(MessageHelper(caller, methodName, message));
        }

        public static void Error(object caller, string methodName, string message)
        {
            if (caller != null)
                Error(MessageHelper(caller.GetType(), methodName, message));
            else
                Error(MessageHelper(null, methodName, message));
        }

        /// <summary>
        /// output error
        /// </summary>
        /// <param name="message">message</param>
        public static void Error(string message)
        {
            if (_traceSwitch.TraceError)
                WriteLine(message, TraceLevel.Error);
        }

        /// <summary>
        /// output warning
        /// </summary>
        /// <param name="caller">type of class which invoked this method</param>
        /// <param name="methodName">name of method which invoked this method</param>
        /// <param name="message">message</param>
        public static void Warning(Type caller, string methodName, string message)
        {
            Warning(MessageHelper(caller, methodName, message));
        }

        public static void Warning(object caller, string methodName, string message)
        {
            if (caller != null)
                Warning(MessageHelper(caller.GetType(), methodName, message));
            else
                Warning(MessageHelper(null, methodName, message));
        }

        /// <summary>
        /// output warning
        /// </summary>
        /// <param name="message">message</param>
        public static void Warning(string message)
        {
            if (_traceSwitch.TraceWarning)
                WriteLine(message, TraceLevel.Warning);
        }

        /// <summary>
        /// output information level message
        /// </summary>
        /// <param name="caller">type of class which invoked this method</param>
        /// <param name="methodName">name of method which invoked this method</param>
        /// <param name="message">message</param>
        public static void Info(Type caller, string methodName, string message)
        {
            Info(MessageHelper(caller, methodName, message));
        }

        public static void Info(object caller, string methodName, string message)
        {
            if (caller != null)
                Info(MessageHelper(caller.GetType(), methodName, message));
            else
                Info(MessageHelper(null, methodName, message));
        }

        /// <summary>
        /// output information level message
        /// </summary>
        /// <param name="message">message</param>
        public static void Info(string message)
        {
            if (_traceSwitch.TraceInfo)
                WriteLine(message, TraceLevel.Info);
        }

        /// <summary>
        /// output verbose level message
        /// </summary>
        /// <param name="caller">type of class which invoked this method</param>
        /// <param name="methodName">name of method which invoked this method</param>
        /// <param name="message">message</param>
        public static void Verbose(Type caller, string methodName, string message)
        {
            Verbose(MessageHelper(caller, methodName, message));
        }

        public static void Verbose(object caller, string methodName, string message)
        {
            if (caller != null)
                Verbose(MessageHelper(caller.GetType(), methodName, message));
            else
                Verbose(MessageHelper(null, methodName, message));
        }

        /// <summary>
        /// output verbose level message
        /// </summary>
        /// <param name="message">message</param>
        public static void Verbose(string message)
        {
            if (_traceSwitch.TraceVerbose)
                WriteLine(message, TraceLevel.Verbose);
        }

        /// <summary>
        /// output debug level message
        /// </summary>
        /// <remarks>not available when debug build</remarks>
        /// <param name="caller">type of class which invoked this method</param>
        /// <param name="methodName">name of method which invoked this method</param>
        /// <param name="message">message</param>
        public static void Debug(Type caller, string methodName, string message)
        {
            Debug(MessageHelper(caller, methodName, message));
        }

        public static void Debug(object caller, string methodName, string message)
        {
            if (caller != null)
                Debug(MessageHelper(caller.GetType(), methodName, message));
            else
                Debug(MessageHelper(null, methodName, message));
        }

        private const string _DEBUG_CATEGORY = "DEBUG";

        /// <summary>
        /// output debug level message
        /// </summary>
        /// <remarks>not available when debug build</remarks>
        /// <param name="message">message</param>
        public static void Debug(string message)
        {
            if (AppSettingsCache.GetInstance().IsDebugEnabled)
                System.Diagnostics.Debug.WriteLine(message, _DEBUG_CATEGORY);
        }

        /// <summary>
        /// output empty line
        /// </summary>
        /// <param name="message">message</param>
        public static void WriteEmptyLine()
        {
            Trace.WriteLine(String.Empty);
        }

        /// <summary>
        /// wrapper method of Trace.WriteLine()
        /// checkes message level and output only necessary messages
        /// </summary>
        /// <param name="message">Trace message</param>
        /// <param name="level">Trace Level</param>
        private static void WriteLine(string message, TraceLevel level)
        {
            if (level <= _traceSwitch.Level)
                Trace.WriteLine(message, level.ToString());
        }

        /// <summary>
        /// helper method to create message
        /// </summary>
        /// <param name="caller">type of class which invoked this method</param>
        /// <param name="methodName">name of method which invoked this method</param>
        /// <param name="message">message</param>
        /// <returns>string that has "class#method : message" format</returns>
        private static string MessageHelper(Type caller, string methodName, string message)
        {
            StringBuilder sb = new StringBuilder();

            if (caller != null)
            {
                sb = sb.Append(caller.Name);
            }

            if (methodName != null)
            {
                if (sb.Length > 0)
                    sb = sb.Append(CLASS_METHOD_SEPARATOR);

                sb = sb.Append(methodName);
                sb = sb.Append(SPACER);
            }

            if (message != null)
            {
                if (sb.Length > 0) sb = sb.Append(MESSAGE_SEPARATOR);
                sb = sb.Append(message);
            }

            return sb.ToString();
        }

        /// <summary>
        /// creates ToString() value of exception instance
        /// </summary>
        /// <remarks>
        /// Occasionally, ToString() method throws Exception due to inside problem like OracleExceltion class.
        /// this method is workaround for such situation
        /// </remarks>
        /// <param name="ex">instance of exception</param>
        /// <returns>ToString() value of instance as much as possible</returns>
        public static string ExceptionToString(Exception ex)
        {
            if (ex == null)
                return String.Empty;

            StringBuilder msg = new StringBuilder();
            StringBuilder stack = new StringBuilder();

            bool isTopLevel = true;

            Exception e = ex;

            while (e != null)
            {
                if (isTopLevel == false)
                    msg = msg.Append(" ---> ");

                msg = msg.Append(e.GetType().FullName).Append(": ");

                if (e.Message != null)
                {
                    msg = msg.Append(e.Message);
                }

                if (e.StackTrace != null)
                {
                    string content = String.Concat(e.StackTrace, Environment.NewLine, "   --- end of stack trace of inner exception ---", Environment.NewLine);

                    if (stack.Length > 0)
                    {
                        stack = stack.Insert(0, content);
                    }
                    else
                    {
                        stack = stack.Append(e.StackTrace);
                    }
                }

                e = e.InnerException;
                isTopLevel = false;
            }

            if (stack.Length > 0)
                return String.Concat(msg.ToString(), Environment.NewLine, stack.ToString());
            else
                return msg.ToString();
        }


        /// <summary>
        /// lock object to capture System,.Diagnostics.Trace
        /// </summary>
        private static object _lockObjectForCaptureTrace = new object();

        /// <summary>
        /// captures Trace.WriteLine() and redirect to log file
        /// </summary>
        public static void CaptureTrace()
        {
            lock (_lockObjectForCaptureTrace)
            {
                // registering Trace listener for LogWriter with checking name to avoid multiple registration
                bool already = false;

                foreach (TraceListener listener in Trace.Listeners)
                {
                    if (listener.Name.Equals(TraceListenerForLogWriter.LISTENER_FOR_LOGWRITER_NAME))
                    {
                        already = true;

                        break;
                    }
                }

                if (already == false)
                {
                    TraceListenerForLogWriter tl = new TraceListenerForLogWriter();
                    Trace.Listeners.Add(tl);
                }

                Trace.AutoFlush = true;
            }
        }
    }
}
