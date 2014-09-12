using Microsoft.Framework.ConfigurationModel;
using System;

namespace Conch
{
    /// <summary>
    /// Summary description for ConfigurationExtensions
    /// </summary>
    public static class ConfigurationExtensions
    {
	    public static string GetConnectionString(this IConfiguration configuration, string name)
	    {
            return configuration.Get("ConnectionString")
                ?? configuration.Get(name);
	    }
    }
}