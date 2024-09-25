using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Dsf.Olss.Hubs
{
    [HubName("User")]
    public class UserHub : Hub
    {
    }
}
