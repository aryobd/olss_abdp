using System;
using System.Reflection;

namespace Dsf.Lib
{
    /// <summary>
    /// Provides features that easily use the Reflection API.
    /// </summary>
    public static class ReflectionUtil
    {
        /// <summary>
        /// Creates a new instance of the <paramref name="fullTypeName"/> class in the assembly named <paramref name="assemblyName"/>.
        /// </summary>
        /// <param name="assemblyName">The assembly name that contains the type specified <paramref name="fullTypeName"/>.</param>
        /// <param name="fullTypeName">The type name contains its namespace.</param>
        /// <returns>The created new instance.</returns>
        public static object CreateInstance(string assemblyName, string fullTypeName)
        {
            if (String.IsNullOrEmpty(assemblyName))
            {
                throw new ArgumentException("assemblyName");
            }
            if (String.IsNullOrEmpty(fullTypeName))
            {
                throw new ArgumentException("fullTypeName");
            }

            Assembly assembly = Assembly.Load(assemblyName);
            return assembly.CreateInstance(fullTypeName);
        }


        static readonly string versionString = Assembly.GetExecutingAssembly().GetName().Version.ToString();

        /// <summary>
        /// returns executing assembly's version string
        /// </summary>
        /// <returns>version</returns>
        public static string GetVersionString()
        {
            return versionString;
        }

        /// <summary>
        /// Invokes method using reflection.
        /// </summary>
        /// <param name="target">Instance that has target method.</param>
        /// <param name="methodName">Name of method to invoke</param>
        /// <param name="parameters">Array of method parameters. Specify null if target method has no parameters.</param>
        /// <returns>Return value of target method.</returns>
        /// <remarks>
        /// If there are any overloads that have same number of parameters, reflection would be failed.
        /// Pay attension to casting return value.
        /// </remarks>
        public static Object InvokeMethod(Object target, String methodName, params Object[] parameters)
        {
            //retrieves method information
            MethodInfo method = target.GetType().GetMethod(methodName,
                BindingFlags.Public
                | BindingFlags.NonPublic
                | BindingFlags.Instance
                | BindingFlags.InvokeMethod);

            //execute
            if (method != null)
                return method.Invoke(target, parameters);
            else
                throw new ArgumentException("Method [" + methodName + "] was not found.");
        }

        /// <summary>
        /// Convert to correct type.
        /// </summary>
        /// <typeparam name="T">Type of object whose type is to be converted.</typeparam>
        /// <param name="input">Object whose type is to be converted.</param>
        /// <returns>Type of converted object.</returns>
        public static T ConvertTo<T>(object input)
        {
            object result = default(T);
            if (input == null || input == DBNull.Value) return (T)result;

            if (typeof(T) == typeof(int))
                result = System.Convert.ToInt32(input);
            else if (typeof(T) == typeof(long))
                result = System.Convert.ToInt64(input);
            else if (typeof(T) == typeof(string))
                result = System.Convert.ToString(input);
            else if (typeof(T) == typeof(bool))
                result = System.Convert.ToBoolean(input);
            else if (typeof(T) == typeof(decimal))
                result = System.Convert.ToDecimal(input);
            else if (typeof(T) == typeof(double))
                result = System.Convert.ToDouble(input);
            else if (typeof(T) == typeof(DateTime))
                result = System.Convert.ToDateTime(input);

            return (T)result;
        }

    }
}
