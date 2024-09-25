using System;
using System.IO;
using System.Diagnostics;
using System.Text;
using System.Reflection;
using System.Threading;
using Dsf.Lib.Diagnostics;

namespace Dsf.Lib.Log
{
    /// <summary>
    /// Output logs to text file.
    /// 1 log file for each day.
    /// </summary>
    public class LogWriter
    {
        /// <summary>
        /// singleton instance
        /// </summary>
        private static LogWriter _instance = null;

        /// <summary>
        /// lock object for instance creation
        /// </summary>
        private static object _lockObjectForNewInstance = new object();

        /// <summary>
        /// name of log file
        /// </summary>
        private string _currentLogFileName = String.Empty;

        /// <summary>
        /// prefix for log file name
        /// </summary>
        private string _logPrefix = String.Empty;

        /// <summary>
        /// directory path to locate log file
        /// </summary>
        private string _logSaveDir = String.Empty;

        /// <summary>
        /// lock object to utilize log output stream
        /// </summary>
        private object _lockObjectForOutstream = null;

        /// <summary>
        /// lock object to create new log file and stream
        /// </summary>
        private object _lockObjectForUpdateCurrentLogFile = null;

        /// <summary>
        /// Output stream for current log file
        /// </summary>
        private Stream _outStream = null;

        /// <summary>
        /// Stream wrier for current log file
        /// </summary>
        private StreamWriter _writer = null;

        /// <summary>
        /// log retension days
        /// when set to less than zero, log file will not be deleted automatically
        /// </summary>
        private uint _keepDays = 30;

        /// <summary>
        /// date format
        /// </summary>
        private const string _DATE_FORMAT = "yyyyMMdd";

        /// <summary>
        /// default constructor
        /// </summary>
        private LogWriter()
        {
            this._lockObjectForOutstream = new object();
            this._lockObjectForUpdateCurrentLogFile = new object();
        }

        /// <summary>
        /// accesses singleton instance
        /// </summary>
        public static LogWriter GetInstance()
        {
            try
            {
                if (_instance == null)
                {
                    lock (_lockObjectForNewInstance)
                    {
                        if (_instance == null)
                            _instance = new LogWriter();
                    }
                }
            }
            catch { }

            return _instance;
        }

        /// <summary>
        /// terminates LogWriter instance
        /// </summary>
        public void Terminate()
        {
            this.DestroyCurrentStream();
            this._lockObjectForUpdateCurrentLogFile = null;
            this._lockObjectForOutstream = null;
        }

        /// <summary>
        /// Current log file name
        /// </summary>
        public string CurrentLogFileName
        {
            get
            {
                return this._currentLogFileName;
            }
        }

        /// <summary>
        /// header string for log file
        /// </summary>
        public string LogPrefix
        {
            get
            {
                return this._logPrefix == null ? String.Empty : this._logPrefix;
            }
            set
            {
                this._logPrefix = value;
            }
        }

        /// <summary>
        /// log output destination directory
        /// </summary>
        public string LogSaveDir
        {
            get
            {
                return this._logSaveDir;
            }
            set
            {
                this._logSaveDir = value;
            }
        }

        /// <summary>
        /// log retention days
        /// </summary>
        public uint KeepDays
        {
            get
            {
                return this._keepDays;
            }
            set
            {
                this._keepDays = value;
            }
        }


        private const string _DELIMITER = ",";

        private const string _TIME_FORMAT = "HH:mm:ss";

        private const string _THREADID_PREFIX = "0x";

        private const string _THREADID_FORMAT = "X";


        /// <summary>
        /// writes log to current log file
        /// </summary>
        /// <param name="message">log message</param>
        public void WriteTextLog(string message)
        {
            this.WriteTextLog(message, String.Empty);
        }

        /// <summary>
        /// writes log to current log file with category
        /// </summary>
        /// <param name="message">log message</param>
        /// <param name="category">category string</param>
        public void WriteTextLog(string message, string category)
        {
            // delete old files and create new stream when the date has changed
            if (this.IsUpdateRequired())
            {
                this.UpdateCurrentLogFile();
            }

            lock (this._lockObjectForOutstream)
            {
                // DateTime.Now
                DateTime dt = DateTime.Now;

                //formatting output
                StringBuilder sb = new StringBuilder();
                sb = sb.Append(dt.ToString(_TIME_FORMAT)).Append(_DELIMITER);
                sb = sb.Append(_THREADID_PREFIX);
                sb = sb.Append(Thread.CurrentThread.ManagedThreadId.ToString(_THREADID_FORMAT)).Append(_DELIMITER);
                if (category != null && category.Length > 0)
                {
                    sb = sb.Append(category).Append(_DELIMITER);
                }
                if (message != null)
                {
                    sb = sb.Append(message);
                }

                try
                {
                    if (this._writer != null)
                    {
                        this._writer.WriteLine(sb.ToString());
                        this._writer.Flush();
                    }
                    else
                    {
                        //Console.WriteLine(" ***** this.writer has not set yet. *****");
                    }
                }
                catch { }
            }
        }




