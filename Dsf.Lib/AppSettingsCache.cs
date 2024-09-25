using System;
using System.Collections;
using System.Configuration;
using System.Collections.Specialized;

namespace Dsf.Lib
{
    /// <summary>
    /// caches appSettings configuration in the app.config or web.config
    /// </summary>
    public class AppSettingsCache
    {
        private static AppSettingsCache _instance;
        private static string _connectionString = null;
        private static System.Diagnostics.TraceLevel _traceLevel = System.Diagnostics.TraceLevel.Verbose;
        private const string _TRACING_SWITCHNAME = "Dsf.Lib.TraceSwitchName";
        private const string _TRACING_SWITCHDESCRIPTION = "Dsf.Lib.TraceSwitchDescription";
        private static bool _isDebugEnabled = false;
        private static bool _isTraceLevelSet = false;
        private static string _logSaveDir = null;
        private static string _logPrefix = null;
        private static uint _logRetentionDays = 30;
        internal object _lockObject = new object();

        /// <summary>
        /// private constructor
        /// </summary>
        private AppSettingsCache()
        {
        }

        /// <summary>
        /// get singleton instance
        /// </summary>
        /// <returns>only one AppSettingsCache instance in the application</returns>
        public static AppSettingsCache GetInstance()
        {
            if (_instance == null)
            {
                _instance = new AppSettingsCache();
            }

            return _instance;
        }

        /// <summary>
        /// get connection string
        /// </summary>
        public string ConnectionString
        {
            get
            {
                lock (_lockObject)
                {
                    if (_connectionString == null)
                        _connectionString = ConfigurationManager.AppSettings["connectionString"];
                }

                return _connectionString;
            }
        }

        /// <summary>
        /// retrives trace level for logging
        /// </summary>
        public System.Diagnostics.TraceLevel TraceLevel
        {
            get
            {
                if (_isTraceLevelSet == false)
                {
                    string level = ConfigurationManager.AppSettings["Dsf.Lib.TraceLevel"];
                    try
                    {
                        if (level != null && level.Length > 0)
                        {
                            if ("debug".Equals(level.Trim().ToLower()))
                            {
                                _traceLevel = System.Diagnostics.TraceLevel.Verbose;
                                _isDebugEnabled = true;
                            }
                            else
                            {
                                _traceLevel = (System.Diagnostics.TraceLevel)Enum.Parse(typeof(System.Diagnostics.TraceLevel), level, true);
                                _isDebugEnabled = false;
                            }
                        }
                    }
                    catch { }
                }

                _isTraceLevelSet = true;

                return _traceLevel;
            }
        }

        /// <summary>
        /// retrives trace switch name
        /// </summary>
        public string TraceSwitchName
        {
            get
            {
                return _TRACING_SWITCHNAME;
            }
        }

        /// <summary>
        /// retrives trace switch description
        /// </summary>
        public string TraceSwitchDescription
        {
            get
            {
                return _TRACING_SWITCHDESCRIPTION;
            }
        }

        /// <summary>
        /// retrieves debug output enabled / disanled
        /// (working for Debug build)
        /// </summary>
        public bool IsDebugEnabled
        {
            get
            {
                return _isDebugEnabled;
            }
        }

        /// <summary>
        /// get directory path to save log files
        /// </summary>
        public string LogSaveDir
        {
            get
            {
                if (_logSaveDir == null)
                    _logSaveDir = ConfigurationManager.AppSettings["Dsf.Lib.LogSaveDir"];

                return _logSaveDir;
            }
        }

        /// <summary>
        /// string for log file prefix name
        /// </summary>
        public string LogPrefix
        {
            get
            {
                if (_logPrefix == null)
                {
                    string header = ConfigurationManager.AppSettings["Dsf.Lib.LogPrefix"];
                    if (header != null && header.Length > 0)
                        _logPrefix = header;
                }

                return _logPrefix;
            }
        }

        /// <summary>
        /// log file retention days
        /// </summary>
        public uint LogRetentionDays
        {
            get
            {
                if (_logRetentionDays < 0)
                {
                    string val = ConfigurationManager.AppSettings["Dsf.Lib.LogRetentionDays"];
                    try
                    {
                        if (val != null && val.Trim().Length > 0)
                        {
                            _logRetentionDays = Convert.ToUInt32(val);
                        }
                    }
                    catch
                    {
                        //set 30 as default 
                        _logRetentionDays = 30;
                    }
                }

                return _logRetentionDays;
            }
        }

    }
}
