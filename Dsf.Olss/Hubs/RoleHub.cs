using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Concurrent;
using Dsf.Olss.Service;

namespace Dsf.Olss.Hubs
{
    [HubName("Role")]
    public class RoleHub : Hub
    {
        //private static ConcurrentDictionary<string, List<int>> _mapping = new ConcurrentDictionary<string, List<int>>();
        //private IRoleService service;

        //public RoleHub(IRoleService service)
        //{
        //    this.service = service;
        //}

        //public override Task OnConnected()
        //{
        //    _mapping.TryAdd(Context.ConnectionId, new List<int>());
        //    return base.OnConnected();
        //}


        //public override Task OnDisconnected(bool stopCalled)
        //{
        //    foreach (var id in _mapping[Context.ConnectionId])
        //    {
        //        var role = service.SelectRoleById(id);
        //        role.Locked = false;
        //        service.EditRole(role);
        //        Clients.Others.unlockRole(id);
        //    }
        //    var list = new List<int>();
        //    _mapping.TryRemove(Context.ConnectionId, out list);

        //    return base.OnDisconnected(stopCalled);
        //}

        //public void Hello()
        //{
        //    Clients.All.hello();
        //}

        //public void Lock(int id)
        //{
        //    //string x = "kepanggil";
        //    //Clients.Others.lockRole(id);
        //    var role = service.SelectRoleById(id);
        //    role.Locked = true;
        //    service.EditRole(role);
        //    _mapping[Context.ConnectionId].Add(id);
        //    Clients.Others.lockRole(id);
        //}

        //public void Unlock(int id)
        //{
        //    var role = service.SelectRoleById(id);
        //    role.Locked = false;
        //    service.EditRole(role);
        //    _mapping[Context.ConnectionId].Remove(id);
        //    Clients.Others.unlockRole(id);
            
        //}
    }
}
