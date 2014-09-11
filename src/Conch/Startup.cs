using System;
using System.Linq;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Routing;
using Microsoft.AspNet.Security.Cookies;
using Microsoft.Data.Entity;
using Microsoft.Framework.ConfigurationModel;
using Microsoft.Framework.DependencyInjection;
using Conch.Models;
using Microsoft.AspNet.StaticFiles;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNet.Mvc;

namespace Conch
{
    public class Startup
    {
        public void Configure(IBuilder app)
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            // Setup configuration sources
            var configuration = new Configuration();
            configuration.AddJsonFile("config.json");
            configuration.AddEnvironmentVariables();

            // Set up application services
            app.UseServices(services =>
            {
                services.AddTransient<JsonOutputFormatter, CamelCaseJsonFormatter>();

                // Add EF services to the services container
                services.AddEntityFramework()
                    .AddSqlServer();

                // Configure DbContext
                services.SetupOptions<DbContextOptions>(options =>
                {
                    options.UseSqlServer(configuration.Get("Data:DefaultConnection:ConnectionString"));
                });

                // Add Identity services to the services container
                services.AddIdentitySqlServer<ApplicationDbContext, ApplicationUser>()
                    .AddAuthentication();

                // Add MVC services to the services container
                services.AddMvc()
                    .SetupOptions<MvcOptions>(options =>
                    {
                        options.OutputFormatters.Replace(new JsonOutputFormatter(new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }, false));
                    });
            });

            // Enable Browser Link support
            app.UseBrowserLink();

            // Add static files to the request pipeline
            app.UseStaticFiles();

            // Add cookie-based authentication to the request pipeline
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = ClaimsIdentityOptions.DefaultAuthenticationType,
                LoginPath = new PathString("/Account/Login"),
            });

            // Add MVC to the request pipeline
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "present",
                    template: "present/{deckName}",
                    defaults: new { controller = "Present", action = "Index" });

                routes.MapRoute(
                    name: "presentSlides",
                    template: "present/{deckName}/slides",
                    defaults: new { controller = "Present", action = "Slides" });

                routes.MapRoute(
                    name: "watch",
                    template: "watch/{deckName}",
                    defaults: new { controller = "Watch", action = "Index" });

                routes.MapRoute(
                    name: "default", 
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "api",
                    template: "{controller}/{id?}");
            });
        }
    }

    public class CamelCaseJsonFormatter : JsonOutputFormatter
    {
        public CamelCaseJsonFormatter() : base (new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() }, false)
        {

        }
    }
}
