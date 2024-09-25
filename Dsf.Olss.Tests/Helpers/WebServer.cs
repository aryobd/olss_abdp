using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Dsf.Olss.Tests.Helpers
{
    public static class WebServer
    {
        private static Process _iisProcess;

        public static void StartIIS(int port)
        {
            if (_iisProcess == null)
            {
                var thread = new Thread(() => StartIISExpress(port));

                thread.Start();
            }
        }

        public static void StopIIS()
        {
            if (!_iisProcess.HasExited)
            {
                _iisProcess.Kill();
            }

            _iisProcess.Dispose();
        }

        private static void StartIISExpress(int port)
        {
            GlobalConfig gC = new GlobalConfig();

            var startInfo = new ProcessStartInfo
            {
                WindowStyle = ProcessWindowStyle.Hidden,
                ErrorDialog = true,
                LoadUserProfile = true,
                CreateNoWindow = false,
                UseShellExecute = false,
                Arguments = string.Format("/path:\"{0}\" /port:{1}", gC.LocalSiteRoot, port.ToString())
            };

            var programfiles = string.IsNullOrEmpty(startInfo.EnvironmentVariables["programfiles"])
                                ? startInfo.EnvironmentVariables["programfiles(x86)"]
                                : startInfo.EnvironmentVariables["programfiles"];

            startInfo.FileName = programfiles + "\\IIS Express\\iisexpress.exe";

            try
            {
                _iisProcess = new Process { StartInfo = startInfo };

                _iisProcess.Start();
                _iisProcess.WaitForExit();
            }
            catch
            {
                if (!_iisProcess.HasExited)
                {
                    _iisProcess.Kill();
                }

                _iisProcess.Dispose();
            }
        }

        public static int FreePort()
        {
            TcpListener l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();
            int port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();
            return port;
        }
    }
}
