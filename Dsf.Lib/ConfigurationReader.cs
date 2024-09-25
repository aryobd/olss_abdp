using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Text;

namespace Dsf.Lib
{
    /// <summary>
    /// Provides access to configuration files for applications.
    /// </summary>
    public static class ConfigurationReader
    {
        /// <summary>
        /// The cache of read configuration.
        /// </summary>
        private static IDictionary<Type, object> cache = new Dictionary<Type, object>();



        /// <summary>
        /// Gets the appSettings data from the configuration file.
        /// </summary>
        /// <typeparam name="T">The type to store appSettings data.</typeparam>
        /// <returns>
        /// The instance that stores appSettings data.
        /// </returns>
        public static T GetAppSettings<T>() where T : new()
        {
            if (cache.ContainsKey(typeof(T)))
            {
                return (T)cache[typeof(T)];
            }

            T instance = new T();
            foreach (string key in ConfigurationManager.AppSettings.AllKeys)
            {
                PropertyInfo propertyInfo = typeof(T).GetProperty(key, BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public | BindingFlags.SetProperty);
                if (propertyInfo != null)
                {
                    string value = ConfigurationManager.AppSettings[key];
                    propertyInfo.SetValue(instance, Convert.ChangeType(value, propertyInfo.PropertyType), new object[] { });
                }
            }

            cache[typeof(T)] = instance;

            return instance; ;
        }
    }
}