        /// <summary>
        /// current time to check the file already obsoleted
        /// </summary>
        private DateTime _OutputDate;

        /// <summary>
        /// detect the current file should be rotated or not from the system date
        /// </summary>
        /// <returns></returns>
        protected virtual bool IsUpdateRequired()
        {
            DateTime currentDay = DateTime.Today;

            if (currentDay.Equals(_OutputDate))
            {
                return false;
            }

            // log file should be rotated when the date is already passed
            this._OutputDate = currentDay;

            return true;
        }



        /// <summary>
        /// get current log file name
        /// </summary>
        protected string GetCurrentLogFileName()
        {
            //return String.Format("{0}{1}.log", this.LogPrefix, DateTime.Now.ToString(_DATE_FORMAT));
            return String.Format("{0}{1}_{2}.log", this.LogPrefix, DateTime.Now.ToString(_DATE_FORMAT), Process.GetCurrentProcess().Id);
        }

        /// <summary>
        /// update current log file
        /// </summary>
        protected void UpdateCurrentLogFile()
        {
            try
            {
                lock (this._lockObjectForUpdateCurrentLogFile)
                {
                    Directory.CreateDirectory(this.LogSaveDir);

                    this.CreateOutputStream();

                    // if the old files should be deleted, process at here
                    if (this._keepDays > 0)
                        this.DeleteExpireFiles();
                }

            }
            catch { }
        }

        /// <summary>
        /// update output stream for current file
        /// </summary>
        protected void CreateOutputStream()
        {
            try
            {
                this.DestroyCurrentStream();

                lock (this._lockObjectForOutstream)
                {
                    // create new stream for new file
                    String path = Path.Combine(this.LogSaveDir, this.GetCurrentLogFileName());
                    this._outStream = new FileStream(path, FileMode.OpenOrCreate | FileMode.Append);
                    this._writer = new StreamWriter(this._outStream);
                }
            }
            catch
            {
                //Trace.WriteLine("\t" + this.GetType().Name + " createOutputStream()");
                //Trace.WriteLine(e.Message);
                //Trace.WriteLine(e.StackTrace);
                throw;
            }

        }

        /// <summary>
        /// terminate output stream for current file
        /// </summary>
        protected void DestroyCurrentStream()
        {
            try
            {
                lock (this._lockObjectForOutstream)
                {
                    // close stream writer
                    if (this._writer != null)
                    {
                        //Trace.WriteLine("*** close stream 'writer' ***");
                        this._writer.Flush();
                        this._writer.Close();	//this close also closes stream
                        this._writer = null;
                        this._outStream = null;
                    }
                }
            }
            catch
            {
                //at this moment it is not possible to know the stream still available or not
                //Console.WriteLine("destroyCurrentStream ERROR : " + e.Message);
                //Console.WriteLine(e.StackTrace);
                //				Trace.WriteLine("\t" + this.GetType().Name + " destroyCurrentStream()");
                //				Trace.WriteLine(e.Message);
                //				Trace.WriteLine(e.StackTrace);
            }
        }



        private const string _FILE_FILTER_PATTERN = "*.log";

        /// <summary>
        /// delete expired logs
        /// </summary>
        private void DeleteExpireFiles()
        {
            string[] files = Directory.GetFiles(this.LogSaveDir, _FILE_FILTER_PATTERN);
            if (files == null)
                return;

            foreach (string file in files)
            {
                string fname = Path.GetFileName(file); ;

                if (this.IsElder(fname))
                {
                    Tracer.Info("DeleteExpireFiles : " + file + " is elder, will be deleted.");

                    try
                    {
                        File.Delete(file);
                    }
                    catch (Exception e)
                    {
                        Tracer.Info(e.StackTrace);
                    }
                }
            }
        }

        /// <summary>
        /// is the files expired?
        /// </summary>
        private bool IsElder(String fileName)
        {
            if (fileName == null || fileName.Length < _DATE_FORMAT.Length)
                return false;

            string exceptedDateFile = null;
            if(String.IsNullOrEmpty(this.LogPrefix))
                exceptedDateFile = fileName.Substring(_DATE_FORMAT.Length);
            else
                exceptedDateFile = fileName.Substring(this.LogPrefix.Length, _DATE_FORMAT.Length);

            if (String.IsNullOrEmpty(exceptedDateFile))
                return false;

            // extract yyyyMMdd part from file name
            String date = exceptedDateFile.Substring(0, _DATE_FORMAT.Length);
            try
            {
                // is it number?
                int dt = Convert.ToInt32(date);

                // is it valid as date?
                DateTime logDate = DateTime.ParseExact(date, _DATE_FORMAT, System.Globalization.CultureInfo.CurrentCulture);
            }
            catch
            {
                return false;
            }

            DateTime limitDate = DateTime.Now.AddDays(Convert.ToDouble(-1 * this.KeepDays));
            String limit = limitDate.ToString(_DATE_FORMAT);
            if (String.Compare(date, limit) < 0)
            {
                Tracer.Verbose("deleting " + fileName);
                return true;
            }

            return false;
        }


    }


}
