using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dsf.Lib;
using Dsf.Lib.Diagnostics;
using Dsf.Lib.Log;

namespace Dsf.Olss
{
    public class LogConfig
    {
        public static void Initialize()
        {
            LogWriter.GetInstance().LogPrefix = AppSettingsCache.GetInstance().LogPrefix;
            LogWriter.GetInstance().KeepDays = AppSettingsCache.GetInstance().LogRetentionDays;
            LogWriter.GetInstance().LogSaveDir = AppSettingsCache.GetInstance().LogSaveDir;

            Tracer.CaptureTrace();
            Tracer.Info(typeof(LogConfig), "Initialize", "LogWriter initilized & Trace capturing started");
        }
    }
}
