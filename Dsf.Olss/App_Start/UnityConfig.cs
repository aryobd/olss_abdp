using System;
//using Dsf.Olss.App_Start;
using Dsf.Olss.Data;
using Dsf.Olss.Data.Infrastructure;
using Dsf.Olss.Data.IRepository;
using Dsf.Olss.Data.Repository;
using Dsf.Olss.Service;
using Dsf.Olss.Service.MaintenanceService;
using Dsf.Olss.Service.MasterService;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Practices.Unity;

namespace Dsf.Olss
{
    /// <summary>
    /// Specifies the Unity configuration for the main container.
    /// </summary>
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();

            RegisterTypes(container);

            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion Unity Container

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            // NOTE: To load from web.config uncomment the line below. Make sure to add a Microsoft.Practices.Unity.Configuration to the using statements.
            // container.LoadConfiguration();

            // TODO: Register your types here
            // container.RegisterType<IProductRepository, ProductRepository>();
            container.RegisterType<IDatabaseFactory, DatabaseFactory>(new PerRequestLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>(new PerRequestLifetimeManager());
            container.RegisterType(typeof(IGenericRepository<>), typeof(GenericRepository<>), new PerRequestLifetimeManager());

            container.RegisterType<IUserRepository, UserRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IUserBranchRepository, UserBranchRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IRoleRepository, RoleRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IPermissionRepository, PermissionRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IOPLEmployeeRepository, OPLEmployeeRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IOPLBranchRepository, OPLBranchRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IMaintenanceCategoryRepository, MaintenanceCategoryRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IMaintenanceItemRepository, MaintenanceItemRepository>(new PerRequestLifetimeManager())
                     .RegisterType<IOPLJobTitlesRepository, OPLJobTitlesRepository>(new PerRequestLifetimeManager());

            container.RegisterType<IAccountService, AccountService>(new PerRequestLifetimeManager())
                     .RegisterType<IRoleService, RoleService>(new PerRequestLifetimeManager())
                     .RegisterType<IUserService, UserService>(new PerRequestLifetimeManager())
                     .RegisterType<IPermissionService, PermissionService>(new PerRequestLifetimeManager())
                     .RegisterType<IEmployeeService, EmployeeService>(new PerRequestLifetimeManager())
                     .RegisterType<IMaintenanceCategoryService, MaintenanceCategoryService>(new PerRequestLifetimeManager())
                     .RegisterType<IMaintenanceItemService, MaintenanceItemService>(new PerRequestLifetimeManager());
        }
    }
}
